import React from 'react';
import RoutineTable from './RoutineTable';
import FormComponent from './FormComponent';
import PaginationComponent from './PaginationComponent';

const MainContent = ({ routines, currentPage, totalPages, handlePageChange, handleFormSubmit, courseCodes, courseDetails, minDays, setCourseCodes, setCourseDetails, setMinDays }) => {
  return (
    <div className="container mx-auto p-4">
      <FormComponent
        courseCodes={courseCodes}
        courseDetails={courseDetails}
        minDays={minDays}
        setCourseCodes={setCourseCodes}
        setCourseDetails={setCourseDetails}
        setMinDays={setMinDays}
        handleFormSubmit={handleFormSubmit}
      />
      {routines.length > 0 && (
        <div className='mt-4'>
          <RoutineTable routines={routines} />
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
