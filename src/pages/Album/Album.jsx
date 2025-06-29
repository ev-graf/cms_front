import React from 'react';
import { useParams } from 'react-router-dom';
import './Album.css';

export default function Album() {
  const { albumId } = useParams();

  // Временные данные по альбомам и постам
  const albums = {
    nature: {
      name: 'Природа',
      posts: [
        { id: 1, text: 'Лес на закате', image: 'https://placehold.co/600x400?text=Forest' },
        { id: 2, text: 'Горы утром', image: 'https://placehold.co/600x400?text=Mountains' },
      ],
    },
    cities: {
      name: 'Города',
      posts: [
        { id: 1, text: 'Ночной город', image: 'https://placehold.co/600x400?text=Night+City' },
        { id: 2, text: 'Старый район', image: 'https://placehold.co/600x400?text=Old+Town' },
      ],
    },
    space: {
      name: 'Космос',
      posts: [
        { id: 1, text: 'Галактика', image: 'https://placehold.co/600x400?text=Galaxy' },
        { id: 2, text: 'Марс', image: 'https://placehold.co/600x400?text=Mars' },
      ],
    },
    animals: {
      name: 'Животные',
      posts: [
        { id: 1, text: 'Лиса', image: 'https://placehold.co/600x400?text=Fox' },
        { id: 2, text: 'Сова', image: 'https://placehold.co/600x400?text=Owl' },
      ],
    },
  };

  const album = albums[albumId];

  if (!album) {
    return <div className="album-container">Альбом не найден</div>;
  }

  return (
    <div className="album-container">
      <h2 className="album-title">{album.name}</h2>
      <div className="album-posts">
        {album.posts.map(post => (
          <div key={post.id} className="album-post">
            <img src={post.image} alt={post.text} className="album-post-image" />
            <p className="album-post-text">{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
