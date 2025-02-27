import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const CustomToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme} className="btn btn-ghost">
      {theme === "light" ? <MdDarkMode size={24} className="text-black" /> : <MdLightMode className="text-white" size={24} />}
     
    </button>
  );
};

export default CustomToggle;