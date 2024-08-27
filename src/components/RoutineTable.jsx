import React from 'react';

const RoutineTable = ({ routines }) => {
  return (
    <div className="overflow-x-auto">
      {routines.map((routine, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-bold mb-2">Routine {index + 1}</h2>
          <p className="text-md font-medium mb-2">
            Total Duration: {routine.total_duration} minutes, Total Days: {routine.total_days}
          </p>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Lab Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available Seats</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {routine.courses.map((section) => (
                <tr key={section.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{section.courseCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{section.courseTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{section.classSchedule}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{section.empName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{section.classLabSchedule}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{section.availableSeat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default RoutineTable;
