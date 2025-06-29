// SchedulePicker.jsx
import React, { useState } from 'react';
import { DatePicker, TimePicker, Button, message } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // если нужна русская локализация
import './SchedulePicker.css';

function SchedulePicker({ onSubmit }) {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const handleSend = () => {
    if (!date || !time) {
      message.error('Выберите дату и время');
      return;
    }

    const combined = date.set('hour', time.hour()).set('minute', time.minute());
    const isoString = combined.toISOString();

    fetch('http://localhost:8000/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schedule_time: isoString }),
    })
      .then(res => res.json())
      .then(data => {
        message.success('Отложенный пост запланирован');
        if (onSubmit) onSubmit(data);
      })
      .catch(() => message.error('Ошибка при отправке'));
  };

  return (
    <div className="schedule-picker">
      <DatePicker
        className="custom-picker"
        onChange={(value) => setDate(value)}
        placeholder="Дата"
      />
      <TimePicker
        className="custom-picker"
        format="HH:mm"
        onChange={(value) => setTime(value)}
        placeholder="Время"
      />
      <Button type="primary" onClick={handleSend}>Заплан ировать</Button>
    </div>
  );
}

export default SchedulePicker;
