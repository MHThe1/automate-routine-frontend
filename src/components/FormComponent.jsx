import React, { useState, useEffect } from "react";
import axios from "axios";

import AvoidTimeSelector from "./AvoidTimeSelector";

const FormComponent = ({
  courseCodes,
  courseDetails,
  minDays,
  maxDays,
  avoidTime,
  setCourseCodes,
  setCourseDetails,
  setMinDays,
  setMaxDays,
  setAvoidTime,
  handleFormSubmit,
}) => {
  const [dropdownOptions, setDropdownOptions] = useState(Array(5).fill([]));
  const [suggestions, setSuggestions] = useState(Array(5).fill([]));

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
        const response = await axios.get(
          `http://192.168.0.155:8000/sections/${code.trim()}/`
        );
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
    const updatedCodes = [...courseCodes];
    updatedCodes[index] = value;
    setCourseCodes(updatedCodes);

    if (value.trim() !== "") {
      try {
        const response = await axios.get(
          `http://192.168.0.155:8000/course-code-suggestions/?q=${value}`
        );
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
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
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

      <div className="mb-4 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center">
            <label
              htmlFor="minDays"
              className="block text-gray-700 dark:text-stone-100 font-bold mb-2 mr-1"
            >
              Minimum Days:
            </label>
            <select
              id="minDays"
              value={minDays}
              onChange={(e) => setMinDays(parseInt(e.target.value, 10))}
              className="w-auto px-5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {[2, 3, 4, 5, 6].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <label
              htmlFor="minDays"
              className="block text-gray-700 dark:text-stone-100 font-bold mb-2 ml-2 mr-1"
            >
              Maximum Days:
            </label>
            <select
              id="maxDays"
              value={maxDays}
              onChange={(e) => setMaxDays(parseInt(e.target.value, 10))}
              className="w-auto px-5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {[3, 4, 5, 6].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <AvoidTimeSelector avoidTime={avoidTime} setAvoidTime={setAvoidTime} />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Generate Routine
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormComponent;
