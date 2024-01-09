import Papa from "papaparse";

export async function niceFetch<DataType>(url: string, init?: RequestInit) {
  try {
    const response = await fetch(url, init);

    if ([200, 201].includes(response.status)) {
      const csv = (await response.text());
      const parsed = Papa.parse(csv, { header: true })

      return {
        results: parsed.data,
      } as DataType;
    }

    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
