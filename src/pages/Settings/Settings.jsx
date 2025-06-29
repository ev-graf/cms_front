import React, { useState } from 'react';
import './Settings.css';
import SendPost from "/src/components/SendPost/SendPost.jsx"
import UploadToAlbums from "/src/components/UploadToAlbums/UploadToAlbums.jsx"

export default function Settings() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userData = {
    username: 'example_user',
    email: 'user@example.com',
    theme: 'Светлая',
  };

  const handleLogin = () => {
    if (email && password) {
      setIsAuthenticated(true);
      setShowLoginModal(false);
    }
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Настройки</h2>

      {!isAuthenticated ? (
        <>
          <button
            onClick={() => setShowLoginModal(true)}
            className="login-button"
          >
            Авторизоваться
          </button>

          {showLoginModal && (
            <div className="modal-overlay">
              <div className="modal">
                <h3 className="modal-title">Вход в аккаунт</h3>
                <input
                  type="email"
                  placeholder="Email"
                  className="modal-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Пароль"
                  className="modal-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="modal-actions">
                  <button onClick={handleLogin} className="modal-submit">Войти</button>
                  <button onClick={() => setShowLoginModal(false)} className="modal-cancel">Отмена</button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="user-settings">
          <p><strong>Логин:</strong> {userData.username}</p>
          <p><strong>Почта:</strong> {userData.email}</p>
          <p><strong>Тема сайта:</strong> {userData.theme}</p>
          <SendPost />
          <UploadToAlbums />
        </div>
      )}
    </div>
  );
}
