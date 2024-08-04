import moment from 'moment';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  // Sets the default current week
  const [currentWeek, setCurrentWeek] = useState(moment());
  const [currentDay, setCurrentDay] = useState(moment());
  const [selectedDay, setSelectedDay] = useState(moment());
  const [customDate, setCustomDate] = useState(moment());

  const startOfWeek = currentWeek.clone().startOf('isoWeek');
  const endOfWeek = currentWeek.clone().endOf('isoWeek');
  const currentMonth = currentWeek.clone().format('MMMM');

  const days = [];
  let day = startOfWeek;

  const prevWeekDay = startOfWeek.clone().subtract(1,'days');
  const nextWeekDay = endOfWeek.clone().add(1,'days');

  while (day <= endOfWeek) {
    days.push(day.clone());
    day = day.clone().add(1, 'd');
  }

  const handlePreviousWeek = () => {
    setCurrentWeek(currentWeek.clone().subtract(1, 'weeks'));
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek.clone().add(1, 'weeks'));
  };

  const selectCustomDay = (day) => {
    setSelectedDay(day)
    let dayElement = document?.getElementById(day.format('YYYY-MM-DD'));
    if (dayElement) {
      if (dayElement.classList.contains('selected')) {
        dayElement.classList.remove('selected')
      } else {
        dayElement.classList.add('selected')
      }
    }
  }

  const selectCustomDate = (newValue) => {
    const selectedDate = moment(newValue);
    setCustomDate(selectedDate);
    setCurrentWeek(selectedDate.clone().startOf('isoWeek'));
    selectCustomDay(selectedDate);  
  }


  return (
    <div className="App">
      <div className='container'>
        <div className='month'>
            <h1>{currentMonth}</h1>
        </div>
        <div className='navigation-buttons'>
          <button className='btn btn-calendar' onClick={handlePreviousWeek}><h1>&lt;</h1></button>
          <input className='custom-date' type='date' value={customDate.format('YYYY-MM-DD')} onChange={(e) => selectCustomDate(e.target.value)}></input>
          <button className='btn btn-calendar' onClick={handleNextWeek}><h1>&gt;</h1></button>
        </div>
        <div className='calendar'>
          <div className='previous-week'>
            <div className='day-content'>
              <h3>{prevWeekDay.format('dddd')}</h3>
              <p>{prevWeekDay.format('Do')}</p>
            </div>
          </div>
          <div className='day'>
          {days.map(day => (
            <div id={day.format('YYYY-MM-DD')} key={day.format('YYYY-MM-DD')} className={`day-content ${selectedDay && selectedDay.isSame(day, 'day') ? 'selected' : ''}
            ${currentDay.isSame(day, 'day') ? 'today' : ''} `} onClick={() => selectCustomDay(day)}>
              <h3>{day.format('dddd')}</h3>
              <p>{day.format('Do')}</p>            
            </div>
          ))}
          </div>
          <div className='next-week'>
            <div className='day-content'>
              <h3>{nextWeekDay.format('dddd')}</h3>
              <p>{nextWeekDay.format('Do')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
