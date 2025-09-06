import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  ChevronDown, 
  DollarSign, 
  Activity,
  Sparkles
} from 'lucide-react';

const ModernSearchHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currencyModal, setCurrencyModal] = useState(false);
  const [currency, setCurrency] = useState("usd");
  const [tabState, setTabState] = useState("all coins");

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
    // Add your search logic here
  };

  const currencyModalToggle = () => {
    setCurrencyModal(!currencyModal);
  };

  const allCoinsHandler = () => {
    setTabState("all coins");
  };

  const metaVerseCategrotyHandler = () => {
    setTabState("metaverse");
  };

  const gamingCoinsCategoryHandler = () => {
    setTabState("gaming");
  };

  const onOpen = () => {
    console.log("Open favorites drawer");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header Title */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Activity className="w-8 h-8 text-blue-500 animate-pulse" />
          <h1 className="text-5xl font-bold text-white tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Market
          </h1>
          <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
        </div>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-4"></div>
        <p className="text-gray-400 text-lg">Explore the cryptocurrency market in real-time</p>
      </div>

      {/* Search and Controls Container */}
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-xl"></div>
        
        {/* Main container */}
        <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-800/50 p-8 shadow-2xl">
          
          {/* Search and Currency Section */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            
            {/* Enhanced Search Bar */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-700 overflow-hidden">
                <input
                  type="text"
                  placeholder="Search cryptocurrencies..."
                  value={searchTerm}
                  onChange={searchHandler}
                  className="w-80 px-6 py-4 pl-14 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
                <Search className="absolute left-4 top-4 w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                
                {/* Search icon animation */}
                <div className="absolute right-4 top-4">
                  <div className="w-6 h-6 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>

            {/* Enhanced Currency Selector */}
            <div className="relative">
              <button
                onClick={currencyModalToggle}
                className="group flex items-center gap-3 px-6 py-4 bg-gray-800/90 backdrop-blur-xl border border-gray-700 rounded-2xl text-white hover:bg-gray-700/90 hover:border-blue-500/50 transition-all duration-300 min-w-[200px] justify-center"
              >
                <div className="p-1 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <DollarSign className="w-5 h-5 text-blue-400" />
                </div>
                <span className="font-medium">Currency</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${currencyModal ? 'rotate-180' : ''}`} />
              </button>

              {/* Enhanced Currency Modal */}
              {currencyModal && (
                <div className="absolute top-full mt-2 w-full bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setCurrency("usd");
                        setCurrencyModal(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-800/80 rounded-xl transition-all group"
                    >
                      <div className="p-1 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                        <DollarSign className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="font-medium">USD - US Dollar</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrency("inr");
                        setCurrencyModal(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-800/80 rounded-xl transition-all group"
                    >
                      <div className="p-1 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                        <span className="w-5 h-5 text-orange-400 font-bold text-center block">₹</span>
                      </div>
                      <span className="font-medium">INR - Indian Rupee</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Filter Tabs */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={allCoinsHandler}
              className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                tabState === "all coins"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 hover:text-white border border-gray-700 hover:border-gray-600"
              }`}
            >
              {tabState === "all coins" && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-75"></div>
              )}
              <span className="relative flex items-center gap-2">
                <Activity className="w-5 h-5" />
                All Coins
              </span>
            </button>

            <button
              onClick={metaVerseCategrotyHandler}
              className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                tabState === "metaverse"
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                  : "bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 hover:text-white border border-gray-700 hover:border-gray-600"
              }`}
            >
              {tabState === "metaverse" && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-75"></div>
              )}
              <span className="relative flex items-center gap-2">
                <div className="w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                Metaverse
              </span>
            </button>

            <button
              onClick={gamingCoinsCategoryHandler}
              className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                tabState === "gaming"
                  ? "bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg shadow-green-500/25"
                  : "bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 hover:text-white border border-gray-700 hover:border-gray-600"
              }`}
            >
              {tabState === "gaming" && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl blur opacity-75"></div>
              )}
              <span className="relative flex items-center gap-2">
                <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-teal-400 rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                </div>
                Gaming
              </span>
            </button>

            <button
              onClick={onOpen}
              className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-300 hover:from-yellow-500/30 hover:to-orange-500/30 hover:text-yellow-200 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative flex items-center gap-2">
                <Star className="w-5 h-5 group-hover:fill-yellow-400 transition-all" />
                Favourites
              </span>
            </button>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-8 h-8 bg-blue-500/20 rounded-full animate-pulse"></div>
          <div className="absolute top-4 right-4 w-6 h-6 bg-purple-500/20 rounded-full animate-pulse delay-75"></div>
          <div className="absolute bottom-4 left-1/2 w-4 h-4 bg-pink-500/20 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>

      {/* Stats Pills */}
      <div className="flex justify-center gap-4 mt-8">
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-full px-4 py-2 text-gray-300 text-sm">
          <span className="text-green-400">●</span> Live Market Data
        </div>
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-full px-4 py-2 text-gray-300 text-sm">
          <span className="text-blue-400">●</span> Real-time Updates
        </div>
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-full px-4 py-2 text-gray-300 text-sm">
          <span className="text-purple-400">●</span> 24/7 Tracking
        </div>
      </div>
    </div>
  );
};

export default ModernSearchHeader;