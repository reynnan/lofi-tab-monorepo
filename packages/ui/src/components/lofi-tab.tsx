"use client";
import {
  SettingsProvider,
  useSettings,
} from "@repo/ui/providers/settings-provider";
import Main from "@repo/ui/components/main";
import GifSourceLink from "@repo/ui/components/gif-source-link";
import TodosDropdown from "@repo/ui/components/todos-dropdown";
import { useEffect, useRef, useState } from "react";
import BackgroundSelectDropdown from "@repo/ui/components/background-select-dropdown";
import ShuffleBackgroundButton from "@repo/ui/components/shuffle-background-button";
import { LofiPlayMusicButton } from "@repo/ui/components/lofi-play-music";
import Weather, { Props as WeatherProps } from "@repo/ui/components/weather";

type Props = {
  weatherProps?: WeatherProps;
};

export default function LofiTab(props: Props) {
  return (
    <SettingsProvider>
      <LofiTabUnwrapped {...props} />
    </SettingsProvider>
  );
}

export const LofiTabUnwrapped = (props: Props) => {
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
        <header className="flex items-center p-1">
          <BackgroundSelectDropdown />
          <ShuffleBackgroundButton />
          <LofiPlayMusicButton />
          <Weather
            stylesProps={{ sectionClassNames: "ml-auto" }}
            {...props.weatherProps}
          />
        </header>
        <Main />
        <footer className="flex items-end p-1">
          <GifSourceLink />
          <TodosDropdown className="ml-auto" />
        </footer>
      </div>
    </div>
  );
};
