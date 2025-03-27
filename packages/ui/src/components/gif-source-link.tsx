"use client";
import { useSettings } from "@repo/ui/providers/settings-provider";

export default function GifSourceLink() {
  const {
    settings: { backgroundUrl },
  } = useSettings();

  return (
    <a
      href={backgroundUrl}
      rel="noreferrer"
      target="_blank"
      className="font-bold text-xs"
    >
      Source
    </a>
  );
}
