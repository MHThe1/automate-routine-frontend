import React from "react";
import Select from "react-select";

const AvoidTimeSelector = ({
  avoidTime,
  setAvoidTime,
  avoidDay,
  setAvoidDay,
  isEditing,
  setIsEditing,
}) => {
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
    { value: "Friday", label: "Friday" },
  ];

  const handleSelectChangeTime = (selectedOptions) => {
    setAvoidTime(selectedOptions.map((option) => option.value));
    setIsEditing(true);
  };

  const handleSelectChangeDay = (selectedOptions) => {
    setAvoidDay(selectedOptions.map((option) => option.value));
    setIsEditing(true);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
      <div className="flex flex-col lg:flex-row items-center gap-2 w-full lg:w-1/2">
        <label
          htmlFor="avoidTime"
          className="text-gray-700 dark:text-stone-100 font-bold w-full lg:w-auto"
        >
          Avoid Time:
        </label>
        <Select
          id="avoidTime"
          className="flex-grow w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={timeOptions.filter((option) =>
            avoidTime.includes(option.value)
          )}
          onChange={handleSelectChangeTime}
          options={timeOptions}
          isMulti
        />
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-2 w-full lg:w-1/2">
        <label
          htmlFor="avoidDay"
          className="text-gray-700 dark:text-stone-100 font-bold w-full lg:w-auto"
        >
          Avoid Day:
        </label>
        <Select
          id="avoidDay"
          className="flex-grow w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={dayOptions.filter((option) =>
            avoidDay.includes(option.value)
          )}
          onChange={handleSelectChangeDay}
          options={dayOptions}
          isMulti
        />
      </div>
    </div>
  );
};

export default AvoidTimeSelector;
