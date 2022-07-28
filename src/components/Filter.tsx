import { useCallback, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { Button, Input, Label, themeSpacing } from "@amsterdam/asc-ui";
import Select from "react-select";
import { FilterContext, useDispatch } from "../filter/FilterContext";
import { actions, initialState, defaultArea } from "../filter/reducer";
import { FormattedOption, Group, SearchFilter } from "../types";

const StyledDiv = styled.div`
  margin-bottom: ${themeSpacing(10)};
  width: 100%;

  label {
    margin-top: ${themeSpacing(3)};
    font-weight: bold;
  }
`;

const StyledMultiSelect = styled(Select)`
  width: 100%;
`;

const SyledColumn = styled.div`
  width: calc(50% - ${themeSpacing(5)});
  margin-right: ${themeSpacing(5)};
  float: left;
`;

function formatSearchParams(searchParams: URLSearchParams) {
  const params: Record<string, string | null> = {};
  [...searchParams.keys()].forEach((key) => (params[key] = searchParams.get(key)));
  return params;
}

function useGetFormattedSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [formattedSearchParams, setFormattedParams] = useState<Record<Group, string | null>>(
    formatSearchParams(searchParams),
  );

  useEffect(() => {
    setFormattedParams(formatSearchParams(searchParams));
  }, [searchParams]);

  function setParams(filter: SearchFilter) {
    const params = new URLSearchParams();

    type FilterKey = keyof SearchFilter;

    (Object.keys(filter) as FilterKey[]).forEach((key) => {
      params.set(key, filter[key]);
    });

    setSearchParams(params);
  }

  return {
    formattedSearchParams,
    setSearchParams: setParams,
  };
}

function formatOption(option: string): FormattedOption {
  return { label: option, value: option };
}

const Filter = () => {
  const dispatch = useDispatch();
  const { formattedSearchParams, setSearchParams } = useGetFormattedSearchParams();

  const {
    state: { groups, filteredItems, filter },
  } = useContext(FilterContext);

  const [sources, setSoures] = useState<FormattedOption[]>([]);
  const [levels, setLevels] = useState<FormattedOption[]>([]);
  const [themes, setThemes] = useState<FormattedOption[]>([]);
  const [types, setTypes] = useState<FormattedOption[]>([]);
  const [areas, setAreas] = useState<FormattedOption[]>([]);
  const [query, setQuery] = useState("");

  const [source, setSource] = useState<FormattedOption[]>(
    formattedSearchParams.source ? [formatOption(formattedSearchParams.source)] : [],
  );
  const [level, setLevel] = useState<FormattedOption[]>(
    formattedSearchParams.level ? [formatOption(formattedSearchParams.level)] : [],
  );
  const [theme, setTheme] = useState<FormattedOption[]>(
    formattedSearchParams.theme ? [formatOption(formattedSearchParams.theme)] : [],
  );
  const [type, setType] = useState<FormattedOption[]>(
    formattedSearchParams.type ? [formatOption(formattedSearchParams.type)] : [],
  );
  const [area, setArea] = useState<FormattedOption[]>(defaultArea);

  // const [filter, setFilter] = useState<Filter>({
  //   source: "",
  //   level: "",
  //   theme: "",
  //   type: "",
  //   area: defaultArea[0].value,
  //   query: "",
  // });

  useEffect(() => {
    const filter: SearchFilter = {
      source: source.map((i) => i.value).join(","),
      level: level.map((i) => i.value).join(","),
      theme: theme.map((i) => i.value).join(","),
      type: type.map((i) => i.value).join(","),
      area: area.map((i) => i.value).join(","),
      query,
    };

    console.log("filter", filter);

    dispatch(actions.setFilter(filter));
    setSearchParams(filter);
  }, [source, level, theme, type, area, query]);

  // const updateFilter = useCallback(
  //   (group = "", values = []) => {
  //     let value = null;

  //     if (Array.isArray(values)) {
  //       value = values.map((item: any) => item.value).join(",");
  //     }

  //     let newFilter = {
  //       ...filter,
  //     };

  //     if ((group && value) || value === "") {
  //       newFilter = {
  //         ...filter,
  //         [group]: value,
  //       };
  //     }

  //     console.log("newFilter", newFilter);

  //     setFilter(newFilter);
  //     setSearchParams(newFilter);
  //     dispatch(actions.setFilter(newFilter));
  //   },
  //   [filter, dispatch],
  // );

  const formatGroup = useCallback(
    (group: Group) => {
      return groups[group].map(formatOption);
    },
    [groups, filteredItems],
  );

  useEffect(() => {
    setSoures(formatGroup("source"));
    setLevels(formatGroup("level"));
    setThemes(formatGroup("theme"));
    setTypes(formatGroup("type"));
    setAreas(formatGroup("area"));

    // updateFilter();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  // const doThings = () => {
  //   if (formattedSearchParams.type) {
  //     const typeVar = formattedSearchParams.type.split(",");

  //     const typeResult: { label: string; value: string }[] = typeVar.map((val: any) => ({
  //       label: val,
  //       value: val,
  //     }));
  //     setType(typeResult);

  //     console.log("change search setType", typeResult);
  //   }
  // };

  const resetFilter = useCallback(() => {
    dispatch(actions.setFilter(initialState.filter));

    setSearchParams(initialState.filter);
  }, [dispatch, setSearchParams]);

  return (
    <StyledDiv data-testid="filter">
      <form method="get">
        <SyledColumn>
          <Label label="Type" />
          <StyledMultiSelect
            placeholder="Kies een type"
            name="type"
            isMulti
            defaultValue={type}
            options={formatGroup("type")}
            onChange={(values: any) => {
              setType(values);
            }}
          />
          <Label label="Thema" />
          <StyledMultiSelect
            name="theme"
            placeholder="Kies een thema"
            isMulti
            defaultValue={theme}
            options={formatGroup("theme")}
            onChange={(values: any) => {
              setTheme(values);
            }}
          />

          <Label label="Niveau" />
          <StyledMultiSelect
            placeholder="Kies een niveau"
            isMulti
            defaultValue={level}
            name="level"
            options={formatGroup("level")}
            onChange={(values: any) => {
              setLevel(values);
            }}
          />
        </SyledColumn>
        <SyledColumn>
          <Label label="Algemeen beleid (Heel Amsterdam) of aanvullend beleid per stadsdeel?" />
          <StyledMultiSelect
            name="area"
            placeholder="Kies een standsdeel"
            isMulti
            defaultValue={area}
            options={formatGroup("area")}
            onChange={(values: any) => {
              setArea(values);
            }}
          />
          <Label label="Bron" />
          <StyledMultiSelect
            name="source"
            placeholder="Kies een bron"
            isMulti
            defaultValue={source}
            options={formatGroup("source")}
            onChange={(values: any) => {
              setSource(values);
            }}
          />

          <Label label="Filter op tekst" />
          <Input
            type="text"
            id="query"
            onChange={(e: any) => {
              setQuery(e.target.value);
            }}
          />
        </SyledColumn>
        <Button variant="secondary" data-testid="reset" onClick={resetFilter}>
          Wis filter
        </Button>
      </form>
    </StyledDiv>
  );
};

export default Filter;
