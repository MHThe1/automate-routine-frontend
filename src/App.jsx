import axios from "axios";
import { useState } from "react";
import Header from "./components/Header.jsx";
import { ThemeMode } from "./components/ToggleTheme.jsx";
import Footer from "./components/Footer.jsx";
import RoutineTable from "./components/RoutineTable.jsx";

function App() {
  const [courseCodes, setCourseCodes] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [minDays, setMinDays] = useState(1); // Default minimum days
  const [routines, setRoutines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleInputChange = (e) => {
    setCourseCodes(e.target.value.split(",").map((code) => code.trim()));
  };

  const handleDetailsChange = (e) => {
    setCourseDetails(e.target.value.split(",").map((detail) => detail.trim()));
  };

  const handleSubmit = async (page = 1) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/generate-routines/",
        {
          courses: courseCodes.map((code, index) => ({
            courseCode: code,
            section: courseDetails[index] || "",
          })),
        },
        {
          params: {
            page: page,
            page_size: 10, // Adjust the page size if needed
            min_days: minDays, // Add min_days parameter
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setRoutines(response.data.routines);
      setTotalPages(Math.ceil(response.data.total_count / 10)); // Assuming page_size is 10
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    handleSubmit(newPage); // Fetch data for the new page
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleSubmit(); // Fetch data for the first page when the form is submitted
  };

  return (
    <div id="mainbody" className={ThemeMode() ? "dark" : ""}>
      <div className="flex flex-col min-h-screen bg-neutral-100 dark:bg-neutral-900">
        <main className="flex-grow lg:px-10 xl:px-16 2xl:px-20 font-quicksand font-smooth-antialiased">
          <Header />

          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
              Course Routine Generator
            </h1>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="courseCodes"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Enter Course Codes (comma separated):
                </label>
                <input
                  type="text"
                  id="courseCodes"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="courseDetails"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Enter Course Details (comma separated):
                </label>
                <input
                  type="text"
                  id="courseDetails"
                  onChange={handleDetailsChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="minDays"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Minimum Number of Days:
                </label>
                <select
                  id="minDays"
                  value={minDays}
                  onChange={(e) => setMinDays(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {[2, 3, 4, 5, 6].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Generate Routine
              </button>
            </form>

            {routines.length > 0 && (
              <>
                <RoutineTable routines={routines} />
                <div className="mt-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
