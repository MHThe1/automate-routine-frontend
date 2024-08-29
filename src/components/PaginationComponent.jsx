import React from 'react';

const PaginationComponent = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="mt-4 text-center">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="w-10 h-10 dark:bg-slate-950 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-700 hover:dark:bg-gray-700 mr-2"
      >
        {'<'}
      </button>
      <span className="text-center text-sm text-gray-500 dark:text-stone-100">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="w-10 h-10 dark:bg-slate-950 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-700 hover:dark:bg-gray-700 ml-2"
      >
        {'>'}
      </button>
    </div>
  );
};

export default PaginationComponent;
