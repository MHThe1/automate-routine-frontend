import React, { useState } from "react";
import html2canvas from "html2canvas";
import RoutineSnap from "./RoutineSnap";

const RoutineTable = ({
  routines,
  currentPage,
  totalPages,
  totalRoutines,
  handlePageChange,
}) => {
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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

  const getFormattedText = (courseDetails, initial, roomNo) => {
    return `${courseDetails}<br />[${initial}] ${roomNo}`;
  };

  const handleCellInteraction = (event, section) => {
    const rect = event.target.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY,
    });
    setTooltipContent(
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg max-w-sm">
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
          {section.courseCode} - {section.courseTitle}
        </h3>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-bold text-gray-700 dark:text-gray-300">
              Instructor:
            </span>{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {section.empName} [{section.empShortName}]
            </span>
          </p>
          <p className="text-sm">
            <span className="font-bold text-gray-700 dark:text-gray-300">
              Department:
            </span>{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {section.deptName}
            </span>
          </p>
          <p className="text-sm">
            <span className="font-bold text-gray-700 dark:text-gray-300">
              Pre-requisites:
            </span>{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {section.preRequisiteCourses || "None"}
            </span>
          </p>
          <p className="text-sm">
            <span className="font-bold text-gray-700 dark:text-gray-300">
              Credit:
            </span>{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {section.courseCredit}
            </span>
          </p>
          <p className="text-sm">
            <span className="font-bold text-gray-700 dark:text-gray-300">
              Exam Day:
            </span>{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {section.dayNo}
            </span>
          </p>
        </div>
      </div>
    );
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
              section.empShortName,
              schedule.room
            );
            return (
              <div
                dangerouslySetInnerHTML={{ __html: formattedText }}
                onMouseEnter={(e) => handleCellInteraction(e, section)}
                onMouseLeave={() => setTooltipContent(null)}
                onClick={(e) => handleCellInteraction(e, section)}
                style={{ cursor: "pointer" }}
              />
            );
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

  const minutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const minutesRemainder = minutes % 60;
    return `${hours} hours ${minutesRemainder} minutes`;
  };

  const handleTakeScreenshot = (index) => {
    const elementId = `routine-snap-${index}`;
    const element = document.getElementById(elementId);
    element.classList.remove("hidden");

    html2canvas(element)
      .then((canvas) => {
        let image = canvas.toDataURL("image/jpeg");
        const a = document.createElement("a");
        a.href = image;
        a.download = `Routinebracu-${index + 1}.jpeg`;
        a.click();

        element.classList.add("hidden");
      })
      .catch((err) => {
        console.error("Couldn't Download!");
      });
  };

  return (
    <div className="mt-4">
      {routines.map((routine, index) => (
        <div
          key={index}
          className="overflow-x-auto mb-6 border border-dotted border-gray-400 dark:border-gray-200 rounded-lg shadow-lg"
        >
          <p className="text-md text-center text-slate-900 dark:text-stone-100 font-medium my-4">
            <span className="text-red-400 font-bold">
              #r{(currentPage - 1) * 10 + index + 1}
            </span>{" "}
            - {minutesToHours(routine.total_duration)} weekly,{" "}
            {routine.total_days} days
          </p>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-stone-100 uppercase tracking-wider">
                  Time
                </th>
                {days.map((day, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-3 text-center text-xs font-bold text-gray-400 dark:text-stone-100 uppercase tracking-wider"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-900 text-black dark:text-stone-100 divide-y divide-gray-200">
              {timeSlots
                .filter((time) => rowHasClassData(routine, time))
                .map((time, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-stone-100 font-bold">
                      {time}
                    </td>
                    {days.map((day, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-stone-100 font-bold hover:scale-75 transition-transform duration-300"
                      >
                        {getCourseDetails(day, time, routine)}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
          <RoutineSnap routine={routine} id={`routine-snap-${index}`} />
          <div className="m-4 flex justify-center space-x-4">
            <button
              onClick={() => handleTakeScreenshot(index)}
              className="bg-green-500 hover:bg-green-800 text-black hover:text-white font-bold py-2 px-4 rounded shadow-md transition-colors duration-300"
            >
              Download Routine
            </button>
          </div>
        </div>
      ))}
      {tooltipContent && (
        <div
          style={{
            position: "absolute",
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            zIndex: 1000,
          }}
          className="animate-fade-in transition-opacity duration-300"
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default RoutineTable;
