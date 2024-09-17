import React, { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import RoutineSnap from "./RoutineSnap";

const RoutineTable = ({ routines, currentPage }) => {
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const routineRefs = useRef(routines.map(() => React.createRef()));

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

  const parseSchedule = useCallback((scheduleString) => {
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
  }, []);

  const getFormattedText = useCallback((courseDetails, initial, roomNo) => {
    return `${courseDetails}<br />[${initial}] ${roomNo}`;
  }, []);

  const handleCellInteraction = useCallback((event, section) => {
    const rect = event.target.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY,
    });
    setTooltipContent(
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="p-4 bg-gray-300 dark:bg-gray-900 rounded-lg shadow-lg max-w-sm border border-gray-700"
      >
        <h3 className="text-lg font-bold mb-2 text-black dark:text-white">
          {section.courseCode} - {section.courseTitle}
        </h3>
        <div className="space-y-2">
          {[
            {
              label: "Instructor",
              value: `${section.empName} [${section.empShortName}]`,
            },
            { label: "Department", value: section.deptName },
            {
              label: "Pre-requisites",
              value: section.preRequisiteCourses || "None",
            },
            { label: "Credit", value: section.courseCredit },
            { label: "Exam Day", value: section.dayNo },
          ].map(({ label, value }) => (
            <p key={label} className="text-sm">
              <span className="font-bold text-gray-950 dark:text-gray-400">
                {label}:{" "}
              </span>
              <span className="text-gray-800 font-semibold dark:text-gray-300">
                {value}
              </span>
            </p>
          ))}
        </div>
      </motion.div>
    );
  }, []);

  const getCourseDetails = useCallback(
    (day, time, routine) => {
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
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="py-2"
                  dangerouslySetInnerHTML={{ __html: formattedText }}
                  onMouseEnter={(e) => handleCellInteraction(e, section)}
                  onMouseLeave={() => setTooltipContent(null)}
                  onClick={(e) => handleCellInteraction(e, section)}
                />
              );
            }
          }
        }
      }
      return "";
    },
    [parseSchedule, getFormattedText, handleCellInteraction]
  );

  const rowHasClassData = useCallback(
    (routine, time) => {
      return days.some((day) => getCourseDetails(day, time, routine) !== "");
    },
    [days, getCourseDetails]
  );

  const minutesToHours = useCallback((minutes) => {
    const hours = Math.floor(minutes / 60);
    const minutesRemainder = minutes % 60;
    return `${hours} hours ${minutesRemainder} minutes`;
  }, []);

  const handleTakeScreenshot = useCallback((index) => {
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
  }, []);

  const scrollToRoutine = (index) => {
    routineRefs.current[index].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="mt-8 space-y-8">
      <div className="flex justify-center space-x-2 overflow-x-auto pb-4">
        {routines.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToRoutine(index)}
            className="px-4 py-2 bg-purple-500 text-white rounded-full focus:outline-none"
          >
            R{(currentPage - 1) * 10 + index + 1}
          </motion.button>
        ))}
      </div>
      {routines.map((routine, index) => (
        <motion.div
          key={index}
          ref={routineRefs.current[index]}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 dark:bg-slate-950 rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="flex justify-between bg-purple-700 p-4 text-white">
            <h2 className="text-lg font-bold text-center">
              Routine #{(currentPage - 1) * 10 + index + 1}
            </h2>
            <p className="text-center font-semibold">
              {minutesToHours(routine.total_duration)} weekly,{" "}
              {routine.total_days} days
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-50 dark:divide-gray-700 font-semibold">
              <thead className="bg-gray-300 dark:bg-gray-950">
                <tr>
                  <th className="px-6 py-3 text-center text-xs text-black dark:text-white uppercase tracking-wider">
                    Time
                  </th>
                  {days.map((day, idx) => (
                    <th
                      key={idx}
                      className="px-6 py-3 text-center text-xs text-gray-800 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-gray-200 dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-700">
                {timeSlots
                  .filter((time) => rowHasClassData(routine, time))
                  .map((time, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={
                        rowIndex % 2 === 1 ? "bg-gray-300 dark:bg-gray-950" : ""
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black dark:text-white">
                        {time}
                      </td>
                      {days.map((day, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-6 py-2 whitespace-nowrap text-sm text-center text-black dark:text-white"
                        >
                          {getCourseDetails(day, time, routine)}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <RoutineSnap
            routine={routine}
            id={`routine-snap-${index}`}
            routineNo={(currentPage - 1) * 10 + index + 1}
            timeDays={`${minutesToHours(routine.total_duration)} weekly, ${routine.total_days} days`}
          />
          <div className="p-4 flex justify-center dark:border-t dark:border-gray-700">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTakeScreenshot(index)}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg"
            >
              Download Routine
            </motion.button>
          </div>
        </motion.div>
      ))}
      {tooltipContent && (
        <div
          style={{
            position: "absolute",
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            zIndex: 1000,
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default RoutineTable;
