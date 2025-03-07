"use client";

import { getRandomBackground } from "@/utils/get-random-background";
import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";

type BackgroundContextType = {
  backgroundUrl: string;
  dispatch: React.ActionDispatch<[action: Action]>;
};

const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined
);

export function BackgroundProvider({ children }: PropsWithChildren) {
  const [backgroundUrl, dispatch] = useReducer(reducer, "");
  const [renderWithAnimation, setRenderWithAnimation] = useState(false);

  useLayoutEffect(() => {
    dispatch(ACTIONS.INIT_STATE());
  }, []);

  useEffect(() => {
    const backgroundDiv = document.getElementById(
      "background"
    ) as HTMLDivElement;
    backgroundDiv.style.backgroundImage = `url(${backgroundUrl})`;
    backgroundDiv.style.backgroundRepeat = "no-repeat";
    backgroundDiv.style.backgroundSize = "cover";
  }, [backgroundUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderWithAnimation(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const value = {
    backgroundUrl,
    dispatch,
  };

  return (
    <BackgroundContext.Provider value={value}>
      <div
        className={`!contents w-full h-full transition-all duration-1000 transform ${
          renderWithAnimation ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error(
      "useBodyBackground must be used inside a BodyBackgroundProvider"
    );
  }
  return context;
}

const LOCAL_STORAGE_KEY = "LOFI_NEW_TAB";

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
};

type Action =
  | { type: "INIT_STATE"; payload: { url: string } }
  | { type: "SET_FAVORITE"; payload: { url: string } }
  | { type: "SHUFFLE_BACKGROUND" };

const reducer = (state: string, action: Action) => {
  switch (action.type) {
    case "INIT_STATE":
      return action.payload.url;
    case "SET_FAVORITE":
      return action.payload.url;
    case "SHUFFLE_BACKGROUND":
      return getRandomBackground();
    default:
      return state;
  }
};
