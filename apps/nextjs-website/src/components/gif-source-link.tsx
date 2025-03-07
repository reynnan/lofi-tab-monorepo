"use client";
import { useBackground } from "@/providers/background-provider";

export default function GifSourceLink() {
  const { backgroundUrl } = useBackground();
  return (
    <a href={backgroundUrl} target="_blank" className="font-bold">
      Gif Source
    </a>
  );
}
