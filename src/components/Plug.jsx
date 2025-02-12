export default function Plug() {
  return (
    <a
      href="https://youtube.com/playlist?list=PLroKojDX2bihMb0DFGWJkSA72qGih1miD&si=B1WtLfHhnKbr3fvE"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="container mx-auto bg-gradient-to-r from-blue-400 to-purple-600 dark:from-purple-900 dark:to-indigo-900 text-white p-4 rounded-lg shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-4">
            <h2 className="text-2xl font-bold mb-2">
              Android in Bangla: Kotlin, Jetpack Compose & Beyond!
            </h2>
            <p className="text-sm md:text-base">
              Learn Android development in Bangla with my comprehensive YouTube
              series.
            </p>
          </div>
          <a
            href="https://youtube.com/playlist?list=PLroKojDX2bihMb0DFGWJkSA72qGih1miD&si=B1WtLfHhnKbr3fvE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-100 hover:scale-105 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Watch Now
          </a>
        </div>
      </div>
    </a>
  );
}
