import { useState } from "react";

const MoveTabs = () => {
  const [activeTab, setActiveTab] = useState('Level Up');
  const tabs = ['Level Up', 'TM Moves', 'Egg Moves', 'Tutor Moves'];

  return (
    <div 
    className="flex gap-1 mb-5 border-b-white/50 pb-.5"
    >
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`py-2 px-4 text-[.85rem] bg-transparent relative pointer transition-all duration-200
            ${activeTab === tab ? 'text-white border-b-2 border-[#a855f7]' : 'text-gray-500'}`}
         
        >
          {tab}
        </button>
      ))}
    </div>
  );
};