import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

import { InputText } from "../../components/InputText";
import { Button } from "../../components/Button";

export function TopicPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState({ tags: [], answers: [] });
  const [form, setForm] = useState({
    body: "",
    owner: "",
  });

  const [submitStatus, setSubmitStatus] = useState(false);

  useEffect(() => {
    async function fetchTopic() {
      const response = await axios.get(
        `https://ironrest.herokuapp.com/coffee-forum/${topicId}`
      );
      setTopic(response.data);
      setSubmitStatus(false);
    }

    fetchTopic();
  }, [topicId, submitStatus]);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const attTopic = { ...topic };
    attTopic.answers.push(form);

    delete attTopic._id;

    await axios.put(
      `https://ironrest.herokuapp.com/coffee-forum/${topicId}`,
      attTopic
    );

    setSubmitStatus(true);
  }

  async function handleDelete() {
    await axios.delete(
      `https://ironrest.herokuapp.com/coffee-forum/${topicId}`
    );

    navigate("/");
  }

  return (
    <>
      <h1>{topic.title}</h1>
      <strong>{topic.owner}</strong>
      <p>{topic.description}</p>

      <Link to={`/edit/${topicId}`}>
        <Button>Editar</Button>
      </Link>

      <Button isDanger onClick={handleDelete}>
        Delete
      </Button>

      {topic.tags.map((currentTag) => (
        <small className="m-2" style={{ color: "gray" }}>
          {currentTag}
        </small>
      ))}

      <h2>Respostas</h2>
      {topic.answers.map((currentAnswers) => {
        return (
          <div>
            <p>{currentAnswers.body}</p>
            <small>{currentAnswers.owner}</small>
          </div>
        );
      })}

      <form onSubmit={handleSubmit}>
        <InputText
          id="inputBody"
          label="Resposta: "
          name="body"
          value={form.body}
          onChange={handleChange}
        />
        <InputText
          id="inputOwner"
          label="Autor: "
          name="owner"
          value={form.owner}
          onChange={handleChange}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </>
  );
}
