# Zoom Guide

A Node.js/Express application for integrating with Zoom API, including meeting management and webhook handling.

## Project Structure

```
zoom-guide/
├── backend/          # Express backend server
│   ├── config/       # Configuration files
│   ├── controllers/  # Request handlers
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   └── index.js      # Server entry point
└── Frontend/         # Frontend application (to be implemented)
```

## Features

- Create Zoom meetings via API
- Get all meetings
- Webhook support for Zoom events
- Server-to-Server OAuth authentication

## Setup

### Backend

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   PORT=3000
   ZOOM_CLIENT_ID=your_client_id
   ZOOM_CLIENT_SECRET=your_client_secret
   ZOOM_ACCOUNT_ID=your_account_id
   ZOOM_WEBHOOK_SECRET=your_webhook_secret
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Meetings
- `POST /api/create-zoom-meeting` - Create a new meeting
- `GET /api/meetings` - Get all meetings

### Webhooks
- `POST /webhook/validate` - Webhook validation endpoint
- `POST /webhook/events` - Webhook events endpoint

## Technologies

- Node.js
- Express.js
- Axios
- Zoom API

