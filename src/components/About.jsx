import { FaLocationArrow, FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const socialMedia = [
  {
    id: '1',
    platform: 'Twitter',
    link: 'https://twitter.com/mh_the1/',
    icon: <FaTwitter size={24} />,
  },
  {
    id: '2',
    platform: 'LinkedIn',
    link: 'https://linkedin.com/in/mehedi-hasan-tanvir-5507b0228/',
    icon: <FaLinkedinIn size={24} />,
  },
  {
    id: '3',
    platform: 'GitHub',
    link: 'https://github.com/mhthe1',
    icon: <FaGithub size={24} />,
  },
  {
    id: '4',
    platform: 'Instagram',
    link: 'https://instagram.com/mhthe1',
    icon: <FaInstagram size={24} />,
  },
  {
    id: '5',
    platform: 'Facebook',
    link: 'https://facebook.com/mhthe1',
    icon: <FaFacebookF size={24} />,
  },
];

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-blue-600 dark:text-purple-300">
        About Automate Routine
      </h1>
      <p className="mb-4">
        Automate Routine is a powerful tool designed to help BRAC University students create optimal class schedules. This application generates the best possible routines based on your preferences and constraints.
      </p>
      <p className="mb-4">With Automate Routine, you can:</p>
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

      <h1 className="text-3xl font-bold mt-8 mb-4 text-blue-600 dark:text-purple-300">About the Developer</h1>
      <p className="mb-4">
        I'm <span className='text-purple-500 font-bold'>Mehedi Hasan Tanvir</span>, the developer behind Automate Routine. I'm passionate about building efficient tools that make people's lives easier. You can reach out to me via email or connect with me on my social media platforms.
      </p>

      <div className="flex flex-wrap gap-6 justify-center items-center">
        {socialMedia.map((info) => (
          <a
            key={info.id}
            href={info.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center gap-4 px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 transition-all duration-300 w-80 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
          >
            <div className="text-purple-500">{info.icon}</div>
            <span className="text-lg font-medium">{info.platform}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
