"use client";

import { ACTIONS, useSettings } from "@repo/ui/providers/settings-provider";

const activeClassNames = "border-2 border-primary";

export default function LofiImage({ src }: { src: string }) {
  const {
    settings: { backgroundUrl },
    dispatch,
  } = useSettings();

  const setBackgroundUrl = (url: string) => dispatch(ACTIONS.SET_FAVORITE(url));

  return (
    <img
      src={src}
      alt="Background gif"
      className={`object-cover w-full h-full rounded-md  ${
        src === backgroundUrl ? activeClassNames : ""
      }`}
      onClick={() => setBackgroundUrl(src)}
    />
  );
}
