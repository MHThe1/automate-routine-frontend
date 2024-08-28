import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import { ThemeMode } from './components/ToggleTheme';

function App() {
  const [courseCodes, setCourseCodes] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [minDays, setMinDays] = useState(3); // Default minimum days
  const [avoidTime, setAvoidTime] = useState("");
  const [routines, setRoutines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSubmit = async (page = 1) => {
    try {
      const response = await axios.post(
        'http://192.168.0.155:8000/generate-routines/',
        {
          courses: courseCodes.map((code, index) => ({
            courseCode: code,
            section: courseDetails[index] || '',
          })),
        },
        {
          params: {
            page: page,
            page_size: 10, // Adjust the page size if needed
            min_days: minDays, // Add min_days parameter
            avoid_time: avoidTime, // Add avoid_time parameter
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setRoutines(response.data.routines);
      setTotalPages(Math.ceil(response.data.total_count / 10)); // Assuming page_size is 10
    } catch (error) {
      console.error('There was an error!', error);
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
    <div id="mainbody" className={ThemeMode() ? 'dark' : ''}>
      <div className="flex flex-col min-h-screen bg-neutral-100 dark:bg-neutral-900">
        <main className="flex-grow lg:px-10 xl:px-16 2xl:px-20 font-quicksand font-smooth-antialiased">
          <Header />
          <MainContent
            routines={routines}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            handleFormSubmit={handleFormSubmit}
            courseCodes={courseCodes}
            courseDetails={courseDetails}
            minDays={minDays}
            avoidTime={avoidTime}
            setCourseCodes={setCourseCodes}
            setCourseDetails={setCourseDetails}
            setMinDays={setMinDays}
            setAvoidTime={setAvoidTime}
          />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
