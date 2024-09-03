import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

const AutoComplete = ({ suggestions, onSelect, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleChange = (e) => {
    onChange(e.target.value);
    setIsOpen(true);
  };

  const handleSelect = (suggestion) => {
    setTimeout(() => {
      onSelect(suggestion);
      setIsOpen(false);
    }, 100);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        className="bg-slate-100 dark:bg-gray-800 border-gray-700 text-base p-2 rounded-md"
        ref={inputRef}
      />
      {isOpen && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((suggestion, idx) => (
            <motion.div
              key={idx}
              className="p-2 cursor-pointer border-b border-gray-300 dark:border-gray-600 hover:bg-slate-200 dark:hover:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(suggestion);
              }}
              
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              {suggestion}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
