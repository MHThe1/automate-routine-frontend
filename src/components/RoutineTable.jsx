import React from "react";

const RoutineTable = ({ routines }) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const timeSlots = [
    "08:00 AM-09:20 AM",
    "09:30 AM-10:50 AM",
    "11:00 AM-12:20 PM",
    "12:30 PM-01:50 PM",
    "02:00 PM-03:20 PM",
    "03:30 PM-04:50 PM",
    "05:00 PM-06:20 PM",
  ];

  // Helper function to parse class lab schedule
  const parseSchedule = (scheduleString) => {
    const schedules = [];
    const entries = scheduleString.split(",").map((entry) => entry.trim());
    entries.forEach((entry) => {
      const [day, time] = entry.split("(");
      if (day && time) {
        const [startTime, endTime, ...room] = time.slice(0, -1).split("-");
        schedules.push({ day, startTime, endTime, room: room.join("-") });
      }
    });
    return schedules;
  };

  const getFormattedText = (courseDetails, roomNo) => {
    return `${courseDetails}<br />${roomNo}`;
  };

  const getCourseDetails = (day, time, routine) => {
    if (Array.isArray(routine.courses)) {
      for (let section of routine.courses) {
        const schedules = parseSchedule(section.classLabSchedule);
        for (let schedule of schedules) {
          if (
            schedule.day === day &&
            time === `${schedule.startTime}-${schedule.endTime}`
          ) {
            const formattedText = getFormattedText(
              section.courseDetails,
              schedule.room
            );
            return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
          }
        }
      }
    }
    return "";
  };

  // Helper function to check if a row contains any class data
  const rowHasClassData = (routine, time) => {
    return days.some((day) => getCourseDetails(day, time, routine) !== "");
  };

  return (
    <div className="overflow-x-auto mt-10">
      {routines.map((routine, index) => (
        <div key={index} className="mb-6 overflow-x-auto border-dashed border-2 border-gray-200 rounded-lg">
          <p className="text-md text-center text-slate-900 dark:text-stone-100 font-medium my-4">
            {routine.total_duration} minutes, {" "}
            {routine.total_days} days
          </p>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-stone-100 uppercase tracking-wider">
                  Time
                </th>
                {days.map((day, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-400 dark:text-stone-100 uppercase tracking-wider"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-900 text-black dark:text-stone-100 divide-y divide-gray-200">
              {timeSlots
                .filter((time) => rowHasClassData(routine, time)) // Only render rows with class data
                .map((time, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-stone-100 font-bold">
                      {time}
                    </td>
                    {days.map((day, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-stone-100 font-bold"
                      >
                        {getCourseDetails(day, time, routine)}
                      </td>
                    ))}
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
