"use client";
import { ACTIONS, useBackground } from "@repo/ui/providers/background-provider";
import { Shuffle } from "lucide-react";

export default function ShuffleBackgroundButton() {
  const { dispatch } = useBackground();
  return (
    <div className="tooltip tooltip-right" data-tip="Shuffle Background">
      <button className="btn btn-ghost" onClick={() => dispatch(ACTIONS.SHUFFLE_BACKGROUND())}>
        <Shuffle className="h-5 w-5" />
      </button>
    </div>
  );
}
