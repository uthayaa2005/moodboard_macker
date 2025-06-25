import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const fetchBoards = async () => {
    try {
      const res = await axios.get('https://moodboard-macker-1.onrender.com/api/boards', {
        params: { q: query }
      });
      setBoards(res.data);
    } catch (err) {
      console.error('Error fetching boards:', err);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search.trim());
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-3 tracking-tight">Your Moodboards</h2>
          <p className="text-lg text-gray-400 font-medium">
            Discover and organize your creative inspiration
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex justify-center mb-12">
          <div className="flex items-center gap-3 w-full max-w-2xl">
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by title or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 pl-12 pr-4 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-base"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-200 font-semibold shadow-md"
            >
              Search
            </button>
          </div>
        </form>

        {boards.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-800/50 rounded-3xl p-12 max-w-md mx-auto border border-gray-700/50">
              <svg className="w-16 h-16 mx-auto mb-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-2xl font-bold mb-3">No boards found</h3>
              <p className="text-gray-400">
                Create your first moodboard to get started on your creative journey!
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold">
                {boards.length} Board{boards.length !== 1 ? 's' : ''}
              </h3>
              {query && (
                <div className="text-sm text-gray-400">
                  Results for <span className="font-semibold text-white">"{query}"</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-10">
  {boards.map((board) => (
    <div key={board._id} className="group w-full">
      <div className="bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden border border-gray-700/50 hover:border-gray-600/50 relative">
        {board.image ? (
          <img
            src={board.image}
            alt="Board Cover"
            className="w-full h-72 object-cover group-hover:opacity-40 transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-72 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-gray-400">
            <svg className="w-14 h-14 opacity-60" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2 text-sm font-medium">No Image</span>
          </div>
        )}

        <div className="p-8 z-10 relative">
          <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-200">
            {board.title}
          </h3>
        </div>

        <div className="absolute inset-0 p-6 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center">
          <p className="text-base text-gray-200 leading-relaxed">
            {board.description || 'No description provided'}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
