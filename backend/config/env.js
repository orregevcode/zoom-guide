require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  ZOOM_CLIENT_ID: process.env.ZOOM_CLIENT_ID,
  ZOOM_CLIENT_SECRET: process.env.ZOOM_CLIENT_SECRET,
  ZOOM_ACCOUNT_ID: process.env.ZOOM_ACCOUNT_ID,
  ZOOM_WEBHOOK_SECRET: process.env.ZOOM_WEBHOOK_SECRET
};

