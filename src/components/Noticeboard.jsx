import { useState } from 'react';

export default function Noticeboard() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="container mx-auto px-4 py-2 mb-2 mt-2">
      <div className="border-l-4 border-red-500 pl-4">
        <div className="flex items-start relative">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-red-600 dark:text-red-400">
              Important Notice
            </h3>
            <div className="mt-1">
              <p className="text-gray-700 dark:text-gray-300 animate-pulse">
                Spring 2026 data is now updated. Please review the latest changes and let me know if you find any issues. 
                <br />
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
            aria-label="Close notice"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}