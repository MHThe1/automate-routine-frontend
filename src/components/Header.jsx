import { Link } from 'react-router-dom';
import ToggleTheme from "./ToggleTheme";

export default function Header() {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
      <nav className="relative container mx-auto p-4 text-black dark:text-white flex flex-col md:flex-row items-center justify-between">
        {/* App Title (Left) */}
        <div className="md:flex-1 text-center md:text-left mb-2 md:mb-0">
          <h1 className="text-xl font-semibold dark:text-white">
            <Link to="/" className="focus:outline-none">
              Automate Routine
            </Link>
          </h1>
        </div>

        {/* Navigation Links (Center) */}
        <div className="flex-1 text-center mb-2 md:mb-0">
          <Link to="/" className="mx-2 hover:underline">Home</Link>
          <Link to="/about" className="mx-2 hover:underline">About</Link>
          <Link to="/how-to" className="mx-2 hover:underline">How To</Link>
        </div>

        {/* Dark/Light Mode Toggle (Right or Top Right) */}
        <div className="md:flex-1 text-center md:text-right md:relative absolute top-4 right-4 md:top-0 md:right-0">
          <ToggleTheme />
        </div>
      </nav>
    </div>
  );
}