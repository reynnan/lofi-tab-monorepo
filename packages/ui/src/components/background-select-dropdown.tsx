"use client";

import LofiImage from "@repo/ui/components/lofi-image";
import { LOFI_GIFS } from "@repo/ui/utils/constants";
import { GalleryHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

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
        <div className="dropdown-content mt-1 z-40 w-80 h-100 md:w-[500px] md:h-96 shadow-md overflow-y-scroll bg-base-300 p-1 flex flex-col gap-2">
          <BackgroundSelection />
        </div>
      )}
    </details>
  );
}

const LOFI_BG_PREF = "LOFI_BG_PREF";
type BgPrefType = null | "dynamic" | "static";

export function BackgroundSelection() {
  const [bgPref, setBgPref] = useState<BgPrefType>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBgPref = () => {
      const storage = window.localStorage.getItem(LOFI_BG_PREF) as BgPrefType;
      setBgPref(storage || "dynamic");
      setLoading(false);
    };

    fetchBgPref();
  }, []);

  useEffect(() => {
    const syncStateWithStorage = () => {
      if (!loading) window.localStorage.setItem(LOFI_BG_PREF, bgPref!);
    };

    syncStateWithStorage();
  }, [bgPref, loading]);

  return (
    <>
      <div role="tablist" className="tabs tabs-border bg-base-300 z-10">
        <a
          role="tab"
          className={`tab ${bgPref === "dynamic" ? "tab-active" : ""}`}
          onClick={() => setBgPref("dynamic")}
        >
          Dynamic
        </a>
        <a
          role="tab"
          className={`tab ${bgPref === "static" ? "tab-active" : ""}`}
          onClick={() => setBgPref("static")}
        >
          Static
        </a>
      </div>
      <ul className="grid grid-cols-3 gap-2">
        {LOFI_GIFS.filter(({ type }) => bgPref === type).map(({ url }) => (
          <li key={url} className="md:w-[155px] md:h-[100px] cursor-pointer">
            <LofiImage src={`${url}`} />
          </li>
        ))}
      </ul>
    </>
  );
}
