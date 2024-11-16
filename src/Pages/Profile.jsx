import React, { useEffect, useState } from 'react';
import { auth, getData } from '../Config/Firebase/Firebasemethode';

const Profile = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    if (auth.currentUser) {
      // Set user's display name if available, fallback to 'User'
      setUserName(auth.currentUser.displayName || "User");

      // Fetch user-specific blogs
      getData('blogs', auth.currentUser.uid)
        .then((res) => {
          setBlogs(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(true);
          setLoading(false);
        });
    } else {
      setError(true);
      setLoading(false);
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-10">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold">Welcome, {userName}!</h1>
          <p className="mt-2 text-lg">Explore and manage your blogs below.</p>
        </div>
      </div>

      {/* Blog Section */}
      <div className="container mx-auto px-6 py-10">
        {loading ? (
          <div className="flex justify-center items-center h-[40vh]">
            <span className="loading loading-spinner loading-lg text-blue-500"></span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>Your Blog page is empty please write a any Blog.</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">
            <p className="text-xl">You haven't published any blogs yet!</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Your Blogs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800">{blog.title}</h3>
                    <p className="text-gray-600 mt-2">{blog.description}</p>
                  </div>
                  <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Posted on: {new Date(blog.timeStamp.seconds * 1000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
