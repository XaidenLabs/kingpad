import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import styles from "../../styles/TrendingCoins.module.css";
import AliceCarousel from "react-alice-carousel";
import { BsArrowUpRight } from "react-icons/bs";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import Link from "next/link";

// ----------------- Types -----------------
interface Coin {
  id: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
}

// ----------------- Loader -----------------
const SkeletonCard = () => (
  <div className="animate-pulse w-80 h-44 bg-gray-800 rounded-2xl p-4 flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <div className="bg-gray-600 rounded-full w-10 h-10"></div>
      <div className="bg-gray-600 h-4 w-20 rounded"></div>
      <div className="bg-gray-700 h-5 w-16 rounded ml-auto"></div>
    </div>
    <div className="bg-gray-700 h-4 w-40 rounded"></div>
    <div className="flex justify-between mt-auto">
      <div className="bg-gray-700 h-3 w-24 rounded"></div>
      <div className="bg-gray-700 h-3 w-24 rounded"></div>
    </div>
  </div>
);

// ----------------- Card -----------------
const TrendingCoinCard: React.FC<{ coin: Coin }> = ({ coin }) => {
  const isPositive = coin.price_change_percentage_24h > 0;

  return (
    <div className="boxshDark w-80 h-44 rounded-2xl flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 hover:scale-105 transition-transform duration-300 shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center px-4 pt-4">
        <Link href={`/${coin.id}`} className="flex items-center gap-2">
          <img src={coin.image} className="w-10 h-10" alt={coin.symbol} />
          <div>
            <p className="font-semibold uppercase text-white">
              {coin.symbol}
            </p>
            <p className="bg-gray-700 text-gray-300 rounded px-2 py-0.5 text-xs">
              {coin.id}
            </p>
          </div>
        </Link>
        <BsArrowUpRight className="text-gray-400 text-xl" />
      </div>

      <hr className="my-3 border-gray-700" />

      {/* Price + Change */}
      <div className="flex justify-between px-4 text-sm">
        <p className="text-white">
          <span className="font-semibold">Price: </span>${" "}
          {coin.current_price.toLocaleString()}
        </p>
        <p
          className={`font-semibold ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>

      {/* High & Low */}
      <div className="flex justify-between px-4 mt-2 text-xs">
        <p className="text-white flex items-center gap-1">
          24h High:
          <span className="text-green-400 flex items-center gap-1">
            {coin.high_24h.toLocaleString()} <FiTrendingUp />
          </span>
        </p>
        <p className="text-white flex items-center gap-1">
          24h Low:
          <span className="text-red-400 flex items-center gap-1">
            {coin.low_24h.toLocaleString()} <FiTrendingDown />
          </span>
        </p>
      </div>
    </div>
  );
};

// ----------------- Main -----------------
const TrendingCoins = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCoinData = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        }
      );
      setCoins(response.data);
    } catch (err) {
      console.error("Failed to fetch coin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinData();
  }, []);

  const responsive = {
    0: { items: 1, stagePadding: { paddingLeft: 20, paddingRight: 20 } },
    768: { items: 2, stagePadding: { paddingLeft: 10, paddingRight: 10 } },
    1150: { items: 4, stagePadding: { paddingLeft: 40, paddingRight: 40 } },
  };

  const renderedItems = useMemo(
    () =>
      coins.map((coin, idx) => <TrendingCoinCard key={coin.id + idx} coin={coin} />),
    [coins]
  );

  return (
    <div className="relative top-6 sm:mr-4">
      <p className="text-center text-4xl text-white font-bold mb-8 interFont">
        🚀 Top Crypto Coins Updates
      </p>

      <div className={styles.trendingHold}>
        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        ) : (
          <AliceCarousel
            autoPlay
            autoPlayInterval={2000}
            animationDuration={1000}
            mouseTracking
            infinite
            disableButtonsControls
            disableDotsControls
            responsive={responsive}
          >
            {renderedItems}
          </AliceCarousel>
        )}
      </div>
    </div>
  );
};

export default TrendingCoins;
