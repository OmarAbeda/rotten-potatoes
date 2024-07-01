// import { useState } from "react";
import "./App.css";

import Mainpage from "./pages/main-page";

function App() {
  // const [darkMode, setDarkMode] = useState<boolean>(false);

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode)
  // }

  return (
    <>
      <div>
        <Mainpage></Mainpage>
      </div>
    </>
  );
}

export default App;
{/* <button className="absolute w-16 h-16 bottom-16 right-16 bg-neutral-900 dark:bg-white rounded-full text-white dark:text-black"
onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button> */}