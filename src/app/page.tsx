import TradingChart from "@/components/home/main-section"
import OrderBook from "@/components/home/order-section";

export default function Home() {
  return (
    <>
      <main className="bg-black">

        <TradingChart />
        <OrderBook />
      </main>
    </>
  );
}
