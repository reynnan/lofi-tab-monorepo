"use client";

import { ACTIONS, useBackground } from "@repo/ui/providers/background-provider";

const activeClassNames = "border-2 border-primary";

export default function LofiImage({ src }: { src: string }) {
  const { backgroundUrl, dispatch } = useBackground();
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
