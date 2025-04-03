"use client";
import React, { useState, useEffect, useRef } from 'react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
const TimeSeriesVisualization = () => {
    const [timeInterval, setTimeInterval] = useState('1h');
    const [chartData, setChartData] = useState<{ time: number; open: number; high: number; low: number; close: number; color: string; displayTime: string; }[]>([]);
    const [volumeData, setVolumeData] = useState<{ time: number; volume: number; color: string; }[]>([]);
    const [hoverInfo, setHoverInfo] = useState<{
        x: number;
        point: { time: number; open: number; high: number; low: number; close: number; color: string; displayTime: string; };
        volumePoint: { time: number; volume: number; color: string; };
    } | null>(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const svgRef = useRef<SVGSVGElement>(null);

    // Generate sample data with different time intervals
    useEffect(() => {
        generateChartData(timeInterval);
    }, [timeInterval]);

    const generateChartData = (interval: string) => {
        const data = [];
        const volumes = [];
        let currentPrice = 20;
        const now = new Date();
        let time = new Date(now);

        // Set time intervals based on selection
        let minutesInterval = 5;
        let dataPoints = 100;

        switch (interval) {
            case '5m':
                minutesInterval = 5;
                dataPoints = 100;
                time.setHours(time.getHours() - 8);
                break;
            case '1h':
                minutesInterval = 60;
                dataPoints = 48;
                time.setHours(time.getHours() - 48);
                break;
            case 'D':
                minutesInterval = 60 * 24;
                dataPoints = 30;
                time.setDate(time.getDate() - 30);
                break;
            case '30m':
                minutesInterval = 30;
                dataPoints = 80;
                time.setHours(time.getHours() - 40);
                break;
            default:
                minutesInterval = 60;
                dataPoints = 48;
        }

        for (let i = 0; i < dataPoints; i++) {
            const volatility = interval === 'D' ? 1.0 : interval === '1h' ? 0.5 : 0.3;
            const open = currentPrice;
            const change = (Math.random() - 0.5) * volatility;
            const close = parseFloat((open + change).toFixed(3));
            const high = parseFloat((Math.max(open, close) + Math.random() * 0.2).toFixed(3));
            const low = parseFloat((Math.min(open, close) - Math.random() * 0.2).toFixed(3));
            const volume = Math.floor(Math.random() * 1000 + 100);

            const timestamp = new Date(time).getTime();

            data.push({
                time: timestamp,
                open,
                high,
                low,
                close,
                color: close >= open ? 'green' : 'red',
                displayTime: formatTime(time, interval)
            });

            volumes.push({
                time: timestamp,
                volume,
                color: close >= open ? 'green' : 'red'
            });

            currentPrice = close;
            time = new Date(time.getTime() + minutesInterval * 60000);
        }

        // Add some trend to make the data look more realistic
        for (let i = 1; i < data.length; i++) {
            if (i % 8 === 0) {
                const trendDirection = Math.random() > 0.5 ? 1 : -1;
                let trendStrength = Math.random() * 2;

                for (let j = 0; j < 5 && i + j < data.length; j++) {
                    data[i + j].close = parseFloat((data[i + j].close + trendDirection * trendStrength * (5 - j) / 10).toFixed(3));
                    data[i + j].color = data[i + j].close >= data[i + j].open ? 'green' : 'red';
                    trendStrength *= 0.85;
                }
            }
        }

        setChartData(data);
        setVolumeData(volumes);
    };

    // Format time based on interval
    const formatTime = (date: Date, interval: string) => {
        if (interval === 'D') {
            return `${date.getMonth() + 1}/${date.getDate()}`;
        } else {
            return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        }
    };

    // Format date for display in hover tooltip
    const formatDate = (timestamp: string | number | Date) => {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    // Handle mouse wheel for zooming
    const handleWheel = (e: { preventDefault: () => void; deltaY: number; }) => {
        e.preventDefault();
        const delta = e.deltaY * -0.01;
        const newZoom = Math.min(Math.max(zoomLevel + delta, 0.5), 3);
        setZoomLevel(newZoom);
    };

    // Handle mouse move for hover information
    const handleMouseMove = (e: { clientX: number; }) => {
        if (!svgRef.current) return;

        const svgRect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - svgRect.left;
        const chartWidth = svgRect.width;

        // Find nearest data point
        const index = Math.min(
            Math.max(Math.floor((x / chartWidth) * chartData.length), 0),
            chartData.length - 1
        );

        if (chartData[index]) {
            setHoverInfo({
                x,
                point: chartData[index],
                volumePoint: volumeData[index]
            });
        }
    };

    // Handle mouse leave
    const handleMouseLeave = () => {
        setHoverInfo(null);
    };

    // Calculate visual display values
    const minPrice = Math.min(...chartData.map(d => d.low));
    const maxPrice = Math.max(...chartData.map(d => d.high));
    const priceRange = maxPrice - minPrice;
    const paddedMin = minPrice - priceRange * 0.05;
    const paddedMax = maxPrice + priceRange * 0.05;
    const maxVolume = Math.max(...volumeData.map(d => d.volume));

    // Calculate visible data range based on zoom
    const visibleDataPoints = Math.ceil(chartData.length / zoomLevel);
    const startIndex = Math.floor((chartData.length - visibleDataPoints) / 2);
    const endIndex = startIndex + visibleDataPoints;
    const visibleData = chartData.slice(Math.max(0, startIndex), Math.min(chartData.length, endIndex));
    const visibleVolumeData = volumeData.slice(Math.max(0, startIndex), Math.min(volumeData.length, endIndex));

    const [activeTab, setActiveTab] = useState('Market');
    const [tradeType, setTradeType] = useState('Buy');
    const [, setSelectedCurrency] = useState('HYPE');

    return (
        <>
            <div className=' container mx-auto bg-black flex flex-col-2 gap-4'>
                <div>
                    <Card className="w-full bg-gray-800 text-white">
                        <CardHeader className="pb-0">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-xl font-bold">HYPE/USDC</CardTitle>
                                <div className="flex items-center space-x-1">
                                    <span className="text-sm text-gray-400">Time Period:</span>
                                    <div className="flex bg-gray-700 rounded">
                                        {['5m', '1h', 'D', '30m'].map((interval) => (
                                            <button
                                                key={interval}
                                                className={`px-2 py-1 text-sm ${timeInterval === interval ? 'bg-blue-600 rounded' : ''}`}
                                                onClick={() => setTimeInterval(interval)}
                                            >
                                                {interval}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div
                                className="relative"
                                onWheel={handleWheel}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                            >
                                <svg
                                    ref={svgRef}
                                    width="100%"
                                    height="350"
                                    viewBox="0 0 1000 350"
                                    className="bg-gray-900"
                                >
                                    {/* Price grid lines */}
                                    {Array.from({ length: 5 }).map((_, i) => {
                                        const y = 20 + (i * 280 / 4);
                                        const price = paddedMax - (i * (paddedMax - paddedMin) / 4);
                                        return (
                                            <g key={`grid-${i}`}>
                                                <line
                                                    x1="0"
                                                    y1={y}
                                                    x2="1000"
                                                    y2={y}
                                                    stroke="#333"
                                                    strokeWidth="1"
                                                    strokeDasharray="5,5"
                                                />
                                                <text
                                                    x="985"
                                                    y={y - 5}
                                                    fill="#888"
                                                    fontSize="12"
                                                    textAnchor="end"
                                                >
                                                    {price.toFixed(3)}
                                                </text>
                                            </g>
                                        );
                                    })}

                                    {/* Time grid lines */}
                                    {Array.from({ length: 6 }).map((_, i) => {
                                        const x = 10 + (i * 980 / 5);
                                        const index = Math.floor(startIndex + (i * visibleData.length / 5));
                                        const label = index < chartData.length ? chartData[index]?.displayTime : '';
                                        return (
                                            <g key={`time-${i}`}>
                                                <line
                                                    x1={x}
                                                    y1="20"
                                                    x2={x}
                                                    y2="300"
                                                    stroke="#333"
                                                    strokeWidth="1"
                                                    strokeDasharray="5,5"
                                                />
                                                <text
                                                    x={x}
                                                    y="315"
                                                    fill="#888"
                                                    fontSize="12"
                                                    textAnchor="middle"
                                                >
                                                    {label}
                                                </text>
                                            </g>
                                        );
                                    })}

                                    {/* Candlesticks */}
                                    {visibleData.map((point, i) => {
                                        const x = 10 + (i / (visibleData.length - 1)) * 980;
                                        const heightScale = 260 / (paddedMax - paddedMin);

                                        // Calculate candle positions
                                        const candleWidth = Math.min(16, 980 / visibleData.length * 0.8);
                                        const openY = 20 + (paddedMax - point.open) * heightScale;
                                        const closeY = 20 + (paddedMax - point.close) * heightScale;
                                        const highY = 20 + (paddedMax - point.high) * heightScale;
                                        const lowY = 20 + (paddedMax - point.low) * heightScale;

                                        return (
                                            <g key={i}>
                                                {/* Wick */}
                                                <line
                                                    x1={x} y1={highY}
                                                    x2={x} y2={lowY}
                                                    stroke={point.color === 'green' ? '#26a69a' : '#ef5350'}
                                                    strokeWidth="2"
                                                />

                                                {/* Candle */}
                                                <rect
                                                    x={x - candleWidth / 2}
                                                    y={Math.min(openY, closeY)}
                                                    width={candleWidth}
                                                    height={Math.max(Math.abs(closeY - openY), 1)}
                                                    fill={point.color === 'green' ? '#26a69a' : '#ef5350'}
                                                />
                                            </g>
                                        );
                                    })}

                                    {/* Volume bars at bottom */}
                                    {visibleVolumeData.map((vol, i) => {
                                        const x = 10 + (i / (visibleVolumeData.length - 1)) * 980;
                                        const height = (vol.volume / maxVolume) * 40;
                                        const width = Math.min(16, 980 / visibleVolumeData.length * 0.8);

                                        return (
                                            <rect
                                                key={`vol-${i}`}
                                                x={x - width / 2}
                                                y={330 - height}
                                                width={width}
                                                height={height}
                                                fill={vol.color === 'green' ? '#26a69a80' : '#ef535080'}
                                            />
                                        );
                                    })}

                                    {/* Hover line and info */}
                                    {hoverInfo && (
                                        <>
                                            <line
                                                x1={hoverInfo.x}
                                                y1="20"
                                                x2={hoverInfo.x}
                                                y2="330"
                                                stroke="#aaa"
                                                strokeWidth="1"
                                                strokeDasharray="5,5"
                                            />
                                            <rect
                                                x={hoverInfo.x + 10}
                                                y="30"
                                                width="160"
                                                height="120"
                                                rx="4"
                                                fill="#1e293b"
                                                stroke="#4a5568"
                                            />
                                            <text x={hoverInfo.x + 20} y="50" fill="#fff" fontSize="12">
                                                {formatDate(hoverInfo.point.time)}
                                            </text>
                                            <text x={hoverInfo.x + 20} y="70" fill="#fff" fontSize="12">
                                                Open: <tspan fill={hoverInfo.point.color === 'green' ? '#26a69a' : '#ef5350'}>
                                                    {hoverInfo.point.open.toFixed(3)}
                                                </tspan>
                                            </text>
                                            <text x={hoverInfo.x + 20} y="90" fill="#fff" fontSize="12">
                                                High: <tspan fill={hoverInfo.point.color === 'green' ? '#26a69a' : '#ef5350'}>
                                                    {hoverInfo.point.high.toFixed(3)}
                                                </tspan>
                                            </text>
                                            <text x={hoverInfo.x + 20} y="110" fill="#fff" fontSize="12">
                                                Low: <tspan fill={hoverInfo.point.color === 'green' ? '#26a69a' : '#ef5350'}>
                                                    {hoverInfo.point.low.toFixed(3)}
                                                </tspan>
                                            </text>
                                            <text x={hoverInfo.x + 20} y="130" fill="#fff" fontSize="12">
                                                Close: <tspan fill={hoverInfo.point.color === 'green' ? '#26a69a' : '#ef5350'}>
                                                    {hoverInfo.point.close.toFixed(3)}
                                                </tspan>
                                            </text>
                                        </>
                                    )}
                                </svg>

                                {/* Zoom level indicator */}
                                <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-70 px-2 py-1 rounded text-xs">
                                    Zoom: {Math.round(zoomLevel * 100)}%
                                </div>
                            </div>

                            <div className="mt-4 flex justify-between items-center text-sm">
                                <div className="text-gray-400">
                                    Use mouse wheel to zoom in/out
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">Zoom: </span>
                                    <button
                                        className="px-2 py-1 bg-gray-700 rounded"
                                        onClick={() => setZoomLevel(Math.max(zoomLevel - 0.25, 0.5))}
                                    >
                                        -
                                    </button>
                                    <span className="mx-2">{Math.round(zoomLevel * 100)}%</span>
                                    <button
                                        className="px-2 py-1 bg-gray-700 rounded"
                                        onClick={() => setZoomLevel(Math.min(zoomLevel + 0.25, 3))}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card className="w-full  bg-slate-900 text-white border-gray-700">
                        <CardContent className="p-0">
                            {/* Top Nav */}
                            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
                                <div className="flex space-x-6">
                                    {['Market', 'Limit', 'Pro'].map((tab) => (
                                        <button
                                            key={tab}
                                            className={`relative pb-1 text-sm font-medium ${activeTab === tab ? 'text-cyan-400' : 'text-gray-300'}`}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            {tab}
                                            {activeTab === tab && (
                                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <button className="text-cyan-400 text-sm">Pro</button>
                            </div>

                            {/* Buy/Sell Buttons */}
                            <div className="grid grid-cols-2 gap-1 p-1">
                                <button
                                    className={`py-2 rounded-md text-center font-medium ${tradeType === 'Buy' ? 'bg-green-600 text-white' : 'bg-slate-800 text-gray-300'
                                        }`}
                                    onClick={() => setTradeType('Buy')}
                                >
                                    Buy
                                </button>
                                <button
                                    className={`py-2 rounded-md text-center font-medium ${tradeType === 'Sell' ? 'bg-pink-500 text-white' : 'bg-slate-800 text-gray-300'
                                        }`}
                                    onClick={() => setTradeType('Sell')}
                                >
                                    Sell
                                </button>
                            </div>

                            {/* Trading Options */}
                            <div className="p-4 pt-2">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">Available to Trade</span>
                                    <span>0.00 HYPE</span>
                                </div>

                                {/* Size Selector */}
                                <div className="mb-2">
                                    <div className="text-sm text-gray-400 mb-1">Size</div>
                                    <div className="relative">
                                        <Select onValueChange={(value) => setSelectedCurrency(value)}>
                                            <SelectTrigger className="w-full bg-slate-800 border-gray-700 text-white">
                                                <SelectValue placeholder="HYPE" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-800 border-gray-700 text-white">
                                                <SelectItem value="USD">USD</SelectItem>
                                                <SelectItem value="ETH">Ethereum</SelectItem>
                                                <SelectItem value="COINBASE">Coinbase</SelectItem>
                                                <SelectItem value="BTC">Bitcoin</SelectItem>
                                                <SelectItem value="HYPE">HYPE</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <div className="absolute right-12 top-0 h-full flex items-center">
                                            <Input
                                                className="w-16 bg-slate-800 border-0 text-right text-white"
                                                defaultValue="0"
                                            />
                                        </div>
                                        <div className="absolute right-2 top-0 h-full flex items-center">
                                            <span className="text-gray-400">%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Enable Trading Button */}
                                <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-medium mb-6">
                                    Enable Trading
                                </Button>

                                {/* Order Details */}
                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Order Value</span>
                                        <span>N/A</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Slippage</span>
                                        <span className="text-cyan-400">Est: 0% / Max: 5.00%</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Fees</span>
                                        <span>0.0350% / 0.010%</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-2">
                                    <Button
                                        variant="outline"
                                        className="w-full bg-black border-cyan-400 hover:bg-cyan-400 hover:text-black text-cyan-400 font-medium"
                                    >
                                        Deposit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full bg-black border-cyan-400 hover:bg-cyan-400 hover:text-black text-cyan-400 font-medium"
                                    >
                                        Withdraw
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default TimeSeriesVisualization;