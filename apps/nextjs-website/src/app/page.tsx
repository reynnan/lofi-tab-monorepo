import Header from "@/components/header";
import GifSourceLink from "@repo/ui/components/gif-source-link";
import Main from "@repo/ui/components/main";
import { SettingsProvider } from "@repo/ui/providers/settings-provider";

export default function Home() {
  return (
    <SettingsProvider>
      <div className="flex flex-col w-full h-full overflow-hidden p-3">
        <Header />
        <Main />
        <footer className="flex p-1">
          <GifSourceLink />
        </footer>
      </div>
    </SettingsProvider>
  );
}
