"use client";
import { useState } from 'react';

const OrderBook = () => {
    const [selectedDecimal, setSelectedDecimal] = useState('0.001');

    // Sample data for the order book
    const askOrders = [
        { price: 11.871, size: 1260.28, total: 5270.12 },
        { price: 11.870, size: 184.77, total: 1309.84 },
        { price: 11.869, size: 328.95, total: 1125.07 },
        { price: 11.867, size: 20.00, total: 796.12 },
        { price: 11.866, size: 34.14, total: 776.12 },
        { price: 11.865, size: 653.65, total: 741.98 },
        { price: 11.864, size: 16.85, total: 90.33 },
        { price: 11.863, size: 8.34, total: 73.48 },
        { price: 11.857, size: 33.72, total: 64.14 },
        { price: 11.854, size: 15.21, total: 30.42 },
        { price: 11.853, size: 15.21, total: 15.21 },
    ];

    const bidOrders = [
        { price: 11.851, size: 32.43, total: 32.43 },
        { price: 11.850, size: 25.00, total: 57.43 },
        { price: 11.849, size: 40.61, total: 98.04 },
        { price: 11.848, size: 412.30, total: 510.34 },
        { price: 11.844, size: 16.88, total: 527.22 },
        { price: 11.841, size: 928.17, total: 1455.39 },
        { price: 11.840, size: 587.93, total: 2043.32 },
        { price: 11.838, size: 67.32, total: 2090.64 },
        { price: 11.837, size: 8.40, total: 2099.04 },
        { price: 11.836, size: 907.68, total: 3006.72 },
        { price: 11.835, size: 978.59, total: 3985.31 },
    ];

    // Calculate spread
    const lowestAsk = Math.min(...askOrders.map(order => order.price));
    const highestBid = Math.max(...bidOrders.map(order => order.price));
    const spread = lowestAsk - highestBid;
    const spreadPercentage = (spread / lowestAsk) * 100;

    // Calculate max total for bar width scaling
    const maxTotal = Math.max(
        ...askOrders.map(order => order.total),
        ...bidOrders.map(order => order.total)
    );

    const formatNumber = (num: number) => {
        return num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const formatPrice = (price: number) => {
        return price.toFixed(3);
    };

    return (
        <div className="bg-black container mx-auto border border-white text-white rounded-xl mt-10 p-4">
            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                    <div className="text-sm font-medium">Order Book</div>
                    {/* Decimals selector */}
                    <div className="flex text-xs bg-gray-800 rounded overflow-hidden">
                        <button
                            className={`px-2 py-1 ${selectedDecimal === '0.01' ? 'bg-teal-600' : ''}`}
                            onClick={() => setSelectedDecimal('0.01')}
                        >
                            0.01
                        </button>
                        <button
                            className={`px-2 py-1 ${selectedDecimal === '0.001' ? 'bg-teal-600' : ''}`}
                            onClick={() => setSelectedDecimal('0.001')}
                        >
                            0.001
                        </button>
                    </div>
                </div>
                <div className="text-sm font-medium">Trades</div>
            </div>

            {/* Column headers */}
            <div className="flex text-xs text-gray-500 p-2">
                <div className="w-1/3 text-left">Price</div>
                <div className="w-1/3 text-right">Size (HYPE)</div>
                <div className="w-1/3 text-right">Total (HYPE)</div>
            </div>

            {/* Asks (Sell orders) - Displayed in reverse order (lowest ask at bottom) */}
            <div className="relative">
                {askOrders.map((order, index) => (
                    <div key={`ask-${index}`} className="flex text-xs p-1 relative text-red-400">
                        {/* Background bar for visualization */}
                        <div
                            className="absolute right-0 top-0 bottom-0 bg-red-900/30"
                            style={{ width: `${(order.total / maxTotal) * 100}%` }}
                        ></div>

                        {/* Content */}
                        <div className="w-1/3 text-left relative z-10">{formatPrice(order.price)}</div>
                        <div className="w-1/3 text-right relative z-10">{formatNumber(order.size)}</div>
                        <div className="w-1/3 text-right relative z-10">{formatNumber(order.total)}</div>
                    </div>
                ))}
            </div>

            {/* Spread indicator */}
            <div className="flex justify-center text-xs text-gray-500 py-1 border-y border-gray-800">
                <span className="px-2">Spread</span>
                <span className="px-2">{spread.toFixed(3)}</span>
                <span className="px-2">{spreadPercentage.toFixed(3)}%</span>
            </div>

            {/* Bids (Buy orders) */}
            <div className="relative">
                {bidOrders.map((order, index) => (
                    <div key={`bid-${index}`} className="flex text-xs p-1 relative text-green-400">
                        {/* Background bar for visualization */}
                        <div
                            className="absolute right-0 top-0 bottom-0 bg-green-900/30"
                            style={{ width: `${(order.total / maxTotal) * 100}%` }}
                        ></div>

                        {/* Content */}
                        <div className="w-1/3 text-left relative z-10">{formatPrice(order.price)}</div>
                        <div className="w-1/3 text-right relative z-10">{formatNumber(order.size)}</div>
                        <div className="w-1/3 text-right relative z-10">{formatNumber(order.total)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderBook;