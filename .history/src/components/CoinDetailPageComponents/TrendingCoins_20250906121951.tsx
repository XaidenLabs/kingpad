import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { BsArrowUpRight } from "react-icons/bs";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import Link from "next/link";

interface Coin {
  id: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
}

const TrendingCoinCard: React.FC<{ coin: Coin }> = ({ coin }) => {
  const isPositive = coin.price_change_percentage_24h > 0;

  return (
    <div className="w-80 h-48 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
      {/* Top row */}
      <div className="flex justify-between items-center">
        <Link href={`/${coin.id}`} className="flex items-center gap-3">
          <img src={coin.image} className="w-10 h-10 rounded-full" alt={coin.symbol} />
          <div>
            <p className="text-white font-bold uppercase tracking-wide">{coin.symbol}</p>
            <p className="text-xs text-gray-400 capitalize">{coin.id}</p>
          </div>
        </Link>
        <BsArrowUpRight className="text-gray-400 text-xl" />
      </div>

      <hr className="border-gray-700 my-2" />

      {/* Price info */}
      <div className="flex justify-between items-center text-sm">
        <p className="text-white">
          <span className="font-medium">Price:</span>{" "}
          <span className="font-semibold">${coin.current_price.toLocaleString()}</span>
        </p>
        <p
          className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${
            isPositive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
          }`}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>

      {/* High / Low */}
      <div className="flex justify-between text-xs mt-2">
        <p className="flex items-center gap-1 text-gray-300">
          24h High:
          <span className="text-green-400 flex items-center gap-1">
            {coin.high_24h.toLocaleString()} <FiTrendingUp />
          </span>
        </p>
        <p className="flex items-center gap-1 text-gray-300">
          24h Low:
          <span className="text-red-400 flex items-center gap-1">
            {coin.low_24h.toLocaleString()} <FiTrendingDown />
          </span>
        </p>
      </div>
    </div>
  );
};

const TrendingCoins = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCoins = async () => {
    try {
      const res = await axios.get(
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
      setCoins(res.data);
    } catch (err) {
      console.error("Error fetching coins", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const responsive = {
    0: { items: 1, stagePadding: { paddingLeft: 20, paddingRight: 20 } },
    768: { items: 2, stagePadding: { paddingLeft: 10, paddingRight: 10 } },
    1150: { items: 4, stagePadding: { paddingLeft: 40, paddingRight: 40 } },
  };

  const renderedItems = useMemo(
    () => coins.map((coin, i) => <TrendingCoinCard key={coin.id + i} coin={coin} />),
    [coins]
  );

  return (
    <div className="relative top-6 sm:mr-4">
      <p className="text-center text-4xl font-bold text-white mb-8 interFont">
        🚀 Trending Crypto Coins
      </p>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <AliceCarousel
          autoPlay
          autoPlayInterval={2000}
          animationDuration={900}
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
  );
};

export default TrendingCoins;
