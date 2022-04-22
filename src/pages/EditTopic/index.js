import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function EditTopic() {
  const navigate = useNavigate();
  const { topicId } = useParams();

  const [tag, setTag] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    owner: "",
    tags: [],
  });

  useEffect(() => {
    async function fetchTopic() {
      const response = await axios.get(
        `https://ironrest.herokuapp.com/coffee-forum/${topicId}`
      );

      setForm(response.data);
    }

    fetchTopic();
  }, [topicId]);

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

  function handleRemoveTag(index) {
    const cloneTags = [...form.tags];
    cloneTags.splice(index, 1);

    setForm({ ...form, tags: cloneTags });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formClone = { ...form };
    delete formClone._id;

    await axios.put(
      `https://ironrest.herokuapp.com/coffee-forum/${topicId}`,
      formClone
    );

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
          {form.tags.map((currentTag, index) => {
            return (
              <>
                <small className="m-1" style={{ color: "gray" }}>
                  {currentTag}
                </small>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleRemoveTag(index);
                  }}
                >
                  x
                </span>
              </>
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
