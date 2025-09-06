import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import styles from "../../styles/HomeComnponent.module.css"
import { FaSearch } from "react-icons/fa"
import { AiFillDollarCircle, AiOutlineStar, AiFillDelete } from "react-icons/ai"
import { RxCrossCircled, RxCross1 } from "react-icons/rx"
import { FiTrendingDown } from "react-icons/fi"
import { FiTrendingUp } from "react-icons/fi"
import { AiFillCaretDown } from "react-icons/ai"
import { AiOutlineDollarCircle, AiFillStar } from "react-icons/ai"
import { BiRupee } from "react-icons/bi"
import { useToast } from '@chakra-ui/react'
import { favouritesActions } from "../../ReduxStore/FavouritesSlice";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerContentProps,
    DrawerProps,

} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react';
import { HiOutlineArrowsUpDown } from "react-icons/hi2"
import { Tooltip } from '@chakra-ui/react'
import Table from '../CoinDetailPageComponents/CryptoTable'
import Footer from './Footer';
import Link from 'next/link';

type topCoinObj = {
    coinName: string,
    image: string,
    percentChange: number,
    current_price: number,
    id: string,
    symbol: string,
    price_change_percentage_24h: number,
    market_cap: number,
    total_volume: number
}


type CryptoCoin = {
    id: string;
    price: number;
    image: string;
    name: string;
};

const HomeComnponent = () => {

    const [cryptoData, setCryptoData] = useState<topCoinObj[]>([]);  // all coins
    const [filteredArray, setFilteredArray] = useState<topCoinObj[]>([]); // all coins
    const [seacrhTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState<number>(1);
    const [active, setActive] = useState(1);
    const [currencyModal, setCurrecnyModal] = useState(false);
    const [currency, setCurrency] = useState("usd");
    const [metaverseCoins, setMetavserseCoins] = useState<topCoinObj[]>([]) // metaverse coins
    const [metaverseFilter, setMetaverseFilter] = useState<topCoinObj[]>([]); // metaverse coins

    const [gamingCoins, setGamingCoins] = useState<topCoinObj[]>([]) // gaimng
    const [gamingFilter, setGamingFilter] = useState<topCoinObj[]>([]) // gaimng

    const [originalARR, setOriginalARR] = useState([]);
    const [tabState, setTabState] = useState("all coins");


    const pages = [1, 2, 3, 4];

    const reduxFavouritesARR: any[] = useSelector((state: any) => state.favourites.list);
    const toast = useToast();
    const dispacth = useDispatch();


    //fecthnig data
    useEffect(() => {
        // all coins
        fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=80&page=1&sparkline=false`
        )
            .then((response) => response.json())
            .then((data) => {
                setCryptoData(data)
                setOriginalARR(data);
                setFilteredArray(data);
            })
            .catch((error) => {
                // Handle error
                throw new Error('Error fetching all coins: ' + error);
            });

        // metaverse
        fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&category=metaverse&order=market_cap_desc&per_page=80&page=1&sparkline=false`
        )
            .then((response) => response.json())
            .then((data) => {
                setMetavserseCoins(data)
                setMetaverseFilter(data)
            })
            .catch((error) => {
                // Handle error
                throw new Error('Error fetching metaverse coins: ' + error);
            });

        // gaming
        /* fetch(
             `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&category=gaming&order=market_cap_desc&per_page=80&page=1&sparkline=false`
         )
             .then((response) => response.json())
             .then((data) => {
                 setGamingCoins(data)
                 setGamingFilter(data)
             })
             .catch((error) => {
                 // Handle error
                 throw new Error('Error fetching gaming coins: ' + error);
             });*/

    }, [currency]);




    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        // search for all coins
        if (tabState === "all coins") {

            if (filteredArray.length > 0) {
                const mutateArr = filteredArray.filter((item) => {
                    const coinName = item.id.toLowerCase().includes(searchTerm.toLowerCase());
                    const coinSymbol = item.symbol.toLowerCase().includes(searchTerm.toLowerCase());

                    return coinName || coinSymbol
                });

                setCryptoData(mutateArr);

                // Reset the active page to the first page
                setActive(1);
                setPage(1);
            }
        }

        // search for metaverse

        else if (tabState === "metaverse") {

            if (metaverseFilter.length > 0) {
                const mutateArr = metaverseFilter.filter((item) => {
                    const coinName = item.id.toLowerCase().includes(searchTerm.toLowerCase());
                    const coinSymbol = item.symbol.toLowerCase().includes(searchTerm.toLowerCase());

                    return coinName || coinSymbol
                });

                setCryptoData(mutateArr);

                // Reset the active page to the first page
                setActive(1);
                setPage(1);
            }
        }

        // search for gaming


        else if (tabState === "gaming") {

            if (gamingFilter.length > 0) {
                const mutateArr = gamingFilter.filter((item) => {
                    const coinName = item.id.toLowerCase().includes(searchTerm.toLowerCase());
                    const coinSymbol = item.symbol.toLowerCase().includes(searchTerm.toLowerCase());

                    return coinName || coinSymbol
                });

                setCryptoData(mutateArr);

                // Reset the active page to the first page
                setActive(1);
                setPage(1);
            }
        }



    };


    // redux methods
    const addToFavouritesHandler = (coin: topCoinObj) => {

        dispacth(favouritesActions.addToFavourites(coin));

        toast({
            title: "",
            description: "Added Successfully",
            status: "success",
            duration: 1500,
            isClosable: true,
        });
    }

    const removeFromFavHandler = (coin: topCoinObj) => {
        dispacth(favouritesActions.removeFromFavourites(coin))
    }



    // currecny modal
    const currencyModalToggle = () => {
        setCurrecnyModal(!currencyModal)
    }


    // tabs change 
    const metaVerseCategrotyHandler = () => {
        setCryptoData(metaverseCoins)
        setTabState("metaverse")
    }

    const gamingCoinsCategoryHandler = () => {
        setCryptoData(gamingCoins)
        setTabState("gaming")
    }

    const allCoinsHandler = () => {
        setCryptoData(originalARR)
        setTabState("all coins")
    }

    // add to favourites drawer 
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [sortOrder, setSortOrder] = useState('none');


    const lowTOhighHanler = () => {

        const sortedData = [...cryptoData].sort((a, b) => a.current_price - b.current_price);
        setCryptoData(sortedData);
    }

    const highTOlowHandler = () => {
        const sortedData = [...cryptoData].sort((a, b) => b.current_price - a.current_price);
        setCryptoData(sortedData);
    }


    const MyDrawerContent = ({ children }: React.PropsWithChildren<{}>) => {
        return <DrawerContent>{children}</DrawerContent>
    };

    const MyDrawerBody = ({ children }: React.PropsWithChildren<{}>) => {
        return <DrawerBody>{children}</DrawerBody>
    };


    return (

        <div>
            { /*OPTIONS HEADER */}

            {  /* SEARCH BAR */}
            {/* <p className="justify-center text-center text-4xl text-white font-medium mb-8 relative -top-2 interFont">Market </p>

            <div className={"flex flex-wrap items-center justify-center"}>

                <div className='flex items-center gap-8 tableHeaderChild1 md:justify-center'>

                    <div className='mt-3'>
                        <input
                            type="text"
                            placeholder="Search"
                            value={seacrhTerm}
                            onChange={searchHandler}
                            className="px-4 py-2 pl-7 boxsh rounded-md relative z-50 bg-transparent border-2 border-gray-200 text-gray-600 focus:outline-none"
                        />
                        <FaSearch className="search-icon relative -top-7 ml-2 text-gray-400 text-sm w-3 -z-1" />
                    </div>

                    <div onClick={currencyModalToggle} className=" items-center gap-2 hidden lg:flex cursor-pointer border rounded w-64 justify-center h-10 text-white">
                        <p>Currency</p>
                        <AiFillCaretDown className='' />
                    </div>

                    {  /* CUURRECYY */}

                    {/* <div className={"  w38rem hidden lg:block"}>
                        {currencyModal && <div className={styles.currencyModalHold}>
                            <div>

                                <div className=' flex font-semibold gap-3 items-center cursor-pointer mb-7 text-white'>
                                    <AiOutlineDollarCircle className='text-xl font-semibold' />
                                    <p onClick={() => setCurrency("usd")}> USD </p>
                                </div>

                                <div className=' flex font-semibold gap-3 items-center cursor-pointer text-white'>
                                    <BiRupee className='text-xl font-semibold' />
                                    <p onClick={() => setCurrency("inr")}> INR </p>
                                </div>
                            </div>

                        </div>

                        }
                    </div>
                </div> */}

                { /* FLTER TABS */}
                <div className='flex gap-8 flex-wrap items-center ml-2 md:justify-center justify-around mt-5 md:mt-0'>
                    <p className={`${tabState === "all coins" ? "text-white flex justify-center items-center w-24 h-9 rounded-md border border-black cursor-pointer interFont scalee" : "flex justify-center items-center w-24 h-9 rounded-md greyBackground cursor-pointer interFont scalee"}`} onClick={allCoinsHandler}> All Coins </p>
                    <p className={`${tabState === "metaverse" ? "text-white flex justify-center items-center w-24 h-9 rounded-md border border-black cursor-pointer interFont scalee" : "flex justify-center items-center w-24 h-9 rounded-md greyBackground cursor-pointer interFont scalee"}`} onClick={metaVerseCategrotyHandler}> Metaverse </p>
                    {  /* <p className={`${tabState === "gaming" ? "flex justify-center items-center w-24 h-9 rounded-md border border-black cursor-pointer interFont scalee" : "flex justify-center items-center w-24 h-9 rounded-md greyBackground cursor-pointer interFont scalee"}`} onClick={gamingCoinsCategoryHandler}> Gaming </p> */}
                    <p className='text-white flex justify-center items-center w-32 h-9 rounded-md greyBackground cursor-pointer interFont scalee gap-2' onClick={onOpen}>  <AiOutlineStar className='text-xl' /> Favourites </p>
                </div>

            {/* </div> */} */}

            <br />

            {  /* MAIN CRYPTO TABLE  */}


            <Table cryptoData={cryptoData} currency={currency} />

            {/* <div className="w80 mx-auto bg-gray-100 mt-4"></div> */}
            <br />
            <br />
            <br />

            {  /* PAGINATION */}
            <div className='flex gap-4 flex-wrap justify-center'>
                {pages.map((item) => {

                    return (
                        <p key={item} className={active == item ? "bg-black text-white indivitualPage2 font-semibold cursor-pointer" : "indivitualPage font-semibold cursor-pointer"} onClick={(e) => {
                            if (e.target instanceof HTMLParagraphElement) {
                                setPage(parseInt(e.target.innerText) || 0);
                                setActive(parseInt(e.target.innerText) || 0);

                            }

                        }}>
                            {item}
                        </p>
                    )

                })}
            </div>


            <br />
            <br />
            <br />

            {  /*  FAVOURITES DRAWER */}

            <Drawer onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'> <div className='flex gap-2'>  <span className='font-semibold'>Favourites</span> <AiFillStar className='golden font-bold text-3xl' /> </div> </DrawerHeader>
                    <DrawerBody>
                        <br />

                        <div className='flex flex-col gap-12'>

                            {reduxFavouritesARR.length === 0 ? <p className=' font-semibold'> Nothing Here Yet </p> :
                                reduxFavouritesARR.map((item: any) => {
                                    return (
                                        <div key={item}>
                                            {reduxFavouritesARR.length === 0 ? <p> Nothing Here Yet </p> :
                                                <>
                                                    <div className='flex gap-2 items-center'>
                                                        <img src={item.image} className="w-12 h-12" alt='ada' />
                                                        <div className='flex flex-col'>
                                                            <p className='font-semibold text-sm sm:text-base uppercase'> {item.name} </p>

                                                            <div className='flex gap-4 flex-wrap items-center'>
                                                                <p className=' text-sm text-gray-600 font-semibold'> ${item.price.toLocaleString()} </p>
                                                                <RxCrossCircled className='text-lg cursor-pointer' onClick={() => removeFromFavHandler(item)} />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {   /* FOOTER  */}

            <Footer />




        </div>
    )
}

export default HomeComnponent
