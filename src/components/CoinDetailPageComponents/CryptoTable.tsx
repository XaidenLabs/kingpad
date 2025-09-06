import React, { useState } from 'react';
import { Star, TrendingUp, TrendingDown, ArrowUpDown, DollarSign } from 'lucide-react';

// Sample data to demonstrate the UI
const sampleCryptoData = [
  {
    id: 'bitcoin',
    image: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',
    current_price: 43250.50,
    price_change_percentage_24h: 2.45,
    total_volume: 15234567890,
    market_cap: 845234567890,
    symbol: 'btc'
  },
  {
    id: 'ethereum',
    image: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png',
    current_price: 2650.75,
    price_change_percentage_24h: -1.23,
    total_volume: 8765432100,
    market_cap: 318765432100,
    symbol: 'eth'
  },
  {
    id: 'cardano',
    image: 'https://coin-images.coingecko.com/coins/images/975/small/cardano.png',
    current_price: 0.485,
    price_change_percentage_24h: 3.78,
    total_volume: 234567890,
    market_cap: 17234567890,
    symbol: 'ada'
  },
  {
    id: 'solana',
    image: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',
    current_price: 98.45,
    price_change_percentage_24h: -0.87,
    total_volume: 1234567890,
    market_cap: 43234567890,
    symbol: 'sol'
  },
  {
    id: 'polygon',
    image: 'https://coin-images.coingecko.com/coins/images/4713/small/matic-token-icon.png',
    current_price: 0.825,
    price_change_percentage_24h: 5.42,
    total_volume: 567890123,
    market_cap: 7654321000,
    symbol: 'matic'
  }
];

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState(sampleCryptoData);
  const [currency, setCurrency] = useState('usd');
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<"current_price" | "market_cap" | null>(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const formatNumber = (num: number) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + 'B';
    }
    if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + 'M';
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + 'K';
    }
    return num.toLocaleString();
  };

  const handleSort = (field: 'current_price' | 'market_cap', type: 'price' | 'market_cap') => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
    
    const sortedData = [...cryptoData].sort((a, b) => {
      if (type === 'price') {
        return newDirection === 'asc' ? a.current_price - b.current_price : b.current_price - a.current_price;
      } else if (type === 'market_cap') {
        return newDirection === 'asc' ? a.market_cap - b.market_cap : b.market_cap - a.market_cap;
      }
      return 0;
    });
    setCryptoData(sortedData);
  };

  type CryptoCoin = {
    id: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    total_volume: number;
    market_cap: number;
    symbol: string;
  };

  const addToFavorites = (coin: CryptoCoin) => {
    console.log('Added to favorites:', coin.id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center text-white mb-2 tracking-tight">
          Cryptocurrency Market
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
      </div>

      {/* Table Container */}
      <div className="relative">
        {/* Glow effect background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl blur-xl"></div>
        
        {/* Main table container */}
        <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden shadow-2xl">
          {cryptoData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-white text-xl font-semibold">No Results Found</p>
              <p className="text-gray-400 mt-2">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-6 px-6">
                      <div className="w-8"></div>
                    </th>
                    <th className="text-left py-6 px-4">
                      <span className="text-gray-300 font-semibold text-sm uppercase tracking-wider">
                        Currency
                      </span>
                    </th>
                    <th className="text-right py-6 px-4">
                      <button 
                        onClick={() => handleSort('current_price', 'price')}
                        className="flex items-center gap-2 ml-auto text-gray-300 hover:text-white transition-colors group"
                      >
                        <span className="font-semibold text-sm uppercase tracking-wider">Price</span>
                        <ArrowUpDown className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                      </button>
                    </th>
                    <th className="text-right py-6 px-4">
                      <span className="text-gray-300 font-semibold text-sm uppercase tracking-wider">
                        24h Change
                      </span>
                    </th>
                    <th className="text-right py-6 px-4">
                      <span className="text-gray-300 font-semibold text-sm uppercase tracking-wider">
                        Volume
                      </span>
                    </th>
                    <th className="text-right py-6 px-6">
                      <button 
                        onClick={() => handleSort('market_cap', 'market_cap')}
                        className="flex items-center gap-2 ml-auto text-gray-300 hover:text-white transition-colors group"
                      >
                        <span className="font-semibold text-sm uppercase tracking-wider">Market Cap</span>
                        <ArrowUpDown className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cryptoData.slice(page * 20 - 20, page * 20).map((coin, index) => (
                    <tr 
                      key={coin.id} 
                      className="group border-b border-gray-800/50 hover:bg-gray-800/50 transition-all duration-200"
                    >
                      {/* Favorite Button */}
                      <td className="py-4 px-6">
                        <button
                          onClick={() => addToFavorites(coin)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-yellow-500/20 transition-all duration-200 group/star"
                        >
                          <Star className="w-5 h-5 text-gray-400 group-hover/star:text-yellow-400 group-hover/star:fill-yellow-400 transition-all duration-200" />
                        </button>
                      </td>

                      {/* Currency Info */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3 cursor-pointer group/coin">
                          <div className="relative">
                            <img 
                              src={coin.image} 
                              alt={coin.id}
                              className="w-10 h-10 rounded-full ring-2 ring-gray-700 group-hover/coin:ring-blue-500 transition-all duration-200"
                            />
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover/coin:opacity-20 transition-opacity duration-200"></div>
                          </div>
                          <div>
                            <div className="font-bold text-white text-lg capitalize group-hover/coin:text-blue-400 transition-colors">
                              {coin.id.length > 12 ? coin.id.substring(0, 12) + '...' : coin.id}
                            </div>
                            <div className="text-gray-400 text-sm uppercase font-medium">
                              {coin.symbol}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 text-right">
                        <div className="font-bold text-white text-lg">
                          <span className="text-gray-400 mr-1">$</span>
                          {coin.current_price.toLocaleString()}
                        </div>
                      </td>

                      {/* 24h Change */}
                      <td className="py-4 px-4 text-right">
                        <div className={`flex items-center justify-end gap-2 ${
                          coin.price_change_percentage_24h > 0 
                            ? 'text-emerald-400' 
                            : 'text-red-400'
                        }`}>
                          {coin.price_change_percentage_24h > 0 ? (
                            <div className="flex items-center gap-1 bg-emerald-500/20 px-2 py-1 rounded-full">
                              <TrendingUp className="w-4 h-4" />
                              <span className="font-bold text-sm">
                                +{coin.price_change_percentage_24h.toFixed(2)}%
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 bg-red-500/20 px-2 py-1 rounded-full">
                              <TrendingDown className="w-4 h-4" />
                              <span className="font-bold text-sm">
                                {coin.price_change_percentage_24h.toFixed(2)}%
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Volume */}
                      <td className="py-4 px-4 text-right">
                        <div className="font-semibold text-gray-300">
                          ${formatNumber(coin.total_volume)}
                        </div>
                      </td>

                      {/* Market Cap */}
                      <td className="py-4 px-6 text-right">
                        <div className="font-bold text-white">
                          ${formatNumber(coin.market_cap)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        {[1, 2, 3, 4].map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`w-12 h-12 rounded-xl font-bold transition-all duration-200 ${
              page === pageNum
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white hover:scale-105'
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-gray-400 text-sm font-medium">Top Gainer</span>
          </div>
          <div className="text-white text-xl font-bold">
            {cryptoData.reduce((max, coin) => coin.price_change_percentage_24h > max.price_change_percentage_24h ? coin : max).id}
          </div>
          <div className="text-green-400 text-sm font-semibold">
            +{Math.max(...cryptoData.map(coin => coin.price_change_percentage_24h)).toFixed(2)}%
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-gray-400 text-sm font-medium">Total Market Cap</span>
          </div>
          <div className="text-white text-xl font-bold">
            ${formatNumber(cryptoData.reduce((sum, coin) => sum + coin.market_cap, 0))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-gray-400 text-sm font-medium">Active Coins</span>
          </div>
          <div className="text-white text-xl font-bold">{cryptoData.length}</div>
        </div>
      </div>
    </div>
  );
};

export default CryptoTable;