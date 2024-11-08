import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import BlogPostForm from './BlogPostForm';
import PostList from './PostList';
import SignIn from './signIn';
import SignUp from './signUp';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        <div className="jumbotron text-center" style={{ backgroundColor: "#ffe6f0", color: "#ff66b2" }}>
          <h1 className="display-4">Jessica's Blog</h1>
          <hr className="my-4" />
        </div>

        <div className="container">
          <Routes>
            <Route path="/signup" element={<Navigate to="/signup" />} />
            <Route
              path="/signup"
              element={
                <div>
                  <SignUp />
                  <p>
                   <Link to="/signin">Sign In</Link>
                  </p>
                </div>
              }
            />

            <Route
              path="/signin"
              element={
                <div>
                  <SignIn />
                  <p>
                    <Link to="/signup">Sign Up</Link>
                  </p>
                </div>
              }
            />
            <Route
              path="/"
              element={
                <div>
                  <BlogPostForm />
                  <PostList />
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
