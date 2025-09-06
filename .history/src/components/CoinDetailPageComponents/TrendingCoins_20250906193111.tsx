import React, { useState, useEffect, useCallback, memo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Activity
} from 'lucide-react';

type topCoinObj = {
  coinName?: string;
  image: string;
  percentChange?: number;
  current_price: number;
  id: string;
  symbol: string;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
};

// Sample data for demo
const sampleData: topCoinObj[] = [
  {
    id: 'bitcoin',
    image: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',
    symbol: 'btc',
    current_price: 43250.50,
    price_change_percentage_24h: 2.45,
    high_24h: 44100.25,
    low_24h: 42800.75
  },
  {
    id: 'ethereum',
    image: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png',
    symbol: 'eth',
    current_price: 2650.75,
    price_change_percentage_24h: -1.23,
    high_24h: 2720.50,
    low_24h: 2590.25
  },
  {
    id: 'cardano',
    image: 'https://coin-images.coingecko.com/coins/images/975/small/cardano.png',
    symbol: 'ada',
    current_price: 0.485,
    price_change_percentage_24h: 3.78,
    high_24h: 0.492,
    low_24h: 0.465
  },
  {
    id: 'solana',
    image: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',
    symbol: 'sol',
    current_price: 98.45,
    price_change_percentage_24h: -0.87,
    high_24h: 102.30,
    low_24h: 96.20
  },
  {
    id: 'polygon',
    image: 'https://coin-images.coingecko.com/coins/images/4713/small/matic-token-icon.png',
    symbol: 'matic',
    current_price: 0.825,
    price_change_percentage_24h: 5.42,
    high_24h: 0.850,
    low_24h: 0.780
  },
  {
    id: 'chainlink',
    image: 'https://coin-images.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
    symbol: 'link',
    current_price: 14.25,
    price_change_percentage_24h: -2.15,
    high_24h: 14.85,
    low_24h: 13.90
  }
];

const TrendingCoins = () => {
  const [topCoins, setTopCoins] = useState<topCoinObj[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(4);

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else if (window.innerWidth < 1280) setItemsPerView(3);
      else setItemsPerView(4);
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const fetchCoinData = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTopCoins(sampleData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching coin data:', error);
      setError('Failed to load trending coins. Please try again.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoinData();
  }, [fetchCoinData]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || topCoins.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const maxIndex = Math.max(0, topCoins.length - itemsPerView);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, topCoins.length, itemsPerView]);

  const nextSlide = () => {
    const maxIndex = Math.max(0, topCoins.length - itemsPerView);
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, topCoins.length - itemsPerView);
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toLocaleString();
  };

  // eslint-disable-next-line react/display-name
  const CoinCard = memo(({ item, index }: { item: topCoinObj; index: number }) => {
    const isPositive = item.price_change_percentage_24h > 0;
    
    return (
      <div 
        className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
        
        {/* Main card */}
        <div className="relative w- bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-6 h-64 flex flex-col justify-between overflow-hidden">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
          
          {/* Header */}
          <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.symbol}
                  className="w-12 h-12 rounded-full ring-2 ring-gray-700 group-hover:ring-blue-500 transition-all duration-300"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              
              <div>
                <h3 className="font-bold text-white text-lg uppercase tracking-wide">
                  {item.symbol}
                </h3>
                <p className="text-gray-400 text-sm capitalize truncate max-w-[100px]">
                  {item.id}
                </p>
              </div>
            </div>
            
            <ArrowUpRight className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
          </div>

          {/* Divider with glow */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-4 group-hover:via-blue-500 transition-all duration-300"></div>

          {/* Price section */}
          <div className="space-y-3 relative z-10">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Price</p>
                <p className="text-white font-bold text-xl">
                  ${formatNumber(item.current_price)}
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">24h Change</p>
                <div className={`flex items-center gap-1 justify-end ${
                  isPositive ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="font-bold text-lg">
                    {isPositive ? '+' : ''}{item.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {/* High/Low section */}
            <div className="flex justify-between items-center pt-2 border-t border-gray-800 group-hover:border-gray-700 transition-colors">
              <div className="text-center">
                <p className="text-gray-500 text-xs font-medium">24H HIGH</p>
                <p className="text-emerald-400 font-semibold text-sm flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  ${formatNumber(item.high_24h)}
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-gray-500 text-xs font-medium">24H LOW</p>
                <p className="text-red-400 font-semibold text-sm flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  ${formatNumber(item.low_24h)}
                </p>
              </div>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        </div>
      </div>
    );
  });

  // Loading skeleton
  const SkeletonCard = ({ index }: { index: number }) => (
    <div 
      className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-6 h-52 relative overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/50 to-transparent animate-pulse"></div>
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="space-y-2">
            <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-20 h-3 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="w-6 h-6 bg-gray-700 rounded animate-pulse"></div>
      </div>
      
      <div className="h-px bg-gray-700 my-4"></div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="w-12 h-3 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-20 h-5 bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="w-16 h-3 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-14 h-5 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="flex justify-between pt-2">
          <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Activity className="w-8 h-8 text-blue-500" />
          <h2 className="text-4xl font-bold text-white tracking-tight">
            Top Crypto Coins Updates
          </h2>
          <Activity className="w-8 h-8 text-purple-500" />
        </div>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        <p className="text-gray-400 mt-4 text-lg">Real-time market data for trending cryptocurrencies</p>
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <div className="bg-red-500/20 backdrop-blur-xl rounded-2xl border border-red-500/30 p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-red-400 text-lg font-semibold mb-4">{error}</p>
            <button
              onClick={fetchCoinData}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Main Carousel Container */}
      {!error && (
        <div className="relative">
          {/* Controls */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                  isPlaying 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              
              <button
                onClick={fetchCoinData}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 rounded-xl transition-all"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {/* Navigation Arrows */}
            {topCoins.length > itemsPerView && (
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-700/50 hover:scale-110 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-700/50 hover:scale-110 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-8"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(topCoins.length / itemsPerView) * 100}%`
              }}
            >
              {loading ? (
                // Loading skeletons
                Array.from({ length: 6 }, (_, index) => (
                  <div key={index} style={{ width: `${100 / itemsPerView}%` }} className="px-1">
                    <SkeletonCard index={index} />
                  </div>
                ))
              ) : (
                // Actual coins
                topCoins.map((coin, index) => (
                  <div key={coin.id} style={{ width: `${100 / itemsPerView}%` }} className="px-1">
                    <CoinCard item={coin} index={index} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Dots Indicator */}
          {topCoins.length > itemsPerView && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.max(0, topCoins.length - itemsPerView + 1) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === index 
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Market Summary */}
      {!loading && topCoins.length > 0 && (
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-gray-400 text-sm font-medium">Best Performer</span>
            </div>
            <div className="text-white text-xl font-bold">
              {topCoins.reduce((max, coin) => coin.price_change_percentage_24h > max.price_change_percentage_24h ? coin : max).symbol.toUpperCase()}
            </div>
            <div className="text-green-400 text-sm font-semibold">
              +{Math.max(...topCoins.map(coin => coin.price_change_percentage_24h)).toFixed(2)}%
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-gray-400 text-sm font-medium">Average Change</span>
            </div>
            <div className="text-white text-xl font-bold">
              {(topCoins.reduce((sum, coin) => sum + coin.price_change_percentage_24h, 0) / topCoins.length).toFixed(2)}%
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-gray-400 text-sm font-medium">Tracking Coins</span>
            </div>
            <div className="text-white text-xl font-bold">{topCoins.length}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingCoins;