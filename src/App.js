import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { CreateTopic } from "./pages/CreateTopic";
import { Home } from "./pages/Home";
import { TagPage } from "./pages/TagPage";
import { TopicPage } from "./pages/TopicPage";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-topic" element={<CreateTopic />} />
        <Route path="/tag/:tagName" element={<TagPage />} />
        <Route path="/topic/:topicId" element={<TopicPage />} />
      </Routes>
    </>
  );
}

export default App;
