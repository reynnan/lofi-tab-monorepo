import BackgroundSelectDropdown from "@repo/ui/components/background-select-dropdown";
import ShuffleBackgroundButton from "@repo/ui/components/shuffle-background-button";
import dynamic from "next/dynamic";

const DynamicWeather = dynamic(() => import("./weather"));

export default function Header() {
  return (
    <header className="flex p-1">
      <BackgroundSelectDropdown />
      <ShuffleBackgroundButton />
      <DynamicWeather classNames="ml-auto" />
    </header>
  );
}
