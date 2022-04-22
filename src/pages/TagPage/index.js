import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export function TagPage() {
  const { tagName } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://ironrest.herokuapp.com/coffee-forum"
      );

      setData(response.data);
    }

    fetchData();
  }, []);

  return (
    <>
      {data
        .filter((currentTopic) => {
          return currentTopic.tags.includes(tagName);
        })
        .map((currentTopic) => {
          return (
            <p>
              <Link to={`/topic/${currentTopic._id}`}>
                {currentTopic.title}
              </Link>
            </p>
          );
        })}
    </>
  );
}
