import dynamic from "next/dynamic";
import ShuffleBackgroundButton from "./shuffle-background-button";

const DynamicWeather = dynamic(() => import("./weather"));
const DynamicBackgroundSelectDropdown = dynamic(
  () => import("./background-select-dropdown")
);

export default function Header() {
  return (
    <header className="flex p-1 h-12">
      <DynamicBackgroundSelectDropdown />
      <ShuffleBackgroundButton />
      <DynamicWeather classNames="ml-auto" />
    </header>
  );
}
