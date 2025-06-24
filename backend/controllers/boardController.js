const Board = require('../models/Board');

// CREATE Board
// controllers/boardController.js
exports.createBoard = async (req, res) => {
  const { title, description, image, createdBy } = req.body;
  try {
    const board = await Board.create({ title, description, image, createdBy });
    res.status(201).json(board);
  } catch (err) {
    console.error("Error creating board:", err); // Add this
    res.status(500).json({ error: err.message });
  }
};

// READ All Boards (with optional search)
exports.getBoards = async (req, res) => {
  try {
    const { q } = req.query;

    let filter = {};
    if (q) {
      const regex = new RegExp(q, 'i'); // case-insensitive search
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

/// UPDATE
exports.updateBoard = async (req, res) => {
  const { id } = req.params;
  const { title, description, image, user } = req.body;

  try {
    const board = await Board.findById(id);
    if (!board) return res.status(404).json({ error: 'Board not found' });

    if (String(board.user) !== user) {
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

// DELETE BOARD
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
