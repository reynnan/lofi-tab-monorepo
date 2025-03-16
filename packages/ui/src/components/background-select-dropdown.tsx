"use client";

import LofiImage from "@repo/ui/components/lofi-image";
import { LOFI_GIFS } from "@repo/ui/utils/constants";
import { GalleryHorizontal } from "lucide-react";
import { useState } from "react";

export default function BackgroundSelectDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details className="dropdown">
      <summary
        role="button"
        className="btn btn-ghost tooltip tooltip-right z-2 font-normal"
        data-tip="More backgrounds"
        // Only render list when hovering the mouse
        // to avoid rendering all gifs at once and slowing down the page
        onMouseOver={() => setIsOpen(true)}
      >
        <GalleryHorizontal className="w-5 h-5" />
      </summary>
      {isOpen && (
        <div className="dropdown-content mt-1 z-40 w-70 h-50 md:w-[500px] md:h-96 shadow-md overflow-y-scroll bg-base-300">
          <ul className="grid grid-cols-3 gap-2 p-1">
            {LOFI_GIFS.map((gif) => (
              <li key={gif} className="relative w-full h-auto cursor-pointer">
                <LofiImage src={gif} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </details>
  );
}
