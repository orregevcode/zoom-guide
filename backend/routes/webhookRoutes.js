const express = require('express');
const router = express.Router();
const crypto = require('crypto');
require('dotenv').config();

// Simple webhook validation endpoint
router.post('/validate', (req, res) => {
  console.log('Validation request received:', req.body);
  const plainToken = req.body.payload?.plainToken;
  
  if (plainToken) {
    const webhookSecret = process.env.ZOOM_WEBHOOK_SECRET;
    const encryptedToken = crypto
      .createHmac('sha256', webhookSecret)
      .update(plainToken)
      .digest('hex');
    
    res.json({
      plainToken: plainToken,
      encryptedToken: encryptedToken
    });
  } else {
    res.json({ message: 'Validation endpoint working' });
  }
});


// Fixed webhook events endpoint
router.post('/', (req, res) => {
    let response;
    
    // 1. Construct the message string
    const message = `v0:${req.headers['x-zm-request-timestamp']}:${JSON.stringify(req.body)}`;
    
    // 2. Create the hash (signature)
    const hashForVerfiy = crypto.createHmac('sha256', process.env.ZOOM_WEBHOOK_SECRET).update(message).digest('hex');
    
    // 3. Create the signature string to compare
    const signature = `v0=${hashForVerfiy}`;

    // 4. Validate Signature
    if (signature === req.headers['x-zm-signature']) {
        
        // A. Check if it's a Validation Event
        if (req.body.event === 'endpoint.url_validation') {
            const hashForValidate = crypto.createHmac('sha256', process.env.ZOOM_WEBHOOK_SECRET).update(req.body.payload.plainToken).digest('hex');
            
            response = {
                plainToken: req.body.payload.plainToken,
                encryptedToken: hashForValidate,
                status: 200
            };
            
            // Send the JSON object directly (Zoom needs the tokens, not a message string)
            res.status(response.status).json(response);
            
        } else {
            // B. Regular Authorized Event
            response = {
                message: 'Authorized request to Webhook Sample Node.js',
                status: 200
            };
            res.status(response.status).json(response);
        }
        
    } else {
        // 5. Unauthorized Request (Signature didn't match)
        response = {
            message: 'Unauthorized request to Webhook Sample Node.js',
            status: 200
        };
        res.status(response.status).json(response);
    }
});

module.exports = router;