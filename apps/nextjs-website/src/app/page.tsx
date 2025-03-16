import Header from "@/components/header";
import GifSourceLink from "@repo/ui/components/gif-source-link";
import Main from "@repo/ui/components/main";
import TodosDropdown from "@repo/ui/components/todos-dropdown";
import { SettingsProvider } from "@repo/ui/providers/settings-provider";

export default function Home() {
  return (
    <SettingsProvider>
      <div className="flex flex-col w-full h-full p-3">
        <Header />
        <Main />
        <footer className="flex items-end p-1">
          <GifSourceLink />
          <TodosDropdown className="ml-auto" />
        </footer>
      </div>
    </SettingsProvider>
  );
}
