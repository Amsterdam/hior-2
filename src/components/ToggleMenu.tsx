import { breakpoint, MenuToggle } from "@amsterdam/asc-ui";
import styled from "styled-components";

const MobileOnlyMenu = styled("div")`
  display: block;

  @media screen and ${breakpoint("min-width", "tabletS")} {
    display: none;
  }

  & > div > ul {
    left: -228px !important;
  }
`;

type Props = {
  children: React.ReactNode;
};

const ToggleMenu = ({ children }: Props) => {
  return (
    <MobileOnlyMenu>
      <MenuToggle>{children}</MenuToggle>
    </MobileOnlyMenu>
  );
};

export default ToggleMenu;
