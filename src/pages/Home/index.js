import axios from "axios";
import { useEffect, useState } from "react";

export function Home() {
  const [data, setData] = useState([]); // Responsavel pelo axios
  const [tagList, setTagList] = useState([]); // Responsavel por preparar as infos que vão para tela

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://ironrest.herokuapp.com/coffee-forum"
      );

      setData(response.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const tags = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].tags.length; j++) {
        tags.push(data[i].tags[j]);
      }
    }

    setTagList(Array.from(new Set(tags)));
  }, [data]);

  return (
    <>
      {tagList.map((currentTag) => {
        return <h1 key={currentTag}>{currentTag}</h1>;
      })}
    </>
  );
}
