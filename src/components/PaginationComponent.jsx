import React from 'react';

const PaginationComponent = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="mt-4 text-center">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
      >
        Previous
      </button>
      <span className="text-center text-sm text-gray-500 dark:text-stone-100">
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
  );
};

export default PaginationComponent;
