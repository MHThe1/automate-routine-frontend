export default function Footer() {
    return (
        <footer className="sticky bottom-0 flex flex-col items-center justify-center p-2 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 font-mono">
            <p className="mb-1">Developed with 🤍 by: @mhthe1</p>
            <ul className="flex space-x-4">
                <SocailLink link="https://mehedihtanvir.me" icon="/icons/myDp.png" platform="Dev Portfolio" />
                <SocailLink link="https://github.com/MHThe1" icon="/icons/github-icon.png" platform="GitHub" />
                <SocailLink link="https://www.linkedin.com/in/mehedi-hasan-tanvir-5507b0228/" icon="/icons/linkedin-icon.png" platform="LinkedIn" />
                <SocailLink link="https://instagram.com/mhthe1" icon="/icons/instagram-icon.png" platform="Instagram" />
                <SocailLink link="https://facebook.com/mhthe1" icon="/icons/facebook-icon.png" platform="Facebook" />
            </ul>
        </footer>
    );
}

const SocailLink = ({ link, platform, icon }) => {
    return (
        <li className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-125 ease-linear">
            <a href={link} target="_blank" rel="noopener noreferrer">
                <img src={icon} alt={platform} className="w-full h-full" />
            </a>
        </li>
    )
}
