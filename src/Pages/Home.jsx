import React, { useEffect, useState } from 'react';
import { auth, getAllData } from '../Config/Firebase/Firebasemethode';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllData('blogs')
      .then((res) => {
        setBlogs(res);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const navigate = useNavigate();

  const singleUserBlog = (item) => {
    if (!auth.currentUser) {
      alert('Please log in to view user blogs.');
      return;
    }
    navigate(`/user/${item.uid}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-5">
      <h1 className="text-center text-4xl font-bold mb-10 text-blue-600">All Blogs</h1>

      {loading && (
        <div className="h-[80vh] flex justify-center items-center">
          <span className="loading loading-spinner text-blue-600"></span>
        </div>
      )}

      {error && (
        <div className="h-[80vh] flex justify-center items-center">
          <h1 className="text-2xl font-semibold text-red-500">Internal Server Error!</h1>
        </div>
      )}

      {!loading && !error && blogs && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((item) => (
            <div
              key={item.documentId}
              className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-blue-700 mb-3">{item.title}</h2>
                <p className="text-gray-700 mb-5">{item.description}</p>
                <div className="flex justify-start">
                  <button
                    className="text-blue-600 font-semibold hover:underline"
                    onClick={() => singleUserBlog(item)}
                  >
                    See all from this user
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && blogs?.length === 0 && (
        <div className="h-[80vh] flex justify-center items-center">
          <h1 className="text-2xl font-semibold text-gray-500">No Blogs Found!</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
