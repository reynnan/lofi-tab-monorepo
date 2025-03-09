import Header from "@/components/header";
import Clock from "@repo/ui/components/clock";
import GifSourceLink from "@repo/ui/components/gif-source-link";
import { BackgroundProvider } from "@repo/ui/providers/background-provider";

export default function Home() {
  return (
    <BackgroundProvider>
      <div className="flex flex-col w-full h-full overflow-hidden p-3">
        <Header />
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
