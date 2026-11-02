import About from "./components/About";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import PrivateHire from "./components/PrivateHire";
import SiteHeader from "./components/SiteHeader";
import TonightStrip from "./components/TonightStrip";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TonightStrip />
        <Menu />
        <About />
        <PrivateHire />
      </main>
    </>
  );
}
