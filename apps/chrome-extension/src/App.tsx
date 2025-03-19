import BackgroundSelectDropdown from "@repo/ui/components/background-select-dropdown";
import GifSourceLink from "@repo/ui/components/gif-source-link";
import { LofiPlayMusicButton } from "@repo/ui/components/lofi-play-music";
import Main from "@repo/ui/components/main";
import ShuffleBackgroundButton from "@repo/ui/components/shuffle-background-button";
import TodosDropdown from "@repo/ui/components/todos-dropdown";
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
          <Weather
            stylesProps={{ sectionClassNames: "ml-auto" }}
            fetchUrl={`${import.meta.env.VITE_API_ROUTE}/weather`}
          />
        </header>
        <Main />
        <footer className="flex items-end p-1">
          <GifSourceLink />
          <TodosDropdown className="ml-auto" />
        </footer>
      </div>
    </SettingsProvider>
  );
}

export default App;
