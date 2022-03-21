import styled from "styled-components";
import { Accordion, Column, Heading, Paragraph, Row, themeSpacing } from "@amsterdam/asc-ui";

const StyledDiv = styled.div`
  margin-top: ${themeSpacing(10)};
  width: 100%;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(5)};
`;

const StyledAccordion = styled(Accordion)`
  margin-top: ${themeSpacing(3)};
`;

const FAQ = () => {
  return (
    <div data-testid="faq">
      <Row>
        <Column span={10}>
          <StyledDiv>
            <StyledHeading>Veelgestelde vragen</StyledHeading>
            <StyledAccordion id="a1" title="Wat is het HIOR Amsterdam?">
              <Paragraph gutterBottom={0}>
                Het Handboek Inrichting Openbare Ruimte Amsterdam (HIOR Amsterdam) is een digitaal platform waarop al
                het bestaande beleid voor de inrichting van de Amsterdamse openbare ruimte op hoofdlijnen is samengevat.
                Met het HIOR Amsterdam worden meer dan 30 beleidsproducten integraal ontsloten. Het HIOR Amsterdam heeft
                op zichzelf géén bestuurlijke status. De bestuurlijke status is verbonden aan de achterliggende
                beleidsdocumenten.
              </Paragraph>
            </StyledAccordion>
            <StyledAccordion id="a2" title="Hoe actueel is het HIOR Amsterdam?">
              <Paragraph gutterBottom={0}>
                Het HIOR Amsterdam wordt geactualiseerd zodra er nieuw beleid wordt vastgesteld door het college van
                B&amp;W of de Gemeenteraad. Onderaan de pagina kun je zien op welke datum de laatste update
                plaatsgevonden heeft.
              </Paragraph>
            </StyledAccordion>
            <StyledAccordion id="a3" title="Hoe gebruik ik het HIOR Amsterdam?">
              <Paragraph gutterBottom={0}>
                In het HIOR Amsterdam gebruik je om Amsterdams beleid voor de openbare ruimte te vinden. Bijvoorbeeld op
                basis van een thema (bijvoorbeeld fiets, auto, groen, sport &amp; spel, etc.) of aan de hand van een
                beleidsproduct (bijvoorbeeld de Visie Openbare Ruimte of het Beleidskader Verkeernsnetten).
                <br />
                <br />
                Met filters kun je vervolgens aangeven op welk niveau je beleidsinformatie wilt inzien (strategisch,
                tachtisch, operationeel en/of proces) en welk type informatie je wilt inzien (randvoorwaarden,
                uitgangspunten, ambities en/of adviezen).
                <br />
                <br />
                Het HIOR Amsterdam bevat de hoofdlijnen van het beleid dat geldt voor de hele stad en ook
                gebieddspecifieke aspecten. Ook daarop kun je filteren, door te kiezen voor &quot;Heel Amsterdam&quot;
                of één van de stadsdelen.
              </Paragraph>
            </StyledAccordion>
            <StyledAccordion id="a4" title="Wat is de bestuurlijke status van het HIOR Amsterdam?">
              <Paragraph gutterBottom={0}>
                Het HIOR Amsterdam is als product niet bestuurlijk vastgesteld. Wél heeft het Amsterdamse College van
                B&amp;W op 4 december 2018 ingestemd met de publicatie van het HIOR Amsterdam. Daarmee is dit digitale
                handboek openbaar gemaakt. De inhoud van het handboek komt voort uit meer dan 30 producten, die ieder
                een eigen (bestuurlijke) status hebben.
                <br />
                <br />
                Om projecten te helpen op de juiste wijze uitvoering te geven aan het beleid, is binnen het HIOR
                Amsterdam onderscheid gemaakt tussen “randvoorwaarden”, “uitgangspunten”, “ambities” en “adviezen”.
                <br />
                <br />
                Alleen de voorschriften uit de categorie “advies” hebben géén bestuurlijke status. Het zijn zwaarwegende
                adviezen die voortkomen uit ambtelijke handleidingen of uit beleid dat inmiddels geen bestuurlijke
                status meer heeft.
              </Paragraph>
            </StyledAccordion>
            <StyledAccordion id="a5" title="Waar komen de teksten uit het HIOR Amsterdam vandaan?">
              <Paragraph gutterBottom={0}>
                Het HIOR Amsterdam is gebaseerd op bestaande beleidsstukken. Welk beleidsstuk het betreft, is per regel
                weergegven. De teksten die je in het HIOR Amsterdam kunt vinden, zijn zo letterlijk mogelijk overgenomen
                uit de originele beleidsstukken. Om de leesbaarheid te verbeteren zijn soms wel kleine aanpassingen
                gedaan in de zinsopbouw of de volgorde van alinea&quot;s. Maar, de inhoud van de beleidtekst is nooit
                veranderd. De teksten in het HIOR Amsterdam zijn afgestemd met de opstellers van het beleid.
              </Paragraph>
            </StyledAccordion>
            <StyledAccordion id="a6" title="Welke beleidstukken zijn opgenomen in het HIOR Amsterdam?">
              <Paragraph gutterBottom={0}>
                In het HIOR Amsterdam is het gemeentelijk beleid opgenomen dat raakt aan de definitieve en permanente
                inrichting van de openbare ruimte. Variërend van algemene visies (Structuurvisie, Visie Openbare Ruimte,
                Watervisie, etc.) tot specifieke voorschriften ten aanzien van mobiliteit, verblijfskwaliteit,
                functionaliteit en toegankelijkheid (Puccinimethode, Handboek Hardlooproutes, etc.).
                <br />
                <br />
                Naast centraal stedelijke kaders zijn ook zogenaamde &quot;gebiedsvisies&quot; opgenomen, zoals die vóór
                2014 vastgesteld door de stadsdbeelbesturen zijn vastgesteld. De Voormalige Verordening op de
                Bestuurscommissies (artikel 38.2) maakt voor dit type documenten een uitzondering op de algemene regel
                dat beleidsdocumenten uit de stadsdelen in 2016 vervallen zijn. Onder gebiedsvisies worden in dit
                verband verstaan: beleidsdocumenten die als kenmerk hebben dat ze aangeven hoe een bepaald gebied er uit
                behoort te zien en moet functioneren. Het gaat binnen het HIOR Amsterdam om de volgende documenten: •
                Natuurplan Amsterdam Zuidoost (2012)
                <br />
                • De Bomentaal van Slotervaart (2012)
                <br />
                • Bomenstructuurplan Nieuw-West (2002)
                <br />
                • Visie op het Water van de Binnenstad (2005)
                <br />
                • Nota Bereikbare Binnenstad (2013) <br />
                • Beleidsvisie Hollandsch-Kanaalzone (2003)
                <br />
                • Groenvisie Nieuw-West (2012)
                <br />
                • Visie Groen en Blauw Amsterdam Oud-Zuid 2020 (2006)
                <br />
                • Beleidsplan Binnenstad (1993)
                <br />
                • Structuurplan voor Groen in West (2012)
                <br />
                <br />
                Op basis van de Verordening op het lokaal bestuur (2018) geldt dat het actuelere centraal stedelijk
                beleid leidend is, daar waar gebiedsvisies van vóór 2014 en centraal stedelijke visie/kaders op
                projectniveau onverenigbaar blijken.
              </Paragraph>
            </StyledAccordion>
            <StyledAccordion id="a7" title="Wat is niet opgenomen in het HIOR Amsterdam?">
              <Paragraph gutterBottom={0}>
                In het HIOR Amsterdam is alléén gemeentelijk beleid opgenomen dat raakt aan de definitieve inrichting
                van de openbare ruimte. Dit betekent dat beleid ten aanzien van het beheer van de openbare ruimte niet
                is opgenomen. Het belangrijkste beleidsproduct voor het beheer van de openbare ruimte is het
                beleidskader ‘1 Amsterdam Heel & Schoon’.
                <br />
                <br />
                Ook tijdelijke inrichtingsvormen, zoals terassen, tijdelijke objecten (steigers, containers, etc.),
                uitstallingen of evenementen zijn niet opgenomen in het HIOR Amsterdam.
                <br />
                <br />
                Ook het beleid van onder meer het Waterschap, de Provincie, het GVB en de Vervoersregio Amsterdam is
                niet opgenomen in het HIOR Amsterdam, net als landelijke en provinciale wet- en regelgeving. Dat
                betekent niet dat de belangen hiervan minder zwaar wegen. Zorg dus altijd voor een goede afstemming met
                externe partners als je aan de slag gaat in de openbare ruimte.
              </Paragraph>
            </StyledAccordion>
            <StyledAccordion id="a8" title="Wat is er gebeurd met de voormalige HIOR's / HBIOR's van de stadsdelen?">
              <Paragraph gutterBottom={0}>
                De &quot;Handboeken Inrichting Openbare Ruimte&quot; van de stadsdelen, zoals vastgesteld in de
                stadsdelen vóór 2014, bevatten algemene inrichtingsprincipes voor de openbare ruimte. Conform de
                Verordening op de Bestuurscommissies (artikel 38) zijn deze stadsdeelhandboeken vervallen m.i.v. april
                2016. Inmiddels is het beleid voor de inrichting van de openbare ruimte grotendeels in centraal
                stedelijke kaders vastgelegd, zoals het Stedelijk Kader Buitenreclame (2016), de Visie Openbare Ruimte
                (2017) en het Beleidskader Puccinimethode (2018). Slechts enkele regels/alinea’s/paragrafen vanuit de
                voormalige stadsdeelhandboeken zijn nog van meerwaarde als aanvulling op het centraal stedelijk beleid.
                Aspecten uit onderstaande voormalige handboeken van de stadsdelen zijn daarom over genomen in het HIOR
                Amsterdam, in de vorm van gebiedsgerichte adviezen:
                <br />
                • Stadsdeel Zuidoost: HBIOR, 2011
                <br />
                • Stadsdeel Centrum: HIOR Centrum, 2009
                <br />
                • Stadsdeel West: HIOR De Baarsjes, 2006
                <br />
                • Stadsdeel Oost: HIOR, 2012
                <br />
                • Stadsdeel Noord: HBOR, 2015
                <br />
                • Stadsdeel Nieuw-West: HIOR Nieuw-West, deel I, 2011
                <br />
                • Stadsdeel Zuid: Buitengewoon Goed Zuid, 2014
                <br />
                <br />
                De adviezen binnen het HIOR Amsterdam hebben géén bestuurlijke status en zijn ook niet (opnieuw)
                vastgesteld. De adviezen zijn echter wel van grote meerwaarde bij het gebiedsgericht werken. Ze helpen
                om bij het ontwerpen, inrichten en beheren van de openbare ruimte aan te sluiten op gebiedsspecifieke
                kenmerken (stedenbouwkunde, architectuur, cultuurhistorie, etc.).
              </Paragraph>
            </StyledAccordion>
            <StyledAccordion
              id="a9"
              title="Bevat het HIOR Amsterdam ook ruimtelijke plannen, uitvoeringsprogramma's en maatregelenpaketten?"
            >
              <Paragraph gutterBottom={0}>
                Nee. In het HIOR Amsterdam is alléén algemeen geldend beleid opgenomen. Het gaat om algemene ambities,
                uitgangspunten en randvoorwaarden die gelden voor heel Amsterdam of voor specifieke zones of gebieden.
                Ruimtelijke plannen, bestemmingsplannen, uitvoeringsprogramma&quot;s en maatregelenpaketten -zoals het
                &quot;Meerjarenplan Fiets&quot; of het &quot;Meerjarenplan Verkeersveiligheid&quot;- zijn niet opgenomen
                in het HIOR Amsterdam.
              </Paragraph>
            </StyledAccordion>
            <StyledAccordion id="a10" title="Bij wie moet ik zijn met vragen over het beleid?">
              <Paragraph gutterBottom={0}>
                Alle vragen over het HIOR of de onderliggende beleidsstukken kun je mailen naar HIOR@amsterdam.nl. We
                beantwoorden je vraag zo snel mogelijk, of verwijzen je door naar een collega die je verder kan helpen.
              </Paragraph>
            </StyledAccordion>
            <StyledAccordion
              id="a11"
              title="Ik werk aan een project in de openbare ruimte, moet ik alles uit het HIOR Amsterdam 1 op 1 toepassen?"
            >
              <Paragraph gutterBottom={0}>
                Nee. Het HIOR is géén &quot;checklist&quot; waarbij je alle randvoorwaarden, uitgangspunten, adviezen en
                ambities moet &quot;afvinken&quot;. Het is een hulpmiddel om tot de juiste keuzes op gebieds- of
                projectniveau te komen.
                <br />
                <br />
                Je gebruikt het HIOR om inzicht te krijgen in het beleid, te bepalen welke randvoorwaarden van
                toepassing zijn zijn, te kijken aan welke ambities je invulling kunt geven en je keuzes af te stemmen
                met de verschillende partijen binnen het project.
              </Paragraph>
            </StyledAccordion>
            <StyledAccordion id="a12" title="Hoe werkt het filteren en sorteren in het HIOR Amsterdam?">
              <Paragraph gutterBottom={0}>
                Binnen het HIOR Amsterdam kun je beleidsregels filteren en sorteren. Filteren doe je met de balkjes
                bovenaan het scherm. Daarmee kun je bijvoorbeeld beleid van één of meerdere thema&quot;s selecteren. Of
                alleen één bepaald niveau, zoals &quot;opterationeel&quot; of &quot;proces&quot;. Filteren op tekst is
                ook mogelijk. Je vult dan zelf een zoekterm in, zoals &quot;alsfalt&quot; of &quot;container&quot;. Let
                wel op: het tekstfilter zoekt letterlijk naar de opgegeven tekst en houdt geen rekening met spelfouten
                of synoniemen. Door filters te combineren vind je de informatie die voor jou relevant is. Nadat je
                gefilterd hebt, kun je de resulaten nog sorteren op basis van de bron, het niveau, het type of het
                thema. Standaard sorteert het HIOR Amsterdam als volgt: - Eerst op thema (oplopend van thema nr.1 tot en
                met thema nr.16) - Vervolgens op niveau (strategisch, tactisch, operationeel, proces) - Tot slot op type
                (randvoorwaarden, uitgangspunten, ambities, adviezen) Met de vier knoppen boven de resultaten kun je de
                sortering veranderen. De uitkomsten worden dan anders gegroepeerd. Bijvoorbeeld niet op
                &quot;thema&quot;, maar op &quot;type&quot;.
              </Paragraph>
            </StyledAccordion>
            <StyledAccordion id="a13" title="Kan ik meedenken over het HIOR Amsterdam?">
              <Paragraph gutterBottom={0}>
                Ja, graag! We zijn altijd op zoek naar feedback van gebruikers en goede ideeën om het HIOR Amsterdam te
                verbeteren. Neem contact met ons op via hior@amsterdam.nl
              </Paragraph>
            </StyledAccordion>
          </StyledDiv>
        </Column>
      </Row>
    </div>
  );
};

export default FAQ;
