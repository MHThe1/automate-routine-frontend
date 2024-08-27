import Header from './components/Header.jsx';
import { ThemeMode } from './components/ToggleTheme.jsx';
import Footer from './components/Footer.jsx';


function App() {

  return (
    <div id="mainbody" className={ThemeMode() ? "dark" : ""}>
        <div className="flex flex-col min-h-screen bg-neutral-100 dark:bg-neutral-900">
          <main className="flex-grow lg:px-10 xl:px-16 2xl:px-20 font-quicksand font-smooth-antialiased">
            <Header />

          </main>
          <Footer />
        </div>
    </div>
  );
}

export default App;
