import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, getData } from '../Config/Firebase/Firebasemethode';
import { collection, getDocs, query, where } from 'firebase/firestore';

const User = () => {
  const { id } = useParams();

  const [username, setUsername] = useState('');
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getDataFromFirestore();
  }, []);

  async function getDataFromFirestore() {
    const dataArr = [];
    try {
      const q = query(
        collection(db, 'users'),
        where('id', '==', id)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        dataArr.push({ ...doc.data(), docid: doc.id });
      });
      setUsername(dataArr[0]?.fullname || 'User');
      
      const userBlogs = await getData('blogs', id);
      setBlogs(userBlogs);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-12 text-center text-white">
        <h1 className="text-4xl font-semibold">Welcome To My profile,  its me {username}</h1>
        <p className="mt-4 text-lg">Explore  the  blogs shared by me!</p>
      </div>

      {/* User Blogs Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-8">
          {blogs.length > 0 ? (
            blogs.map((item) => (
              <div key={item.docid} className="w-full sm:w-80 md:w-96 lg:w-1/3 xl:w-1/4 p-4">
                <div className="card bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden">
                  <div className="card-body p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{item.title}</h2>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <a
                      href={`/blog/${item.docid}`}
                      className="text-blue-600 hover:underline mt-4 inline-block"
                    >
                      Read More &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No blogs available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default User;
