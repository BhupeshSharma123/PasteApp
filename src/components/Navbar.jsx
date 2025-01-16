import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div className="bg-zinc-900 flex justify-between items-center h-[60px] px-6 shadow-lg">
        {/* Logo / Title */}
        <div className="text-white font-bold text-lg">PasteApp</div>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white px-6 py-2 mx-4 rounded-xl transition-all duration-300 ease-in-out hover:bg-zinc-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 ${
                isActive ? "bg-zinc-700" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `text-white px-6 py-2 mx-4 rounded-xl transition-all duration-300 ease-in-out hover:bg-zinc-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 ${
                isActive ? "bg-zinc-700" : ""
              }`
            }
          >
            All Paste
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
