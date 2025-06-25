const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const upload = require('../middleware/upload');

// Only one POST route, with upload + controller
router.post('/', upload.single('imageFile'), boardController.createBoard);
router.get('/', boardController.getBoards);
router.put('/:id', upload.single('imageFile'), boardController.updateBoard);
router.delete('/:id', boardController.deleteBoard);

module.exports = router;
