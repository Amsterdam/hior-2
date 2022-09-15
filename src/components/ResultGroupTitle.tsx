import { themeSpacing } from "@amsterdam/asc-ui";
import styled from "styled-components";
import { ALL_GROUPS } from "../constants";
import { Group } from "../types";

const TitleContainer = styled("div")`
  margin-top: ${themeSpacing(13)};
  margin-bottom: ${themeSpacing(1)};
  font-weight: bold;

  color: #7b0000;
  background-color: #fbcccc;
  border-color: #fab8b8;

  padding: ${themeSpacing(4)};

  display: flex;
  align-items: center;
`;

const Text = styled("span")`
  line-height: ${themeSpacing(8)};
`;

const StyledIcon = styled("img")`
  width: 32px;
  height: 32px;
  margin-right: ${themeSpacing(4)};
`;

const ResultGroupTitle = ({ title, count, group }: { title: string; count: number; group: Group }) => {
  if (count > 0) {
    const label = ALL_GROUPS.find((item) => item.value === group)?.label;
    const image = title.replace(/\d+\d*\. */g, "");

    return (
      <TitleContainer id={title.replace(" ", "-")}>
        {group === "theme" && <StyledIcon src={`icons/${image}.png`} alt={title}></StyledIcon>}{" "}
        <Text>
          {label}: {title} ({count})
        </Text>
      </TitleContainer>
    );
  }

  return null;
};

export default ResultGroupTitle;
