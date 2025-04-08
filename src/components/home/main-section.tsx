"use client";
import React, { useEffect, useRef, useState, memo } from 'react';
import { ChevronDown, TrendingUp, Sliders, Repeat, Clock, DollarSign, AlertCircle, ChevronRight, Star, RefreshCw } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function TradingViewWidget() {
    const container = useRef<HTMLDivElement | null>(null);
    const [activeTab, setActiveTab] = useState<'Market' | 'Limit' | 'Pro'>('Market');
    const [activeAction, setActiveAction] = useState<'Buy' | 'Sell'>('Buy');
    const [sliderValue, setSliderValue] = useState(50);
    const [marketData, setMarketData] = useState({
        price: 193.42,
        change: +1.87,
        changePercent: +0.98,
        volume: "37.8M",
        high: 194.32,
        low: 191.53,
    });
    const [selectedSymbol, setSelectedSymbol] = useState("AAPL");
    const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState("0");
    const [price, setPrice] = useState("193.42");
    const [selectedSize, setSelectedSize] = useState("Size");
    const [heartbeat, setHeartbeat] = useState(0);

    // Symbol options
    const symbols = ["AAPL", "MSFT", "AMZN", "GOOGL", "META", "TSLA"];
    const timeframes = ["1m", "5m", "15m", "1H", "4H", "1D", "1W"];

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
        {
          "autosize": true,
          "symbol": "NASDAQ:${selectedSymbol}",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "withdateranges": true,
          "range": "ALL",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": true,
          "show_popup_button": true,
          "popup_width": "1000",
          "popup_height": "650",
          "support_host": "https://www.tradingview.com"
        }`;

        // Simulate loading
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        if (container.current) {
            container.current.innerHTML = '';
            container.current.appendChild(script);
        }

        const dataInterval = setInterval(() => {
            const random = Math.random() * 0.5 - 0.25;
            const newPrice = parseFloat((marketData.price + random).toFixed(2));
            const priceChange = parseFloat((newPrice - 191.55).toFixed(2));
            const percentChange = parseFloat((priceChange / 191.55 * 100).toFixed(2));

            setMarketData({
                price: newPrice,
                change: priceChange,
                changePercent: percentChange,
                volume: marketData.volume,
                high: Math.max(marketData.high, newPrice),
                low: Math.min(marketData.low, newPrice)
            });

            setPrice(newPrice.toFixed(2));
            setHeartbeat(prev => prev + 1);
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearInterval(dataInterval);
        };
    }, [selectedSymbol]);

    const handleTabChange = (tab: 'Market' | 'Limit' | 'Pro') => {
        setActiveTab(tab);
    };

    const handleActionChange = (action: 'Buy' | 'Sell') => {
        setActiveAction(action);
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSliderValue(parseInt(e.target.value));

        if (activeTab === 'Market') {
            const maxAmount = 10000;
            const calculatedQty = (parseInt(e.target.value) / 100 * maxAmount / marketData.price).toFixed(4);
            setQuantity(calculatedQty);
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    };

    const handleSymbolChange = (sym: string) => {
        setSelectedSymbol(sym);
    };

    const handleTimeframeChange = (tf: string) => {
        setSelectedTimeframe(tf);
    };

    const handleSelect = (size: React.SetStateAction<string>) => {
        setSelectedSize(size);
    };

    const getPriceColor = () => {
        return heartbeat % 2 === 0 ?
            (marketData.change >= 0 ? 'text-teal-400' : 'text-red-500') :
            'text-white';
    };

    // Calculate total based on quantity and price
    const calculateTotal = () => {
        const qty = parseFloat(quantity) || 0;
        const currentPrice = parseFloat(price) || 0;
        return (qty * currentPrice).toFixed(2);
    };

    return (
        <div className="flex flex-col h-screen w-full bg-gray-950 text-white overflow-hidden">
            {/* Top Nav Bar */}
            <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-b border-gray-800">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center text-xl font-semibold">
                        <TrendingUp className="h-5 w-5 mr-2 text-teal-400" />
                        <span>Trade</span>
                        <span className="text-gray-400 text-xs ml-2">PRO</span>
                    </div>

                    <div className="flex space-x-1">
                        {symbols.map((sym) => (
                            <button
                                key={sym}
                                onClick={() => handleSymbolChange(sym)}
                                className={`px-3 py-1 rounded-md text-sm ${selectedSymbol === sym
                                    ? 'bg-teal-500 bg-opacity-20 text-teal-400 font-medium'
                                    : 'text-gray-400 hover:bg-gray-800'}`}
                            >
                                {sym}
                            </button>
                        ))}
                        <button className="px-2 py-1 text-gray-400 hover:bg-gray-800 rounded-md">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <button className="p-1 hover:bg-gray-800 rounded-md">
                        <Star className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-800 rounded-md">
                        <Sliders className="h-4 w-4 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Main content area */}
            <div className="flex flex-1 w-full overflow-hidden">
                {/* Chart area */}
                <div className="flex-grow relative overflow-hidden">
                    {/* Chart Header */}
                    <div className="absolute top-0 left-0 right-0 z-10 bg-gray-900 bg-opacity-80 backdrop-blur-sm p-3 flex justify-between items-center border-b border-gray-800">
                        <div className="flex items-center">
                            <div className="mr-8">
                                <div className="flex items-baseline">
                                    <h2 className="text-lg font-semibold">{selectedSymbol}</h2>
                                    <span className="ml-2 text-xs text-gray-400">NASDAQ</span>
                                </div>
                                <div className={`flex items-center text-sm ${marketData.change >= 0 ? 'text-teal-400' : 'text-red-500'}`}>
                                    <span className={`text-lg font-medium transition-colors ${getPriceColor()}`}>
                                        ${marketData.price.toFixed(2)}
                                    </span>
                                    <span className="ml-2">
                                        {marketData.change >= 0 ? '+' : ''}{marketData.change} ({marketData.changePercent}%)
                                    </span>
                                </div>
                            </div>

                            <div className="flex space-x-2 text-xs">
                                <div className="px-3 py-1 bg-gray-800 rounded-md">
                                    <span className="text-gray-400">VOL: </span>
                                    <span>{marketData.volume}</span>
                                </div>
                                <div className="px-3 py-1 bg-gray-800 rounded-md">
                                    <span className="text-gray-400">HIGH: </span>
                                    <span>${marketData.high.toFixed(2)}</span>
                                </div>
                                <div className="px-3 py-1 bg-gray-800 rounded-md">
                                    <span className="text-gray-400">LOW: </span>
                                    <span>${marketData.low.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="flex border border-gray-700 rounded-md overflow-hidden">
                                {timeframes.map((tf) => (
                                    <button
                                        key={tf}
                                        onClick={() => handleTimeframeChange(tf)}
                                        className={`px-3 py-1 text-sm ${selectedTimeframe === tf
                                            ? 'bg-gray-700 text-white'
                                            : 'text-gray-400 hover:bg-gray-800'}`}
                                    >
                                        {tf}
                                    </button>
                                ))}
                            </div>
                            <button className="ml-2 p-1 hover:bg-gray-800 rounded-md text-gray-400">
                                <RefreshCw className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Loading Overlay */}
                    {isLoading && (
                        <div className="absolute inset-0 z-20 bg-gray-900 bg-opacity-70 flex items-center justify-center backdrop-blur-sm">
                            <div className="flex flex-col items-center">
                                <div className="h-8 w-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                                <span className="text-sm text-teal-400">Loading Chart...</span>
                            </div>
                        </div>
                    )}

                    {/* Trading View Chart */}
                    <div className="tradingview-widget-container h-full w-full  pt-20" ref={container}>
                        <div className="tradingview-widget-container__widget h-full w-full bg-gray-950"></div>
                    </div>
                </div>

                {/* Right side - Trading Panel */}
                <div className="w-80 border-l border-gray-800 bg-gray-900 flex flex-col overflow-y-auto">
                    <div className="p-4 flex flex-col h-full">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-800 mb-6">
                            <button
                                className={`flex-1 py-3 text-sm font-medium ${activeTab === 'Market'
                                    ? 'text-teal-400 border-b-2 border-teal-400'
                                    : 'text-gray-400 hover:text-gray-300'}`}
                                onClick={() => handleTabChange('Market')}
                            >
                                Market
                            </button>
                            <button
                                className={`flex-1 py-3 text-sm font-medium ${activeTab === 'Limit'
                                    ? 'text-teal-400 border-b-2 border-teal-400'
                                    : 'text-gray-400 hover:text-gray-300'}`}
                                onClick={() => handleTabChange('Limit')}
                            >
                                Limit
                            </button>
                            <button
                                className={`flex-1 py-3 text-sm font-medium ${activeTab === 'Pro'
                                    ? 'text-teal-400 border-b-2 border-teal-400'
                                    : 'text-gray-400 hover:text-gray-300'}`}
                                onClick={() => handleTabChange('Pro')}
                            >
                                Pro
                            </button>
                        </div>

                        {/* Buy/Sell Buttons */}
                        <div className="mb-6 grid grid-cols-2 gap-2">
                            <button
                                className={`py-3 rounded-md font-medium transition-all ${activeAction === 'Buy'
                                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md shadow-teal-900'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                                onClick={() => handleActionChange('Buy')}
                            >
                                Buy
                            </button>
                            <button
                                className={`py-3 rounded-md font-medium transition-all ${activeAction === 'Sell'
                                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md shadow-red-900'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                                onClick={() => handleActionChange('Sell')}
                            >
                                Sell
                            </button>
                        </div>

                        {/* Trading Form */}
                        <div className="flex-1 flex flex-col">
                            {/* Available Balance */}
                            <div className="flex justify-between mb-6 p-3 bg-gray-800 bg-opacity-50 rounded-md border border-gray-700">
                                <div className="flex items-center">
                                    <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                                    <span className="text-gray-300 text-sm">Available</span>
                                </div>
                                <span className="font-medium">10,000.00 USDC</span>
                            </div>

                            {/* Price Input (for Limit orders) */}
                            {activeTab === 'Limit' && (
                                <div className="mb-4">
                                    <label className="block text-sm text-gray-400 mb-2">Price</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <span className="text-gray-400">$</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full bg-gray-800 rounded-md p-3 pl-8 border border-gray-700 focus:border-teal-500 focus:outline-none text-right"
                                            value={price}
                                            onChange={handlePriceChange}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Quantity Input */}
                            <div className="mb-4">
                                <label className="block text-sm text-gray-400 mb-2">Quantity</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full bg-gray-800 rounded-md p-3 border border-gray-700 focus:border-teal-500 focus:outline-none text-right"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                    />
                                </div>
                            </div>

                            {/* Slider */}
                            <div className="mb-6">
                                <div className="flex justify-between mb-2 text-xs text-gray-400">
                                    <span>0%</span>
                                    <span>25%</span>
                                    <span>50%</span>
                                    <span>75%</span>
                                    <span>100%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="5"
                                    value={sliderValue}
                                    onChange={handleSliderChange}
                                    className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-500"
                                />
                                <div className="flex justify-end mt-2">
                                    <span>{sliderValue}</span>
                                    <span className="ml-1">%</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between mb-6 p-3 bg-gray-800 bg-opacity-50 rounded-md border border-gray-700">
                                <span className="text-gray-300">Total</span>
                                <span className="font-medium">${calculateTotal()} USD</span>
                            </div>

                            {/* Warning Notice */}
                            <div className="mb-6 p-3 bg-gray-800 rounded-md flex items-start text-xs text-gray-400 border border-gray-700">
                                <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                                <span>
                                    Trading {selectedSymbol} involves substantial risk. Market orders execute immediately at market price.
                                </span>
                            </div>

                            {/* Action Button */}
                            <button
                                className={`w-full py-4 rounded-md font-medium text-white ${activeAction === 'Buy'
                                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'
                                    : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                                    } transition-all shadow-lg`}
                            >
                                {activeAction === 'Buy' ? 'Buy' : 'Sell'} {selectedSymbol}
                            </button>

                            {/* Market Hours */}
                            <div className="mt-4 flex justify-center items-center text-xs text-gray-400">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>Market Hours: 9:30 AM - 4:00 PM ET</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);