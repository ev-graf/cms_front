// SendPost.jsx
import React, { useRef, useState, useEffect } from 'react';
import './SendPost.css';

function SendPost() {
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');
  const [viewerIndex, setViewerIndex] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(null);
  const [scheduleTime, setScheduleTime] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(12, 0, 0, 0);
    setScheduleDate(tomorrow.toISOString().split('T')[0]);
    setScheduleTime(tomorrow.toTimeString().slice(0, 5));
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).slice(0, 10 - images.length);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      link: ''
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 10 - images.length);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      link: ''
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const handleDelete = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleLinkChange = (index, value) => {
    const updated = [...images];
    updated[index].link = value;
    setImages(updated);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('schedule_date', scheduleDate);
    formData.append('schedule_time', scheduleTime);
    images.forEach((img) => {
      formData.append('images', img.file);
      formData.append('links', img.link);
    });
    try {
      const res = await fetch('http://localhost:8000/api/v1/upload', {
        method: 'POST',
        body: formData
      });
      console.log('Upload ', formData);
      const data = await res.json();
      console.log('Upload success', data);
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  const handleZoneClick = (e) => {
    if (!e.target.closest('.thumb')) {
      inputRef.current.click();
    }
  };

  const handleImageClick = (index) => {
    setViewerIndex(index);
  };

  const closeViewer = () => {
    setViewerIndex(null);
  };

  const showPrev = () => {
    setViewerIndex((viewerIndex + images.length - 1) % images.length);
  };

  const showNext = () => {
    setViewerIndex((viewerIndex + 1) % images.length);
  };

  const handleDragStart = (dragIndex) => (e) => {
    e.dataTransfer.setData('dragIndex', dragIndex);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropSwap = (dropIndex) => (e) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('dragIndex'), 10);
    if (dragIndex === dropIndex) return;
    const reordered = [...images];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, moved);
    setImages(reordered);
  };

  return (
    <div className="send-post">
      <div className="top-bar">
        <textarea
          placeholder="Текст поста (необязательно)"
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <div className="date-time-button">
          <input
            type="date"
            value={scheduleDate || ''}
            onChange={(e) => setScheduleDate(e.target.value)}
          />
          <input
            type="time"
            value={scheduleTime || ''}
            onChange={(e) => setScheduleTime(e.target.value)}
          />
          <button onClick={handleSubmit}>Отправить</button>
        </div>
      </div>

      <div
        className="upload-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleZoneClick}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <p>Перетащите до 10 изображений сюда</p>
        <div className="thumbnails-grid">
          {images.map((img, index) => (
            <div
              key={index}
              className="thumb"
              draggable
              onDragStart={handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={handleDropSwap(index)}
              onClick={() => handleImageClick(index)}
            >
              <img src={img.preview} alt="preview" />
              <button
                className="remove"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index);
                }}
              >✖</button>
            </div>
          ))}
        </div>
      </div>

      <div className="link-fields">
        {images.map((img, index) => (
          <input
            key={`link-${index}`}
            type="text"
            placeholder="Ссылка на источник (необязательно)"
            value={img.link}
            onChange={e => handleLinkChange(index, e.target.value)}
          />
        ))}
      </div>

      {viewerIndex !== null && (
        <div className="image-viewer" onClick={closeViewer}>
          <div className="viewer-content" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={closeViewer}>✖</button>
            <button className="prev" onClick={showPrev}>◀</button>
            <img src={images[viewerIndex].preview} alt="view" />
            <button className="next" onClick={showNext}>▶</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SendPost;
