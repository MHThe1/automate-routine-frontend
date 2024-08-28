import React from "react";
import Select from "react-select";

const AvoidTimeSelector = ({ avoidTime, setAvoidTime, isEditing, setIsEditing }) => {
  const timeOptions = [
    { value: "08:00 AM-09:20 AM", label: "08:00 AM-09:20 AM" },
    { value: "09:30 AM-10:50 AM", label: "09:30 AM-10:50 AM" },
    { value: "11:00 AM-12:20 PM", label: "11:00 AM-12:20 PM" },
    { value: "12:30 PM-01:50 PM", label: "12:30 PM-01:50 PM" },
    { value: "02:00 PM-03:20 PM", label: "02:00 PM-03:20 PM" },
    { value: "03:30 PM-04:50 PM", label: "03:30 PM-04:50 PM" },
    { value: "05:00 PM-06:20 PM", label: "05:00 PM-06:20 PM" },
  ];

  const handleSelectChange = (selectedOptions) => {
    setAvoidTime(selectedOptions.map(option => option.value));
    setIsEditing(true);
  };

  return (
    <div className="flex items-center gap-4">
      <label
        htmlFor="avoidTime"
        className="text-gray-700 dark:text-stone-100 font-bold"
      >
        Avoid Time:
      </label>
      <Select
        id="avoidTime"
        className="flex-grow focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={timeOptions.filter(option => avoidTime.includes(option.value))}
        onChange={handleSelectChange}
        options={timeOptions}
        isMulti
      />
    </div>
  );
};

export default AvoidTimeSelector;
