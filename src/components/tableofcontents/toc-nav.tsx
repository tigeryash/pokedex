'use client'

import { useState } from "react";

 const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'abilities', label: 'Abilities' },
    { id: 'stats', label: 'Stats' },
    { id: 'effectiveness', label: 'Type Chart' },
    { id: 'moves', label: 'Moves' },
    { id: 'evolution', label: 'Evolution' },
    { id: 'training', label: 'Training' },
    { id: 'breeding', label: 'Breeding' },
    { id: 'locations', label: 'Locations' }
  ];

const TOCNav = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [isOpen, setIsOpen] = useState(false);

    const onNavigate = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
return (

    <>
    <div className="relative lg:hidden">
        <button 
        className="rounded-full border border-white/10 bg-[#e5e5e5] dark:bg-[rgba(10,10,10,0.95)] p-2.5 
        shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-[20px] lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        >
        {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
        </button>
        {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-full rounded-lg border
             border-white/10 bg-[#e5e5e5] dark:bg-[rgba(10,10,10,0.95)] p-2 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-[20px]
             lg:hidden">
                {sections.map(section => (
                    <button
                        key={section.id}
                        onClick={() => { onNavigate(section.id); setIsOpen(false); }}
                        className={`cursor-pointer whitespace-nowrap rounded-full border-none bg-transparent md:px-2 xl:px-4.5 xl:py-2 py-3 text-xs xl:text-sm font-medium transition-all hover:text-[var(--text-secondary)] ${
                            activeSection === section.id
                                ? 'bg-[var(--text-primary)] '
                                : ''
                        }`}
                    >
                        {section.label}
                    </button>
                ))}
            </div>
        )
        }
    </div>
    <div className="hidden lg:flex gap-1 xl:gap-2 rounded-full border border-white/10 bg-[#e5e5e5] dark:bg-[rgba(10,10,10,0.95)] p-2 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-[20px]">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`cursor-pointer whitespace-nowrap rounded-full border-none bg-transparent md:px-2 xl:px-4.5 xl:py-2 py-3 text-xs xl:text-sm font-medium transition-all hover:text-[var(--text-secondary)] ${
              activeSection === section.id
                ? 'bg-[var(--text-primary)] '
                : ''
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </>
  )
}

export default TOCNav