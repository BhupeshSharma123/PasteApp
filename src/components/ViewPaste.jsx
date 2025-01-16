import { useParams } from "react-router-dom";
import useStore from "../Store/store";

function ViewPaste() {
  const { id } = useParams();
  const { pastes } = useStore();
  const paste = pastes.filter((item) => item._id === id)[0];
  console.log(paste);

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gray-900 text-gray-100 transition-all duration-500">
      {/* Input Section */}
      <div className="flex items-center gap-4 mb-10 animate-fade-in">
        <input
          disabled
          value={paste?.title || "Loading..."} // Fallback for loading state
          className="w-96 px-4 py-2 bg-gray-800 text-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:bg-gray-700"
          type="text"
          placeholder="Enter something"
        />
      </div>

      {/* Textarea Section */}
      <div className="w-full max-w-4xl h-[500px] bg-gray-800 p-6 rounded-lg shadow-lg mx-4 animate-fade-in">
        <textarea
          disabled
          value={paste?.content || "Loading..."} // Fallback for loading state
          placeholder="Type your content here..."
          className="w-full h-[450px] p-4 border-2 border-gray-600 text-gray-100 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:bg-gray-700"
        />
      </div>
    </div>
  );
}

export default ViewPaste;
