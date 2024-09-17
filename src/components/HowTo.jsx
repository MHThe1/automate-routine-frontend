export default function HowTo() {
    return (
      <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-100">
        <h1 className="text-3xl font-bold mb-4 text-blue-600 dark:text-purple-300">How to Use Automate Routine</h1>
        <ol className="list-decimal list-inside space-y-4">
          <li>
            <strong>Enter Course Codes:</strong> Input the course codes for the classes you want to take.
          </li>
          <li>
            <strong>Specify Preferences:</strong> For each course, you can optionally specify preferred sections and faculties.
          </li>
          <li>
            <strong>Set Schedule Constraints:</strong> Choose the minimum and maximum number of days you want classes scheduled.
          </li>
          <li>
            <strong>Add Avoidance Criteria:</strong> If needed, specify faculties, times, or days you want to avoid.
          </li>
          <li>
            <strong>Generate Routines:</strong> Click the "Generate Routines" button to create possible schedules based on your input.
          </li>
          <li>
            <strong>Review Results:</strong> Browse through the generated routines and choose the one that best fits your needs.
          </li>
          <li>
            <strong>Refine Your Search:</strong> If you're not satisfied with the results, you can adjust your preferences and generate new routines.
          </li>
        </ol>
        <p className="mt-4">
          Remember, the more specific your preferences, the more tailored your results will be. However, being too restrictive might limit the number of possible routines.
        </p>
        <p className="mt-4">
          <strong className="text-red-400">Important Note:</strong> If the combinations of courses and preferences become too numerous, the backend may not be able to process the request and return the combinations. To avoid this, try to keep your preferences and constraints manageable.
        </p>
      </div>
    )
}
