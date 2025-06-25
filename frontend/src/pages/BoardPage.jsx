import { useEffect, useState } from 'react';
import axios from 'axios';

const BoardPage = () => {
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null);

  const API_URL = 'https://moodboard-macker-1.onrender.com/api/boards';

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchBoards = async () => {
    try {
      const res = await axios.get(API_URL);
      setBoards(res.data);
    } catch (err) {
      alert('Error fetching boards');
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('createdBy', user?.email);

    if (imageFile) {
      formData.append('imageFile', imageFile); // Match multer field name
    } else if (imageUrl) {
      formData.append('imageUrl', imageUrl); // Cloudinary fallback
    }

    if (editId) {
      await axios.put(`${API_URL}/${editId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setEditId(null);
    } else {
      await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    setTitle('');
    setDescription('');
    setImageUrl('');
    setImageFile(null);
    fetchBoards();
  } catch (err) {
    alert('Error saving board');
    console.error(err);
  }
};


  const handleEdit = (board) => {
    setTitle(board.title);
    setDescription(board.description);
    setImageUrl(board.image || '');
    setImageFile(null);
    setEditId(board._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this board?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchBoards();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-gray-800 rounded-xl p-8 mb-10 border border-gray-700">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {editId ? 'Edit Board' : 'Create New Board'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Enter board title..."
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg"
            />
            <textarea
              placeholder="Describe your board..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Upload Image File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full bg-gray-700 border border-gray-600 p-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Or Enter Image URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 p-2 rounded-lg"
                />
              </div>
            </div>

            {(imageFile || imageUrl) && (
              <div className="flex justify-center">
                <img
                  src={imageFile ? URL.createObjectURL(imageFile) : imageUrl}
                  alt="Preview"
                  className="h-48 object-cover rounded"
                />
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button type="submit" className="bg-blue-600 px-6 py-3 rounded-lg">
                {editId ? 'Update Board' : 'Create Board'}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setTitle('');
                    setDescription('');
                    setImageUrl('');
                    setImageFile(null);
                  }}
                  className="bg-gray-600 px-6 py-3 rounded-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <h3 className="text-2xl font-bold mb-6">All Boards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => {
            const isOwner = user?.email === board.createdBy;
            return (
              <div key={board._id} className="bg-gray-800 rounded-xl p-6 shadow-lg">
                {board.image && (
                  <img src={board.image} alt="Board" className="h-48 w-full object-cover rounded" />
                )}
                <h4 className="font-bold text-xl mt-4">{board.title}</h4>
                <p className="text-gray-400 mb-4">{board.description}</p>
                {isOwner && (
                  <div className="flex gap-3">
                    <button onClick={() => handleEdit(board)} className="bg-yellow-500 px-4 py-2 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(board._id)} className="bg-red-600 px-4 py-2 rounded">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
