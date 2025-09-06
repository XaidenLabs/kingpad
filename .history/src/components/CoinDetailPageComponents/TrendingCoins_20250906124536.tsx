import React, { useState, useEffect, useCallback, memo } from 'react';
import axios from 'axios';
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { BsArrowUpRight } from 'react-icons/bs';
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';
import { MdRefresh } from 'react-icons/md';
import Link from 'next/link';

type topCoinObj = {
  coinName: string;
  image: string;
  percentChange: number;
  current_price: number;
  id: number;
  symbol: string;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
};

const TrendingCoins = () => {
  const [topCoins, setTopCoins] = useState<topCoinObj[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCoinData = useCallback(async () => {
    try {
      setError(null);
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      );
      setTopCoins(response.data);
    } catch (error) {
      console.error('Error fetching coin data:', error);
      setError('Failed to load trending coins. Please try again.');
    }
  }, []);

  useEffect(() => {
    fetchCoinData();
  }, [fetchCoinData]);

  const responsive = {
    0: {
      items: 1,
      stagePadding: { paddingLeft: 20, paddingRight: 20 },
    },
    400: {
      items: 1,
      stagePadding: { paddingLeft: 30, paddingRight: 30 },
    },
    768: {
      items: 2,
      stagePadding: { paddingLeft: 25, paddingRight: 25 },
    },
    1150: {
      items: 4,
      stagePadding: { paddingLeft: 50, paddingRight: 50 },
    },
  };

  const CoinCard = memo(({ item, index }: { item: topCoinObj; index: number }) => (
    <div
      className="w-80 h-44 bg-gray-800 rounded-2xl flex flex-col shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 animate-slide-up focus:outline-none focus:ring-2 focus:ring-white"
      style={{ animationDelay: `${index * 100}ms` }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${item.symbol}`}
    >
      <div className="flex justify-between items-center gap-4 pl-4 mt-4">
        <Link href={`/${item.id}`}>
          <div className="flex items-center gap-2">
            <img src={item.image} className="w-10 h-10" alt={item.symbol} />
            <p className="font-semibold uppercase text-white">{item.symbol.substring(0, 8)}</p>
            <p className="bg-gray-100 capitalize rounded px-2 py-1 text-sm">
              {item.id.toString().substring(0, 11)}
            </p>
          </div>
        </Link>
        <BsArrowUpRight className="text-gray-400 text-xl mr-5" />
      </div>

      <hr className="mx-4 my-3 border-gray-600" />

      <div className="flex text-sm items-center justify-between px-3 mb-3">
        <p>
          <span className="text-white font-semibold">Price:</span>{' '}
          <span className="text-white">${item.current_price.toLocaleString()}</span>
        </p>
        <p className={item.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}>
          <span className="text-white font-semibold">Change:</span>{' '}
          {item.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>

      <div className="flex items-center text-sm justify-between gap-4 px-3">
        <div className="flex items-center gap-1">
          <p className="font-semibold text-xs text-white">24H High:</p>
          <p className="text-green-500 flex items-center gap-1">
            {item.high_24h.toLocaleString()} <FiTrendingUp className="text-green-500 text-lg" />
          </p>
        </div>
        <div className="flex items-center gap-1">
          <p className="font-semibold text-xs text-white">24H Low:</p>
          <p className="text-red-500 flex items-center gap-1">
            {item.low_24h.toLocaleString()} <FiTrendingDown className="text-red-500 text-lg" />
          </p>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="relative top-6 sm:mr-4">
      <p className="text-center text-4xl text-white font-medium mb-8 -mt-2 font-inter">
        Top crypto coins updates
      </p>

      <div className="relative" aria-live="polite">
        {error ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-red-500 text-lg">{error}</p>
            <button
              onClick={fetchCoinData}
              className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
            >
              <MdRefresh className="text-lg" /> Retry
            </button>
          </div>
        ) : topCoins.length > 0 ? (
          <AliceCarousel
            autoPlay={true}
            autoPlayInterval={2000}
            animationDuration={1000}
            animationType="slide"
            animationEasingFunction="ease-in-out"
            mouseTracking
            infinite={true}
            disableButtonsControls={false}
            disableDotsControls={false}
            responsive={responsive}
            aria-label="Trending cryptocurrencies carousel"
            autoPlayStrategy="default"
          >
            {topCoins.map((item, index) => (
              <CoinCard key={item.id + index} item={item} index={index} />
            ))}
          </AliceCarousel>
        ) : (
          <div className="flex gap-4 justify-center">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-80 h-44 bg-gray-800 rounded-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 shimmer" />
                <div className="flex justify-between items-center p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                    <div className="w-20 h-4 bg-gray-600 rounded"></div>
                  </div>
                  <div className="w-6 h-6 bg-gray-600 rounded"></div>
                </div>
                <hr className="mx-4 my-3 border-gray-600" />
                <div className="flex justify-between p-3">
                  <div className="w-24 h-4 bg-gray-600 rounded"></div>
                  <div className="w-24 h-4 bg-gray-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom styles for animations and controls */}
      <style jsx>{`
        .alice-carousel__prev-btn,
        .alice-carousel__next-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 1.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.7;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .alice-carousel__prev-btn {
          left: -20px;
        }
        .alice-carousel__next-btn {
          right: -20px;
        }
        .alice-carousel__prev-btn:hover,
        .alice-carousel__next-btn:hover {
          opacity: 1;
          transform: translateY(-50%) scale(1.1);
        }
        .alice-carousel__dots {
          margin-top: 16px;
        }
        .alice-carousel__dots-item {
          background-color: rgba(255, 255, 255, 0.5);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin: 0 4px;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }
        .alice-carousel__dots-item.__active {
          background-color: white;
          transform: scale(1.2);
        }
        .alice-carousel__prev-btn:focus,
        .alice-carousel__next-btn:focus,
        .alice-carousel__dots-item:focus {
          outline: 2px solid #fff;
          outline-offset: 2px;
        }
        .alice-carousel:hover .alice-carousel__stage {
          animation-play-state: paused;
        }
        .alice-carousel:hover::after {
          content: '❚❚';
          position: absolute;
          top: 10px;
          right: 10px;
          color: white;
          font-size: 1.2rem;
          opacity: 0.8;
        }
        .alice-carousel__stage-item {
          transition: transform 1s ease-in-out, opacity 1s ease-in-out, scale 1s ease-in-out;
          opacity: 0.7;
          transform: perspective(1000px) rotateY(10deg);
          scale: 0.95;
        }
        .alice-carousel__stage-item.__active {
          opacity: 1;
          transform: perspective(1000px) rotateY(0deg);
          scale: 1;
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>

      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default TrendingCoins;