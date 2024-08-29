import { useRef, useEffect } from 'react';
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
  avoidDay,
  setCourseCodes,
  setCourseDetails,
  setMinDays,
  setMaxDays,
  setAvoidTime,
  setAvoidDay,
  loading,
  error,
  isEditing,
  setIsEditing,
}) => {
  const loadingRef = useRef(null);
  const errorRef = useRef(null);

  useEffect(() => {
    if (loading && loadingRef.current) {
      loadingRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [loading, error]);

  return (
    <div className="container mx-auto p-4">
      <FormComponent
        courseCodes={courseCodes}
        courseDetails={courseDetails}
        minDays={minDays}
        maxDays={maxDays}
        avoidTime={avoidTime}
        avoidDay={avoidDay}
        setCourseCodes={setCourseCodes}
        setCourseDetails={setCourseDetails}
        setMinDays={setMinDays}
        setMaxDays={setMaxDays}
        setAvoidTime={setAvoidTime}
        setAvoidDay={setAvoidDay}
        handleFormSubmit={handleFormSubmit}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
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
        <div className='mt-4'>
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
