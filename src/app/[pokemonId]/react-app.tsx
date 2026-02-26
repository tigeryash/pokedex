import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Volume2, ArrowRight, Circle, Hexagon, Target } from 'lucide-react';
import { PokemonTypesColors, PokemonTypesColorsRGBA, PokemonTypes } from '@/lib/constants';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const customStyles = {
  root: {
    '--bg-deep': '#050505',
    '--bg-surface': '#0f0f0f',
    '--text-primary': '#ffffff',
    '--text-secondary': '#71717a',
    '--text-tertiary': '#404040',
    '--accent': '#a855f7',
    '--radius-pill': '999px',
    '--radius-card': '2px',
    '--radius-panel': '16px',
    '--space-xs': '8px',
    '--space-s': '16px',
    '--space-m': '24px',
    '--space-l': '32px',
    '--space-xl': '64px'
  }
};


const CategoryIcon = ({ category }: { category: string }) => {
  if (category === 'special') {
    return <Target className="w-3.5 h-3.5" />;
  }
  return <Hexagon className="w-3.5 h-3.5" />;
};



const DataPanel = ({ onSectionChange }: { onSectionChange: (section: string) => void }) => {
  const [activeTab, setActiveTab] = useState('Level Up');
  const dataPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!dataPanelRef.current) return;
      
      const sections = dataPanelRef.current.querySelectorAll('[data-section]');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (dataPanelRef.current && dataPanelRef.current.scrollTop >= sectionTop - 100) {
          current = section.getAttribute('data-section') || '';
        }
      });
      
      if (current) {
        onSectionChange(current);
      }
    };

    const panel = dataPanelRef.current;
    if (panel) {
      panel.addEventListener('scroll', handleScroll);
      return () => panel.removeEventListener('scroll', handleScroll);
    }
  }, [onSectionChange]);

  return (
    <div
      ref={dataPanelRef}
      className="pt-20 px-16 pb-8 overflow-y-auto flex flex-col gap-10 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-700"
    >
      <div data-section="overview">
        <div className="flex items-center gap-4 mb-3">
          <h1 className="m-0 text-6xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            Gengar
          </h1>
          <button className="bg-white/5 border border-white/10 rounded-full w-10 h-10 flex items-center justify-center text-[var(--text-secondary)] cursor-pointer hover:bg-white/10 transition-colors">
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-2 mb-6">
          <div 
            className="px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
            style={{
              background: PokemonTypesColorsRGBA.ghost,
              border: `1px solid ${PokemonTypesColors.ghost}`,
              color: '#c4b5fd'
            }}
          >
            <TypeIcon type="ghost" />
            Ghost
          </div>
          <div 
            className="px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
            style={{
              background: PokemonTypesColorsRGBA.poison,
              border: `1px solid ${PokemonTypesColors.poison}`,
              color: '#e9d5ff'
            }}
          >
            <TypeIcon type="poison" />
            Poison
          </div>
        </div>
        <div className="text-lg leading-relaxed text-[var(--text-secondary)] max-w-[600px] border-l-2 border-[var(--accent)] pl-5">
          Under a full moon, this Pokémon likes to mimic the shadows of people and laugh at their fright. It absorbs the life force of its prey.
        </div>
      </div>

      <div data-section="abilities">
        <SectionLabel>Abilities</SectionLabel>
        <div className="flex flex-col gap-4">
          <div className="p-5 bg-white/[0.02] border border-white/5 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg font-semibold text-[var(--text-primary)]">Cursed Body</span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)] m-0">
              When a move hits this Pokémon, that move has a 30% chance of becoming disabled. A disabled move cannot be used until it is re-enabled by switching out.
            </p>
          </div>
          <div className="p-5 bg-white/[0.02] border border-white/5 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg font-semibold text-[var(--text-primary)]">Levitate</span>
              <span className="px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider bg-purple-500/20 text-[var(--accent)] rounded">
                Hidden
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)] m-0">
              This Pokémon is immune to Ground-type moves, Spikes, Toxic Spikes, and Arena Trap.
            </p>
          </div>
        </div>
      </div>

      <div>
        <SectionLabel>Physical Specs</SectionLabel>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-[var(--text-secondary)] font-medium">Height</span>
            <span className="text-2xl font-semibold text-[var(--text-primary)]">
              1.5m <span className="text-sm text-[var(--text-secondary)] font-normal">(4'11")</span>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-[var(--text-secondary)] font-medium">Weight</span>
            <span className="text-2xl font-semibold text-[var(--text-primary)]">
              40.5kg <span className="text-sm text-[var(--text-secondary)] font-normal">(89.3 lbs)</span>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-[var(--text-secondary)] font-medium">Category</span>
            <span className="text-2xl font-semibold text-[var(--text-primary)]">Shadow</span>
          </div>
        </div>
      </div>

      <div data-section="stats">
        <SectionLabel>Base Statistics</SectionLabel>
        <div className="flex flex-col gap-4 p-6 bg-white/[0.02] rounded-xl border border-white/5">
          <div className="grid grid-cols-[100px_1fr_60px_60px_60px] items-center gap-4 pb-3 border-b border-white/5">
            <span className="text-[0.7rem] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider text-left">Stat</span>
            <span className="text-[0.7rem] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider text-center"></span>
            <span className="text-[0.7rem] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider text-right">Base</span>
            <span className="text-[0.7rem] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider text-right">Min</span>
            <span className="text-[0.7rem] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider text-right">Max</span>
          </div>

          {[
            { label: 'HP', base: 60, min: 200, max: 290, width: '40%', high: false },
            { label: 'Attack', base: 65, min: 121, max: 251, width: '43%', high: false },
            { label: 'Defense', base: 60, min: 112, max: 240, width: '40%', high: false },
            { label: 'Sp. Atk', base: 130, min: 238, max: 394, width: '86%', high: true },
            { label: 'Sp. Def', base: 75, min: 139, max: 273, width: '50%', high: false },
            { label: 'Speed', base: 110, min: 202, max: 350, width: '73%', high: true }
          ].map((stat, index) => (
            <div key={index} className="grid grid-cols-[100px_1fr_60px_60px_60px] items-center gap-4">
              <span className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">{stat.label}</span>
              <div className="h-1 bg-white/5 rounded overflow-hidden relative">
                <div 
                  className={`h-full rounded ${stat.high ? 'bg-[var(--accent)] shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-[var(--text-secondary)]'}`}
                  style={{ width: stat.width }}
                />
              </div>
              <span className="text-base font-semibold text-[var(--text-primary)] text-right">{stat.base}</span>
              <span className="text-xs text-[var(--text-tertiary)] text-right">{stat.min}</span>
              <span className="text-xs text-[var(--text-tertiary)] text-right">{stat.max}</span>
            </div>
          ))}

          <div className="grid grid-cols-[100px_1fr_60px_60px_60px] items-center gap-4 pt-4 mt-2 border-t border-white/10">
            <span className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Total</span>
            <div></div>
            <span className="text-xl font-bold text-[var(--text-primary)] text-right">500</span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div data-section="effectiveness">
        <SectionLabel>Type Effectiveness</SectionLabel>
        <div className="flex flex-col gap-5">
          <div className="p-5 bg-white/[0.02] border border-white/5 rounded-lg">
            <div className="text-sm font-semibold text-[var(--text-secondary)] mb-3 uppercase tracking-wider">Weak to (2x)</div>
            <div className="flex flex-wrap gap-2">
              {['Ground', 'Psychic', 'Ghost', 'Dark'].map(type => (
                <div key={type} className="px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider border border-white/15 text-white/90 bg-white/5 backdrop-blur-sm">
                  {type}
                </div>
              ))}
            </div>
          </div>
          <div className="p-5 bg-white/[0.02] border border-white/5 rounded-lg">
            <div className="text-sm font-semibold text-[var(--text-secondary)] mb-3 uppercase tracking-wider">Resistant to (0.5x)</div>
            <div className="flex flex-wrap gap-2">
              {['Poison', 'Bug', 'Grass', 'Fairy'].map(type => (
                <div key={type} className="px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider border border-white/15 text-white/90 bg-white/5 backdrop-blur-sm">
                  {type}
                </div>
              ))}
            </div>
          </div>
          <div className="p-5 bg-white/[0.02] border border-white/5 rounded-lg">
            <div className="text-sm font-semibold text-[var(--text-secondary)] mb-3 uppercase tracking-wider">Immune to (0x)</div>
            <div className="flex flex-wrap gap-2">
              {['Normal', 'Fighting', 'Ground'].map(type => (
                <div key={type} className="px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider border border-white/15 text-white/90 bg-white/5 backdrop-blur-sm">
                  {type}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div data-section="moves">
        <SectionLabel>Moves</SectionLabel>
        <div className="flex gap-1 mb-5 border-b border-white/5 pb-0.5">
          {['Level Up', 'TM Moves', 'Egg Moves', 'Tutor Moves'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium bg-transparent border-none cursor-pointer relative transition-colors ${
                activeTab === tab 
                  ? 'text-[var(--text-primary)] border-b-2 border-[var(--accent)]' 
                  : 'text-[var(--text-secondary)] border-b-2 border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left py-3 text-[0.7rem] uppercase text-[var(--text-tertiary)] font-semibold border-b border-white/10">Level</th>
              <th className="text-left py-3 text-[0.7rem] uppercase text-[var(--text-tertiary)] font-semibold border-b border-white/10">Move</th>
              <th className="text-left py-3 text-[0.7rem] uppercase text-[var(--text-tertiary)] font-semibold border-b border-white/10">Type</th>
              <th className="text-left py-3 text-[0.7rem] uppercase text-[var(--text-tertiary)] font-semibold border-b border-white/10">Category</th>
              <th className="text-left py-3 text-[0.7rem] uppercase text-[var(--text-tertiary)] font-semibold border-b border-white/10">Pwr</th>
              <th className="text-left py-3 text-[0.7rem] uppercase text-[var(--text-tertiary)] font-semibold border-b border-white/10">Acc</th>
            </tr>
          </thead>
          <tbody>
            {[
              { level: 25, name: 'Shadow Ball', type: 'Ghost', category: 'special', power: 80, accuracy: '100%' },
              { level: 33, name: 'Sludge Bomb', type: 'Poison', category: 'special', power: 90, accuracy: '100%' },
              { level: 8, name: 'Hypnosis', type: 'Psychic', category: 'status', power: '—', accuracy: '60%' },
              { level: 41, name: 'Dream Eater', type: 'Psychic', category: 'special', power: 100, accuracy: '100%' }
            ].map((move, index) => (
              <tr key={index}>
                <td className="py-4 border-b border-white/[0.03] text-sm text-[var(--text-secondary)]">{move.level}</td>
                <td className="py-4 border-b border-white/[0.03] text-sm text-[var(--text-primary)] font-medium">{move.name}</td>
                <td className="py-4 border-b border-white/[0.03] text-sm text-[var(--text-secondary)]">
                  <span className="inline-block px-2 py-0.5 rounded bg-white/10 text-[0.7rem]">{move.type}</span>
                </td>
                <td className="py-4 border-b border-white/[0.03] text-sm text-[var(--text-secondary)]">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[0.7rem] font-semibold uppercase tracking-wider ${
                    move.category === 'special' 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                      : 'bg-zinc-500/20 text-zinc-400 border border-zinc-500/30'
                  }`}>
                    <CategoryIcon category={move.category} />
                    {move.category}
                  </span>
                </td>
                <td className="py-4 border-b border-white/[0.03] text-sm text-[var(--text-secondary)]">{move.power}</td>
                <td className="py-4 border-b border-white/[0.03] text-sm text-[var(--text-secondary)]">{move.accuracy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div data-section="evolution">
        <SectionLabel>Evolution Chain</SectionLabel>
        <div className="flex items-center justify-center gap-5 p-6 bg-white/[0.02] rounded-xl border border-white/5">
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-white/[0.03] border-2 border-white/10 rounded-xl flex items-center justify-center">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png" alt="Gastly" className="w-16 h-16" />
            </div>
            <span className="text-sm font-medium text-[var(--text-primary)]">Gastly</span>
            <span className="text-xs text-[var(--text-secondary)]">#092</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ArrowRight className="w-6 h-6 text-[var(--text-secondary)]" />
            <span className="text-xs text-[var(--text-tertiary)]">Lvl 25</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-white/[0.03] border-2 border-white/10 rounded-xl flex items-center justify-center">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png" alt="Haunter" className="w-16 h-16" />
            </div>
            <span className="text-sm font-medium text-[var(--text-primary)]">Haunter</span>
            <span className="text-xs text-[var(--text-secondary)]">#093</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ArrowRight className="w-6 h-6 text-[var(--text-secondary)]" />
            <span className="text-xs text-[var(--text-tertiary)]">Trade</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-purple-500/10 border-2 border-[var(--accent)] rounded-xl flex items-center justify-center">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" alt="Gengar" className="w-16 h-16" />
            </div>
            <span className="text-sm font-medium text-[var(--text-primary)]">Gengar</span>
            <span className="text-xs text-[var(--text-secondary)]">#094</span>
          </div>
        </div>
      </div>

      <div data-section="training">
        <SectionLabel>Training & Breeding</SectionLabel>
        <div className="flex flex-col gap-8">
          <div>
            <div className="text-xs font-semibold text-[var(--text-tertiary)] mb-4 uppercase tracking-wider">Gameplay</div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--text-secondary)] font-medium">Base Experience</span>
                <span className="text-2xl font-semibold text-[var(--text-primary)]">225</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--text-secondary)] font-medium">EV Yield</span>
                <span className="text-2xl font-semibold text-[var(--text-primary)]">3 Sp. Atk</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--text-secondary)] font-medium">Growth Rate</span>
                <span className="text-2xl font-semibold text-[var(--text-primary)]">Medium Slow</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--text-secondary)] font-medium">Catch Rate</span>
                <span className="text-2xl font-semibold text-[var(--text-primary)]">45</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--text-secondary)] font-medium">Base Happiness</span>
                <span className="text-2xl font-semibold text-[var(--text-primary)]">70</span>
              </div>
            </div>
          </div>
          <div data-section="breeding">
            <div className="text-xs font-semibold text-[var(--text-tertiary)] mb-4 uppercase tracking-wider">Breeding</div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--text-secondary)] font-medium">Egg Cycles</span>
                <span className="text-2xl font-semibold text-[var(--text-primary)]">20</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--text-secondary)] font-medium">Steps to Hatch</span>
                <span className="text-2xl font-semibold text-[var(--text-primary)]">5,120</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--text-secondary)] font-medium">Egg Group</span>
                <span className="text-2xl font-semibold text-[var(--text-primary)]">Amorphous</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--text-secondary)] font-medium">Gender Ratio</span>
                <span className="text-2xl font-semibold text-[var(--text-primary)]">
                  50% <span className="text-[#6495ed]">♂</span> / 50% <span className="text-[#ff69b4]">♀</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <SectionLabel>Additional Information</SectionLabel>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5">
          {[
            { label: 'Generation', value: 'Generation I' },
            { label: 'Color', value: 'Purple' },
            { label: 'Habitat', value: 'Urban' },
            { label: 'Classification', value: 'Standard' },
            { label: 'Shape', value: 'Upright' }
          ].map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <span className="text-xs text-[var(--text-secondary)] font-medium">{item.label}</span>
              <span className="text-2xl font-semibold text-[var(--text-primary)]">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div data-section="locations">
        <SectionLabel>Locations</SectionLabel>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
          {[
            { game: 'Red / Blue', location: 'Trade Evolution Only' },
            { game: 'Yellow', location: 'Pokémon Tower (1F-6F)' },
            { game: 'Gold / Silver', location: 'Sprout Tower (Night)' },
            { game: 'Crystal', location: 'Tin Tower (Night)' }
          ].map((loc, index) => (
            <div key={index} className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
              <div className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1">{loc.game}</div>
              <div className="text-sm text-[var(--text-secondary)]">{loc.location}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[var(--bg-surface)]">
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold text-[var(--text-primary)]">Pokédex</span>
      </div>
      <nav className="flex items-center gap-6">
        <Link to="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline">
          Home
        </Link>
        <Link to="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline">
          Search
        </Link>
      </nav>
    </header>
  );
};

const SectionNav = ({ activeSection, onNavigate }: { activeSection: string; onNavigate: (section: string) => void }) => {
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'abilities', label: 'Abilities' },
    { id: 'stats', label: 'Stats' },
    { id: 'effectiveness', label: 'Effectiveness' },
    { id: 'moves', label: 'Moves' },
    { id: 'evolution', label: 'Evolution' },
    { id: 'training', label: 'Training' },
    { id: 'locations', label: 'Locations' }
  ];

  return (
    <nav className="h-10 border-b border-white/5 flex items-center px-6 gap-1 bg-[var(--bg-surface)]">
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => onNavigate(section.id)}
          className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
            activeSection === section.id
              ? 'bg-white/10 text-[var(--text-primary)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
          }`}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
};

const VisualPanel = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-[var(--bg-surface)] to-[var(--bg-deep)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_70%)]" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-64 h-64 relative animate-float">
          <img 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png" 
            alt="Gengar"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm text-[var(--text-tertiary)]">#094</span>
        </div>
      </div>
    </div>
  );
};

const PokedexPage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div 
      style={customStyles.root as React.CSSProperties}
      className="box-border m-0 p-0 antialiased bg-[var(--bg-deep)] text-[var(--text-primary)] font-sans h-screen flex flex-col overflow-hidden"
    >
      <Header />
      <SectionNav activeSection={activeSection} onNavigate={handleNavigate} />
      <main className="flex-1 grid grid-cols-[40%_1fr] overflow-hidden relative">
        <VisualPanel />
        <DataPanel onSectionChange={setActiveSection} />
      </main>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-15px) scale(1.02); }
      }
      .animate-float {
        animation: float 4s ease-in-out infinite;
      }
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
      }
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokedexPage />} />
      </Routes>
    </Router>
  );
};

export default App;
