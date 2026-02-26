import styled, { createGlobalStyle } from "styled-components";
import Layout from "./components/Layout/Layout";
import { CurrentDateProvider } from "./contexts/CurrentDateContext";
import { SchedulesProvider } from "./contexts/SchedulesContext";

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
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <CurrentDateProvider>
          <SchedulesProvider>
            <Layout />
          </SchedulesProvider>
        </CurrentDateProvider>
      </AppWrapper>
    </>
  );
}

export default App;
