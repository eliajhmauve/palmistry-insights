import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import HomeContent from "@/components/HomeContent";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      {!showSplash && <HomeContent />}
    </>
  );
}
