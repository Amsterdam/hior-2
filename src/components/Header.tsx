import { Link, useLocation, matchPath } from "react-router-dom";
import { Header as ASCHeader, MenuItem, MenuButton, MenuInline } from "@amsterdam/asc-ui";

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
              {/* @ts-ignore */}
              <MenuButton as={Link} to="/home" active={isHome()} data-testid="header-home-button">
                Startpagina
              </MenuButton>
            </MenuItem>
            <MenuItem>
              {/* @ts-ignore */}
              <MenuButton as={Link} to="/list" active={!!matchPath(location.pathname, "/list")}>
                Zoek
              </MenuButton>
            </MenuItem>
            <MenuItem>
              {/* @ts-ignore */}
              <MenuButton as={Link} to="/faq" active={!!matchPath(location.pathname, "/faq")}>
                FAQ
              </MenuButton>
            </MenuItem>
            <MenuItem>
              {/* @ts-ignore */}
              <MenuButton as="a" href="mailto:hior@amsterdam.nl">
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
