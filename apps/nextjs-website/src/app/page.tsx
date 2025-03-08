
import GifSourceLink from "@/components/gif-source-link";
import Header from "@/components/header";
import { BackgroundProvider } from "@/providers/background-provider";
import Clock from "@repo/ui/components/clock";

export default function Home() {
  return (
    <BackgroundProvider>
      <div className="flex flex-col w-full h-full overflow-hidden">
        <Header />
        <main className="flex-1 flex flex-col justify-center items-center p-1 z-10">
          <Clock />
        </main>
        <footer className="flex p-1">
          <GifSourceLink />
        </footer>
      </div>
    </BackgroundProvider>
  );
}
