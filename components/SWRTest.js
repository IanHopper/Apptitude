import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const swr_url = "http://localhost:8000/api/v1/"

const SWRTest = () => {
  const { data, error } = useSWR(swr_url, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log(data)

  return <div>We got {data.length} items!</div>;
};

export default SWRTest;
