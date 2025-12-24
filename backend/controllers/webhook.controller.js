const webhookService = require('../services/webhookService'); 

class WebhookController {
    handleWebhook = async (req, res) => {
        try {
            await this._processRequest(req, res);
        } catch (error) {
            this._handleError(res, error);
        }
    };

    _processRequest = async (req, res) => {
        const { signature, timestamp } = this._extractHeaders(req);
        console.log('Signature:', signature);
        console.log('Timestamp:', timestamp);
        console.log('Body:', req.body);
        console.log("headers",req.headers);

        if (!webhookService.verifySignature(signature, timestamp, req.body)) {
            return res.status(401).json({ message: 'Unauthorized', status: 401 });
        }

        if (req.body.event === 'endpoint.url_validation') {
            
            return this._sendValidationResponse(req, res);
        }

        await webhookService.processWebhookEvent(req.body);
        return res.status(200).json({ message: 'Success', status: 200 });
    };

    _extractHeaders = (req) => ({
        signature: req.headers['x-zm-signature'],
        timestamp: req.headers['x-zm-request-timestamp']
    });

    _sendValidationResponse = (req, res) => {
        const payload = webhookService.generateValidationResponse(req.body.payload.plainToken);
        console.log('Validation response:', payload);
        return res.status(200).json(payload);
    };

    _handleError = (res, error) => {
        console.error('Webhook error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    };
}

module.exports = new WebhookController();
