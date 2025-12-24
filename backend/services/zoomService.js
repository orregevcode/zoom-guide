const axios = require('axios');
const { ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET, ZOOM_ACCOUNT_ID } = require('../config/env');

class ZoomService {
  async getAccessToken() {
    try {
      const credentials = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64');
      const url = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`;
      
      const response = await axios.post(url, null, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Basic ${credentials}`
        }
      });
      
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error.response?.data || error.message);
      throw error;
    }
  }

  async createMeeting(meetingData, accessToken) {
    try {
      const url = `https://api.zoom.us/v2/users/me/meetings`;
      const response = await axios.post(url, meetingData, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating meeting:', error.response?.data || error.message);
      throw error;
    }
  }

  async getAllMeetings(accessToken) {
    try {
      const response = await axios.get('https://api.zoom.us/v2/users/me/meetings', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return response.data.meetings;
    } catch (error) {
      console.error('Error getting meetings:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = new ZoomService();

