import styled from "styled-components";
import { Heading, themeSpacing } from "@amsterdam/asc-ui";

const StyledDiv = styled.div`
  margin-top: ${themeSpacing(10)};
  width: 100%;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(5)};
`;

const FAQ = () => {
  return (
    <>
      <StyledDiv data-testid="faq">
        <StyledHeading>FAQ</StyledHeading>

      </StyledDiv>
    </>
  );
};

export default FAQ;
