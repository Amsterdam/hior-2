import { useEffect, useState } from "react";
import useFetchMetaData from "../hooks/useFetchMetaData";

const UpdatedDate = () => {
  const query = useFetchMetaData();
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    if (!query.isFetched || !query.isSuccess) {
      return;
    }

    const { data } = query;

    if (!data) {
      return;
    }

    const d: Date = new Date(data.results[0].value.slice(0, 10));

    if (data && d) {
      setDate(`${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`);
    } else {
      setDate("geen datum gevonden");
    }
  }, [query]);

  return date !== null ? <span data-testid="updated-date">{date}</span> : <span></span>;
};

export default UpdatedDate;
