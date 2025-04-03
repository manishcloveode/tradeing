"use client";
import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

const PortfolioDashboard = () => {
    const [activeTab, setActiveTab] = useState('Deposit');
    const [activeBalanceTab, setActiveBalanceTab] = useState('Balances');

    const portfolioTabs = ['Deposit', 'Withdraw', 'Send', 'Transfer', 'Performance'];
    const balanceTabs = ['Balances', 'Positions', 'Open Orders', 'TWAP', 'Trade History', 'Funding History', 'Order History', 'Deposits and Withdrawals'];

    return (
        <div className="min-h-screen bg-black text-white p-8 ">
            <div className="w-full mx-auto">
                {/* Portfolio Header */}
                <h1 className="text-4xl font-light mb-8">Portfolio</h1>

                {/* Portfolio Stats */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <div className="text-gray-400 text-sm mb-1">14 Day Volume</div>
                        <div className="text-3xl font-medium">$0</div>
                        <div className="text-teal-400 text-sm mt-1">View volume</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-sm mb-1">Fees (Taker / Maker)</div>
                        <div className="text-3xl font-medium">0.0350% / 0.0100%</div>
                        <div className="text-teal-400 text-sm mt-1">View fee schedule</div>
                    </div>
                </div>

                {/* Main Portfolio View */}
                <div className="bg-gray-900 rounded-lg overflow-hidden mb-8">
                    {/* Portfolio Tabs */}
                    <div className="flex border-b border-gray-800">
                        {portfolioTabs.map((tab) => (
                            <button
                                key={tab}
                                className={`px-6 py-3 text-sm ${activeTab === tab ? 'border-b-2 border-teal-400 text-white' : 'text-gray-400'}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Portfolio Content */}
                    <div className="grid grid-cols-3 gap-4 p-4">
                        {/* Left Column */}
                        <div>
                            <button className="bg-teal-400 text-gray-900 w-full py-2 rounded mb-4">
                                Connect
                            </button>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">P&L</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Volume</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Max Drawdown</span>
                                    <span>0.00%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Total Equity</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Perps Account Equity</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Spot Account Equity</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Vault Equity</span>
                                    <span>$0.00</span>
                                </div>
                            </div>
                        </div>

                        {/* Middle and Right Columns */}
                        <div className="col-span-2">
                            <div className="flex justify-between mb-4">
                                <div className="flex items-center">
                                    <span className="text-sm mr-2">Account Value</span>
                                    <button className="bg-gray-800 text-teal-400 text-xs px-3 py-1 rounded flex items-center">
                                        PNL <ChevronDown className="h-4 w-4 ml-1" />
                                    </button>
                                </div>
                                <div className="flex items-center">
                                    <button className="bg-gray-800 text-white text-xs px-3 py-1 rounded flex items-center mr-2">
                                        Perps + Spot + Vaults <ChevronDown className="h-4 w-4 ml-1" />
                                    </button>
                                    <button className="bg-gray-800 text-white text-xs px-3 py-1 rounded flex items-center">
                                        30D <ChevronDown className="h-4 w-4 ml-1" />
                                    </button>
                                </div>
                            </div>

                            {/* Chart Placeholder */}
                            <div className="h-64 relative">
                                <div className="absolute left-0 h-full flex flex-col justify-between text-gray-400 text-xs">
                                    <div>3</div>
                                    <div>2</div>
                                    <div>1</div>
                                    <div>0</div>
                                </div>
                                <div className="absolute bottom-0 left-8 right-0 h-px bg-gray-800"></div>
                                {/* Empty chart line */}
                                <div className="absolute bottom-0 left-8 right-0 h-px bg-gray-700"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Balances Section */}
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                    {/* Balance Tabs */}
                    <div className="flex border-b border-gray-800 relative">
                        <div className="flex overflow-x-auto">
                            {balanceTabs.map((tab) => (
                                <button
                                    key={tab}
                                    className={`px-4 py-3 text-sm whitespace-nowrap ${activeBalanceTab === tab ? 'border-b-2 border-teal-400 text-white' : 'text-gray-400'}`}
                                    onClick={() => setActiveBalanceTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="absolute right-4 top-3 flex items-center space-x-4">
                            <button className="text-gray-400 flex items-center text-sm">
                                <Filter className="h-4 w-4 mr-1" />
                                Filter
                                <ChevronDown className="h-4 w-4 ml-1" />
                            </button>
                            <div className="flex items-center text-sm">
                                <span className="text-gray-400 mr-2">Hide Small Balances</span>
                                <div className="w-4 h-4 bg-teal-400 rounded"></div>
                            </div>
                        </div>
                    </div>

                    {/* Balance Table */}
                    <div className="p-4">
                        <div className="grid grid-cols-5 gap-4 text-sm text-gray-400 mb-2 px-2">
                            <div>Coin</div>
                            <div>Total Balance</div>
                            <div className="flex items-center">
                                Available Balance
                                <ChevronDown className="h-4 w-4 ml-1" />
                            </div>
                            <div>USDC Value</div>
                            <div className="flex items-center">
                                PNL (ROE %)
                            </div>
                            <div>Contract</div>
                        </div>
                        <div className="text-center py-4 text-white">
                            No balances yet
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioDashboard;