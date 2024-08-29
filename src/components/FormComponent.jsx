import React, { useState, useEffect } from "react";
import axios from "axios";

import AvoidTimeSelector from "./AvoidTimeSelector";

const NUM_INPUTS = 4;

const FormComponent = ({
  courseCodes,
  courseDetails,
  minDays,
  maxDays,
  avoidTime,
  avoidDay,
  setCourseCodes,
  setCourseDetails,
  setMinDays,
  setMaxDays,
  setAvoidTime,
  setAvoidDay,
  handleFormSubmit,
  isEditing,
  setIsEditing,
}) => {
  const [dropdownOptions, setDropdownOptions] = useState(Array(NUM_INPUTS).fill([]));
  const [suggestions, setSuggestions] = useState(Array(NUM_INPUTS).fill([]));

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCourseDetails = async (index, code) => {
      if (code.trim() === "") {
        setDropdownOptions((prev) => {
          const newOptions = [...prev];
          newOptions[index] = [];
          return newOptions;
        });
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/sections/${code.trim()}/`);
        setDropdownOptions((prev) => {
          const newOptions = [...prev];
          newOptions[index] = response.data;
          return newOptions;
        });
      } catch (error) {
        console.error("Error fetching course details:", error);
        setDropdownOptions((prev) => {
          const newOptions = [...prev];
          newOptions[index] = [];
          return newOptions;
        });
      }
    };

    courseCodes.forEach((code, index) => fetchCourseDetails(index, code));
  }, [courseCodes]);

  const handleCodeChange = async (index, value) => {
    const capitalizedValue = value.toUpperCase().trim();

    const updatedCodes = [...courseCodes];
    updatedCodes[index] = capitalizedValue;
    setCourseCodes(updatedCodes);
    setIsEditing(true);

    if (value.trim() !== "") {
      try {
        const response = await axios.get(`${apiUrl}/course-code-suggestions/?q=${value}`);
        setSuggestions((prev) => {
          const newSuggestions = [...prev];
          newSuggestions[index] = response.data;
          return newSuggestions;
        });
      } catch (error) {
        console.error("Error fetching course code suggestions:", error);
        setSuggestions((prev) => {
          const newSuggestions = [...prev];
          newSuggestions[index] = [];
          return newSuggestions;
        });
      }
    } else {
      setSuggestions((prev) => {
        const newSuggestions = [...prev];
        newSuggestions[index] = [];
        return newSuggestions;
      });
    }
  };

  const handleDetailChange = (index, value) => {
    const updatedDetails = [...courseDetails];
    updatedDetails[index] = value;
    setCourseDetails(updatedDetails);
    setIsEditing(true);
  };

  return (
    <div className="mb-4 px-4 py-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <form onSubmit={handleFormSubmit}>
        <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${NUM_INPUTS} gap-4`}>
          {Array.from({ length: NUM_INPUTS }).map((_, index) => (
            <div key={index} className="mb-2">
              <label
                htmlFor={`courseCode${index}`}
                className="block text-gray-700 dark:text-stone-100 font-bold mb-2"
              >
                Course:
              </label>
              <input
                type="text"
                id={`courseCode${index}`}
                value={courseCodes[index] || ""}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                list={`courseCodeSuggestions${index}`}
              />
              <datalist id={`courseCodeSuggestions${index}`}>
                {suggestions[index].map((suggestion, idx) => (
                  <option key={idx} value={suggestion} />
                ))}
              </datalist>
              <label
                htmlFor={`courseDetails${index}`}
                className="block text-gray-700 dark:text-stone-100 font-bold mb-2 mt-2"
              >
                Section:
              </label>
              <select
                id={`courseDetails${index}`}
                value={courseDetails[index] || ""}
                onChange={(e) => handleDetailChange(index, e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select Section</option>
                {dropdownOptions[index].map((detail) => (
                  <option key={detail.id} value={detail.courseDetails}>
                    {detail.courseDetails}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="mb-4 mt-4 flex flex-col items-center">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
            <div className="flex items-center gap-4 col-span-2 sm:col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="minDays"
                  className="text-gray-700 dark:text-stone-100 font-bold"
                >
                  Minimum Days:
                </label>
                <select
                  id="minDays"
                  value={minDays}
                  onChange={(e) => {
                    setMinDays(parseInt(e.target.value, 10));
                    setIsEditing(true);
                  }}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {[2, 3, 4, 5, 6].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-4 col-span-2 sm:col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="maxDays"
                  className="text-gray-700 dark:text-stone-100 font-bold"
                >
                  Maximum Days:
                </label>
                <select
                  id="maxDays"
                  value={maxDays}
                  onChange={(e) => {
                    setMaxDays(parseInt(e.target.value, 10));
                    setIsEditing(true);
                  }}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {[2, 3, 4, 5, 6].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-span-2 lg:col-span-2 flex items-center gap-4">
              <AvoidTimeSelector
                avoidTime={avoidTime}
                setAvoidTime={setAvoidTime}
                avoidDay={avoidDay}
                setAvoidDay={setAvoidDay}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 flex items-center justify-center"
          >
            <span className="relative flex items-center">
              {isEditing && (
                <span className="absolute flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                </span>
              )}
              <span className="pl-4">Generate Routine</span>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
