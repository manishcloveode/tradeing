"use client";
import { useState } from 'react';
import { ChevronDown, ChevronUp, Globe, Settings } from 'lucide-react';

export default function Navbar() {
    const [moreOpen, setMoreOpen] = useState(false);

    const toggleMoreDropdown = () => {
        setMoreOpen(!moreOpen);
    };

    return (
        <nav className="bg-black text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-8">
                {/* Logo */}
                <div className="flex items-center">
                    <span className="text-xl font-bold">Trade</span>
                </div>

                {/* Nav Links */}
                <div className="hidden md:flex space-x-8">
                    <NavLink text="Trade" href="/" active={false} />
                    <NavLink text="Vaults" href="/vaults" active={false} />
                    <NavLink text="Portfolio" href='/Portfolio' active={false} />
                    <NavLink text="Staking" href='/Staking' active={false} />
                    <NavLink text="Referrals" href='/Referral' active={false} />
                    <NavLink text="Leaderboard" href='/Leaderboard' active={false} />

                    {/* More Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center space-x-1 text-gray-300 hover:text-white"
                            onClick={toggleMoreDropdown}
                        >
                            <span>More</span>
                            {moreOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {moreOpen && (
                            <div className="absolute top-10 right-0 bg-black border border-white rounded shadow-lg py-2 w-48 z-10">
                                <DropdownItem text="Testnet" />
                                <DropdownItem text="Explorer" />
                                <DropdownItem text="Sub-Accounts" />
                                <DropdownItem text="API" />
                                <DropdownItem text="Multi-Sig" />
                                <DropdownItem text="Points" />
                                <DropdownItem text="Funding Comparison" />
                                <DropdownItem text="Announcements" />
                                <DropdownItem text=" Stats" />
                                <DropdownItem text="Docs" />
                            </div>

                        )}
                    </div>
                </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
                <button className="bg-teal-400 hover:bg-teal-500 text-black font-medium py-2 px-4 rounded">
                    Connect
                </button>
                <button className="text-gray-300 hover:text-white">
                    <Globe size={20} />
                </button>
                <button className="text-gray-300 hover:text-white">
                    <Settings size={20} />
                </button>
            </div>
        </nav>
    );
}

// Helper components
function NavLink({ text, href = "#", active }: { text: string; href?: string; active: boolean }) {
    return (
        <a
            href={href}
            className={`${active ? 'text-white border-b-2 border-white' : 'text-gray-300 hover:text-white'}`}
        >
            {text}
        </a>
    );
}

function DropdownItem({ text }: { text: string }) {
    return (
        <a
            href="#"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
            {text}
        </a>
    );
}