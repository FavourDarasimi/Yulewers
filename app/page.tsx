import Hero from "./components/Hero";
import SiteHeader from "./components/SiteHeader";
import TonightStrip from "./components/TonightStrip";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TonightStrip />
      </main>
    </>
  );
}
