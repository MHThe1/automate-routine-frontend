import { motion } from "framer-motion";

const timeOptions = [
  { value: "08:00 AM-09:20 AM", label: "08:00 AM-09:20 AM" },
  { value: "09:30 AM-10:50 AM", label: "09:30 AM-10:50 AM" },
  { value: "11:00 AM-12:20 PM", label: "11:00 AM-12:20 PM" },
  { value: "12:30 PM-01:50 PM", label: "12:30 PM-01:50 PM" },
  { value: "02:00 PM-03:20 PM", label: "02:00 PM-03:20 PM" },
  { value: "03:30 PM-04:50 PM", label: "03:30 PM-04:50 PM" },
  { value: "05:00 PM-06:20 PM", label: "05:00 PM-06:20 PM" },
];

const dayOptions = [
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
];

const AvoidTimeSelector = ({
  avoidTime,
  setAvoidTime,
  avoidDay,
  setAvoidDay,
  setIsEditing,
}) => {
  const handleButtonClickTime = (value) => {
    setAvoidTime((prev) =>
      prev.includes(value)
        ? prev.filter((time) => time !== value)
        : [...prev, value]
    );
    setIsEditing(true);
  };

  const handleButtonClickDay = (value) => {
    setAvoidDay((prev) =>
      prev.includes(value)
        ? prev.filter((day) => day !== value)
        : [...prev, value]
    );
    setIsEditing(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-5"
    >
      {/* Avoid Time Period */}
      <div className="space-y-2">
        <label
          htmlFor="avoid-time"
          className="dark:text-gray-300 text-black text-md"
        >
          Avoid Time:
        </label>
        <div className="flex flex-wrap gap-2">
          {timeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleButtonClickTime(option.value)}
              className={`px-2 py-1 text-sm rounded ${
                avoidTime.includes(option.value)
                  ? "bg-red-600 text-white scale-105 mx-1"
                  : "bg-gray-200 dark:bg-gray-800 text-black dark:text-gray-100"
              } hover:bg-indigo-700 hover:dark:bg-indigo-700 hover:text-white transition`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Avoid Days */}
      <div className="space-y-2">
        <label
          htmlFor="avoid-day"
          className="dark:text-gray-300 text-black text-md"
        >
          Avoid Day:
        </label>
        <div className="flex flex-wrap gap-2">
          {dayOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleButtonClickDay(option.value)}
              className={`px-4 py-1 text-sm rounded ${
                avoidDay.includes(option.value)
                  ? "bg-red-600 text-white scale-105 mx-1"
                  : "bg-gray-200 dark:bg-gray-800 text-black dark:text-gray-100"
              } hover:bg-indigo-700 hover:dark:bg-indigo-700 hover:text-white transition`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AvoidTimeSelector;
