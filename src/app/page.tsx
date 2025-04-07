import TradingViewWidget from "@/components/home/main-section";
import OrderBook from "@/components/home/order-section";

export default function Home() {
  return (
    <>

      <main className="h-full w-full">
        <TradingViewWidget />
        {/* <OrderBook /> */}
      </main>
    </>
  );
}
