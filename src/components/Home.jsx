import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useStore from "../Store/store";

function Home() {
  const { addToPaste, pastes, updatedPastes } = useStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setContent(paste.content);
      } else {
        setTitle(""); // Reset title and content if paste not found
        setContent("");
        alert("Paste not found.");
      }
    }
  }, [pasteId, pastes]);

  function handleCreateOrUpdate() {
    if (!title || !content) {
      alert("Title and content are required.");
      return;
    }

    const paste = {
      _id: pasteId || Date.now().toString(36), // Generate a new ID for new pastes or use existing ID for updates
      title: title,
      content: content,
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      updatedPastes(paste); // Update paste if `pasteId` exists
    } else {
      addToPaste(paste); // Add new paste if no `pasteId`
    }

    // Clear state and reset search params after action
    setTitle("");
    setContent("");
    setSearchParams({}); // Clear the URL query params
  }

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gray-900 text-gray-100 transition-all duration-500">
      {/* Input and Button Section */}
      <div className="flex items-center gap-4 mb-10 animate-fade-in">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-96 px-4 py-2 bg-gray-800 text-gray-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:bg-gray-700"
          type="text"
          placeholder="Enter something"
        />
        <button
          onClick={handleCreateOrUpdate}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      {/* Textarea Section */}
      <div className="w-full max-w-4xl h-[500px] bg-gray-800 p-6 rounded-lg shadow-lg mx-4 animate-fade-in">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your content here..."
          className="w-full h-[450px] p-4 border-2 border-gray-600 text-gray-100 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:bg-gray-700"
        />
      </div>
    </div>
  );
}

export default Home;
