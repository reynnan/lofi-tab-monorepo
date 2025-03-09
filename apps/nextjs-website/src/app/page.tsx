import Header from "@/components/header";
import Clock from "@repo/ui/components/clock";
import GifSourceLink from "@repo/ui/components/gif-source-link";
import { SettingsProvider } from "@repo/ui/providers/settings-provider";

export default function Home() {
  return (
    <SettingsProvider>
      <div className="flex flex-col w-full h-full overflow-hidden p-3">
        <Header />
        <main className="flex-1 flex flex-col justify-center items-center">
          <Clock />
        </main>
        <footer className="flex p-1">
          <GifSourceLink />
        </footer>
      </div>
    </SettingsProvider>
  );
}
