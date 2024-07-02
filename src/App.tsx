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
      <div className="min-h-screen bg-black text-gray-500">
        <div className="flex h-full min-h-screen flex-col">
          <div className="container mx-auto h-full flex-grow p-4">
            <Mainpage></Mainpage>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
{
  /* <button className="absolute w-16 h-16 bottom-16 right-16 bg-neutral-900 dark:bg-white rounded-full text-white dark:text-black"
onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button> */
}
