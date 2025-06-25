const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const upload = require('../middleware/upload');

router.post('/', boardController.createBoard);
router.get('/', boardController.getBoards);
router.put('/:id', boardController.updateBoard);
router.delete('/:id', boardController.deleteBoard);
router.post('/', upload.single('imageFile'), createBoard);

module.exports = router;
