export default function HowTo() {
  const steps = [
    {
      title: "Enter Course Codes",
      description: "Input the course codes for the classes you want to take.",
    },
    {
      title: "Specify Preferences",
      description:
        "For each course, you can optionally specify preferred sections and faculties.",
    },
    {
      title: "Set Schedule Constraints",
      description:
        "Choose the minimum and maximum number of days you want classes scheduled.",
    },
    {
      title: "Add Avoidance Criteria",
      description:
        "If needed, specify faculties, times, or days you want to avoid.",
    },
    {
      title: "Generate Routines",
      description:
        "Click the 'Generate Routines' button to create possible schedules based on your input.",
    },
    {
      title: "Review Results",
      description:
        "Browse through the generated routines and choose the one that best fits your needs.",
    },
    {
      title: "Refine Your Search",
      description:
        "If you're not satisfied with the results, you can adjust your preferences and generate new routines.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-blue-600 dark:text-purple-300 border-b-2 border-blue-600 dark:border-purple-300 pb-2">
        How to Use Automate Routine
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <ol className="space-y-6">
          {steps.map((step, index) => (
            <li key={index} className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 dark:bg-purple-500 flex items-center justify-center text-white font-bold text-lg">
                {index + 1}
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-1 text-blue-600 dark:text-purple-300">
                  {step.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200">
            <strong>Remember:</strong> The more specific your preferences, the
            more tailored your results will be. However, being too restrictive
            might limit the number of possible routines.
          </p>
        </div>

        <div className="mt-6 p-4 bg-red-100 dark:bg-red-900 rounded-lg">
          <p className="text-white bg-red-100 dark:bg-red-900 p-3 rounded-lg">
            <strong>Important Note:</strong> If the number of combinations
            becomes too large, the backend may not be able to return all
            possible routines. In such cases, you may not receive a routine, or
            the results might be incomplete. It's advisable to keep your
            constraints flexible to get the most accurate and feasible
            schedules.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-purple-300 border-b-2 border-blue-600 dark:border-purple-300 pb-2">
          Watch the Tutorial
        </h2>
        <div className="flex justify-center items-center rounded-lg shadow-lg">
          <iframe
            className="w-[80%] h-auto aspect-video"
            src="https://www.youtube.com/embed/mwD9vMajmW4"
            title="Automate Routine Tutorial"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
