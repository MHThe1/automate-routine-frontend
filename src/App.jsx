import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import { ThemeMode } from './components/ToggleTheme';

function App() {
  const [courseCodes, setCourseCodes] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [minDays, setMinDays] = useState(3);
  const [maxDays, setMaxDays] = useState(6);
  const [avoidTime, setAvoidTime] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'http://192.168.0.155:8000/generate-routines/',
        {
          courses: courseCodes.map((code, index) => ({
            courseCode: code,
            section: courseDetails[index] || '',
          })),
          avoid_time: avoidTime
        },
        {
          params: {
            page: page,
            page_size: 10,
            min_days: minDays,
            max_days: maxDays,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.routines.length === 0) {
        setError('No routines can be generated for the given criteria.');
      } else {
        setRoutines(response.data.routines);
        setTotalPages(Math.ceil(response.data.total_count / 10));
      }
    } catch (error) {
      setError('There was an error fetching the data.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    handleSubmit(newPage);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleSubmit();
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
            maxDays={maxDays}
            avoidTime={avoidTime}
            setCourseCodes={setCourseCodes}
            setCourseDetails={setCourseDetails}
            setMinDays={setMinDays}
            setMaxDays={setMaxDays}
            setAvoidTime={setAvoidTime}
            loading={loading}
            error={error}
          />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
