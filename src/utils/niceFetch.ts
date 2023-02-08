export async function niceFetch<DataType>(url: string, init?: RequestInit) {
  try {
    const response = await fetch(url, init);

    if ([200, 201].includes(response.status)) {
      const data = (await response.json()) as DataType;
      return data;
    }

    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
