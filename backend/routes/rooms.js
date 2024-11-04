const express = require('express');
const router = express.Router();
const {getRooms,addRoom} = require('../controllers/room.controller')


router.get('/',getRooms);
router.post('/',addRoom);


module.exports = router;

// DELETE room
// router.delete('/:roomName', (req, res) => {
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Error reading file' });
//     } else {
//       const rooms = JSON.parse(data);
//       rooms = rooms.filter(r => r.roomName !== req.params.roomName);
//       fs.writeFile(filePath, JSON.stringify(rooms, null, 2), (err) => {
//         if (err) {
//           console.error(err);
//           res.status(500).json({ message: 'Error writing file' });
//         } else {
//           res.sendStatus(204);
//         }
//       });
//     }
//   });
// });

