"use client";
import {
  SettingsProvider,
  useSettings,
} from "@repo/ui/providers/settings-provider";
import Header from "./header";
import Main from "@repo/ui/components/main";
import GifSourceLink from "@repo/ui/components/gif-source-link";
import TodosDropdown from "@repo/ui/components/todos-dropdown";
import { useEffect, useRef, useState } from "react";

export default function LofiTab() {
  return (
    <SettingsProvider>
      <LofiTabUnwrapped />
    </SettingsProvider>
  );
}

export const LofiTabUnwrapped = () => {
  const { settings } = useSettings();
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const [renderWithAnimation, setRenderWithAnimation] = useState(false);

  useEffect(() => {
    if (backgroundRef.current === null) {
      return;
    }
    const backgroundDiv = backgroundRef.current;
    backgroundDiv.style.backgroundImage = `url(${settings.backgroundUrl})`;
    backgroundDiv.style.backgroundRepeat = "no-repeat";
    backgroundDiv.style.backgroundSize = "cover";
  }, [settings.backgroundUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderWithAnimation(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={backgroundRef}
      className={`w-full h-full transition-opacity duration-300 transform ${
        renderWithAnimation ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col w-full h-full p-3 overflow-hidden">
        <Header />
        <Main />
        <footer className="flex items-end p-1">
          <GifSourceLink />
          <TodosDropdown className="ml-auto" />
        </footer>
      </div>
    </div>
  );
};
