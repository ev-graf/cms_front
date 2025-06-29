import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Switch } from 'antd';
import 'antd/dist/reset.css'; // Импорт сброса стилей Ant Design
import './Header.css';

function Header() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav-link">Главная</Link>
        <Link to="/search" className="nav-link">Поиск</Link>
        <Link to="/gallery" className="nav-link">Галерея</Link>
        <Link to="/settings" className="nav-link">Настройки</Link>

        <div className="theme-switcher">
          <Switch
            checked={!darkMode}
            onChange={checked => setDarkMode(!checked)}
            checkedChildren="☀️"
            unCheckedChildren="🌙"
          />
        </div>
      </nav>
    </header>
  );
}

export default Header;