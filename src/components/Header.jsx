import ToggleTheme from "./ToggleTheme";

export default function Header() {
  return (
    <nav className="relative container mx-auto p-4 bg-gray-100 dark:bg-stone-900 shadow-md flex flex-col md:flex-row items-center justify-between">
      {/* App Title (Left) */}
      <div className="md:flex-1 text-center md:text-left mb-2 md:mb-0">
        <h1 className="text-xl font-semibold dark:text-white">
          <button onClick={() => window.location.reload()} className="focus:outline-none">
            Automate Routine
          </button>
        </h1>
      </div>

      {/* Page Title (Center) */}
      <div className="flex-1 text-center mb-2 md:mb-0">
        <span className="text-2xl font-bold dark:text-white text-black">
          usismate
        </span>
      </div>

      {/* Dark/Light Mode Toggle (Right or Top Right) */}
      <div className="md:flex-1 text-center md:text-right md:relative absolute top-4 right-4 md:top-0 md:right-0">
        <ToggleTheme />
      </div>
    </nav>
  );
}
