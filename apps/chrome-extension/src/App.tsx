import BackgroundSelectDropdown from "@repo/ui/components/background-select-dropdown";
import Clock from "@repo/ui/components/clock";
import GifSourceLink from "@repo/ui/components/gif-source-link";
import ShuffleBackgroundButton from "@repo/ui/components/shuffle-background-button";
import Weather from "@repo/ui/components/weather";
import { BackgroundProvider } from "@repo/ui/providers/background-provider";

function App() {
  return (
    <BackgroundProvider>
      <div className="flex flex-col w-full h-full overflow-hidden p-3">
        <header className="flex p-1">
          <BackgroundSelectDropdown />
          <ShuffleBackgroundButton />
          <Weather classNames="ml-auto" />
        </header>
        <main className="flex-1 flex flex-col justify-center items-center">
          <Clock />
        </main>
        <footer className="flex p-1">
          <GifSourceLink />
        </footer>
      </div>
    </BackgroundProvider>
  );
}

export default App;
