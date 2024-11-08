import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/${id}`);
      setPosts(posts.filter(post => post.blog_id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

const handleEdit = async (id, updatedData) => {
  try {
    await axios.put(`http://localhost:5000/${id}`, updatedData); 
    setPosts(posts.map(post => (post.blog_id === id ? { ...post, ...updatedData } : post))); 
  } catch (error) {
    console.error('Error editing post:', error);
  }
};

  return (
    <div className="jumbotron" style={{ backgroundColor: "#ffe6f0", color: "#ff66b2" }}>
      <h2 className="display-6">All Blog Posts</h2>
      <ul>
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map(post => (
            <li key={post.blog_id} style={{ marginBottom: '1.5rem' }}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <p>
                By {post.creator_name} on {new Date(post.date_created).toLocaleString()}
              </p>
              <button
                className="btn btn-secondary"
                onClick={() => handleEdit(post.blog_id, { title: "New Title", body: "Updated content" })}
              >
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(post.blog_id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PostList;
