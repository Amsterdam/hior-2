import { Link, useLocation, matchPath } from "react-router-dom";
import { Header as ASCHeader, MenuItem, MenuButton, MenuInline } from "@amsterdam/asc-ui";

const Header = () => {
  const location = useLocation();

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
              <MenuButton as={Link} to="/home" active={!!matchPath(location.pathname, "/home")} data-testid="header-home-button">
                Startpagina
              </MenuButton>
            </MenuItem>
            <MenuItem>
              {/* @ts-ignore */}
              <MenuButton as={Link} to="/search" active={!!matchPath(location.pathname, "/search")}>
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
