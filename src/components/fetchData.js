const fetchData = async () => {
  const res = await fetch("http://localhost:3000/posts");
  const json = await res.json();
  return json;
};

export default fetchData;
