"use client";
import React, { useEffect, useRef, memo } from "react";

function TradingViewFinancials() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
      {
        "isTransparent": false,
        "largeChartUrl": "",
        "displayMode": "regular",
        "width": "100%",
        "height": "100%",
        "colorTheme": "dark",
        "symbol": "NASDAQ:AAPL",
        "locale": "en"
      }
    `;
        if (containerRef.current) {
            containerRef.current.innerHTML = ""; // clear on re-render
            containerRef.current.appendChild(script);
        }
    }, []);

    return (
        <div
            className="tradingview-widget-container"
            ref={containerRef}
            style={{ width: "100%", height: "100%" }}
        >
            <div
                className="tradingview-widget-container__widget"
                style={{ width: "100%", height: "100%" }}
            ></div>
            <div className="tradingview-widget-copyright">
                <a
                    href="https://www.tradingview.com/"
                    rel="noopener nofollow"
                    target="_blank"
                >
                    <span className="blue-text">Track all markets on TradingView</span>
                </a>
            </div>
        </div>
    );
}

export default memo(TradingViewFinancials);
