export default function About() {
    return (
      <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-100">
        <h1 className="text-3xl font-bold mb-4 text-blue-600 dark:text-purple-300">
          About Automate Routine
        </h1>
        <p className="mb-4">
          Automate Routine is a powerful tool designed to help BRAC University students and optimal class schedules. This application generates the best possible routines based on your preferences and constraints.
        </p>
        <p className="mb-4">
          With Automate Routine, you can:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Input your course codes and preferences</li>
          <li>Specify preferred faculties and sections</li>
          <li>Set minimum and maximum days for classes</li>
          <li>Avoid specific faculties, times, or days</li>
          <li>Generate multiple routine options</li>
        </ul>
        <p className="mb-4">
          My goal is to simplify the process of creating class schedules, saving you time and ensuring you get the best possible routine for your academic needs.
        </p>
        <p className="text-red-400">
          Please note that if the number of combinations becomes too large, the backend may not be able to return all possible routines. In such cases, you may not receive a routine, or the results might be incomplete. It's advisable to keep your constraints flexible to get the most accurate and feasible schedules.
        </p>
      </div>
    );
  }
  