import { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Layout from './components/Layout/Layout';
import { defaultSchedules, DaySchedules } from './data/schedules';  // 기존 schedules를 defaultSchedules로 이름 변경
import { Schedule } from './components/DayCell/types';  // Schedule 타입 import 추가

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  // 영문에만 Chonburi 폰트 적용
  h1, h2, h3, h4, h5, h6,
  .english {
    font-family: 'Chonburi', cursive;
  }
`;

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

function App() {
  const [currentDate, setCurrentDate] = useState(() => {
    const saved = localStorage.getItem('currentDate');
    return saved ? new Date(saved) : new Date(2025, 1);
  });

  const [schedules, setSchedules] = useState(() => {
    const saved = localStorage.getItem('schedules');
    return saved ? JSON.parse(saved) : defaultSchedules;
  });

  useEffect(() => {
    localStorage.setItem('currentDate', currentDate.toISOString());
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }, [currentDate, schedules]);

  const handleAddSchedule = (date: string, schedule: Schedule) => {
    setSchedules((prev: DaySchedules) => ({
      ...prev,
      [date]: [...(prev[date] || []), schedule]
    }));
  };

  const handleUpdateSchedule = (date: string, index: number, schedule: Schedule) => {
    setSchedules((prev: DaySchedules) => ({
      ...prev,
      [date]: prev[date].map((item, i) => i === index ? schedule : item)
    }));
  };

  const handleDeleteSchedule = (date: string, index: number) => {
    setSchedules((prev: DaySchedules) => ({
      ...prev,
      [date]: prev[date].filter((_, i) => i !== index)
    }));
  };

  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Layout 
          currentDate={currentDate} 
          setCurrentDate={setCurrentDate}
          schedules={schedules}
          onAddSchedule={handleAddSchedule}
          onUpdateSchedule={handleUpdateSchedule}
          onDeleteSchedule={handleDeleteSchedule}
        />
      </AppWrapper>
    </>
  );
}

export default App;