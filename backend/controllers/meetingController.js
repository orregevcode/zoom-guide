const zoomService = require('../services/zoomService');

const createMeeting = async (req, res) => {
  try {
    const accessToken = await zoomService.getAccessToken();
    const meetingData = {
      topic: req.body.topic,
      type: req.body.type,
      duration: req.body.duration,
      start_time: req.body.start_time,
      timezone: req.body.timezone
    };

    const meeting = await zoomService.createMeeting(meetingData, accessToken);
    res.json(meeting);
  } catch (error) {
    console.error('Error creating meeting:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to create meeting',
      details: error.response?.data || error.message
    });
  }
};

const getAllMeetings = async (req, res) => {
  try {
    const accessToken = await zoomService.getAccessToken();
    const meetings = await zoomService.getAllMeetings(accessToken);
    res.json(meetings);
  } catch (error) {
    console.error('Error getting meetings:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to get meetings',
      details: error.response?.data || error.message
    });
  }
};

module.exports = {
  createMeeting,
  getAllMeetings
};

