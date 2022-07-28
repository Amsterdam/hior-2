// No check because typing of asc-ui is not correct.
// @ts-nocheck
import { Link, useLocation, matchPath } from "react-router-dom";
import { Header as ASCHeader, MenuItem, MenuButton, MenuInline } from "@amsterdam/asc-ui";

// We need to filter the active prop as else it gets passed to the DOM with an invalid value which results in error.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LinkWoActive = ({ active, ...other }) => <Link {...other} />;

const Header = () => {
  const location = useLocation();

  function isHome() {
    return !!matchPath(location.pathname, "/home");
  }

  return (
    <ASCHeader
      tall={false}
      data-testid="header"
      homeLink="/"
      fullWidth
      css={{ zIndex: 20 }}
      title="Handboek Inrichting Openbare Ruimte"
      navigation={
        <>
          <MenuInline>
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
              <MenuButton forwardedAs="a" href="mailto:hior@amsterdam.nl">
                Contact
              </MenuButton>
            </MenuItem>
          </MenuInline>
        </>
      }
    />
  );
};

export default Header;
