"use client";
import React, { useEffect, useRef, useState, memo } from 'react';

function TradingViewWidget() {
    const container = useRef<HTMLDivElement | null>(null);
    const [activeTab, setActiveTab] = useState<'Market' | 'Limit' | 'Pro'>('Market');
    const [activeAction, setActiveAction] = useState<'Buy' | 'Sell'>('Buy');
    const [sliderValue, setSliderValue] = useState(0);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
        {
          "autosize": true,
          "symbol": "NASDAQ:AAPL",
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
        if (container.current) {
            container.current.appendChild(script);
        }
    }, []);

    const handleTabChange = (tab: 'Market' | 'Limit' | 'Pro') => {
        setActiveTab(tab);
    };

    const handleActionChange = (action: 'Buy' | 'Sell') => {
        setActiveAction(action);
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSliderValue(parseInt(e.target.value));
    };

    return (
        <div className="flex h-full w-full bg-gray-900 text-white">
            {/* Left side - TradingView Chart */}
            <div className="flex-grow h-full">
                <div className="tradingview-widget-container h-full" ref={container}>
                    <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
                </div>
            </div>

            {/* Right side - Trading Panel */}
            <div className="w-64 border-l border-gray-700 p-4 flex flex-col">
                {/* Tabs */}
                <div className="flex border-b border-gray-700 mb-4">
                    <button
                        className={`flex-1 py-2 ${activeTab === 'Market' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400'}`}
                        onClick={() => handleTabChange('Market')}
                    >
                        Market
                    </button>
                    <button
                        className={`flex-1 py-2 ${activeTab === 'Limit' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400'}`}
                        onClick={() => handleTabChange('Limit')}
                    >
                        Limit
                    </button>
                    <button
                        className={`flex-1 py-2 ${activeTab === 'Pro' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400'}`}
                        onClick={() => handleTabChange('Pro')}
                    >
                        Pro
                    </button>
                </div>

                {/* Buy/Sell Buttons */}
                <div className="mb-4 grid grid-cols-2 gap-2">
                    <button
                        className={`py-3 rounded ${activeAction === 'Buy' ? 'bg-teal-500 text-white' : 'bg-gray-800 text-white'}`}
                        onClick={() => handleActionChange('Buy')}
                    >
                        Buy
                    </button>
                    <button
                        className={`py-3 rounded ${activeAction === 'Sell' ? 'bg-red-500 text-white' : 'bg-gray-800 text-white'}`}
                        onClick={() => handleActionChange('Sell')}
                    >
                        Sell
                    </button>
                </div>

                {/* Available to Trade */}
                <div className="flex justify-between mb-4">
                    <span className="text-gray-400">Available to Trade</span>
                    <span>0.00 USDC</span>
                </div>

                {/* Size Selector */}
                <div className="mb-4">
                    <div className="flex justify-between mb-2">
                        <span>Size</span>
                        <div className="flex items-center border border-gray-700 rounded px-2">
                            <span>HYPE</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Slider */}
                <div className="mb-6">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderValue}
                        onChange={handleSliderChange}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-end mt-2">
                        <span>{sliderValue}</span>
                        <span className="ml-2">%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);