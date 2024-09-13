import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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
  const [preloadedCourseCodes, setPreloadedCourseCodes] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState(
    Array(NUM_INPUTS).fill([])
  );
  const [suggestions, setSuggestions] = useState(Array(NUM_INPUTS).fill([]));
  const [formError, setFormError] = useState(null);

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

    preloadCourseCodes();
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
    updatedDetails[index] = "";
    setCourseDetails(updatedDetails);

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
      } catch (error) {
        console.error("Error fetching course details:", error);
        setDropdownOptions((prev) => {
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
    }
  };

  const handleDetailChange = (index, value) => {
    const updatedDetails = [...courseDetails];
    updatedDetails[index] = value;
    setCourseDetails(updatedDetails);
    setIsEditing(true);
    setFormError(null);
  };

  const handleClearSection = (index) => {
    const updatedDetails = [...courseDetails];
    updatedDetails[index] = "";
    setCourseDetails(updatedDetails);
    setIsEditing(true);
    setFormError(null);

  };

  const validateForm = () => {
    const filledSections = courseDetails.filter(
      (detail) => detail.trim() !== ""
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-8 space-y-10 dark:bg-gray-900 bg-slate-300 dark:text-gray-100 text-black rounded-lg shadow-2xl"
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-blue-600 dark:text-purple-300">
              Course Selection
            </h2>
            {Array.from({ length: NUM_INPUTS }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-2 gap-4"
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
                    Section
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Select
                      value={courseDetails[index] || ""}
                      onValueChange={(value) =>
                        handleDetailChange(index, value)
                      }
                    >
                      <SelectTrigger
                        id={`courseDetails${index}`}
                        className="bg-slate-100 dark:bg-gray-800 border-gray-700 text-base"
                      >
                        <SelectValue placeholder="Select Section" />
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
                      variant="outline"
                      size="sm"
                      onClick={() => handleClearSection(index)}
                    >
                      <span className="text-red-600">x</span>
                    </button>
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

              <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8">
                <div className="flex-1 space-y-2">
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

                <div className="flex-1 space-y-2">
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
