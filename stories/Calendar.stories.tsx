import React from 'react';
import Calendar from '../src/components/calendar';

export default {
  title: 'Calendar',
};

export const calendar01 = () => <Calendar date="2020-01-01" slugs={[]} />;

export const calendar02 = () => (
  <Calendar date="2020-01-01" slugs={['20200101']} />
);
