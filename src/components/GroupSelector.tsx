import styled from "styled-components";
import { Tabs, Tab, themeSpacing, Spinner } from "@amsterdam/asc-ui";
import { useContext, useCallback, useState, useEffect } from "react";
import Loader from "./Loader";
import { FilterContext } from "../filter/FilterContext";
import { actions } from "../filter/reducer";

const StyledDiv = styled.div`
  margin-top: ${themeSpacing(10)};
  width: 100%;
`;

const StyledTab = styled(Tab)`
  width: 100%;
  padding-top: ${themeSpacing(2)};
  margin-bottom: ${themeSpacing(6)};
`;

//@ts-ignore
const GroupSelector = ({ groups }) => {
  const allGroups = [
    {
      value: "source",
      label: "Bron",
    },
    {
      value: "level",
      label: "Niveau",
    },
    {
      value: "theme",
      label: "Thema",
    },
    {
      value: "type",
      label: "Type",
    },
  ];

  const [loading, setLoading] = useState<boolean>(true);

  const {
    //@ts-ignore
    state: { group },
    //@ts-ignore
    dispatch,
    //@ts-ignore
  } = useContext(FilterContext);

  const onClickGroup = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      //@ts-ignore
      dispatch(actions.setGroup(e.target.getAttribute("data-value")));
    },
    [dispatch],
  );

  useEffect(() => {
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group]);

  return (
    <StyledDiv data-testid="group-selector">
      <Tabs label="" initialTab={group}>
        {allGroups.map((b: any) => (
          <StyledTab key={b.value} id={b.value} data-value={b.value} label={b.label} onClick={onClickGroup}>
            {loading && <Loader />}
            {!loading && groups[b.value].map((group: string) => <span key={group}>{group}, </span>)}
          </StyledTab>
        ))}
      </Tabs>
    </StyledDiv>
  );
};

export default GroupSelector;
