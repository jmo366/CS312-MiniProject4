import React, { useState } from 'react';
import axios from 'axios';

const BlogPostForm = () => {
  const [title, newTitle] = useState('');
  const [body, newBody] = useState('');
  const [author, newAuthor] = useState('');

  const handleUpdate = (event) => {
    const { name, value } = event.target;
    if (name === 'title') newTitle(value);
    if (name === 'body') newBody(value);
    if (name === 'author') newAuthor(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newPost = { title, body, author };
      const response = await axios.post('http://localhost:5000/', newPost);
      console.log('Blog post created:', response.data);
      newTitle('');
      newBody('');
      newAuthor('');
    } catch (error) {
      return 1;
    }
  };

  return (
    <div className="jumbotron" style={{ backgroundColor: "#ffe6f0", color: "#ff66b2" }}>
      <h2 className="display-6">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={title}
            onChange={handleUpdate}
            required
          />
        </div>

        <div className="form-group">
          <label>Body:</label>
          <textarea
            className="form-control"
            name="body"
            value={body}
            onChange={handleUpdate}
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={author}
            onChange={handleUpdate}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BlogPostForm;

