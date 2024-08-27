import useLocalStorage from 'use-local-storage';

import sunIcon from '../assets/icons/sun-icon.png';
import moonIcon from '../assets/icons/moon-icon.png';

export default function ToggleTheme() {
    const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [darkMode, setDarkMode] = useLocalStorage("isDark", preference);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }
    return (
        <button
            onClick={toggleDarkMode}
            className="w-8 h-8 rounded-full"
        >
            {darkMode ? (
                <img src={sunIcon} />
            ) : (
                <img src={moonIcon} />
            )}
        </button>
    )
}

export const ThemeMode = () => {
    const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [darkMode] = useLocalStorage("isDark", preference);
    return darkMode;
};