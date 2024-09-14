import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import { ThemeMode } from "./components/ToggleTheme";
import { Analytics } from "@vercel/analytics/react";
import useScrollPosition from "./hooks/useScrollPosition";
import "./index.css";

function App() {
  const [courseCodes, setCourseCodes] = useState([]);
  const [courseDetails, setCourseDetails] =  useState([[]]);
  const [preferredFaculties, setPreferredFaculties] = useState([[]]);
  const [minDays, setMinDays] = useState(2);
  const [maxDays, setMaxDays] = useState(5);
  const [avoidFaculty, setAvoidFaculty] = useState([]);
  const [avoidTime, setAvoidTime] = useState([]);
  const [avoidDay, setAvoidDay] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [totalRoutines, setTotalRoutines] = useState(0);

  const pageSize = 10;

  const apiUrl = import.meta.env.VITE_API_URL;
  const scrollPosition = useScrollPosition();

  const handleSubmit = async (page = 1) => {
    setLoading(true);
    setError(null);
    setIsEditing(false);
    try {
      const response = await axios.post(
        `${apiUrl}/generate-routines/`,
        {
          courses: courseCodes.map((code, index) => ({
            courseCode: code,
            sections: courseDetails[index] || [],
            faculties: preferredFaculties[index] || [],
          })),
          avoid_faculty: avoidFaculty,
          avoid_time: avoidTime,
          avoid_day: avoidDay,
        },
        {
          params: {
            min_days: minDays,
            max_days: maxDays,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.routines.length === 0) {
        setError("No routines can be generated for the given criteria.");
      } else {
        setRoutines(response.data.routines);
        setTotalRoutines(response.data.total_count);
      }
    } catch (error) {
      setError("There was an error fetching the data.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleSubmit();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const showGoToTopButton = scrollPosition > 200;
  const showGoToBottomButton =
    scrollPosition < document.body.scrollHeight - window.innerHeight - 200;

  const paginatedRoutines = routines.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div id="mainbody" className={ThemeMode() ? "dark" : ""}>
      <div className="flex flex-col min-h-screen bg-neutral-100 dark:bg-neutral-900 overflow-clip">
      <Header />

        <main className="flex-grow lg:px-10 xl:px-16 2xl:px-20 font-quicksand font-smooth-antialiased">
          <MainContent
            routines={paginatedRoutines}
            currentPage={currentPage}
            totalPages={Math.ceil(totalRoutines / pageSize)}
            totalRoutines={totalRoutines}
            handlePageChange={handlePageChange}
            handleFormSubmit={handleFormSubmit}
            courseCodes={courseCodes}
            courseDetails={courseDetails}
            preferredFaculties={preferredFaculties}
            minDays={minDays}
            maxDays={maxDays}
            avoidFaculty={avoidFaculty}
            avoidTime={avoidTime}
            avoidDay={avoidDay}
            setCourseCodes={setCourseCodes}
            setCourseDetails={setCourseDetails}
            setPreferredFaculties={setPreferredFaculties}
            setMinDays={setMinDays}
            setMaxDays={setMaxDays}
            setAvoidTime={setAvoidTime}
            setAvoidFaculty={setAvoidFaculty}
            setAvoidDay={setAvoidDay}
            loading={loading}
            error={error}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            setCurrentPage={setCurrentPage}
          />
        </main>
        <Footer />
        <Analytics />
        {showGoToTopButton && (
          <button
            className="fixed bottom-16 right-14 w-8 h-8 bg-blue-500 text-white rounded-full shadow-lg transition hover:bg-blue-600 animate-bounce-once"
            onClick={scrollToTop}
          >
            ↑
          </button>
        )}
        {showGoToBottomButton && (
          <button
            className="fixed bottom-16 right-4 w-8 h-8 bg-green-500 text-white rounded-full shadow-lg transition hover:bg-green-600 animate-bounce-once"
            onClick={scrollToBottom}
          >
            ↓
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
