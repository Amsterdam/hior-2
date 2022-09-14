// No check because typing of asc-ui is not correct.
// @ts-nocheck
import { Link, useLocation, matchPath } from "react-router-dom";
import styled from "styled-components";
import { Header as ASCHeader, MenuItem, MenuButton, MenuInline, breakpoint } from "@amsterdam/asc-ui";
import ToggleMenu from "./ToggleMenu";

// We need to filter the active prop as else it gets passed to the DOM with an invalid value which results in error.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LinkWoActive = ({ active, ...other }) => <Link {...other} />;

const FromMobile = styled("div")`
  display: none;

  @media screen and ${breakpoint("min-width", "tabletS")} {
    display: block;
  }
`;

const MenuItems = () => {
  const location = useLocation();

  return (
    <>
      <MenuItem>
        <MenuButton
          forwardedAs={LinkWoActive}
          to="/home"
          active={!!matchPath(location.pathname, "/home")}
          data-testid="header-home-button"
        >
          Startpagina
        </MenuButton>
      </MenuItem>
      <MenuItem>
        <MenuButton forwardedAs={LinkWoActive} to="/list" active={!!matchPath(location.pathname, "/list")}>
          Zoek
        </MenuButton>
      </MenuItem>
      <MenuItem>
        <MenuButton forwardedAs={LinkWoActive} to="/faq" active={!!matchPath(location.pathname, "/faq")}>
          FAQ
        </MenuButton>
      </MenuItem>
      <MenuItem>
        <MenuButton forwardedAs="a" href="mailto:hior@amsterdam.nl?subject=Ik heb een vraag over HIOR Amsterdam">
          Contact
        </MenuButton>
      </MenuItem>
    </>
  );
};

const Header = () => {
  return (
    <ASCHeader
      tall={false}
      data-testid="header"
      homeLink="/"
      fullWidth={false}
      css={{ zIndex: 20 }}
      title="Handboek Inrichting Openbare Ruimte"
      navigation={
        <>
          <ToggleMenu>
            <MenuItems />
          </ToggleMenu>
          <FromMobile>
            <MenuInline>
              <MenuItems />
            </MenuInline>
          </FromMobile>
        </>
      }
    />
  );
};

export default Header;
