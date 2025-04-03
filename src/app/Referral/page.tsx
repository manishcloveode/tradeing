"use client";
import { SetStateAction, useState } from 'react';

const ReferralsPage = () => {
    const [activeTab, setActiveTab] = useState('Enter Code');
    const [activeRewardTab, setActiveRewardTab] = useState('Referrals');

    const handleTabClick = (tab: SetStateAction<string>) => {
        setActiveTab(tab);
    };

    const handleRewardTabClick = (tab: SetStateAction<string>) => {
        setActiveRewardTab(tab);
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="w-full mx-auto">
                <h1 className="text-3xl font-light mb-2">Referrals</h1>
                <p className="text-sm mb-8">
                    Refer users to earn rewards. Affiliates earn greater rewards.{' '}
                    <a href="#" className="text-blue-400 hover:underline">
                        Learn more
                    </a>
                </p>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column - Stats */}
                    <div className="w-full lg:w-1/2">
                        <div className="mb-4">
                            <div className="bg-gray-900  p-4 rounded-md">
                                <h2 className="font-medium mb-3">Traders Referred</h2>
                                <div className="h-24 flex items-center justify-center">
                                    <p className="text-gray-400 text-sm">No referrals yet</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Rewards */}
                    <div className="w-full lg:w-1/2">
                        <div className="mb-4">
                            <div className="bg-gray-900  p-4 rounded-md">
                                <h2 className="font-medium mb-3">Rewards Earned</h2>
                                <div className="h-24 flex items-center justify-center">
                                    <p className="text-gray-400 text-sm">No rewards yet</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 mt-6">
                    {/* Left Column - Code Tabs */}
                    <div className="w-full lg:w-1/2">
                        <div className="border-b border-gray-700">
                            <div className="flex">
                                {['Enter Code', 'Create Code', 'Claim'].map((tab) => (
                                    <button
                                        key={tab}
                                        className={`px-4 py-2 text-sm font-medium ${activeTab === tab
                                            ? 'text-white border-b-2 border-blue-500'
                                            : 'text-gray-400 hover:text-gray-300'
                                            }`}
                                        onClick={() => handleTabClick(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="bg-gray-900 rounded-md h-64 p-4">
                                {activeTab === 'Enter Code' && (
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <p className="text-gray-400 text-sm">Enter a referral code</p>
                                    </div>
                                )}
                                {activeTab === 'Create Code' && (
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <p className="text-gray-400 text-sm">Create your referral code</p>
                                    </div>
                                )}
                                {activeTab === 'Claim' && (
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <p className="text-gray-400 text-sm">Claim your rewards</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Rewards Tabs */}
                    <div className="w-full lg:w-1/2">
                        <div className="border-b border-gray-700">
                            <div className="flex">
                                {['Referrals', 'Legacy Reward History'].map((tab) => (
                                    <button
                                        key={tab}
                                        className={`px-4 py-2 text-sm font-medium ${activeRewardTab === tab
                                            ? 'text-white border-b-2 border-blue-500'
                                            : 'text-gray-400 hover:text-gray-300'
                                            }`}
                                        onClick={() => handleRewardTabClick(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="bg-gray-900 rounded-md h-64 p-4">
                                {activeRewardTab === 'Referrals' && (
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <p className="text-gray-400 text-sm">Your referrals will appear here</p>
                                    </div>
                                )}
                                {activeRewardTab === 'Legacy Reward History' && (
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <p className="text-gray-400 text-sm">Your reward history will appear here</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralsPage;