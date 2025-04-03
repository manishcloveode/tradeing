"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

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

    return (
        <div className="min-h-screen text-white bg-black p-8" >
            <div className="w-full mx-auto">
                {/* Header */}
                <h1 className="text-4xl font-light mb-4">Staking</h1>
                <p className="text-sm mb-8 text-gray-300">
                    The Hyperliquid L1 is a proof-of-stake blockchain where stakers delegate the native token HYPE to
                    <span className="text-teal-400"> validators </span>
                    to earn staking rewards. Stakers only receive rewards when the validator successfully participates in consensus, so stakers should only delegate to
                    <span className="text-teal-400"> reputable and trusted validators</span>.
                </p>

                {/* Staking Stats */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                    <div>
                        <div className="text-gray-400 text-sm mb-1">Total Staked</div>
                        <div className="text-4xl font-medium">421,248,002</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-sm mb-1">Your Stake</div>
                        <div className="text-4xl font-medium">0</div>
                    </div>
                </div>

                {/* Main Dashboard */}
                <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-800">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                className={`px-6 py-3 text-sm ${activeTab === tab ? 'border-b-2 border-teal-400 text-white' : 'text-gray-400'}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                        <div className="ml-auto flex items-center px-4">
                            <button className="bg-gray-800 px-3 py-1 rounded flex items-center text-xs">
                                7D <ChevronDown className="h-3 w-3 ml-1" />
                            </button>
                        </div>
                    </div>

                    {/* Available Balance Section */}
                    <div className="p-4 border-b border-gray-800">
                        <div className="mb-2 text-sm">Available to Transfer to Staking Balance</div>
                        <div className="flex">
                            <div className="font-mono mr-2">0.0000000 HYPE</div>
                        </div>
                        <div className="mb-2 mt-3 text-sm">Available to Stake</div>
                        <div className="flex">
                            <div className="font-mono mr-2">0.0000000 HYPE</div>
                        </div>
                        <div className="mb-2 mt-3 text-sm">Available to Withdraw</div>
                        <div className="flex">
                            <div className="font-mono mr-2">0.0000000 HYPE</div>
                        </div>
                        <div className="mb-2 mt-3 text-sm">Total Staked</div>
                        <div className="flex">
                            <div className="font-mono mr-2">0.0000000 HYPE</div>
                        </div>
                        <div className="mb-2 mt-3 text-sm text-yellow-500">Pending Transfers to Spot Balance</div>
                        <div className="flex">
                            <div className="font-mono mr-2">0.0000000 HYPE</div>
                        </div>
                    </div>

                    {/* Staking Table */}
                    <div>
                        <div className="grid grid-cols-8 gap-2 p-3 text-xs text-gray-400 border-b border-gray-800">
                            <div>Name</div>
                            <div>Description</div>
                            <div>Stake</div>
                            <div>Your Stake</div>
                            <div>Uptime</div>
                            <div>Est. APR</div>
                            <div>Status</div>
                            <div>Commission</div>
                        </div>

                        {stakingData.map((row) => (
                            <div key={row.id} className="grid grid-cols-8 gap-2 p-3 text-xs border-b border-gray-800 hover:bg-gray-800">
                                <div className="text-teal-400">{row.name}</div>
                                <div className="text-gray-300">{row.description}</div>
                                <div>{row.stake}</div>
                                <div>{row.yourStake}</div>
                                <div>{row.uptime}</div>
                                <div>{row.est_apr}</div>
                                <div className="text-teal-400">{row.status}</div>
                                <div>{row.commission}</div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center p-4 text-sm">
                        <button className="bg-teal-400 text-gray-900 px-6 py-2 rounded">
                            Connect
                        </button>
                        <div className="text-teal-400">View All</div>
                        <div className="flex items-center text-gray-400">
                            <span>1-15 of 16</span>
                            <button className="ml-2 p-1">
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button className="p-1">
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StakingDashboard;