import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Search, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpDown, 
  DollarSign, 
  ChevronDown,
  X,
  XCircle 
} from 'lucide-react';

// Mock Redux and toast functionality for demo
const mockToast = (options) => {
  console.log('Toast:', options.description);
};

const mockDispatch = (action) => {
  console.log('Dispatch:', action);
};

const mockSelector = () => []; // Empty favorites array for demo

const mockFavouritesActions = {
  addToFavourites: (coin) => ({ type: 'ADD_FAVOURITE', payload: coin }),
  removeFromFavourites: (coin) => ({ type: 'REMOVE_FAVOURITE', payload: coin })
};

// Mock Footer component
const Footer = () => (
  <div className="mt-20 py-8 border-t border-gray-800 text-center text-gray-400">
    <p>&copy; 2025 Crypto Market. All rights reserved.</p>
  </div>
);

// Mock Drawer components
const Drawer = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative ml-auto w-80 bg-white h-full shadow-xl">
        {children}
      </div>
    </div>
  );
};

const DrawerContent = ({ children }) => <div className="h-full flex flex-col">{children}</div>;
const DrawerHeader = ({ children }) => (
  <div className="p-4 border-b border-gray-200 font-semibold text-lg">{children}</div>
);
const DrawerBody = ({ children }) => <div className="flex-1 p-4 overflow-y-auto">{children}</div>;

type topCoinObj = {
    coinName?: string,
    image: string,
    percentChange?: number,
    current_price: number,
    id: string,
    symbol: string,
    price_change_percentage_24h: number,
    market_cap: number,
    total_volume: number,
    name?: string,
    price?: number
}

const HomeComponent = () => {
    const [cryptoData, setCryptoData] = useState<topCoinObj[]>([]);
    const [filteredArray, setFilteredArray] = useState<topCoinObj[]>([]);
    const [seacrhTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState<number>(1);
    const [active, setActive] = useState(1);
    const [currencyModal, setCurrecnyModal] = useState(false);
    const [currency, setCurrency] = useState("usd");
    const [metaverseCoins, setMetavserseCoins] = useState<topCoinObj[]>([]);
    const [metaverseFilter, setMetaverseFilter] = useState<topCoinObj[]>([]);
    const [gamingCoins, setGamingCoins] = useState<topCoinObj[]>([]);
    const [gamingFilter, setGamingFilter] = useState<topCoinObj[]>([]);
    const [originalARR, setOriginalARR] = useState([]);
    const [tabState, setTabState] = useState("all coins");
    const [isOpen, setIsOpen] = useState(false);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const pages = [1, 2, 3, 4];
    const reduxFavouritesARR = mockSelector();
    const toast = mockToast;
    const dispatch = mockDispatch;

    // Sample data for demo
    const sampleData = [
        {
            id: 'bitcoin',
            image: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',
            current_price: 43250.50,
            price_change_percentage_24h: 2.45,
            total_volume: 15234567890,
            market_cap: 845234567890,
            symbol: 'btc',
            name: 'Bitcoin'
        },
        {
            id: 'ethereum',
            image: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png',
            current_price: 2650.75,
            price_change_percentage_24h: -1.23,
            total_volume: 8765432100,
            market_cap: 318765432100,
            symbol: 'eth',
            name: 'Ethereum'
        },
        {
            id: 'cardano',
            image: 'https://coin-images.coingecko.com/coins/images/975/small/cardano.png',
            current_price: 0.485,
            price_change_percentage_24h: 3.78,
            total_volume: 234567890,
            market_cap: 17234567890,
            symbol: 'ada',
            name: 'Cardano'
        },
        {
            id: 'solana',
            image: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',
            current_price: 98.45,
            price_change_percentage_24h: -0.87,
            total_volume: 1234567890,
            market_cap: 43234567890,
            symbol: 'sol',
            name: 'Solana'
        },
        {
            id: 'polygon',
            image: 'https://coin-images.coingecko.com/coins/images/4713/small/matic-token-icon.png',
            current_price: 0.825,
            price_change_percentage_24h: 5.42,
            total_volume: 567890123,
            market_cap: 7654321000,
            symbol: 'matic',
            name: 'Polygon'
        }
    ];

    // Initialize with sample data for demo
    useEffect(() => {
        setCryptoData(sampleData);
        setOriginalARR(sampleData);
        setFilteredArray(sampleData);
        setMetavserseCoins(sampleData.slice(0, 3));
        setMetaverseFilter(sampleData.slice(0, 3));
        setGamingCoins(sampleData.slice(2, 5));
        setGamingFilter(sampleData.slice(2, 5));
    }, [currency]);

    const formatNumber = (num) => {
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

    const handleSort = (field, type) => {
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

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        if (tabState === "all coins") {
            if (filteredArray.length > 0) {
                const mutateArr = filteredArray.filter((item) => {
                    const coinName = item.id.toLowerCase().includes(searchTerm.toLowerCase());
                    const coinSymbol = item.symbol.toLowerCase().includes(searchTerm.toLowerCase());
                    return coinName || coinSymbol;
                });
                setCryptoData(mutateArr);
                setActive(1);
                setPage(1);
            }
        } else if (tabState === "metaverse") {
            if (metaverseFilter.length > 0) {
                const mutateArr = metaverseFilter.filter((item) => {
                    const coinName = item.id.toLowerCase().includes(searchTerm.toLowerCase());
                    const coinSymbol = item.symbol.toLowerCase().includes(searchTerm.toLowerCase());
                    return coinName || coinSymbol;
                });
                setCryptoData(mutateArr);
                setActive(1);
                setPage(1);
            }
        } else if (tabState === "gaming") {
            if (gamingFilter.length > 0) {
                const mutateArr = gamingFilter.filter((item) => {
                    const coinName = item.id.toLowerCase().includes(searchTerm.toLowerCase());
                    const coinSymbol = item.symbol.toLowerCase().includes(searchTerm.toLowerCase());
                    return coinName || coinSymbol;
                });
                setCryptoData(mutateArr);
                setActive(1);
                setPage(1);
            }
        }
    };

    const addToFavouritesHandler = (coin: topCoinObj) => {
        dispatch(mockFavouritesActions.addToFavourites(coin));
        toast({
            title: "",
            description: "Added Successfully",
            status: "success",
            duration: 1500,
            isClosable: true,
        });
    };

    const removeFromFavHandler = (coin: topCoinObj) => {
        dispatch(mockFavouritesActions.removeFromFavourites(coin));
    };

    const currencyModalToggle = () => {
        setCurrecnyModal(!currencyModal);
    };

    const metaVerseCategrotyHandler = () => {
        setCryptoData(metaverseCoins);
        setTabState("metaverse");
    };

    const gamingCoinsCategoryHandler = () => {
        setCryptoData(gamingCoins);
        setTabState("gaming");
    };

    const allCoinsHandler = () => {
        setCryptoData(originalARR);
        setTabState("all coins");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {/* Header */}
            <div className="pt-8 pb-4">
                <h1 className="text-4xl font-bold text-center text-white mb-2 tracking-tight">
                    Market
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-8"></div>
            </div>

            {/* Search and Controls */}
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search cryptocurrencies..."
                            value={seacrhTerm}
                            onChange={searchHandler}
                            className="w-80 px-4 py-3 pl-12 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    </div>

                    {/* Currency Selector */}
                    <div className="relative">
                        <button
                            onClick={currencyModalToggle}
                            className="flex items-center gap-2 px-6 py-3 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl text-white hover:bg-gray-700/50 transition-all"
                        >
                            <DollarSign className="w-5 h-5" />
                            <span>Currency</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>

                        {currencyModal && (
                            <div className="absolute top-full mt-2 w-48 bg-gray-800/95 backdrop-blur border border-gray-700 rounded-xl shadow-xl z-50">
                                <div className="p-2">
                                    <button
                                        onClick={() => {setCurrency("usd"); setCurrecnyModal(false);}}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-700/50 rounded-lg transition-all"
                                    >
                                        <DollarSign className="w-5 h-5" />
                                        <span>USD</span>
                                    </button>
                                    <button
                                        onClick={() =