"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import solgaleo from "../../public/solgaleo.png";
import lunala from "../../public/lunala.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="hidden md:fixed md:flex flex-col items-center justify-center text-[#EE7318] dark:text-[#E5DA7F] bottom-20 right-3
  p-3 rounded-full bg-[#FBF7EE] dark:bg-[#240E62] border-2 border-[#EE7318] dark:border-[#E5DA7F] overflow-x-hidden"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Image
              src={theme === "light" ? solgaleo : lunala}
              alt="light mode"
              className="w-6 h-6"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Change to {theme === "light" ? "Dark" : "Light"} Mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeToggle;
