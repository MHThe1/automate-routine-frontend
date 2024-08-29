import { Button } from "@/components/ui/button";

const GenerateRoutineButton = ({ isEditing }) => {
  return (
    <Button
      type="submit"
      className="w-full mt-6 bg-purple-500 text-white text-xl hover:bg-purple-600 px-6 py-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 flex items-center justify-center"
    >
      <span className="relative flex items-center">
        {isEditing && (
          <span className="absolute flex h-3 w-3 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400"></span>
          </span>
        )}
        <span className="pl-4">Generate Routine</span>
      </span>
    </Button>
  );
};

export default GenerateRoutineButton;
