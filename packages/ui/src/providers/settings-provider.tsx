"use client";

import { getRandomBackground } from "@repo/ui/utils/get-random-background";
import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";

type Settings = {
  backgroundUrl: string;
  isPlayingLofi: boolean;
};

type SettingsContextType = {
  settings: Settings;
  dispatch: React.ActionDispatch<[action: Action]>;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: PropsWithChildren) {
  const backgroundRef = React.useRef<HTMLDivElement | null>(null);
  const [settings, dispatch] = useReducer(reducer, {
    backgroundUrl: "",
    isPlayingLofi: false,
  });
  const [renderWithAnimation, setRenderWithAnimation] = useState(false);

  useLayoutEffect(() => {
    dispatch(ACTIONS.INIT_STATE());
  }, []);

  useEffect(() => {
    if (backgroundRef.current === null) return;
    const backgroundDiv = backgroundRef.current;
    backgroundDiv.style.backgroundImage = `url(${settings.backgroundUrl})`;
    backgroundDiv.style.backgroundRepeat = "no-repeat";
    backgroundDiv.style.backgroundSize = "cover";
  }, [settings.backgroundUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderWithAnimation(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const value = {
    settings,
    dispatch,
  };

  return (
    <SettingsContext.Provider value={value}>
      <div
        ref={backgroundRef}
        className={`w-full h-full transition-opacity duration-300 transform ${
          renderWithAnimation ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used inside a SettingsContext");
  }
  return context;
}

export const LOCAL_STORAGE_KEY = "LOFI_NEW_TAB";

export const ACTIONS = {
  INIT_STATE: () => {
    const url =
      window.localStorage.getItem(LOCAL_STORAGE_KEY) || getRandomBackground();
    return {
      type: "INIT_STATE",
      payload: { url },
    } as const;
  },
  SET_FAVORITE: (url: string) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, url);
    return {
      type: "SET_FAVORITE",
      payload: { url },
    } as const;
  },
  SHUFFLE_BACKGROUND: () => {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    return {
      type: "SHUFFLE_BACKGROUND",
    } as const;
  },
  TOGGLE_LOFI_MUSIC: () => {
    return {
      type: "TOGGLE_LOFI_MUSIC",
    } as const;
  },
};

type Action =
  | { type: "INIT_STATE"; payload: { url: string } }
  | { type: "SET_FAVORITE"; payload: { url: string } }
  | { type: "SHUFFLE_BACKGROUND" }
  | { type: "TOGGLE_LOFI_MUSIC" };

const reducer = (state: Settings, action: Action): Settings => {
  switch (action.type) {
    case "INIT_STATE":
      return { ...state, backgroundUrl: action.payload.url };
    case "SET_FAVORITE":
      return { ...state, backgroundUrl: action.payload.url };
    case "SHUFFLE_BACKGROUND":
      return { ...state, backgroundUrl: getRandomBackground() };
    case "TOGGLE_LOFI_MUSIC":
      return { ...state, isPlayingLofi: !state.isPlayingLofi };
    default:
      return state;
  }
};
