"use client";
import useHeaderPosition from "@/hooks/useHeaderPosition";
import Search from "../header/search";
import Tags from "../header/tags";
import { useScroll } from "framer-motion";

const IntroSection = () => {
  const { isSticky, headerRef, searchRef, setScrollProgress } =
    useHeaderPosition();
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start 7%", "start 3%"],
  });

  setScrollProgress(scrollYProgress);
  return (
    <div className="pt-16 flex flex-col justify-between items-center space-y-4 w-full">
      <h1
        className={`text-2xl font-semibold ${
          isSticky ? "invisible pb-20" : "visible"
        }`}
        id="iheader"
        ref={headerRef}
      >
        YashDex
      </h1>
      <div
        className={`flex flex-col space-y-4 justify-center w-full  ${
          isSticky ? "fixed top-10 backdrop-blur-md" : "relative"
        }`}
        ref={searchRef}
      >
        <Search />
        <Tags />
      </div>
    </div>
  );
};

export default IntroSection;
