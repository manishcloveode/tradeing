"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Info, LineChart, ArrowUpRight, RefreshCw } from 'lucide-react';

const StakingDashboard = () => {
    const [activeTab, setActiveTab] = useState('Staking Balance');

    const tabs = ['Staking Balance', 'Validator Performance', 'Staking Reward History', 'Staking Action History'];

    const stakingData = [
        { id: 1, name: 'B-Harvest', description: 'Provides secure validation ser...', stake: '92,386', yourStake: '-', uptime: '100.00%', est_apr: '2.17%', status: 'Active', commission: '5.00%' },
        { id: 2, name: 'Liquidstrix + Best Gang', description: 'Collaboration between Liquidstri...', stake: '198,700', yourStake: '-', uptime: '100.00%', est_apr: '2.22%', status: 'Active', commission: '3.00%' },
        { id: 3, name: 'PurposefulNode', description: 'Validating with purpose. From...', stake: '813,463', yourStake: '-', uptime: '100.00%', est_apr: '2.24%', status: 'Active', commission: '1.75%' },
        { id: 4, name: 'Hyperuncanling', description: 'L1 Explorer', stake: '2,143,293', yourStake: '-', uptime: '100.00%', est_apr: '2.26%', status: 'Active', commission: '1.00%' },
        { id: 5, name: 'CMI', description: 'Your APR Maximizer HyperMater...', stake: '2,584,958', yourStake: '-', uptime: '99.68%', est_apr: '2.28%', status: 'Active', commission: '0.00%' },
        { id: 6, name: 'ASYN', description: 'Boutique Digital Assets Resear...', stake: '2,880,121', yourStake: '-', uptime: '100.00%', est_apr: '2.17%', status: 'Active', commission: '4.00%' },
        { id: 7, name: 'Alpharacks', description: 'Alpharacks', stake: '4,228,393', yourStake: '-', uptime: '100.00%', est_apr: '2.28%', status: 'Active', commission: '0.00%' },
        { id: 8, name: 'Val0x0', description: 'The People\'s Validator. Zero E...', stake: '4,358,311', yourStake: '-', uptime: '99.61%', est_apr: '2.18%', status: 'Active', commission: '4.00%' },
        { id: 9, name: 'NFT.market.xyz', description: 'NFT market making infrastructur...', stake: '12,878,354', yourStake: '-', uptime: '100.00%', est_apr: '2.29%', status: 'Active', commission: '0.00%' },
        { id: 10, name: 'HyperStake', description: 'Secure Hyperliquid with the mo...', stake: '21,925,734', yourStake: '-', uptime: '100.00%', est_apr: '2.28%', status: 'Active', commission: '0.00%' },
        { id: 11, name: 'Nansen × HyperCollective', description: 'HyperCollective × Nansen is t...', stake: '37,927,164', yourStake: '-', uptime: '100.00%', est_apr: '2.24%', status: 'Active', commission: '2.00%' },
        { id: 12, name: 'Hyper Foundation 2', description: 'Hyper Foundation 2', stake: '65,739,594', yourStake: '-', uptime: '100.00%', est_apr: '2.22%', status: 'Active', commission: '3.00%' },
        { id: 13, name: 'Hyper Foundation 3', description: 'Hyper Foundation 3', stake: '65,745,881', yourStake: '-', uptime: '100.00%', est_apr: '2.22%', status: 'Active', commission: '3.00%' },
        { id: 14, name: 'Hyper Foundation 5', description: 'Hyper Foundation 5', stake: '65,913,081', yourStake: '-', uptime: '100.00%', est_apr: '2.22%', status: 'Active', commission: '3.00%' },
        { id: 15, name: 'Hyper Foundation 4', description: 'Hyper Foundation 4', stake: '65,949,552', yourStake: '-', uptime: '100.00%', est_apr: '2.22%', status: 'Active', commission: '3.00%' },
    ];

    // For animation counters
    const [counter, setCounter] = useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prev => (prev < 421248002) ? prev + 1000000 : 421248002);
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen text-white bg-gradient-to-b from-black to-gray-900 p-8">
            <div className="max-w-7xl w-full mx-auto">
                {/* Header with gradient accent */}
                <div className="relative mb-12">
                    <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-teal-400 to-blue-500"></div>
                    <h1 className="text-5xl font-medium pt-4 mb-4 flex items-center">
                        Staking Dashboard
                        <span className="ml-2 px-2 py-1 bg-teal-400 bg-opacity-20 rounded text-teal-400 text-sm">BETA</span>
                    </h1>
                    <p className="text-md mb-8 text-gray-300 max-w-3xl leading-relaxed">
                        The Hyperliquid L1 is a proof-of-stake blockchain where stakers delegate the native token HYPE to
                        <span className="text-teal-400 font-medium"> validators </span>
                        to earn staking rewards. Stakers only receive rewards when the validator successfully participates in consensus, so stakers should only delegate to
                        <span className="text-teal-400 font-medium"> reputable and trusted validators</span>.
                    </p>
                </div>

                {/* Staking Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-teal-500 transition-all shadow-xl">
                        <div className="text-gray-400 text-sm mb-2 flex items-center">
                            Total Staked <Info className="h-4 w-4 ml-2 cursor-pointer text-gray-500" />
                        </div>
                        <div className="text-4xl font-bold mb-2 flex items-center">
                            <LineChart className="h-6 w-6 mr-2 text-teal-400" />
                            {counter.toLocaleString()}
                        </div>
                        <div className="flex items-center text-teal-400 text-sm">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            <span>+2.4% from last week</span>
                        </div>
                    </div>
                    <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-teal-500 transition-all shadow-xl">
                        <div className="text-gray-400 text-sm mb-2 flex items-center">
                            Your Stake <Info className="h-4 w-4 ml-2 cursor-pointer text-gray-500" />
                        </div>
                        <div className="text-4xl font-bold mb-2">0</div>
                        <button className="text-sm bg-teal-400 hover:bg-teal-500 transition-colors text-black py-1 px-4 rounded-md font-medium">
                            Stake Now
                        </button>
                    </div>
                </div>

                {/* Main Dashboard */}
                <div className="bg-gray-900 bg-opacity-90 rounded-xl overflow-hidden mb-4 border border-gray-800 shadow-2xl">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-800 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                className={`px-6 py-4 text-sm font-medium transition-all ${activeTab === tab
                                    ? 'border-b-2 border-teal-400 text-white bg-gray-800 bg-opacity-50'
                                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800 hover:bg-opacity-30'}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                        <div className="ml-auto flex items-center px-4">
                            <div className="flex items-center mr-4">
                                <RefreshCw className="h-4 w-4 mr-2 text-teal-400" />
                                <span className="text-xs text-gray-400">Last updated: 2 min ago</span>
                            </div>
                            <button className="bg-gray-800 px-4 py-2 rounded-md flex items-center text-xs hover:bg-gray-700 transition-colors">
                                7D <ChevronDown className="h-3 w-3 ml-1" />
                            </button>
                        </div>
                    </div>

                    {/* Available Balance Section */}
                    <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700 hover:border-teal-500 transition-all">
                                <div className="mb-2 text-sm text-gray-400">Available to Transfer</div>
                                <div className="font-mono text-lg font-medium">0.0000000</div>
                                <div className="text-xs text-teal-400 mt-1">HYPE</div>
                            </div>
                            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700 hover:border-teal-500 transition-all">
                                <div className="mb-2 text-sm text-gray-400">Available to Stake</div>
                                <div className="font-mono text-lg font-medium">0.0000000</div>
                                <div className="text-xs text-teal-400 mt-1">HYPE</div>
                            </div>
                            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700 hover:border-teal-500 transition-all">
                                <div className="mb-2 text-sm text-gray-400">Available to Withdraw</div>
                                <div className="font-mono text-lg font-medium">0.0000000</div>
                                <div className="text-xs text-teal-400 mt-1">HYPE</div>
                            </div>
                            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700 hover:border-teal-500 transition-all">
                                <div className="mb-2 text-sm text-gray-400">Total Staked</div>
                                <div className="font-mono text-lg font-medium">0.0000000</div>
                                <div className="text-xs text-teal-400 mt-1">HYPE</div>
                            </div>
                            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700 hover:border-yellow-500 transition-all">
                                <div className="mb-2 text-sm text-yellow-500">Pending Transfers</div>
                                <div className="font-mono text-lg font-medium">0.0000000</div>
                                <div className="text-xs text-yellow-500 mt-1">HYPE</div>
                            </div>
                        </div>
                    </div>

                    {/* Staking Table */}
                    <div>
                        <div className="grid grid-cols-8 gap-2 p-4 text-xs text-gray-400 border-b border-gray-800 bg-gray-900">
                            <div className="font-medium">Name</div>
                            <div className="font-medium">Description</div>
                            <div className="font-medium">Stake</div>
                            <div className="font-medium">Your Stake</div>
                            <div className="font-medium">Uptime</div>
                            <div className="font-medium">Est. APR</div>
                            <div className="font-medium">Status</div>
                            <div className="font-medium">Commission</div>
                        </div>

                        {stakingData.map((row) => (
                            <div key={row.id} className="grid grid-cols-8 gap-2 p-4 text-sm border-b border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
                                <div className="text-teal-400 font-medium">{row.name}</div>
                                <div className="text-gray-300">{row.description}</div>
                                <div>{row.stake}</div>
                                <div>{row.yourStake}</div>
                                <div className={row.uptime === '100.00%' ? 'text-green-400' : 'text-yellow-400'}>{row.uptime}</div>
                                <div>{row.est_apr}</div>
                                <div>
                                    <span className="bg-teal-400 bg-opacity-20 text-teal-400 px-2 py-1 rounded-full text-xs">{row.status}</span>
                                </div>
                                <div>{row.commission}</div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center p-6 text-sm bg-gray-900">
                        <button className="bg-teal-400 hover:bg-teal-500 transition-colors text-black px-6 py-2 rounded-md font-medium flex items-center">
                            Connect Wallet
                        </button>
                        <div className="text-teal-400 font-medium hover:underline cursor-pointer">View All Validators</div>
                        <div className="flex items-center text-gray-400">
                            <span>1-15 of 16</span>
                            <button className="ml-2 p-1 hover:bg-gray-800 rounded transition-colors">
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button className="p-1 hover:bg-gray-800 rounded transition-colors">
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center text-xs text-gray-500 mt-6">
                    ©2025 Hyperliquid • All rights reserved • Protocol v1.2.4
                </div>
            </div>
        </div>
    );
};

export default StakingDashboard;