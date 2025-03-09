"use client";

import { ACTIONS, useSettings } from "@repo/ui/providers/settings-provider";
import { HeadphoneOff, Headphones } from "lucide-react";
import { useState } from "react";

export function LofiPlayMusicButton() {
  const {
    settings: { isPlayingLofi },
    dispatch,
  } = useSettings();

  return (
    <div
      className="tooltip tooltip-right"
      data-tip={`${isPlayingLofi ? "Hide music" : "Show music"}`}
    >
      <button onClick={() => dispatch(ACTIONS.TOGGLE_LOFI_MUSIC())} className="btn btn-ghost">
        {isPlayingLofi ? <HeadphoneOff className="h-5 w-5" /> : <Headphones className="h-5 w-5" />}
      </button>
    </div>
  );
}

export function LofiYoutubeIframe() {
  const [loading, setLoading] = useState(true);
  const {
    settings: { isPlayingLofi },
  } = useSettings();

  return (
    <>
      {isPlayingLofi && (
        <section className="flex flex-col items-center">
          {loading && (
            <div className="mb-4 flex flex-col items-center">
              <span className="loading loading-spinner loading-lg" />
              <span className="mt-2">Loading video...</span>
            </div>
          )}

          <div
            className={`transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
          >
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/jfKfPfyJRdk?si=c-9CVdi3f9mV3LHb"
              title="Lofi Beats"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              onLoad={() => setLoading(false)}
            />
          </div>
        </section>
      )}
    </>
  );
}
