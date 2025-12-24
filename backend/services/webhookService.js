const crypto = require('crypto');

class WebhookService {
    static SIGNATURE_PREFIX = 'v0';
    static SIGNATURE_ALGORITHM = 'sha256';

    /**
     * @param {string} [secret] the secret key for the webhook
     * Initializes the secret key for the webhook
     */
    constructor(secret) {
        this.secret = secret || process.env.ZOOM_WEBHOOK_SECRET;
        this._ensureSecretExists();
    }

    _ensureSecretExists() {
        if (!this.secret) {
            throw new Error('ZoomService Error: ZOOM_WEBHOOK_SECRET is not set.');
        }
    }

    /**
     * Verifies that the request actually came from Zoom.
     * @param {string} signatureHeader - 'x-zm-signature' header
     * @param {string} timestamp - 'x-zm-request-timestamp' header
     * @param {object} body - Request body
     * @returns {boolean} True if valid
     */
    verifySignature(signatureHeader, timestamp, body) {
        if (!this._isValidInput(signatureHeader, timestamp, body)) {
            return false;
        }

        const generatedSignature = this._computeSignature(timestamp, body);

        const sigBuffer = Buffer.from(signatureHeader);
        const genBuffer = Buffer.from(generatedSignature);

        // Security Fix: timingSafeEqual throws if lengths differ
        if (sigBuffer.length !== genBuffer.length) {
            return false;
        }
        
        return crypto.timingSafeEqual(sigBuffer, genBuffer);
    }

    /**
     * Generates the encrypted object for Zoom URL validation handshake.
     * @param {string} plainToken - The plain token from Zoom
     * @returns {{ plainToken: string, encryptedToken: string } | null}
     */
    generateValidationResponse(plainToken) {
        if (!plainToken) return null;

        const encryptedToken = this._hashToken(plainToken);

        return {
            plainToken,
            encryptedToken
        };
    }

    /**
     * Placeholder for business logic handling.
     * @param {object} eventData 
     */
    async processWebhookEvent(eventData) {
        // Implementation typically involves calls to DB Repositories
        console.log(`Processing event: ${eventData.event}`);
    }

    // --- Private Helpers ---

    _isValidInput(signatureHeader, timestamp, body) {
        return !!(signatureHeader && timestamp && body);
    }

    _computeSignature(timestamp, body) {
        const message = `${WebhookService.SIGNATURE_PREFIX}:${timestamp}:${JSON.stringify(body)}`;
        return `${WebhookService.SIGNATURE_PREFIX}=${this._hashToken(message)}`;
    }

    _hashToken(data) {
        return crypto
            .createHmac(WebhookService.SIGNATURE_ALGORITHM, this.secret)
            .update(data)
            .digest('hex');
    }
}

module.exports = new WebhookService();