import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Search.css';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('q') || '');
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Пример постов (в будущем можно заменить на fetch)
  const posts = [
    { id: 1, text: "React introduction" },
    { id: 2, text: "Using Tailwind with Vite" },
    { id: 3, text: "Dark mode toggle guide" },
    { id: 4, text: "Ant Design switch example" },
  ];

  useEffect(() => {
    const query = searchParams.get('q') || '';
    const results = posts.filter(post =>
      post.text.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: inputValue });
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Search posts..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="search-results">
        {filteredPosts.map(post => (
          <div key={post.id} className="search-post">
            {post.text}
          </div>
        ))}
        {filteredPosts.length === 0 && (
          <p className="no-results">Ничего не найдено</p>
        )}
      </div>
    </div>
  );
}