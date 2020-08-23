import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import {
  format,
  eachDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subDays,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isFirstDayOfMonth,
  parseISO,
} from 'date-fns';
import jaLocale from 'date-fns/locale/ja';
import slugToPath from '../lib/slugToPath';

interface IProps {
  date: string; // 'yyyy-MM-dd'
  slugs: string[];
}

export default class Calendar extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.days = this.days.bind(this);
  }

  days() {
    const days = [];
    const startDate = startOfMonth(parseISO(this.props.date));
    const endDate = endOfMonth(parseISO(this.props.date));
    const startDateOfWeek = startOfWeek(startDate);
    const dayList = eachDay(startDate, endDate);

    // カレンダー内の前月の穴埋め
    // startDateOfWeek が1日月であれば処理を行わず
    const lastMonthDates = isFirstDayOfMonth(startDateOfWeek)
      ? null
      : eachDay(startDateOfWeek, subDays(startDate, 1));
    if (lastMonthDates) {
      lastMonthDates.forEach(day => {
        days.push(
          <DayItem key={format(day, 'yyyyMMdd')} lastMonth>
            {format(day, 'D')}
          </DayItem>,
        );
      });
    }

    // カレンダーの日付の生成
    dayList.forEach(day => {
      let hasEvent = false;
      let isHoliday = false;
      let isTavern = false;
      let path = null;
      const fullDate = format(day, 'yyyyMMdd');

      if (
        this.props.slugs &&
        this.props.slugs.find(slug => slug === fullDate)
      ) {
        const slug = this.props.slugs.find(slug => slug === fullDate);
        const eventPath = slugToPath(slug);
        path = `/schedule/${eventPath}`;
        hasEvent = true;
      } else if (isMonday(day)) {
        isHoliday = true;
      } else if (
        isTuesday(day) ||
        isWednesday(day) ||
        isThursday(day) ||
        isFriday(day)
      ) {
        isTavern = true;
      }

      days.push(
        <DayItem
          key={fullDate}
          hasEvent={hasEvent}
          isHoliday={isHoliday}
          isTavern={isTavern}
        >
          {hasEvent && path ? (
            <Link to={path}>{format(day, 'D')}</Link>
          ) : (
              <span>{format(day, 'D')}</span>
            )}
        </DayItem>,
      );
    });

    return days;
  }

  dayHeaders() {
    const dayHeaders = [];

    const days = eachDay(
      startOfWeek(parseISO(this.props.date)),
      endOfWeek(parseISO(this.props.date)),
    );

    days.forEach(day => {
      dayHeaders.push(
        <DayHeader key={format(day, 'yyyyMMdd')}>
          {format(day, 'dd', { locale: jaLocale })}
        </DayHeader>,
      );
    });

    return dayHeaders;
  }

  render() {
    return (
      <CalendarWrapper>
        <DayList>
          {this.dayHeaders()}
          {this.days()}
        </DayList>
        <Marks>
          <span>
            <MarkOfEvent />
            イベント日
          </span>
          <span>
            <MarkOfTavern />
            BAR営業日
          </span>
        </Marks>
      </CalendarWrapper>
    );
  }
}

const CalendarWrapper = styled.div`
  font-size: 0.85rem;
  text-align: center;
  width: calc(100% - 2rem);
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 100%;
  }
`;

const DayList = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DayHeader = styled.li`
  padding: 0.5rem 0;
`;

const EVENT_DAY_COLOR = '#96d7ff';
const TAVERN_DAY_COLOR = '#ffd5a6';

const eventDayStyles = `
  > a,
  > span {
    background-color: ${EVENT_DAY_COLOR};
  }
`;

const holidayStyles = `
  color: #ccc;
`;

const tavernDayStyles = `
  > a,
  > span {
    background-color: ${TAVERN_DAY_COLOR};
  }
`;

const DayItem = styled.li`
  padding: .5rem 0;
  visibility: ${props => (props.lastMonth ? 'hidden' : 'visible')};

  > span {
    cursor: default;
  }

  > a {
    text-decoration: none;
  }

  > a,
  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    border-radius: 30px;
    width: 1.75rem;
    height: 1.75rem;
  }

  ${props =>
    props.hasEvent
      ? css`
          ${eventDayStyles}
        `
      : ''}

  ${props =>
    props.isHoliday
      ? css`
          ${holidayStyles}
        `
      : ''}

  ${props =>
    props.isTavern
      ? css`
          ${tavernDayStyles}
        `
      : ''}
`;

const Marks = styled.p`
  text-align: right;
`;

const MarkOfEvent = styled.i`
  display: inline-block;
  background-color: ${EVENT_DAY_COLOR};
  width: 1rem;
  height: 1rem;
  vertical-align: bottom;
  margin-right: 0.25rem;
  border-radius: 50%;
`;

const MarkOfTavern = styled.i`
  display: inline-block;
  background-color: ${TAVERN_DAY_COLOR};
  width: 1rem;
  height: 1rem;
  vertical-align: bottom;
  margin-left: 0.5rem;
  margin-right: 0.25rem;
  border-radius: 50%;
`;
