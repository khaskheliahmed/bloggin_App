import React, { useEffect, useRef, useState } from 'react';
import { auth, deleteDocument, getData, sendData, updateDocument } from '../Config/Firebase/Firebasemethode';
import { Timestamp } from 'firebase/firestore';

const Disborad = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dbDocId, setDbDocId] = useState(null);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editDocId, setEditDocId] = useState(null);

  useEffect(() => {
    getData('blogs', auth.currentUser.uid)
      .then((res) => {
        setData(res);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  const title = useRef();
  const description = useRef();

  const postBlog = (event) => {
    event.preventDefault();
    setLoading(true);

    const blogData = {
      title: title.current.value,
      description: description.current.value,
      uid: auth.currentUser.uid,
      timeStamp: Timestamp.fromDate(new Date()),
    };

    if (isEditing) {
      updateDocument(editDocId, blogData, 'blogs')
        .then(() => {
          const updatedData = data.map((item) =>
            item.docid === editDocId ? { ...item, ...blogData } : item
          );
          setData(updatedData);
          setIsEditing(false);
          setEditDocId(null);
          title.current.value = '';
          description.current.value = '';
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      sendData(blogData, 'blogs')
        .then((res) => {
          setData([...data, { ...blogData, docid: res }]);
          title.current.value = '';
          description.current.value = '';
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  const deleteBlog = (docId) => {
    deleteDocument(docId.docid, 'blogs')
      .then(() => {
        const updatedData = data.filter((_, idx) => idx !== dbDocId.index);
        setData(updatedData);

        // Close the modal after successful deletion
        document.getElementById('delete-modal').close();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditDocId(item.docid);
    title.current.value = item.title;
    description.current.value = item.description;
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-5">
      <h1 className="text-center text-4xl font-bold mb-10 text-blue-600">Dashboard</h1>

      <form className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">{isEditing ? 'Edit Blog' : 'Create Blog'}</h2>
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full mb-4 p-3"
          ref={title}
        />
        <textarea
          className="textarea textarea-bordered w-full mb-4 p-3"
          placeholder="What's on your mind?"
          ref={description}
        ></textarea>
        <button
          type="submit"
          className={`btn w-full ${isEditing ? 'btn-info' : 'btn-primary'} text-white font-bold`}
          onClick={postBlog}
        >
          {loading ? <span className="loading loading-spinner loading-sm"></span> : isEditing ? 'Update Blog' : 'Publish Blog'}
        </button>
      </form>

      {error && <p className="text-center text-red-500 mt-4">No blogs found!</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className="card bg-white rounded-lg shadow-lg border border-gray-200 p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="card-title text-2xl font-semibold text-blue-700 mb-3">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => {
                    setDbDocId({
                      docid: item.docid,
                      index,
                    });
                    document.getElementById('delete-modal').showModal();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      <dialog id="delete-modal" className="modal">
        <div className="modal-box bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-bold text-red-600">Confirm Deletion</h3>
          <p className="text-gray-700 mt-2">Are you sure you want to delete this blog?</p>
          <div className="modal-action mt-5">
            <button
              className="btn btn-sm btn-error"
              onClick={() => deleteBlog(dbDocId)}
            >
              Yes
            </button>
            <button className="btn btn-sm btn-gray" onClick={() => document.getElementById('delete-modal').close()}>
              No
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Disborad;
