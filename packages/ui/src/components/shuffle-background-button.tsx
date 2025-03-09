"use client";
import { ACTIONS, useBackground } from "@repo/ui/providers/background-provider";
import { Shuffle } from "lucide-react";
import { useEffect, useState } from "react";

export default function ShuffleBackgroundButton() {
  const { backgroundUrl, dispatch } = useBackground();
  const [isShuffleActive, setIsShuffleActive] = useState(false);

  useEffect(() => {
    const storedUrl = window.localStorage.getItem("LOFI_NEW_TAB");
    setIsShuffleActive(!storedUrl || storedUrl !== backgroundUrl);
  }, [backgroundUrl]);

  return (
    <div
      className="tooltip tooltip-right"
      data-tip={`Shuffle ${isShuffleActive ? "is active" : "background"}`}
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
