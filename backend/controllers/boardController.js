const Board = require('../models/Board');
const cloudinary = require('../utils/cloudinary');

exports.createBoard = async (req, res) => {
  try {
    const { title, description, imageUrl, createdBy } = req.body;
    let image = imageUrl;
    if (req.file && req.file.path) {
      image = req.file.path;
    }

    const board = await Board.create({ title, description, image, createdBy });
    res.status(201).json(board);
  } catch (err) {
    console.error("Error creating board:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.getBoards = async (req, res) => {
  try {
    const { q } = req.query;

    let filter = {};
    if (q) {
      const regex = new RegExp(q, 'i'); 
      filter = {
        $or: [
          { title: regex },
          { description: regex },
        ],
      };
    }

    const boards = await Board.find(filter);
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const { title, description, imageUrl, createdBy } = req.body;
    const { id } = req.params;

    let image = imageUrl;
    if (req.file && req.file.path) {
      image = req.file.path;
    }

    const board = await Board.findById(id);
    if (!board) return res.status(404).json({ error: 'Board not found' });

    if (board.createdBy !== createdBy) {
      return res.status(403).json({ error: 'Not authorized to update this board' });
    }

    board.title = title;
    board.description = description;
    board.image = image;
    await board.save();

    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteBoard = async (req, res) => {
  const { id } = req.params;
  try {
    const board = await Board.findById(id);
    if (!board) return res.status(404).json({ error: 'Board not found' });

    await Board.findByIdAndDelete(id);
    res.status(200).json({ message: 'Board deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
