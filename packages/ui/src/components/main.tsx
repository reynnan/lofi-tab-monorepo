"use client";

import Clock from "@repo/ui/components/clock";
import { LofiYoutubeIframe } from "@repo/ui/components/lofi-play-music";
import { useSettings } from "@repo/ui/providers/settings-provider";

export default function Main() {
  const {
    settings: { isPlayingLofi },
  } = useSettings();

  return (
    <main
      className={`
      flex-1 flex flex-col items-center justify-center transition-transform duration-1000 
      ${isPlayingLofi ? "translate-y-[-20px]" : "translate-y-0"}
    `}
    >
      <Clock />
      <LofiYoutubeIframe show={isPlayingLofi} />
    </main>
  );
}
