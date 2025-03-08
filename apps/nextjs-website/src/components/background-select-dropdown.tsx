"use client";

import { GalleryHorizontal } from "lucide-react";
import { useState } from "react";
import { LOFI_GIFS } from "../../../../packages/ui/src/utils/constants";
import LofiImage from "./lofi-image";

export default function BackgroundSelectDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <div className="tooltip tooltip-right" data-tip="More backgrounds">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost"
          // Only render list when hovering the mouse
          // to avoid rendering all gifs at once and slowing down the page
          onMouseOver={() => setIsOpen(true)}
        >
          <GalleryHorizontal className="w-5 h-5" />
        </div>
      </div>
      {isOpen && (
        <div
          tabIndex={0}
          className="dropdown-content z-40 w-96 h-80 md:w-[500px] md:h-96 shadow-md overflow-y-scroll bg-base-300"
        >
          <ul className="grid grid-cols-3 gap-2 p-1">
            {LOFI_GIFS.map((gif) => (
              <li key={gif} className="relative w-full h-auto cursor-pointer">
                <LofiImage src={gif} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
