import BackgroundSelectDropdown from "@repo/ui/components/background-select-dropdown";
import Clock from "@repo/ui/components/clock";
import GifSourceLink from "@repo/ui/components/gif-source-link";
import { LofiPlayMusicButton, LofiYoutubeIframe } from "@repo/ui/components/lofi-play-music";
import ShuffleBackgroundButton from "@repo/ui/components/shuffle-background-button";
import Weather from "@repo/ui/components/weather";
import { SettingsProvider } from "@repo/ui/providers/settings-provider";

function App() {
  return (
    <SettingsProvider>
      <div className="flex flex-col w-full h-full overflow-hidden p-3">
        <header className="flex items-center p-1">
          <BackgroundSelectDropdown />
          <ShuffleBackgroundButton />
          <LofiPlayMusicButton />
          <Weather classNames="ml-auto" fetchUrl={`${import.meta.env.VITE_API_ROUTE}/weather`} />
        </header>
        <main className="flex-1 flex flex-col justify-center items-center">
          <Clock />
          <LofiYoutubeIframe />
        </main>
        <footer className="flex p-1">
          <GifSourceLink />
        </footer>
      </div>
    </SettingsProvider>
  );
}

export default App;
