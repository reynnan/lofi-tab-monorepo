"use client";
import {
  ACTIONS,
  LOCAL_STORAGE_KEY,
  useSettings,
} from "@repo/ui/providers/settings-provider";
import { Shuffle } from "lucide-react";
import { useEffect, useState } from "react";

export default function ShuffleBackgroundButton() {
  const {
    settings: { backgroundUrl },
    dispatch,
  } = useSettings();

  const [isShuffleActive, setIsShuffleActive] = useState(false);

  useEffect(() => {
    const storedUrl = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    setIsShuffleActive(!storedUrl || storedUrl !== backgroundUrl);
  }, [backgroundUrl]);

  return (
    <div
      className="tooltip tooltip-right"
      data-tip={
        isShuffleActive
          ? "Shuffle is on: New random background on each new tab or select one to disable shuffle"
          : "Shuffle is off: Click to refresh your background automatically on each new tab"
      }
    >
      <button
        onClick={() => dispatch(ACTIONS.SHUFFLE_BACKGROUND())}
        className="btn btn-ghost"
      >
        <Shuffle
          className={`h-5 w-5 ${isShuffleActive ? "text-yellow-400" : ""}`}
        />
      </button>
    </div>
  );
}
