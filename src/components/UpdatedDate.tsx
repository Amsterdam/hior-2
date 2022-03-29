import { useEffect, useState } from "react";
import useDataFetching from "../hooks/useDataFetching";
import { HIOR_METADATA_URL } from "../constants";

const UpdatedDate = () => {
  const { results, fetchData } = useDataFetching();
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    fetchData(HIOR_METADATA_URL);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //@ts-ignore
    const d: Date = new Date(results?.results[0].value.substr(0, 10));
    if (d) {
      setDate(`${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`);
    } else {
      setDate("geen datum gevonden");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  return <span data-testid="updated-date">{date}</span>;
};

export default UpdatedDate;
