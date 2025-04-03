import React from 'react';
import { Search } from 'lucide-react';

// Define a type for vault objects
type Vault = {
    vault: string;
    leader: string;
    apr: number;
    tvl: string;
    yourDeposit: string;
    age: number;
    snapshot: "up" | "down" | "stable";
};

const CryptoVaultDashboard = () => {
    const protocolVaults: Vault[] = [
        { vault: "Hyperliquidity Provider (HLP)", leader: "0x07d3...84e7", apr: -0.11, tvl: "$189,533,086.45", yourDeposit: "$0.00", age: 899, snapshot: "down" },
        { vault: "Liquidator", leader: "0xe13...90c9", apr: 0.00, tvl: "$18,553.82", yourDeposit: "$0.00", age: 768, snapshot: "stable" },
    ];

    const userVaults: Vault[] = [
        { vault: "Sifu", leader: "0x5d5...5d77", apr: 807.24, tvl: "$5,448,488.99", yourDeposit: "$0.00", age: 473, snapshot: "up" },
        { vault: "Hyperliquidity Trader (HLT)", leader: "0x0b0e...1915", apr: 217.58, tvl: "$3,460,730.82", yourDeposit: "$0.00", age: 590, snapshot: "up" },
        { vault: "Elsewhere", leader: "0xf5d0...f9da", apr: -2.11, tvl: "$1,643,977.08", yourDeposit: "$0.00", age: 271, snapshot: "down" },
    ];

    const renderSnapshotGraph = (trend: "up" | "down" | "stable") => {
        if (trend === "up") {
            return <svg viewBox="0 0 100 30" className="w-24 h-8"><path d="M0,15 Q25,5 50,10 T100,5" stroke="#4ade80" fill="none" strokeWidth="2" /></svg>;
        } else if (trend === "down") {
            return <svg viewBox="0 0 100 30" className="w-24 h-8"><path d="M0,10 Q25,15 50,15 T100,25" stroke="#ef4444" fill="none" strokeWidth="2" /></svg>;
        } else {
            return <svg viewBox="0 0 100 30" className="w-24 h-8"><path d="M0,15 H100" stroke="#0ea5e9" fill="none" strokeWidth="2" /></svg>;
        }
    };

    const renderVaultTable = (vaults: Vault[], title: React.ReactNode) => (
        <div className="mb-8">
            <h2 className="text-lg font-medium text-white mb-4">{title}</h2>
            <div className="w-full">
                <div className="grid grid-cols-6 gap-4 mb-2 text-gray-400 text-sm">
                    <div>Vault</div>
                    <div>Leader</div>
                    <div>APR</div>
                    <div>TVL</div>
                    <div>Your Deposit</div>
                    <div className="flex gap-4">
                        <span>Age (days)</span>
                        <span>Snapshot</span>
                    </div>
                </div>
                {vaults.map((vault, index) => (
                    <div key={index} className="grid grid-cols-6 gap-4 py-3 border-t border-gray-800 text-white">
                        <div className="font-medium">{vault.vault}</div>
                        <div className="text-gray-400">{vault.leader}</div>
                        <div className={vault.apr > 0 ? 'text-green-400' : vault.apr < 0 ? 'text-red-400' : 'text-gray-400'}>
                            {vault.apr}%
                        </div>
                        <div>{vault.tvl}</div>
                        <div>{vault.yourDeposit}</div>
                        <div className="flex items-center gap-4">
                            <span>{vault.age}</span>
                            <div className="flex-grow">{renderSnapshotGraph(vault.snapshot)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold">$202,810,525</h1>
                        <p className="text-sm">Total Value Locked. <span className="text-blue-400">Learn more</span></p>
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="relative w-96">
                            <input type="text" placeholder="Search by vault address, name or leader..." className="bg-gray-900 text-white px-4 py-2 pl-10 rounded w-full" />
                            <Search className="absolute left-3 top-2.5 text-gray-500 h-4 w-4" />
                        </div>
                    </div>
                </div>
                {renderVaultTable(protocolVaults, "Protocol Vaults")}
                {renderVaultTable(userVaults, "User Vaults")}
            </div>
        </div>
    );
};

export default CryptoVaultDashboard;