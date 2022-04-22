import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { CreateTopic } from "./pages/CreateTopic";
import { Home } from "./pages/Home";
import { TagPage } from "./pages/TagPage";
import { TopicPage } from "./pages/TopicPage";
import { EditTopic } from "./pages/EditTopic";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-topic" element={<CreateTopic />} />
        <Route path="/tag/:tagName" element={<TagPage />} />
        <Route path="/topic/:topicId" element={<TopicPage />} />
        <Route path="/edit/:topicId" element={<EditTopic />} />
      </Routes>
    </>
  );
}

export default App;
