import { useState } from "react";

type MoveLearnMethod = "level-up" | "machine" | "egg" | "tutor";

type MoveTabsProps = {
  tab: MoveLearnMethod;
};

const MoveTabs = ({tab}: MoveTabsProps) => {
  const [activeTab, setActiveTab] = useState<MoveLearnMethod>('level-up');
  const tabs: MoveLearnMethod[] = ['level-up', 'machine', 'egg', 'tutor'];

  return (
    <div 
    className="flex gap-1 mb-5 border-b border-zinc-300 dark:border-[#a855f7] pb-.5"
    >
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`py-2 px-4 text-[.85rem] bg-transparent relative pointer transition-all duration-200
            ${activeTab === tab ? 'text-orange-400 dark:text-orange-400 border-b-2 border-[#a855f7]' : 'text-zinc-500 dark:text-zinc-400'}`}
         
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default MoveTabs;