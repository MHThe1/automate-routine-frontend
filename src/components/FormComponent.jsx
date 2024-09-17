import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AutoComplete from "./AutoComplete";

import AvoidTimeSelector from "./AvoidTimeSelector";
import GenerateRoutineButton from "./GenerateRoutineButton";

const NUM_INPUTS = 6;

const FormComponent = ({
  courseCodes,
  courseDetails,
  preferredFaculties,
  minDays,
  maxDays,
  avoidFaculty,
  avoidTime,
  avoidDay,
  setCourseCodes,
  setCourseDetails,
  setPreferredFaculties,
  setMinDays,
  setMaxDays,
  setAvoidFaculty,
  setAvoidTime,
  setAvoidDay,
  handleFormSubmit,
  isEditing,
  setIsEditing,
}) => {
  const [preloadedCourseCodes, setPreloadedCourseCodes] = useState([]);
  const [preloadedFaculties, setPreloadedFaculties] = useState({});
  const [dropdownOptions, setDropdownOptions] = useState(
    Array(NUM_INPUTS).fill([])
  );
  const [suggestions, setSuggestions] = useState(Array(NUM_INPUTS).fill([]));
  const [formError, setFormError] = useState(null);

  const [facultyInput, setFacultyInput] = useState("");
  const [facultyOptions, setFacultyOptions] = useState(
    Array(NUM_INPUTS).fill([])
  );

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const preloadCourseCodes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/all-course-codes/`);
        setPreloadedCourseCodes(response.data);
      } catch (error) {
        console.error("Error preloading course codes:", error);
      }
    };

    const preloadFaculties = async () => {
      try {
        const response = await axios.get(`${apiUrl}/all-course-faculties/`);
        setPreloadedFaculties(response.data);
      } catch (error) {
        console.error("Error preloading faculties:", error);
      }
    };

    preloadCourseCodes();
    preloadFaculties();
  }, [apiUrl]);

  const handleCodeChange = async (index, value) => {
    const capitalizedValue = value.toUpperCase().trim();

    const updatedCodes = [...courseCodes];
    updatedCodes[index] = capitalizedValue;

    const filteredCodes = updatedCodes.filter((code) => code !== "");

    setCourseCodes(filteredCodes);
    setIsEditing(true);

    // Reset the section when changing the course code
    const updatedDetails = [...courseDetails];
    updatedDetails[index] = [];
    setCourseDetails(updatedDetails);

    // Reset preferred faculties for this course
    const updatedPreferredFaculties = [...preferredFaculties];
    updatedPreferredFaculties[index] = [];
    setPreferredFaculties(updatedPreferredFaculties);

    if (capitalizedValue !== "") {
      const filteredSuggestions = preloadedCourseCodes.filter((code) =>
        code.startsWith(capitalizedValue)
      );

      setSuggestions((prev) => {
        const newSuggestions = [...prev];
        newSuggestions[index] = filteredSuggestions;
        return newSuggestions;
      });

      try {
        const response = await axios.get(
          `${apiUrl}/sections/${capitalizedValue}/`
        );
        setDropdownOptions((prev) => {
          const newOptions = [...prev];
          newOptions[index] = response.data;
          return newOptions;
        });

        // Update faculty options for this course
        const courseFaculties = preloadedFaculties[capitalizedValue] || [];
        setFacultyOptions((prev) => {
          const newOptions = [...prev];
          newOptions[index] = courseFaculties;
          return newOptions;
        });
      } catch (error) {
        console.error("Error fetching course details:", error);
        setDropdownOptions((prev) => {
          const newOptions = [...prev];
          newOptions[index] = [];
          return newOptions;
        });
        setFacultyOptions((prev) => {
          const newOptions = [...prev];
          newOptions[index] = [];
          return newOptions;
        });
      }
    } else {
      setSuggestions((prev) => {
        const newSuggestions = [...prev];
        newSuggestions[index] = [];
        return newSuggestions;
      });
      setFacultyOptions((prev) => {
        const newOptions = [...prev];
        newOptions[index] = [];
        return newOptions;
      });
    }
  };

  const handleDetailChange = (index, value) => {
    const updatedDetails = [...courseDetails];
    if (!updatedDetails[index]) {
      updatedDetails[index] = [];
    }
    if (!updatedDetails[index].includes(value)) {
      updatedDetails[index] = [...updatedDetails[index], value];
    }
    setCourseDetails(updatedDetails);
    setIsEditing(true);
    setFormError(null);
  };

  const handleRemoveSection = (index, section) => {
    const updatedDetails = [...courseDetails];
    updatedDetails[index] = updatedDetails[index].filter(
      (detail) => detail !== section
    );
    setCourseDetails(updatedDetails);
    setIsEditing(true);
    setFormError(null);
  };

  const handleClearAllSections = (index) => {
    const updatedDetails = [...courseDetails];
    updatedDetails[index] = [];
    setCourseDetails(updatedDetails);
    setIsEditing(true);
    setFormError(null);
  };

  const handlePreferredFacultyChange = (index, value) => {
    const updatedPreferredFaculties = [...preferredFaculties];
    if (!updatedPreferredFaculties[index]) {
      updatedPreferredFaculties[index] = [];
    }
    if (!updatedPreferredFaculties[index].includes(value)) {
      updatedPreferredFaculties[index] = [
        ...updatedPreferredFaculties[index],
        value,
      ];
    }
    setPreferredFaculties(updatedPreferredFaculties);
    setIsEditing(true);
  };

  const handleRemovePreferredFaculty = (index, faculty) => {
    const updatedPreferredFaculties = [...preferredFaculties];
    updatedPreferredFaculties[index] = updatedPreferredFaculties[index].filter(
      (f) => f !== faculty
    );
    setPreferredFaculties(updatedPreferredFaculties);
    setIsEditing(true);
  };

  const validateForm = () => {
    const filledSections = courseDetails.filter(
      (details) => details.length > 0 // Check if sections are present
    ).length;

    if (courseCodes.length === 4 && filledSections < 1) {
      setFormError("4c1s");
      return false;
    } else if (courseCodes.length === 5 && filledSections < 2) {
      setFormError("5c2s");
      return false;
    } else if (courseCodes.length === 6 && filledSections < 3) {
      setFormError("6c3s");
      return false;
    }

    setFormError(null);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleFormSubmit(e);
    }
  };

  const handleAddFaculty = () => {
    if (facultyInput.trim()) {
      const capitalizedInput = facultyInput.toUpperCase().trim();
      if (!avoidFaculty.includes(capitalizedInput)) {
        setAvoidFaculty([...avoidFaculty, capitalizedInput]);
        setFacultyInput("");
        setIsEditing(true);
      }
    }
  };

  const handleRemoveFaculty = (faculty) => {
    setAvoidFaculty(avoidFaculty.filter((f) => f !== faculty));
    setIsEditing(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-8 space-y-10 dark:bg-gray-900 bg-slate-300 dark:text-gray-100 text-black rounded-lg shadow-2xl"
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold text-blue-600 dark:text-purple-300">
              Course Selection
            </h2>
            {Array.from({ length: NUM_INPUTS }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-3 gap-4"
              >
                <div className="space-y-2">
                  <Label
                    htmlFor={`courseCode${index}`}
                    className="text-black dark:text-gray-300 text-base"
                  >
                    Course {index + 1}
                  </Label>
                  <AutoComplete
                    value={courseCodes[index] || ""}
                    suggestions={suggestions[index]}
                    onChange={(value) => handleCodeChange(index, value)}
                    onSelect={(value) => handleCodeChange(index, value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor={`courseDetails${index}`}
                    className="text-gray-300 text-base"
                  >
                    Sections
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Select
                      value=""
                      onValueChange={(value) =>
                        handleDetailChange(index, value)
                      }
                    >
                      <SelectTrigger
                        id={`courseDetails${index}`}
                        className="bg-slate-100 dark:bg-gray-800 border-gray-700 text-base"
                      >
                        <SelectValue placeholder="Select Sections" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-100 dark:bg-slate-600 border-gray-700">
                        {dropdownOptions[index].map((detail) => (
                          <SelectItem
                            key={detail.id}
                            value={detail.courseDetails}
                          >
                            {detail.courseDetails}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <button
                      type="button"
                      onClick={() => handleClearAllSections(index)}
                      className="px-2 py-1 text-red-500 rounded hover:bg-red-600 hover:text-white"
                    >
                      x
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {courseDetails[index] &&
                      courseDetails[index].map((section, sectionIndex) => (
                        <div
                          key={sectionIndex}
                          className="bg-slate-200 dark:bg-gray-700 px-2 py-1 rounded-md flex items-center"
                        >
                          <span>{section}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSection(index, section)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            x
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor={`preferredFaculty${index}`}
                    className="text-gray-300 text-base"
                  >
                    Faculties
                  </Label>
                  <Select
                    value=""
                    onValueChange={(value) =>
                      handlePreferredFacultyChange(index, value)
                    }
                  >
                    <SelectTrigger
                      id={`preferredFaculty${index}`}
                      className="bg-slate-100 dark:bg-gray-800 border-gray-700 text-base"
                    >
                      <SelectValue placeholder="Select Faculty" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-100 dark:bg-slate-600 border-gray-700">
                      {facultyOptions[index].map((faculty) => (
                        <SelectItem key={faculty} value={faculty}>
                          {faculty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {preferredFaculties[index] &&
                      preferredFaculties[index].map((faculty, facultyIndex) => (
                        <div
                          key={facultyIndex}
                          className="bg-slate-200 dark:bg-gray-700 px-2 py-1 rounded-md flex items-center"
                        >
                          <span>{faculty}</span>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemovePreferredFaculty(index, faculty)
                            }
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            x
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-blue-600 dark:text-purple-300">
                Preferences
              </h2>

              <div className="flex flex-col space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="min-days"
                    className="text-gray-950 dark:text-gray-300 text-base"
                  >
                    Minimum Days: {minDays}
                  </Label>
                  <Slider
                    id="min-days"
                    min={2}
                    max={6}
                    step={1}
                    value={[minDays]}
                    onValueChange={([value]) => {
                      setMinDays(value);
                      setIsEditing(true);
                    }}
                    className="bg-gray-600 dark:bg-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="max-days"
                    className="text-gray-950 dark:text-gray-300 text-base"
                  >
                    Maximum Days: {maxDays}
                  </Label>
                  <Slider
                    id="max-days"
                    min={2}
                    max={6}
                    step={1}
                    value={[maxDays]}
                    onValueChange={([value]) => {
                      setMaxDays(value);
                      setIsEditing(true);
                    }}
                    className="bg-gray-600 dark:bg-slate-400"
                  />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-blue-600 dark:text-purple-300">
                Filters
              </h2>

              <div className="space-y-2">
                <label
                  htmlFor="avoid-faculty"
                  className="dark:text-gray-300 text-black text-md"
                >
                  Avoid Faculty:
                </label>
                <div className="flex space-x-2">
                  <Input
                    id="avoid-faculty"
                    value={facultyInput}
                    onChange={(e) => setFacultyInput(e.target.value)}
                    placeholder="Enter faculty initials"
                    className="bg-slate-100 dark:bg-gray-800 border-gray-700"
                  />
                  <Button
                    onClick={handleAddFaculty}
                    type="button"
                    className="bg-purple-600 text-white"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {avoidFaculty.map((faculty, index) => (
                    <div
                      key={index}
                      className="bg-slate-200 dark:bg-gray-700 px-2 py-1 rounded-md flex items-center"
                    >
                      <span>{faculty}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFaculty(faculty)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <AvoidTimeSelector
                avoidTime={avoidTime}
                setAvoidTime={setAvoidTime}
                avoidDay={avoidDay}
                setAvoidDay={setAvoidDay}
                setIsEditing={setIsEditing}
              />
            </div>
          </motion.div>
        </div>
        {formError && (
          <div className="text-red-500 text-sm mt-4 text-center">
            {formError === "4c1s" && (
              <>
                {
                  "If you want to generate a routine with 4 courses, please add at least 1 section."
                }
                <br />
                {"Your request will fail without at least 1 section added."}
              </>
            )}
            {formError === "5c2s" && (
              <>
                {
                  "If you want to generate a routine with 5 courses, please add at least 2 sections."
                }
                <br />
                {"Your request will fail without at least 2 sections added."}
              </>
            )}
            {formError === "6c3s" && (
              <>
                {
                  "If you want to generate a routine with 6 courses, please add at least 3 sections."
                }
                <br />
                {"Your request will fail without at least 3 sections added."}
              </>
            )}
          </div>
        )}

        <GenerateRoutineButton isEditing={isEditing} />
      </form>
    </motion.div>
  );
};

export default FormComponent;
