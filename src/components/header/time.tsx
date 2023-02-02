import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import useInterval from 'use-interval';

const Time: NextPage = () => {
  const [hour, setHour] = useState<number>(new Date().getHours());
  const [minute, setMinute] = useState<number>(new Date().getMinutes());
  const [date, setDate] = useState<string>('');
  const [isAM, setIsAM] = useState<boolean>(true);

  const getDate = () => {
    const date = new Date().toString().slice(0, 8).toUpperCase();
    const day = Number(new Date().toString().slice(8, 10));

    setDate(date + day);
  };

  useInterval(() => {
    const newDate = new Date();

    const minute = newDate.getMinutes();
    setMinute(minute);

    const hour = newDate.getHours();

    if (hour === 1) {
      getDate();
    }

    if (hour >= 12) {
      setIsAM(false);
    } else {
      setIsAM(true);
    }

    setHour(hour % 12 || 12);
  }, 1000);

  useEffect(() => {
    getDate();
  }, []);

  return (
    <TimeWrap>
      <DateText>{date}</DateText>
      <DateText>
        {hour}:{minute} {isAM ? 'AM' : 'PM'}
      </DateText>
    </TimeWrap>
  );
};

const DateText = styled.p`
  font-size: 20px;
  color: white;
`;

const TimeWrap = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export default Time;
