import axios from "axios";
import { useState } from "react";

import Header from "./components/Header.jsx";
import { ThemeMode } from "./components/ToggleTheme.jsx";
import Footer from "./components/Footer.jsx";
import RoutineTable from "./components/RoutineTable.jsx";



function App() {
  const [courseCodes, setCourseCodes] = useState([]);
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setCourseCodes(e.target.value.split(",").map((code) => code.trim()));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/generate-routines/",
        courseCodes,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
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
            <form onSubmit={handleSubmit}>
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
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Generate Routine
              </button>
            </form>

            {result && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Generated Routine</h2>
                <pre className="bg-gray-100 p-4 rounded-lg">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>


        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
