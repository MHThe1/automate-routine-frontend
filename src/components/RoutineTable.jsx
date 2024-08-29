import html2canvas from "html2canvas";
import RoutineSnap from "./RoutineSnap";

const RoutineTable = ({
  routines,
  currentPage,
  totalPages,
  totalRoutines,
  handlePageChange,
}) => {
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

  const minutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const minutesRemainder = minutes % 60;
    return `${hours} hours ${minutesRemainder} minutes`;
  };

  const handleTakeScreenshot = () => {
    document.getElementById("routine-snap").classList.remove("hidden");

    const element = document.getElementById("routine-snap");
    if (!element) {
      return;
    }
    html2canvas(element)
      .then((canvas) => {
        let image = canvas.toDataURL("image/jpeg");
        const a = document.createElement("a");
        a.href = image;
        a.download = "Routinebracu.jpeg";
        a.click();

        document.getElementById("routine-snap").classList.add("hidden");
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
                .filter((time) => rowHasClassData(routine, time)) // Only render rows with class data
                .map((time, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-stone-100 font-bold">
                      {time}
                    </td>
                    {days.map((day, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-stone-100 font-bold"
                      >
                        {getCourseDetails(day, time, routine)}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="m-4 flex justify-center space-x-4">
          <button
            onClick={handleTakeScreenshot}
            className="bg-green-500 hover:bg-green-800 text-black hover:text-white font-bold py-2 px-4 rounded shadow-md transition-colors duration-300"
          >
            Download Routine
          </button>
          </div>
          <RoutineSnap routine={routine} />
        </div>
      ))}
    </div>
  );
};

export default RoutineTable;
