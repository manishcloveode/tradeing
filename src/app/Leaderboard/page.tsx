"use client";
import React, { useEffect, useRef, memo } from "react";

function TradingViewMiniSymbol() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
      {
        "symbol": "FX:EURUSD",
        "width": "100%",
        "height": "100%",
        "locale": "en",
        "dateRange": "12M",
        "colorTheme": "dark",
        "isTransparent": false,
        "autosize": true,
        "largeChartUrl": ""
      }
    `;
        if (containerRef.current) {
            containerRef.current.innerHTML = ""; // clear previous if reloaded
            containerRef.current.appendChild(script);
        }
    }, []);

    return (
        <div className="tradingview-widget-container" ref={containerRef} style={{ width: "100%", height: "100%" }}>
            <div className="tradingview-widget-container__widget" style={{ width: "100%", height: "100%" }}></div>
            <div className="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                    <span className="blue-text">Track all markets on TradingView</span>
                </a>
            </div>
        </div>
    );
}

export default memo(TradingViewMiniSymbol);
