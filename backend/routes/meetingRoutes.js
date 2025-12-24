const express = require('express');
const router = express.Router();
const { createMeeting, getAllMeetings } = require('../controllers/meetingController');

router.post('/create-zoom-meeting', createMeeting);
router.get('/meetings', getAllMeetings);

module.exports = router;

