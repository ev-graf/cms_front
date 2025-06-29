// UploadToAlbums.jsx
import React, { useState } from 'react';
import './UploadToAlbums.css';

export default function UploadToAlbums() {
  // дата по умолчанию — вчерашний день
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  });

  const [items, setItems] = useState([]);

  const fetchImages = async () => {
    try {
      const formData = new FormData();
      formData.append('date', date);

      const res = await fetch('http://localhost:8000/api/v1/get-images-for-date', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();

      if (Array.isArray(data.images)) {
        const mapped = data.images.map(item => ({
          id: item.id,
          filename: item.filename,
          preview: item.preview_url,
          suggestedAlbum: item.suggested_album,
          availableAlbums: item.available_albums,
          selectedAlbum: item.suggested_album,
        }));
        setItems(mapped);
      }
    } catch (err) {
      console.error('Ошибка при получении изображений:', err);
    }
  };

  const handleAlbumChange = (id, newAlbum) => {
    setItems(prev => prev.map(item => (item.id === id ? { ...item, selectedAlbum: newAlbum } : item)));
  };

  const handleRemove = id => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpload = async () => {
    try {
      const payload = items.map(({ filename, selectedAlbum }) => ({
        filename,
        album: selectedAlbum,
        date,
      }));

      await fetch('http://localhost:8000/api/v1/upload-to-vk-albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      alert('Загрузка завершена.');
    } catch (err) {
      console.error('Ошибка при загрузке в альбомы:', err);
    }
  };

  return (
    <div className="upload-wrapper">
      <div className="top-bar">
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <button onClick={fetchImages}>Загрузить изображения</button>
      </div>

      <div className="image-list">
        {items.map(item => (
          <div key={item.id} className="image-item">
            <img src={item.preview} alt={item.filename} className="thumb" />
            <select value={item.selectedAlbum} onChange={e => handleAlbumChange(item.id, e.target.value)}>
              {item.availableAlbums.map(album => (
                <option key={album} value={album}>
                  {album}
                </option>
              ))}
            </select>
            <button className="remove" onClick={() => handleRemove(item.id)}>
              ✕
            </button>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <button className="upload-button" onClick={handleUpload}>
          Загрузить в альбомы
        </button>
      )}
    </div>
  );
}
