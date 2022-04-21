import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function CreateTopic() {
  const navigate = useNavigate();

  const [tag, setTag] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    owner: "",
    tags: [],
    answers: [], // Nesse componente, esse cara fica vazio mesmo, ele só vai ter algo quando alguem responder o topico
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });

    console.log(form);
  }

  function handleChangeTags() {
    const formData = { ...form };

    formData.tags.push(tag);

    setForm(formData);

    console.log(form);

    setTag("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await axios.post("https://ironrest.herokuapp.com/coffee-forum", form);

    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div class="mb-3">
        <label for="topicTitle" class="form-label">
          Titulo:
        </label>
        <input
          type="text"
          class="form-control"
          id="topicTitle"
          value={form.title}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div class="mb-3">
        <label for="topicDescription" class="form-label">
          Descrição:
        </label>
        <input
          type="text"
          class="form-control"
          id="topicDescription"
          value={form.description}
          name="description"
          onChange={handleChange}
        />
      </div>
      <div class="mb-3">
        <label for="topicOwner" class="form-label">
          Autor:
        </label>
        <input
          type="text"
          class="form-control"
          id="topicOwner"
          value={form.owner}
          name="owner"
          onChange={handleChange}
        />
      </div>

      <div class="mb-3">
        <label for="topicTags" class="form-label">
          Tags:
        </label>
        <input
          type="text"
          class="form-control"
          id="topicTags"
          name="tags"
          value={tag}
          onChange={(event) => {
            setTag(event.target.value);
            console.log(tag);
          }}
        />
        <div>
          {form.tags.map((currentTag) => {
            return (
              <small className="m-1" style={{ color: "gray" }}>
                {currentTag}
              </small>
            );
          })}
        </div>
        <button
          class="btn btn-primary"
          type="button"
          onClick={handleChangeTags}
        >
          Add tags:
        </button>
      </div>

      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
