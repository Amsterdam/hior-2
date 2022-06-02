import { useEffect, useState } from "react";
// import useDataFetching from "../hooks/useDataFetching";
import useFetchData from "../hooks/useFetchData";
import { HIOR_METADATA_URL } from "../constants";

const UpdatedDate = () => {
  const { data, get } = useFetchData();
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    get(HIOR_METADATA_URL);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //@ts-ignore
    const d: Date = new Date(data?.results[0].value.substr(0, 10));

    if (data && d) {
      setDate(`${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`);
    } else {
      setDate("geen datum gevonden");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <span data-testid="updated-date">{date}</span>;
};

export default UpdatedDate;
