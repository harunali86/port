import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <button
      aria-label="Toggle Dark Mode"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur text-xl"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      type="button"
    >
      {theme === "dark" ? <Sun className="text-yellow-300" size={21}/> : <Moon className="text-indigo-500" size={21}/>}
    </button>
  );
}
