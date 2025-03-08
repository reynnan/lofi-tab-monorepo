import BackgroundSelectDropdown from "@repo/ui/components/background-select-dropdown";
import ShuffleBackgroundButton from "@repo/ui/components/shuffle-background-button";
import Weather from "@repo/ui/components/weather";

export default function Header() {
  return (
    <header className="flex p-1">
      <BackgroundSelectDropdown />
      <ShuffleBackgroundButton />
      <Weather classNames="ml-auto" />
    </header>
  );
}
