import { useRef, useState, useEffect } from 'react';
import RoutineTable from './RoutineTable';
import FormComponent from './FormComponent';
import PaginationComponent from './PaginationComponent';

const MainContent = ({
  routines,
  currentPage,
  totalPages,
  totalRoutines,
  handlePageChange,
  handleFormSubmit,
  courseCodes,
  courseDetails,
  minDays,
  maxDays,
  avoidTime,
  avoidFaculty,
  avoidDay,
  setCourseCodes,
  setCourseDetails,
  setMinDays,
  setMaxDays,
  setAvoidTime,
  setAvoidFaculty,
  setAvoidDay,
  loading,
  error,
  isEditing,
  setIsEditing,
  setCurrentPage,
}) => {
  const loadingRef = useRef(null);
  const errorRef = useRef(null);

  useEffect(() => {
    const scrollToRef = (ref) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          // Only scroll if the element is not already visible
          ref.current.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    if (loading) {
      scrollToRef(loadingRef);
    } else if (error) {
      scrollToRef(errorRef);
    }
  }, [loading, error]);

  const [hasLoadedRoutines, setHasLoadedRoutines] = useState(false);
  const topOfRoutinesRef = useRef(null);

  useEffect(() => {
    if (routines.length > 0 && !hasLoadedRoutines && topOfRoutinesRef.current) {
      const element = topOfRoutinesRef.current;
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        // Only scroll if the element is not already visible
        element.scrollIntoView({ behavior: "smooth" });
      }
      // Set the flag to true after scrolling
      setHasLoadedRoutines(true);
    }
  }, [routines, hasLoadedRoutines]);

  useEffect(() => {
    if (topOfRoutinesRef.current) {
      topOfRoutinesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  
  return (
    <div className="container mx-auto p-4">
      <FormComponent
        courseCodes={courseCodes}
        courseDetails={courseDetails}
        minDays={minDays}
        maxDays={maxDays}
        avoidTime={avoidTime}
        avoidFaculty={avoidFaculty}
        avoidDay={avoidDay}
        setCourseCodes={setCourseCodes}
        setCourseDetails={setCourseDetails}
        setMinDays={setMinDays}
        setMaxDays={setMaxDays}
        setAvoidFaculty={setAvoidFaculty}
        setAvoidTime={setAvoidTime}
        setAvoidDay={setAvoidDay}
        handleFormSubmit={handleFormSubmit}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setCurrentPage={setCurrentPage}
      />
      {loading && (
        <div ref={loadingRef} className="mt-4 text-center animate-pulse text-gray-700 dark:text-gray-300">
          <p className="text-xl text-green-600 font-semibold">
            Cooking up some routines for you...<br/> Please wait...
          </p>
        </div>
      )}
      {error && (
        <div ref={errorRef} className="mt-4 text-center text-red-600 dark:text-red-400">
          <p className="text-xl font-semibold">{error}</p>
        </div>
      )}
      {routines.length > 0 && !loading && !error && (
        <div className="mt-4">
          <div
            ref={topOfRoutinesRef}
            className="mb-4 px-4 py-4 bg-white dark:bg-gray-900 text-slate-900 dark:text-stone-100 text-center rounded-lg shadow-md"
          >
            <p className="font-quicksand font-bold text-xl text-green-600 dark:text-green-400">
              Cooked up {totalRoutines} routines for you!
            </p>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
          <RoutineTable
            routines={routines}
            totalRoutines={totalRoutines}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
          <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
        </div>
      )}
    </div>
  );
};

export default MainContent;
