

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
    '--space-xl': '64px',
  },
  body: {
    backgroundColor: '#050505',
    color: '#ffffff',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    WebkitFontSmoothing: 'antialiased',
  },
  header: {
    padding: '0 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '80px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    flexShrink: 0,
    zIndex: 10,
  },
  logo: {
    fontWeight: 800,
    fontSize: '1.2rem',
    letterSpacing: '-0.02em',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoSpan: {
    color: '#71717a',
    fontWeight: 400,
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(255,255,255,0.05)',
    padding: '10px 24px',
    borderRadius: '999px',
    border: '1px solid rgba(255,255,255,0.08)',
    flex: '0 0 400px',
    transition: 'all 0.2s',
  },
  searchInput: {
    background: 'none',
    border: 'none',
    outline: 'none',
    color: '#ffffff',
    fontSize: '0.9rem',
    width: '100%',
  },
  navLinks: {
    display: 'flex',
    gap: '32px',
  },
  navLink: {
    color: '#71717a',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'color 0.2s',
    cursor: 'pointer',
  },
  langSelector: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px',
    padding: '6px 12px',
    color: '#ffffff',
    fontSize: '0.85rem',
    fontWeight: 500,
    cursor: 'pointer',
    outline: 'none',
  },
  main: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '40% 1fr',
    overflow: 'hidden',
    position: 'relative',
  },
  visualPanel: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '64px',
    background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.15) 0%, rgba(5,5,5,0) 70%)',
  },
  pokemonStage: {
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    perspective: '1000px',
  },
  floorReflection: {
    position: 'absolute',
    bottom: '-40px',
    width: '80%',
    height: '20px',
    background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.4), transparent 70%)',
    opacity: 0.6,
    filter: 'blur(10px)',
    transform: 'scaleY(0.5)',
  },
  pokemonId: {
    position: 'absolute',
    top: '32px',
    left: '32px',
    fontFamily: 'monospace',
    fontSize: '3rem',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.1)',
    pointerEvents: 'none',
    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
  },
  dataPanel: {
    padding: '80px 64px 32px 64px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    scrollbarWidth: 'thin',
    scrollbarColor: '#333 transparent',
  },
  sectionNav: {
    position: 'absolute',
    top: '90px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  sectionNavList: {
    display: 'flex',
    gap: '8px',
    background: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(20px)',
    padding: '8px',
    borderRadius: '999px',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
  },
  pokemonNavBtn: {
    background: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '999px',
    padding: '6px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: '#71717a',
    boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
  },
  genSelectorOverlay: {
    position: 'absolute',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 5,
  },
  genSelector: {
    display: 'flex',
    gap: '4px',
    background: 'rgba(255,255,255,0.03)',
    padding: '4px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  bottomNav: {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '20px',
    background: 'rgba(10,10,10,0.8)',
    backdropFilter: 'blur(20px)',
    padding: '10px 20px',
    borderRadius: '999px',
    border: '1px solid rgba(255,255,255,0.08)',
    zIndex: 100,
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  },
  navIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#71717a',
    cursor: 'pointer',
    transition: 'all 0.2s',
    background: 'none',
    border: 'none',
    fontSize: '1rem',
  },
};

const GengarPage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [activeGenBtn, setActiveGenBtn] = useState(0);
  const [activeMoveTab, setActiveMoveTab] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [lang, setLang] = useState('EN');
  const [game, setGame] = useState('Red');
  const dataPanelRef = useRef(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
      body { overflow: hidden; }
      @keyframes float {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-15px) scale(1.02); }
      }
      .pokemon-img-anim {
        animation: float 6s ease-in-out infinite;
        filter: drop-shadow(0 20px 40px rgba(0,0,0,0.8));
        width: 90%;
        height: auto;
        z-index: 2;
      }
      .section-nav-link-item {
        font-size: 0.8rem;
        font-weight: 500;
        color: #71717a;
        text-decoration: none;
        padding: 8px 18px;
        border-radius: 999px;
        transition: all 0.2s;
        cursor: pointer;
        white-space: nowrap;
        border: none;
        background: transparent;
      }
      .section-nav-link-item:hover {
        color: #ffffff;
        background: rgba(255,255,255,0.05);
      }
      .section-nav-link-item.active {
        color: #050505;
        background: #ffffff;
      }
      .gen-btn-item {
        padding: 4px 12px;
        font-size: 0.75rem;
        font-weight: 500;
        background: transparent;
        border: none;
        border-radius: 4px;
        color: #71717a;
        cursor: pointer;
        transition: all 0.2s;
      }
      .gen-btn-item:hover {
        background: rgba(255,255,255,0.05);
        color: #ffffff;
      }
      .gen-btn-item.active {
        background: rgba(255,255,255,0.1);
        color: #ffffff;
      }
      .move-tab-item {
        padding: 8px 16px;
        font-size: 0.85rem;
        font-weight: 500;
        background: transparent;
        border: none;
        color: #71717a;
        cursor: pointer;
        transition: all 0.2s;
        position: relative;
      }
      .move-tab-item:hover { color: #ffffff; }
      .move-tab-item.active { color: #ffffff; }
      .move-tab-item.active::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
        background: #a855f7;
      }
      .move-row:hover td { color: #ffffff; }
      .ability-item-hover {
        padding: 20px;
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(255,255,255,0.05);
        border-radius: 8px;
        transition: all 0.2s;
      }
      .ability-item-hover:hover {
        background: rgba(255,255,255,0.04);
        border-color: rgba(255,255,255,0.1);
      }
      .location-card-hover {
        padding: 16px;
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(255,255,255,0.05);
        border-radius: 8px;
        transition: all 0.2s;
      }
      .location-card-hover:hover {
        background: rgba(255,255,255,0.04);
        border-color: rgba(255,255,255,0.1);
      }
      .nav-icon-btn:hover {
        color: #ffffff !important;
        background: rgba(255,255,255,0.05) !important;
      }
      .pokemon-nav-btn-hover:hover {
        background: rgba(20, 20, 20, 0.95) !important;
        border-color: rgba(255,255,255,0.2) !important;
        color: #ffffff !important;
      }
      .info-tooltip-trigger-el {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: rgba(255,255,255,0.07);
        color: #404040;
        font-size: 0.6rem;
        font-weight: 700;
        cursor: default;
        position: relative;
      }
      .info-tooltip-trigger-el:hover .info-tooltip-box {
        opacity: 1;
        pointer-events: auto;
        transform: translateX(-50%) translateY(0);
      }
      .info-tooltip-box {
        position: absolute;
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%) translateY(4px);
        background: rgba(20,20,20,0.98);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 8px;
        padding: 10px 14px;
        width: 220px;
        font-size: 0.78rem;
        line-height: 1.5;
        color: #71717a;
        font-weight: 400;
        text-transform: none;
        letter-spacing: 0;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.15s ease, transform 0.15s ease;
        z-index: 200;
        box-shadow: 0 8px 24px rgba(0,0,0,0.6);
        white-space: normal;
      }
      .info-tooltip-box::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: rgba(255,255,255,0.1);
      }
      .section-title-line {
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #71717a;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .section-title-line::after {
        content: '';
        height: 1px;
        background: rgba(255,255,255,0.1);
        flex: 1;
      }
      .data-panel-scroll::-webkit-scrollbar { width: 4px; }
      .data-panel-scroll::-webkit-scrollbar-track { background: transparent; }
      .data-panel-scroll::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'abilities', label: 'Abilities' },
    { id: 'stats', label: 'Stats' },
    { id: 'effectiveness', label: 'Type Chart' },
    { id: 'moves', label: 'Moves' },
    { id: 'evolution', label: 'Evolution' },
    { id: 'training', label: 'Training' },
    { id: 'breeding', label: 'Breeding' },
    { id: 'locations', label: 'Locations' },
  ];

  const genBtns = ['Gen 1', 'Gen 2', 'Gen 3', 'Gen 4', 'Gen 5', 'Gen 6+'];
  const moveTabs = ['Level Up', 'TM Moves', 'Egg Moves', 'Tutor Moves'];

  const handleNavLinkClick = (sectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el && dataPanelRef.current) {
      dataPanelRef.current.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (!dataPanelRef.current) return;
    const scrollTop = dataPanelRef.current.scrollTop;
    let current = 'overview';
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el && scrollTop >= el.offsetTop - 100) {
        current = id;
      }
    });
    setActiveSection(current);
  };

  const TooltipTrigger = ({ text }) => (
    <span className="info-tooltip-trigger-el">
      ?
      <span className="info-tooltip-box">{text}</span>
    </span>
  );

  const SectionTitle = ({ children }) => (
    <div className="section-title-line">{children}</div>
  );

  const InfoRowIcon = ({ children }) => (
    <div style={{
      width: '34px', height: '34px',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '8px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#71717a', flexShrink: 0,
    }}>
      {children}
    </div>
  );

  const InfoRow = ({ icon, label, tooltip, value, bar, barColor, barWidth, extra }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '14px',
      padding: '14px 0',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      position: 'relative',
    }}>
      <InfoRowIcon>{icon}</InfoRowIcon>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '0.72rem', color: '#404040',
          textTransform: 'uppercase', letterSpacing: '0.06em',
          fontWeight: 600, marginBottom: '4px',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          {label} {tooltip && <TooltipTrigger text={tooltip} />}
        </div>
        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>
          {value}{extra}
        </div>
        {bar && (
          <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: barColor || '#71717a', borderRadius: '2px', width: barWidth || '0%' }} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={customStyles.body}>
      {/* Header */}
      <header style={customStyles.header}>
        <div style={customStyles.logo}>
          POKÉDEX <span style={customStyles.logoSpan}>OS</span>
        </div>
        <div style={customStyles.searchBar}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.4 }}>
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 10L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            style={customStyles.searchInput}
          />
        </div>
        <nav style={customStyles.navLinks}>
          <a href="#" style={customStyles.navLink}>Pokémon</a>
          <a href="#" style={customStyles.navLink}>Items</a>
          <a href="#" style={customStyles.navLink}>Moves</a>
        </nav>
        <select
          value={lang}
          onChange={e => setLang(e.target.value)}
          style={customStyles.langSelector}
        >
          {['EN','ES','FR','DE','JA','KO'].map(l => <option key={l}>{l}</option>)}
        </select>
      </header>

      {/* Section Nav */}
      <nav style={customStyles.sectionNav}>
        <button style={customStyles.pokemonNavBtn} className="pokemon-nav-btn-hover">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 500 }}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png" alt="Haunter" style={{ width: '32px', height: '32px' }} />
            <span>#093 Haunter</span>
          </div>
        </button>

        <div style={customStyles.sectionNavList}>
          {sections.map(({ id, label }) => (
            <button
              key={id}
              className={`section-nav-link-item${activeSection === id ? ' active' : ''}`}
              onClick={() => handleNavLinkClick(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <button style={customStyles.pokemonNavBtn} className="pokemon-nav-btn-hover">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 500 }}>
            <span>#095 Onix</span>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png" alt="Onix" style={{ width: '32px', height: '32px' }} />
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </nav>

      {/* Main */}
      <main style={customStyles.main}>
        {/* Visual Panel */}
        <div style={customStyles.visualPanel}>
          <div style={customStyles.pokemonId}>#094</div>
          <div style={customStyles.genSelectorOverlay}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={customStyles.genSelector}>
                {genBtns.map((btn, i) => (
                  <button
                    key={btn}
                    className={`gen-btn-item${activeGenBtn === i ? ' active' : ''}`}
                    onClick={() => setActiveGenBtn(i)}
                  >
                    {btn}
                  </button>
                ))}
              </div>
              <select
                value={game}
                onChange={e => setGame(e.target.value)}
                style={customStyles.langSelector}
              >
                {['Red','Blue','Yellow'].map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <div style={customStyles.pokemonStage}>
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png"
              alt="Gengar"
              className="pokemon-img-anim"
            />
            <div style={customStyles.floorReflection} />
          </div>
          <div style={customStyles.bottomNav}>
            <button className="nav-icon-btn" style={{ ...customStyles.navIcon }}>←</button>
            <button className="nav-icon-btn" style={{ ...customStyles.navIcon, color: '#ffffff' }}>●</button>
            <button className="nav-icon-btn" style={{ ...customStyles.navIcon }}>→</button>
          </div>
        </div>

        {/* Data Panel */}
        <div
          ref={dataPanelRef}
          className="data-panel-scroll"
          style={customStyles.dataPanel}
          onScroll={handleScroll}
        >
          {/* Overview */}
          <div id="overview">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
              <h1 style={{
                fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-0.03em', margin: 0,
                background: 'linear-gradient(to bottom, #fff, #aaa)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Gengar</h1>
              <button style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%', width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#71717a', cursor: 'pointer', transition: 'all 0.2s',
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4L6 8H3v4h3l4 4V4z" fill="currentColor" />
                  <path d="M13 7c.7.7 1 1.6 1 2.5s-.3 1.8-1 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M15 5c1.4 1.4 2 3.2 2 5s-.6 3.6-2 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              <div style={{
                padding: '6px 16px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.05em',
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(112, 88, 152, 0.3)',
                border: '1px solid rgba(112, 88, 152, 0.5)',
                color: '#c4b5fd',
              }}>
                <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-11c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm4 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-4 7h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1z" fill="currentColor" />
                </svg>
                Ghost
              </div>
              <div style={{
                padding: '6px 16px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.05em',
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(168, 85, 247, 0.3)',
                border: '1px solid rgba(168, 85, 247, 0.5)',
                color: '#e9d5ff',
              }}>
                <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C9.24 2 7 4.24 7 7c0 1.77.94 3.31 2.33 4.17C7.87 12.08 7 13.44 7 15c0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.56-.87-2.92-2.33-3.83C16.06 10.31 17 8.77 17 7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="currentColor" />
                </svg>
                Poison
              </div>
            </div>
            <div style={{
              fontSize: '1.1rem', lineHeight: 1.6, color: '#71717a',
              maxWidth: '600px', borderLeft: '2px solid #a855f7', paddingLeft: '20px',
            }}>
              Under a full moon, this Pokémon likes to mimic the shadows of people and laugh at their fright. It absorbs the life force of its prey.
            </div>
          </div>

          {/* Abilities */}
          <div id="abilities">
            <SectionTitle>Abilities</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="ability-item-hover">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff' }}>Cursed Body</span>
                </div>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: '#71717a' }}>
                  When a move hits this Pokémon, that move has a 30% chance of becoming disabled. A disabled move cannot be used until it is re-enabled by switching out.
                </p>
              </div>
              <div className="ability-item-hover">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff' }}>Levitate</span>
                  <span style={{
                    padding: '2px 8px', fontSize: '0.65rem', fontWeight: 600,
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                    background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7', borderRadius: '4px',
                  }}>Hidden</span>
                </div>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: '#71717a' }}>
                  This Pokémon is immune to Ground-type moves, Spikes, Toxic Spikes, and Arena Trap.
                </p>
              </div>
            </div>
          </div>

          {/* Physical Specs */}
          <div>
            <SectionTitle>Physical Specs</SectionTitle>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px',
            }}>
              {[
                { label: 'Height', value: '1.5m', sub: "(4'11\")" },
                { label: 'Weight', value: '40.5kg', sub: '(89.3 lbs)' },
                { label: 'Category', value: 'Shadow', sub: null },
              ].map(({ label, value, sub }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#71717a', fontWeight: 500 }}>{label}</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#ffffff' }}>
                    {value} {sub && <span style={{ fontSize: '0.9rem', color: '#71717a', fontWeight: 400 }}>{sub}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div id="stats">
            <SectionTitle>Base Statistics</SectionTitle>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px',
              background: 'rgba(255,255,255,0.02)', borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '100px 1fr 60px 60px 60px',
                alignItems: 'center', gap: '16px',
                paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                {['Stat', '', 'Base', 'Min', 'Max'].map((h, i) => (
                  <span key={i} style={{
                    fontSize: '0.7rem', fontWeight: 600, color: '#404040',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                    textAlign: i === 0 ? 'left' : i === 1 ? 'center' : 'right',
                  }}>{h}</span>
                ))}
              </div>
              {[
                { label: 'HP', value: 60, min: 200, max: 290, pct: 40, high: false },
                { label: 'Attack', value: 65, min: 121, max: 251, pct: 43, high: false },
                { label: 'Defense', value: 60, min: 112, max: 240, pct: 40, high: false },
                { label: 'Sp. Atk', value: 130, min: 238, max: 394, pct: 86, high: true },
                { label: 'Sp. Def', value: 75, min: 139, max: 273, pct: 50, high: false },
                { label: 'Speed', value: 110, min: 202, max: 350, pct: 73, high: true },
              ].map(({ label, value, min, max, pct, high }) => (
                <div key={label} style={{
                  display: 'grid', gridTemplateColumns: '100px 1fr 60px 60px 60px',
                  alignItems: 'center', gap: '16px',
                }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${pct}%`, borderRadius: '2px',
                      background: high ? '#a855f7' : '#71717a',
                      boxShadow: high ? '0 0 10px rgba(168, 85, 247, 0.5)' : 'none',
                      transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)',
                    }} />
                  </div>
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', textAlign: 'right' }}>{value}</span>
                  <span style={{ fontSize: '0.75rem', color: '#404040', textAlign: 'right' }}>{min}</span>
                  <span style={{ fontSize: '0.75rem', color: '#404040', textAlign: 'right' }}>{max}</span>
                </div>
              ))}
              <div style={{
                display: 'grid', gridTemplateColumns: '100px 1fr 60px 60px 60px',
                alignItems: 'center', gap: '16px',
                paddingTop: '16px', marginTop: '8px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total</span>
                <div />
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', textAlign: 'right' }}>500</span>
                <span /><span />
              </div>
            </div>
          </div>

          {/* Moves */}
          <div id="moves">
            <SectionTitle>Moves</SectionTitle>
            <div style={{
              display: 'flex', gap: '4px', marginBottom: '20px',
              borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2px',
            }}>
              {moveTabs.map((tab, i) => (
                <button
                  key={tab}
                  className={`move-tab-item${activeMoveTab === i ? ' active' : ''}`}
                  onClick={() => setActiveMoveTab(i)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Level','Move','Type','Category','Pwr','Acc'].map(h => (
                    <th key={h} style={{
                      textAlign: 'left', padding: '12px 0',
                      fontSize: '0.7rem', textTransform: 'uppercase',
                      color: '#404040', fontWeight: 600,
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { level: 25, name: 'Shadow Ball', type: 'Ghost', category: 'special', pwr: 80, acc: '100%' },
                  { level: 33, name: 'Sludge Bomb', type: 'Poison', category: 'special', pwr: 90, acc: '100%' },
                  { level: 8, name: 'Hypnosis', type: 'Psychic', category: 'status', pwr: '—', acc: '60%' },
                  { level: 41, name: 'Dream Eater', type: 'Psychic', category: 'special', pwr: 100, acc: '100%' },
                ].map((move) => {
                  const catStyles = {
                    physical: { bg: 'rgba(255, 100, 100, 0.2)', color: '#ff6464', border: '1px solid rgba(255, 100, 100, 0.3)' },
                    special: { bg: 'rgba(100, 150, 255, 0.2)', color: '#6496ff', border: '1px solid rgba(100, 150, 255, 0.3)' },
                    status: { bg: 'rgba(150, 150, 150, 0.2)', color: '#999', border: '1px solid rgba(150, 150, 150, 0.3)' },
                  };
                  const cs = catStyles[move.category];
                  return (
                    <tr key={move.name} className="move-row">
                      <td style={{ padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '0.9rem', color: '#71717a' }}>{move.level}</td>
                      <td style={{ padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '0.9rem', fontWeight: 500, color: '#ffffff' }}>{move.name}</td>
                      <td style={{ padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <span style={{
                          display: 'inline-block', padding: '2px 8px', borderRadius: '2px',
                          background: 'rgba(255,255,255,0.1)', fontSize: '0.7rem', color: '#71717a',
                        }}>{move.type}</span>
                      </td>
                      <td style={{ padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '6px',
                          padding: '3px 10px', borderRadius: '4px',
                          fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em',
                          background: cs.bg, color: cs.color, border: cs.border,
                        }}>
                          {move.category === 'special' && (
                            <svg style={{ width: '14px', height: '14px' }} viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                              <circle cx="12" cy="12" r="3" fill="currentColor" />
                            </svg>
                          )}
                          {move.category === 'status' && (
                            <svg style={{ width: '14px', height: '14px' }} viewBox="0 0 24 24" fill="none">
                              <path d="M12 2L4 8v8l8 6 8-6V8l-8-6z" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                          )}
                          {move.category.charAt(0).toUpperCase() + move.category.slice(1)}
                        </span>
                      </td>
                      <td style={{ padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '0.9rem', color: '#71717a' }}>{move.pwr}</td>
                      <td style={{ padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '0.9rem', color: '#71717a' }}>{move.acc}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Evolution Chain */}
          <div id="evolution">
            <SectionTitle>Evolution Chain</SectionTitle>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px',
              padding: '24px', background: 'rgba(255,255,255,0.02)',
              borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)',
            }}>
              {[
                { sprite: '92', name: 'Gastly', num: '#092', active: false },
                { arrow: true, cond: 'Lvl 25' },
                { sprite: '93', name: 'Haunter', num: '#093', active: false },
                { arrow: true, cond: 'Trade' },
                { sprite: '94', name: 'Gengar', num: '#094', active: true },
              ].map((item, i) => {
                if (item.arrow) {
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: '#71717a' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span style={{ fontSize: '0.7rem', color: '#404040' }}>{item.cond}</span>
                    </div>
                  );
                }
                return (
                  <div key={item.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '80px', height: '80px',
                      background: item.active ? 'rgba(168, 85, 247, 0.1)' : 'rgba(255,255,255,0.03)',
                      border: item.active ? '2px solid #a855f7' : '2px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}>
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.sprite}.png`}
                        alt={item.name}
                        style={{ width: '64px', height: '64px' }}
                      />
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#ffffff' }}>{item.name}</span>
                    <span style={{ fontSize: '0.7rem', color: '#71717a' }}>{item.num}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Type Effectiveness */}
          <div id="effectiveness">
            <SectionTitle>Type Effectiveness</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { title: 'Weak to (2x)', types: ['Ground','Psychic','Ghost','Dark'] },
                { title: 'Resistant to (0.5x)', types: ['Poison','Bug','Grass','Fairy'] },
                { title: 'Immune to (0x)', types: ['Normal','Fighting','Ground'] },
              ].map(({ title, types }) => (
                <div key={title} style={{
                  padding: '20px', background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px',
                }}>
                  <div style={{
                    fontSize: '0.85rem', fontWeight: 600, color: '#71717a',
                    marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>{title}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {types.map(type => (
                      <div key={type} style={{
                        padding: '6px 14px', borderRadius: '4px',
                        fontSize: '0.75rem', fontWeight: 600,
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: 'rgba(255,255,255,0.9)',
                        background: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(10px)',
                      }}>{type}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Training & Breeding */}
          <div id="training">
            <SectionTitle>Training &amp; Breeding</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Training Card */}
              <div style={{
                padding: '20px 24px', background: 'rgba(255,255,255,0.02)',
                borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{
                  fontSize: '0.7rem', fontWeight: 700, color: '#404040',
                  textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px',
                }}>Training</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
                  <div>
                    <InfoRow
                      icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>}
                      label="Base Exp"
                      tooltip="XP awarded to Pokémon that defeat Gengar in battle. Higher values reward more experience per fight."
                      value="225"
                      bar barColor="#a855f7" barWidth="68%"
                    />
                    <InfoRow
                      icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>}
                      label="EV Yield"
                      tooltip="Effort Values gained after defeating this Pokémon. These permanently boost specific stats of your Pokémon as they grow."
                      value="3 Sp. Atk"
                    />
                    <InfoRow
                      icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M7 16l4-4 4 4 4-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      label="Growth Rate"
                      tooltip="How quickly this Pokémon gains levels. Medium Slow levels up slowly early but accelerates over time, reaching level 100 at ~1,059,860 XP."
                      value="Medium Slow"
                    />
                  </div>
                  <div>
                    <InfoRow
                      icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>}
                      label="Catch Rate"
                      tooltip="Out of 255. A value of 45 means roughly a 17.6% chance with a standard Poké Ball at full HP — moderately difficult to catch."
                      value="45"
                      extra={<span style={{ fontSize: '0.75rem', color: '#404040', fontWeight: 400 }}> / 255</span>}
                      bar barWidth="17.6%"
                    />
                    <InfoRow
                      icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" stroke="currentColor" strokeWidth="1.8" fill="none" /></svg>}
                      label="Base Happiness"
                      tooltip="Starting friendship value (0–255). At 70, Gengar begins at neutral friendship. Reach 220+ to boost friendship-based moves like Return."
                      value="70"
                      extra={<span style={{ fontSize: '0.75rem', color: '#404040', fontWeight: 400 }}> / 255</span>}
                      bar barWidth="27.5%"
                    />
                  </div>
                </div>
              </div>

              {/* Breeding Card */}
              <div id="breeding" style={{
                padding: '20px 24px', background: 'rgba(255,255,255,0.02)',
                borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{
                  fontSize: '0.7rem', fontWeight: 700, color: '#404040',
                  textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px',
                }}>Breeding</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
                  <div>
                    <InfoRow
                      icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="13" rx="7" ry="9" stroke="currentColor" strokeWidth="1.8" /></svg>}
                      label="Egg Cycles"
                      tooltip="Number of 255-step cycles needed to hatch. At 20 cycles, you need to walk 5,120 steps. Lower = hatches sooner."
                      value="20 cycles"
                      bar barWidth="30%"
                    />
                    <InfoRow
                      icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 4v7h5l-8 9v-7H5l8-9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" /></svg>}
                      label="Steps to Hatch"
                      tooltip="Exact steps to walk with the egg in your party. With Flame Body on a party member, this is halved to ~2,560 steps."
                      value="5,120"
                    />
                  </div>
                  <div>
                    <InfoRow
                      icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C9 2 6 5 6 9c0 4 3 7 6 7s6-3 6-7c0-4-3-7-6-7z" stroke="currentColor" strokeWidth="1.8" /><path d="M6 18c0 2 2.7 4 6 4s6-2 6-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>}
                      label="Egg Group"
                      tooltip="Determines which Pokémon can breed together. Amorphous includes blob-like and ghost-type Pokémon such as Ditto, Misdreavus, and Gastly."
                      value="Amorphous"
                    />
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
                    }}>
                      <InfoRowIcon>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <circle cx="9" cy="10" r="4" stroke="#6495ed" strokeWidth="1.8" />
                          <circle cx="15" cy="10" r="4" stroke="#ff69b4" strokeWidth="1.8" />
                        </svg>
                      </InfoRowIcon>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '0.72rem', color: '#404040', textTransform: 'uppercase',
                          letterSpacing: '0.06em', fontWeight: 600, marginBottom: '4px',
                          display: 'flex', alignItems: 'center', gap: '6px',
                        }}>
                          Gender Ratio <TooltipTrigger text="The probability of encountering or hatching a male vs. female Gengar. An equal split means no gender-based rarity." />
                        </div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>
                          50% <span style={{ color: '#6495ed' }}>♂</span> / 50% <span style={{ color: '#ff69b4' }}>♀</span>
                        </div>
                        <div style={{ height: '6px', borderRadius: '3px', overflow: 'hidden', display: 'flex', marginTop: '6px' }}>
                          <div style={{ background: '#6495ed', flex: 1 }} />
                          <div style={{ background: '#ff69b4', flex: 1 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div id="additional">
            <SectionTitle>Additional Information</SectionTitle>
            <div style={{
              padding: '20px 24px', background: 'rgba(255,255,255,0.02)',
              borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
                <div>
                  <InfoRow
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>}
                    label="Generation"
                    value="Generation I"
                  />
                  <InfoRow
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="6" fill="#a855f7" opacity="0.4" /><circle cx="12" cy="12" r="3" fill="#a855f7" /></svg>}
                    label="Color"
                    value="Purple"
                  />
                  <InfoRow
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.8" /><path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.8" /></svg>}
                    label="Habitat"
                    tooltip="The type of environment where this Pokémon is typically found in the wild. Urban habitats include cities, towns, and buildings."
                    value="Urban"
                  />
                </div>
                <div>
                  <InfoRow
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" /><path d="M9 9h6M9 12h6M9 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>}
                    label="Classification"
                    tooltip="Indicates whether this is a standard, legendary, mythical, or ultra beast Pokémon. Standard Pokémon can be freely caught and bred."
                    value="Standard"
                  />
                  <InfoRow
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C8 2 5 6 5 10c0 5 7 12 7 12s7-7 7-12c0-4-3-8-7-8z" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" /></svg>}
                    label="Shape"
                    tooltip="Body shape category used in the Pokédex search filters. Upright means it stands on two legs in a humanoid posture."
                    value="Upright"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div id="locations">
            <SectionTitle>Locations</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {[
                { game: 'Red / Blue', loc: 'Trade Evolution Only' },
                { game: 'Yellow', loc: 'Pokémon Tower (1F-6F)' },
                { game: 'Gold / Silver', loc: 'Sprout Tower (Night)' },
                { game: 'Crystal', loc: 'Tin Tower (Night)' },
              ].map(({ game: g, loc }) => (
                <div key={g} className="location-card-hover">
                  <div style={{
                    fontSize: '0.75rem', fontWeight: 600, color: '#a855f7',
                    textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px',
                  }}>{g}</div>
                  <div style={{ fontSize: '0.9rem', color: '#71717a' }}>{loc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<GengarPage />} />
      </Routes>
    </Router>
  );
};

export default App;