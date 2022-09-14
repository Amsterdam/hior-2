import styled from "styled-components";
import { Footer as ASCFooter, FooterTop, Link, Row, Column, FooterSection, themeSpacing } from "@amsterdam/asc-ui";

import UpdatedDate from "./UpdatedDate";

const StyledFooter = styled(ASCFooter)`
  margin-top: ${themeSpacing(18)};
`;

const Footer = () => {
  return (
    <StyledFooter data-testid="footer">
      <FooterTop>
        <Row>
          <Column span={6}>
            <FooterSection title="Disclaimer">
              <p>
                Het Handboek Inrichting Openbare Ruimte is samengesteld door de directie Verkeer & Openbare Ruimte. De
                website is ontwikkeld door Datapunt.
              </p>

              <p>
                De informatie op deze website wordt regelmatig aangevuld op basis van nieuwe bestuurlijke besluiten. De
                laatste aanpassing vond plaats op <UpdatedDate />. Het HIOR Amsterdam heeft op zichzelf géén
                bestuurlijke status. De achterliggende beleidsdocumenten zijn leidend.
              </p>

              <p>
                V&amp;OR en Datapunt kunnen niet aansprakelijk worden gesteld voor de juistheid, volledigheid en
                actualiteit van de website. Datapunt kan in het bijzonder niet aansprakelijk worden gesteld voor
                eventuele schade of consequenties ontstaan door direct of indirect gebruik van de inhoud van de website.
              </p>

              <p>Vragen over het HIOR Amsterdam kun je mailen naar hior@amsterdam.nl.</p>
            </FooterSection>
          </Column>
          <Column span={6}>
            <FooterSection title="Amsterdam.nl">
              <p>
                Amsterdam.nl is de plek online waar u alle nieuws en publieksinformatie van de gemeente en stadsdelen
                vindt.
              </p>

              <Link darkBackground href="https://www.amsterdam.nl/" variant="inline" inList>
                Naar Amsterdam.nl
              </Link>
            </FooterSection>
          </Column>
        </Row>
      </FooterTop>
    </StyledFooter>
  );
};

export default Footer;
