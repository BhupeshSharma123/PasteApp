import { useState } from "react";
import useStore from "../Store/store";
import toast from "react-hot-toast";
import SocialShareModal from "../utils/share"; // Import SocialShareModal
import { Link } from "react-router-dom";

function Paste() {
  const [searchItem, setSearchItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const { pastes, removeFromPaste, resetAllPaste } = useStore();

  // Filter pastes based on search input
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  // Format createdAt date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 transition-all duration-500">
      {/* Search Input and Remove All Button */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <input
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          type="text"
          placeholder="Search pastes..."
          className="w-full max-w-lg px-4 py-2 text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
        <button
          onClick={resetAllPaste}
          aria-label="Remove All Pastes"
          className="w-full md:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
        >
          Remove All Pastes
        </button>
      </div>

      {/* Filtered Results */}
      <div className="grid grid-cols-1 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-600"
            >
              {/* Content Section */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {paste.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {paste.content}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Created: {formatDate(paste.createdAt)}
                </p>
              </div>

              {/* Buttons Section */}
              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                <Link
                  to={`/?pasteId=${paste._id}`}
                  aria-label="Edit Paste"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Edit
                </Link>
                <button
                  aria-label="Delete Paste"
                  onClick={() => removeFromPaste(paste._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Delete
                </button>
                <Link
                  to={`/pastes/${paste._id}`}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
                  aria-label="View Paste"
                >
                  View
                </Link>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to clipboard");
                  }}
                  aria-label="Copy Paste"
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Copy
                </button>
                <button
                  onClick={() => setIsModalOpen(true)} // Open modal on share button click
                  aria-label="Share Paste"
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Share
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No pastes found.
          </p>
        )}
      </div>

      {/* Modal for Social Share */}
      {isModalOpen && <SocialShareModal setIsOpen={setIsModalOpen} />}
    </div>
  );
}

export default Paste;
