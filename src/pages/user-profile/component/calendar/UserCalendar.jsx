import React from 'react';
import './UserCalendar.scss';
import plusIcon from '../../../../assets/images/plus-icon.svg';
import progressImage from '../../../../assets/images/progress-image.svg';
import moment from 'moment';

const UserCalendar = () => {
  const weekDay = [
    {
      pre: 'Sun',
      name: 'Sunday',
    },
    {
      pre: 'Mon',
      name: 'Monday',
    },
    {
      pre: 'Tue',
      name: 'Tuesday',
    },
    {
      pre: 'Wed',
      name: 'Wednesday',
    },
    {
      pre: 'Thu',
      name: 'Thusday',
    },
    {
      pre: 'Fri',
      name: 'Friday',
    },
    {
      pre: 'Sat',
      name: 'Saturday',
    },
  ];

  const generateDaysOfTwoWeeks = () => {
    let result = [];
    const startOfPreviousWeek = moment(moment().startOf('week')).add(
      -1,
      'week'
    );
    // const endOfCurrentWeek = moment().endOf('week');

    for (let i = 0; i < 14; i++) {
      result.push(moment(startOfPreviousWeek).add(i, 'days'));
    }

    return result;
  };

  return (
    <div className="user-calendar">
      <div className="calendar-header">
        <div>
          <p className="date-time-now">April 10, 2021</p>
          <h4 className="date">Today</h4>
        </div>
        <button>
          <img src={plusIcon} alt="plus" />
          <p>Tạo</p>
        </button>
      </div>
      <div className="calendar-content">
        {weekDay.map((item, index) => (
          <p
            key={index}
            className={item.name === moment().format('dddd') ? 'selected' : ''}
          >
            {item.pre}
          </p>
        ))}
        {generateDaysOfTwoWeeks().map((item, index) => (
          <p
            key={index}
            className={`${
              item.format('MM') !== moment().format('MM') ? 'disable' : ''
            } ${
              item.format('YYYY/MM/DD') === moment().format('YYYY/MM/DD')
                ? 'selected'
                : ''
            }`}
          >
            {item.format('DD')}
          </p>
        ))}
      </div>
      <div className="calendar-footer">
        <img src={progressImage} alt="progress" />
        <div>
          <div className="notification notification-active">
            <div className="content">
              <h5>Họp toàn thể</h5>
              <p>Họp thường niên</p>
            </div>
            <p className="time">9:00 AM</p>
          </div>
          <div className="notification">
            <div className="content">
              <h5>Họp toàn thể</h5>
              <p>Họp thường niên</p>
            </div>
            <p className="time">9:00 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCalendar;
