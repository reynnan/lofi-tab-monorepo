import { LOFI_GIFS } from "@/constants";
import { Menu } from "lucide-react";
import { PropsWithChildren } from "react";
import LofiImage from "./lofi-image";

export default function Drawer({ children }: PropsWithChildren) {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex justify-center">
        <label htmlFor="my-drawer" className="btn btn-primary btn-ghost">
          <div className="tooltip tooltip-right" data-tip="More backgrounds">
            <Menu className="h-5 w-5" />
          </div>
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80">
          {LOFI_GIFS.map((gif) => (
            <li key={gif} className="relative w-full h-60">
              <LofiImage src={gif} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
