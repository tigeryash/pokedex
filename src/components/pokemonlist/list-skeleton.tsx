import React from "react";

const ListSkeleton = () => {
  return (
    <div
      className="flex-1 space-y-4 p-2 md:grid md:gap-4 xl:gap-6 
    md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1500px] md:mx-auto md:grid-cols-4 md:space-y-0"
    >
      {Array.from({ length: 10 }).map((_, index) => (
        // <div
        //   key={index}
        //   className="skeleton w-full h-24 shadow-lg rounded-xl bg-gray-700"
        // ></div>
        <p key={index}>Loading</p>
      ))}
    </div>
  );
};

export default ListSkeleton;
