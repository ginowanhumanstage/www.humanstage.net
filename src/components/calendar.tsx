import React from 'react';
import styled from 'styled-components';
import {
  format,
  eachDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  subDays,
} from 'date-fns';

interface IProps {
  date: any;
}

export default class Calendar extends React.Component<IProps> {
  constructor(props) {
    super(props);

    this.days = this.days.bind(this);
  }

  days() {
    const days = [];
    const startDate = startOfMonth(this.props.date);
    const endDate = endOfMonth(this.props.date);
    const startDateOfWeek = startOfWeek(startDate);
    const endDateOfWeek = endOfWeek(endDate);
    const dayList = eachDay(startDate, endDate);

    const dayList2 = eachDay(startDateOfWeek, subDays(startDate, 1));
    const dayList3 = eachDay(endDate, endDateOfWeek);

    dayList2.forEach(day => {
      days.push(
        <DayHeader key={format(day, 'YYYYMMDD')}>{format(day, 'D')}</DayHeader>,
      );
    });

    dayList.forEach(day => {
      let belongsToAsideMonth = !isSameMonth(day, this.props.date);

      days.push(
        <li
          key={format(day, 'YYYYMMDD')}
          className={'day' + (belongsToAsideMonth ? ' pale' : '')}
        >
          {format(day, 'D')}
        </li>,
      );
    });

    dayList3.forEach(day => {
      days.push(<li key={format(day, 'YYYYMMDD')}>{format(day, 'D')}</li>);
    });

    return days;
  }

  dayHeaders() {
    const dayHeaders = [];

    const days = eachDay(
      startOfWeek(this.props.date),
      endOfWeek(this.props.date),
    );

    days.forEach(day => {
      dayHeaders.push(
        <DayHeader key={format(day, 'YYYYMMDD')}>
          {format(day, 'dd')}
        </DayHeader>,
      );
    });

    return dayHeaders;
  }

  render() {
    return (
      <CalendarWrapper>
        <p className="monthHeader">
          <input value={this.props.date} /> —{' '}
          {format(this.props.date, 'MMMM YYYY')}
        </p>
        <DayList>
          {this.dayHeaders()}
          {this.days()}
        </DayList>
      </CalendarWrapper>
    );
  }
}

const CalendarWrapper = styled.div`
  text-align: center;
`;

const DayList = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  list-style: none;
  padding: 0;
`;

const DayHeader = styled.li``;
