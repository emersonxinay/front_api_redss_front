import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/posts')
      .then(response => {
        const extractedPosts = response.data.posts.map(post => ({
          content: post.content,
          user_id: post.user_id
        }));

        setPosts(extractedPosts);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const filteredPosts = posts.filter(post => {
    const lowercaseContent = post.content.toLowerCase();
    const lowercaseFilter = filter.toLowerCase();

    return lowercaseContent.includes(lowercaseFilter);
  });

  return (
    <div>
      <h1>Bienvenido a los Posts de mi API</h1>
      <input type="text" value={filter} onChange={handleFilterChange} placeholder="Filtrar por cualquier texto" />
      <ul className="post-list">
        {filteredPosts.map((post, index) => (
          <li className="post" key={index}>
            <p className="post-content">Content: {post.content}</p>
            <p className="user-id">User ID: {post.user_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
