import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './Gallery.css';

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState(searchParams.get('q') || '');
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  const albums = [
    { id: 'nature', name: 'Природа', preview: 'https://placehold.co/300x200?text=Nature' },
    { id: 'cities', name: 'Города', preview: 'https://placehold.co/300x200?text=Cities' },
    { id: 'space', name: 'Космос', preview: 'https://placehold.co/300x200?text=Space' },
    { id: 'animals', name: 'Животные', preview: 'https://placehold.co/300x200?text=Animals' },
  ];

  useEffect(() => {
    const query = searchParams.get('q') || '';
    const results = albums.filter(album =>
      album.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAlbums(results);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: inputValue });
  };

  const openAlbum = (id) => {
    navigate(`/gallery/${id}`);
  };

  return (
    <div className="gallery-container">
      <form onSubmit={handleSearch} className="gallery-form">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Поиск альбомов..."
          className="gallery-input"
        />
        <button type="submit" className="gallery-button">Search</button>
      </form>

      <div className="albums-grid">
        {filteredAlbums.map(album => (
          <div key={album.id} className="album-card" onClick={() => openAlbum(album.id)}>
            <img src={album.preview} alt={album.name} className="album-image" />
            <div className="album-name">{album.name}</div>
          </div>
        ))}
        {filteredAlbums.length === 0 && (
          <p className="no-results">Альбомы не найдены</p>
        )}
      </div>
    </div>
  );
}