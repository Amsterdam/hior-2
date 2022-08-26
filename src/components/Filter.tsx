import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import { Button, Label, themeSpacing } from "@amsterdam/asc-ui";
import { useFilterState } from "../filter/FilterContext";
import { initialState, defaultArea } from "../constants";
import { FormattedOption, SearchFilter } from "../types";
import { useGetFormattedSearchParams } from "../hooks/useGetFormattedSearchParams";
import { StyledInput } from "./Components";
import { useDebounce } from "../hooks/useDebounce";
import useFilteredItems from "../hooks/useFilteredItems";

const StyledDiv = styled("div")`
  margin-bottom: ${themeSpacing(6)};
  width: 100%;
  label {
    margin-top: ${themeSpacing(3)};
    font-weight: bold;
  }
`;

const StyledMultiSelect = styled(Select)`
  width: 100%;
`;

const FirstColumn = styled("div")`
  width: 100%;
  float: left;

  @media (min-width: 650px) {
    width: calc(50% - ${themeSpacing(2)});
    margin-right: ${themeSpacing(2)};
  }
`;

const SecondColumn = styled("div")`
  width: 100%;
  float: left;

  @media (min-width: 650px) {
    width: calc(50% - ${themeSpacing(2)});
    margin-left: ${themeSpacing(2)};
  }
`;

const Center = styled("div")`
  display: flex;
  width: 100%;
  justify-content: center;

  padding-top: ${themeSpacing(4)};
`;

function formatOption(option: string): FormattedOption {
  return { label: option, value: option };
}

const getSearchParamsValueOrDefault = (
  searchParamValue: string | null | undefined,
  defaultValue: FormattedOption[] = [],
) => {
  if (searchParamValue === undefined || searchParamValue === null || searchParamValue === "") {
    return defaultValue;
  }

  return searchParamValue.split(",").map((v) => formatOption(v));
};

const Filter = () => {
  const { setFilter } = useFilterState();
  const { formattedSearchParams, setSearchParams } = useGetFormattedSearchParams();
  const { groups } = useFilteredItems();

  console.log("formattedSearchParams", formattedSearchParams);

  const sources = groups.source.map(formatOption);
  const levels = groups.level.map(formatOption);
  const themes = groups.theme.map(formatOption);
  const types = groups.type.map(formatOption);
  const areas = groups.area.map(formatOption);

  const [source, setSource] = useState<FormattedOption[] | null>(
    getSearchParamsValueOrDefault(formattedSearchParams.source),
  );
  const [level, setLevel] = useState<FormattedOption[] | null>(
    getSearchParamsValueOrDefault(formattedSearchParams.level),
  );
  const [theme, setTheme] = useState<FormattedOption[] | null>(
    getSearchParamsValueOrDefault(formattedSearchParams.theme),
  );
  const [type, setType] = useState<FormattedOption[] | null>(getSearchParamsValueOrDefault(formattedSearchParams.type));
  const [area, setArea] = useState<FormattedOption[] | null>(
    getSearchParamsValueOrDefault(formattedSearchParams.area, defaultArea),
  );
  const [query, setQuery] = useState(formattedSearchParams.query ?? "");
  const debouncedQuery = useDebounce(query, 150);

  useEffect(() => {
    const filter: SearchFilter = {
      source: source?.map((i) => i.value) || [],
      level: level?.map((i) => i.value) || [],
      theme: theme?.map((i) => i.value) || [],
      type: type?.map((i) => i.value) || [],
      area: area?.map((i) => i.value) || [],
      query: debouncedQuery,
    };

    // console.log("filter", filter);

    setFilter(filter);
    setSearchParams(filter);
  }, [source, level, theme, type, area, debouncedQuery, setSearchParams, setFilter]);

  const resetFilter = useCallback(() => {
    // setFilter(initialState.filter);
    setSearchParams(initialState.filter);

    setSource(null);
    setLevel(null);
    setTheme(null);
    setType(null);
    setArea(initialState.filter.area.map((o) => formatOption(o)));
    setQuery(initialState.filter.query);
  }, [setSource, setLevel, setTheme, setType, setArea, setQuery]);

  return (
    <StyledDiv data-testid="filter">
      <form method="get">
        <FirstColumn>
          <Label label="Type" id="type-label" />
          <StyledMultiSelect
            aria-labelledby="type-label"
            placeholder="Kies een type"
            name="type"
            isMulti
            defaultValue={type}
            options={types}
            onChange={(values: any) => {
              setType(values);
            }}
          />
          <Label label="Thema" id="thema-label" />
          <StyledMultiSelect
            aria-labelledby="thema-label"
            name="theme"
            placeholder="Kies een thema"
            isMulti
            defaultValue={theme}
            options={themes}
            onChange={(values: any) => {
              setTheme(values);
            }}
          />

          <Label label="Niveau" id="niveau-label" />
          <StyledMultiSelect
            aria-labelledby="niveau-label"
            placeholder="Kies een niveau"
            isMulti
            defaultValue={level}
            name="level"
            options={levels}
            onChange={(values: any) => {
              setLevel(values);
            }}
          />
        </FirstColumn>
        <SecondColumn>
          <Label label="Algemeen beleid (Heel Amsterdam) of aanvullend beleid per stadsdeel?" id="area-label" />
          <StyledMultiSelect
            aria-labelledby="area-label"
            name="area"
            placeholder="Kies een standsdeel"
            isMulti
            defaultValue={area}
            options={areas}
            onChange={(values: any) => {
              setArea(values);
            }}
          />
          <Label label="Bron" id="source-label" />
          <StyledMultiSelect
            aria-labelledby="source-label"
            name="source"
            placeholder="Kies een bron"
            isMulti
            defaultValue={source}
            options={sources}
            onChange={(values: any) => {
              setSource(values);
            }}
          />

          <Label label="Filter op tekst" id="text-label" />
          <StyledInput
            aria-labelledby="text-label"
            type="text"
            id="query"
            value={query}
            onChange={(e: any) => {
              setQuery(e.target.value);
            }}
          />
        </SecondColumn>
        <Center>
          <Button variant="secondary" data-testid="reset" onClick={resetFilter}>
            Wis filter
          </Button>
        </Center>
      </form>
    </StyledDiv>
  );
};

export default Filter;
