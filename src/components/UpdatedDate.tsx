import { useEffect, useState } from "react";
import useFetchData from "../hooks/useFetchData";
import { HIOR_METADATA_URL } from "../constants";

const UpdatedDate = () => {
  const { data, get } = useFetchData();
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    get(HIOR_METADATA_URL);
  }, [get]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const d: Date = new Date(data?.results[0].value.substr(0, 10));

    if (data && d) {
      setDate(`${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`);
    } else {
      setDate("geen datum gevonden");
    }
  }, [data]);

  return date !== null ? <span data-testid="updated-date">{date}</span> : <span></span>;
};

export default UpdatedDate;
