import { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Layout from './components/Layout/Layout';

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

  useEffect(() => {
    localStorage.setItem('currentDate', currentDate.toISOString());
  }, [currentDate]);

  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Layout currentDate={currentDate} setCurrentDate={setCurrentDate} />
      </AppWrapper>
    </>
  );
}

export default App;