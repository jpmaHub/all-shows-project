import ShowsPage from "./components/ShowsPage";
import styled from "styled-components";

const StyledTitle = styled.h1`
  margin-left: 3vh;
`;

function App() {
  return (
    <>
      <StyledTitle>Today's Deals</StyledTitle>
      <ShowsPage />
    </>
  );
}

export default App;
