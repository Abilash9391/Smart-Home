const express = require('express');
const router = express.Router();
const {getAllDevices,addDevice,updateStatus,deleteDevice} =require('../controllers/device.controller');

router.get('/:roomName', getAllDevices);
router.post('/', addDevice);
router.put('/:deviceId',updateStatus);
router.delete('/:deviceId',deleteDevice);

module.exports = router;
