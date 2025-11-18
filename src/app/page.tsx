'use client'

import Hero from "./components/landing/hero"; 
import Agenda from "./components/landing/agenda-review";
import Partners from "./components/landing/partners";

import Host from "./components/landing/host";
import Keyspeaker from "./components/landing/keySpeakers";
import Venue from "./components/landing/venue";
import Gallery from "./components/landing/gallery";

export default function LandingPage() {
  return (
	<main className="relative min-h-screen bg-[#fafaf9] overflow-hidden">
       <div className="relative z-10 ">
        <Hero />
        <Host/>
        <Keyspeaker/>
				<Agenda />
				<Partners />
        <Gallery />
        <Venue />
			</div>
	  </main>
  );
}