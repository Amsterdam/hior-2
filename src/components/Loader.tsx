import { Spinner, themeSpacing } from "@amsterdam/asc-ui";
import styled from "styled-components";

const StyledDiv = styled("div")`
  display: flex;
  width: 100%;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-wrap: nowrap;
  padding: ${themeSpacing(40)};
`;

const Loader = () => {
  return (
    <StyledDiv data-testid="loader">
      <Spinner />
    </StyledDiv>
  );
};

export default Loader;
