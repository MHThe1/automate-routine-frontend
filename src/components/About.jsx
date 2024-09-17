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
      <h1 className="text-4xl font-bold mb-6 text-blue-600 dark:text-purple-300 border-b-2 border-blue-600 dark:border-purple-300 pb-2">
        About Automate Routine
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <p className="mb-4 text-lg">
          Automate Routine is a powerful tool designed to help BRAC University students create optimal class schedules. This application generates the best possible routines based on your preferences and constraints.
        </p>
        <h2 className="text-2xl font-semibold mb-3 text-blue-500 dark:text-purple-400">Key Features:</h2>
        <ul className="list-none mb-4 space-y-2">
          {[
            "Input your course codes and preferences",
            "Specify preferred faculties and sections",
            "Set minimum and maximum days for classes",
            "Avoid specific faculties, times, or days",
            "Generate multiple routine options"
          ].map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        <p className="mb-4 text-lg">
          My goal is to simplify the process of creating class schedules, saving you time and ensuring you get the best possible routine for your academic needs.
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-blue-600 dark:text-purple-300 border-b-2 border-blue-600 dark:border-purple-300 pb-2">About the Developer</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <p className="mb-6 text-lg">
          I'm <span className='text-purple-500 font-bold'>Mehedi Hasan Tanvir</span>, the developer behind Automate Routine. I'm passionate about building efficient tools that make people's lives easier. You can reach out to me via email or connect with me on my social media platforms.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-4 py-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-300 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            >
              <div className="text-purple-500">{info.icon}</div>
              <span className="text-lg font-medium">{info.platform}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}