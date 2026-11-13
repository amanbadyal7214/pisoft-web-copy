import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ChevronDown, 
  Search, 
  Menu, 
  X, 
  Loader2, 
  BookOpen, 
  LogOut,
  CalendarCheck,
  Calendar,
  Clock,
  MapPin
} from 'lucide-react';
import { Tutorial_Base } from '../../../baseURL';

export default function THeader({ selectedTech, onSelectTech, isTestActive }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [quickTopics, setQuickTopics] = useState([]);
  const [isLoadingTopics, setIsLoadingTopics] = useState(true);
  
  // --- New Search States ---
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // User Auth State
  const [user, setUser] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // My Slots State
  const [showSlotsPanel, setShowSlotsPanel] = useState(false);
  const [mySlots, setMySlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState(null);

  const navigate = useNavigate();

  // 1. Check LocalStorage on Mount and Listen for Auth Changes
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');

      if (storedUser) {
        try {
          const parsed = typeof storedUser === 'string' ? JSON.parse(storedUser) : storedUser;
          if (parsed && !parsed.fullName && parsed.name) {
            parsed.fullName = parsed.name;
          }
          setUser(parsed);
        } catch (err) {
          console.error('Failed to parse user data from localStorage:', err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkAuth();
    window.addEventListener('authChange', checkAuth);
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('authChange', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('authChange'));
    setUser(null);
    setIsUserMenuOpen(false);
    navigate('/TAuth');
  };

  // Fetch My Booked Slots
  const fetchMySlots = async (uid) => {
    if (!uid) return;
    try {
      setSlotsLoading(true);
      setSlotsError(null);
      const res = await fetch(`${Tutorial_Base}/slotBooking/myBookings?userId=${uid}`);
      if (!res.ok) throw new Error(`Failed to load bookings (HTTP ${res.status})`);
      const data = await res.json();
      setMySlots(Array.isArray(data) ? data : []);
    } catch (err) {
      setSlotsError(err.message || 'Could not load your bookings.');
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleOpenSlots = () => {
    setShowSlotsPanel(true);
    setIsUserMenuOpen(false);
    const uid = user?.userId || user?.id;
    fetchMySlots(uid);
  };

  const formatSlotDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatSlotTime = (timeStr) => {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h);
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  // 2. Fetch quick topics dynamically from API
  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        setIsLoadingTopics(true);
        const response = await fetch(`${Tutorial_Base}/websiteModule/getTechnologies`);
        if (!response.ok) throw new Error('Failed to fetch technologies');
        const data = await response.json();
        setQuickTopics(data);
      } catch (error) {
        console.error('Error fetching quick topics:', error);
      } finally {
        setIsLoadingTopics(false);
      }
    };
    fetchTechnologies();
  }, []);

  // --- Search Logic ---
  const filteredTopics = quickTopics.filter((topic) =>
    topic.technologyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSuggestionClick = (topic) => {
    setSearchQuery('');
    setShowSuggestions(false);
    setIsMobileMenuOpen(false);
    
    // Update active tech state if parent provided the callback
    if (onSelectTech) {
      onSelectTech(topic.id);
    }
    // Navigate to the specific technology tutorial page
    navigate(`/Tutorials/${topic.id}`);
  };

  // 3. Navigation Data
  const navItems = [
    {
      title: 'Tutorials',
      hasDropdown: true,
      items: [
        { label: 'Web Development', desc: 'HTML, CSS, JavaScript, React', target: 'tutorials', route: '/Tutorials/194', techId: '194' },
        { label: 'Programming Languages', desc: 'Python, Java, C++, Go', target: 'tutorials', route: '/Tutorials/195', techId: '195' },
        { label: 'Database Systems', desc: 'SQL, MongoDB, PostgreSQL', target: 'tutorials', route: '/Tutorials/196', techId: '196' },
        { label: 'Data Science & AI', desc: 'Machine Learning, Pandas', target: 'tutorials', route: '/Tutorials/197', techId: '197' }
      ]
    },
    {
      title: 'Compilers',
      hasDropdown: true,
      items: [
        { label: 'Online JS Compiler', desc: 'Run JavaScript online', target: 'compiler', route: '/Compiler/javascript', techId: 'javascript' },
        { label: 'Python Sandbox', desc: 'Execute Python scripts instantly', target: 'compiler', route: '/Compiler/python', techId: 'python' },
        { label: 'C++ / C Compiler', desc: 'Compile and run C/C++ code', target: 'compiler', route: '/Compiler/cpp', techId: 'cpp' }
      ]
    },
    {
      title: 'Practice',
      hasDropdown: true,
      items: [
        { label: 'Coding Challenges', desc: 'Solve real algorithmic problems', target: 'practice', route: '/Tquiz?technologyId=199', techId: '199' },
        { label: 'MCQ Quizzes', desc: 'Test your knowledge across topics', target: 'practice', route: '/Tquiz?technologyId=200', techId: '200' }
      ]
    },
  ];

  const handleTopicClick = (item) => {
    if (!item) return;

    if (onSelectTech && item.target === 'tutorials') {
      onSelectTech(item.techId);
    } else if (item.target === 'compiler') {
      navigate(item.route || `/Compiler/${item.techId || 'c'}`);
    } else if (item.target === 'practice') {
      navigate(item.route || `/Tquiz?technologyId=${item.techId || '199'}`);
    } else {
      // Used by sub-navbar dynamic links
      navigate(item.route || `/Tutorials/${item.techId || '194'}`);
    }

    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setIsUserMenuOpen(false);
  };

  return (
    <header {...(isTestActive ? { inert: '' } : {})} className={`fixed top-0 left-0 right-0 w-full z-50 transition-colors duration-200 shadow-sm ${isTestActive ? 'pointer-events-none' : ''}`}>
      {/* --- Main Header Top Bar --- */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Brand Logo */}
            <Link to="/Tutorials" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center shadow-md shadow-orange-500/20">
                <span className="text-white font-extrabold text-xl font-mono">&lt;/&gt;</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-gray-900">
                  PI<span className="text-orange-500">Tutorial</span>
                </span>
              </div>
            </Link>

            {/* Desktop Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors rounded-md group">
                    {item.title}
                    {item.hasDropdown && (
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-orange-500 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === index && (
                    <div className="absolute top-full left-0 w-64 pt-2 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 overflow-hidden">
                        {item.items.map((subItem, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleTopicClick(subItem)}
                            className="w-full text-left block px-3 py-2.5 rounded-lg hover:bg-orange-50/60 transition-colors group"
                          >
                            <div className="text-sm font-semibold text-gray-800 group-hover:text-orange-600">
                              {subItem.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                              {subItem.desc}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Action Bar */}
            <div className="hidden md:flex items-center space-x-3">
              
              {/* --- Desktop Search Bar with Suggestions --- */}
              <div 
                className="relative group"
                onBlur={(e) => {
                  // Wait slightly so click events on suggestions can fire before hiding
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setTimeout(() => setShowSuggestions(false), 200);
                  }
                }}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search tutorials..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-48 lg:w-56 pl-9 pr-14 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-800 placeholder-gray-400"
                />
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-gray-400 bg-gray-100 border border-gray-200 rounded">
                    Ctrl K
                  </kbd>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && searchQuery.trim() !== '' && (
                  <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50 max-h-60 overflow-y-auto">
                    {filteredTopics.length > 0 ? (
                      <div className="py-1">
                        {filteredTopics.map((topic) => (
                          <button
                            key={topic.id}
                            onClick={() => handleSuggestionClick(topic)}
                            className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                          >
                            {topic.technologyName}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-3 text-xs text-gray-400 text-center">
                        No technology found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Conditional Auth State Rendering */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border border-gray-200 hover:border-orange-300 transition-all bg-gray-50/50"
                  >
                    <div className="w-7 h-7 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center uppercase">
                      {(user.fullName || user.name) ? (user.fullName || user.name).charAt(0) : 'U'}
                    </div>
                    <span className="text-xs font-semibold text-gray-800 max-w-[100px] truncate">
                      {user.fullName || user.name || 'Account'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {/* Profile Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 p-1.5 z-50">
                      <div className="px-3 py-2 border-b border-gray-100 mb-1">
                        <p className="text-xs font-bold text-gray-900 truncate">{user.fullName || user.name || 'User'}</p>
                        <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                      </div>

                      <button
                        onClick={handleOpenSlots}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        <CalendarCheck className="w-3.5 h-3.5 text-orange-500" />
                        My Slots
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5 text-red-500" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link 
                    to="/TAuth" 
                    className="px-4 py-1.5 text-xs font-semibold text-gray-700 hover:text-orange-500 border border-gray-200 hover:border-gray-300 rounded-lg transition-all"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/TAuth" 
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-sm shadow-orange-500/30 transition-all"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Secondary Sub-Navbar (Dynamic Quick Topics) --- */}
      <div className="bg-slate-900 border-t border-slate-800 text-white overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-10 gap-1 sm:gap-2 whitespace-nowrap text-xs">
          {isLoadingTopics ? (
            <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-500" />
              <span>Loading technologies...</span>
            </div>
          ) : (
            quickTopics.map((item) => {
              const isActive = String(selectedTech) === String(item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => {
                     // Using navigate to ensure sub-navbar matches search suggestion behavior
                     if (onSelectTech) onSelectTech(item.id);
                     navigate(`/Tutorials/${item.id}`);
                  }}
                  className={`px-3 py-1 rounded transition-colors font-medium ${
                    isActive
                      ? 'bg-orange-500 text-white font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.technologyName}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* --- Mobile Drawer --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-4 pt-3 pb-4 space-y-2">
            
            {/* --- Mobile Search with Suggestions --- */}
            <div className="relative mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-gray-800"
                />
              </div>

              {searchQuery.trim() !== '' && (
                <div className="mt-1 bg-white border border-gray-100 rounded-lg shadow-sm max-h-48 overflow-y-auto z-50">
                  {filteredTopics.length > 0 ? (
                    filteredTopics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => handleSuggestionClick(topic)}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors border-b border-gray-50 last:border-0"
                      >
                        {topic.technologyName}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-400 text-center">
                      No technology found
                    </div>
                  )}
                </div>
              )}
            </div>

            {navItems.map((item, idx) => (
              <div key={idx} className="border-b border-gray-50 pb-2">
                <div className="font-semibold text-sm text-gray-900 py-2">
                  {item.title}
                </div>
                <div className="pl-3 space-y-1">
                  {item.items.map((sub, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleTopicClick(sub)}
                      className="block w-full text-left text-xs text-gray-600 hover:text-orange-500 py-1"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Mobile Auth Actions */}
            <div className="pt-3 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="px-3 py-2 bg-gray-50 rounded-xl mb-1">
                    <p className="text-xs font-bold text-gray-900">{user.fullName || user.name}</p>
                    <p className="text-[11px] text-gray-400">{user.email}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-center py-2 text-xs font-semibold text-red-600 border border-red-200 rounded-lg bg-red-50"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/TAuth" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center py-2 text-xs font-semibold text-gray-700 border border-gray-200 rounded-lg"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/TAuth" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center py-2 text-xs font-semibold text-white bg-orange-500 rounded-lg"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* My Slots Panel Modal */}
      {showSlotsPanel && (
        <div className="fixed inset-0 z-[300] bg-slate-900/50 backdrop-blur-sm flex items-start justify-end p-4 pt-20">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md max-h-[70vh] flex flex-col overflow-hidden animate-in slide-in-from-right-4 duration-200">
            {/* Panel Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                  <CalendarCheck className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">My Booked Slots</h3>
                  <p className="text-[11px] text-gray-400">Your upcoming exam bookings</p>
                </div>
              </div>
              <button
                onClick={() => setShowSlotsPanel(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {slotsLoading && (
                <div className="flex items-center justify-center py-10 gap-2 text-slate-400 text-sm">
                  <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                  Loading your bookings...
                </div>
              )}

              {slotsError && !slotsLoading && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold flex items-center gap-2">
                  <span>⚠️</span>{slotsError}
                </div>
              )}

              {!slotsLoading && !slotsError && mySlots.length === 0 && (
                <div className="text-center py-10 space-y-2">
                  <CalendarCheck className="w-10 h-10 text-slate-200 mx-auto" />
                  <p className="text-slate-500 text-sm font-medium">No bookings yet</p>
                  <p className="text-slate-400 text-xs">Complete all quiz levels to book a final exam slot</p>
                </div>
              )}

              {!slotsLoading && mySlots.map((slot, idx) => (
                <div key={slot.bookingId || slot.slotId || idx}
                  className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200/70 rounded-xl p-4 space-y-2.5">
                  {/* Status badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                      ✓ Confirmed
                    </span>
                    {slot.technologyName && (
                      <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-md">
                        {slot.technologyName}
                      </span>
                    )}
                  </div>
                  {/* Details */}
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span className="font-semibold">{formatSlotDate(slot.slotDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span className="font-semibold">{formatSlotTime(slot.slotTime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span className="font-semibold">{slot.centerLocation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}