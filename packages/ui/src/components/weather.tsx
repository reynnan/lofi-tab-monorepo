"use client";
import lscache from "lscache";
import { useEffect, useLayoutEffect, useState } from "react";

type Props = {
  fetchUrl?: string;
  classNames?: string;
};

type State = {
  city: string;
  country: string;
  temp: number;
  currentType: "C" | "F";
};

export default function Weather({ classNames = "", fetchUrl = "/api/weather" }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<State>(() => getInitialState());

  useLayoutEffect(() => {
    if (lscache.get(WEATHER_KEY)) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (lscache.get(WEATHER_KEY)) return;

    fetchWeather(fetchUrl).then((weather) => {
      if (weather) {
        setState(weather);
        setIsLoading(false);
      }
    });
  }, [fetchUrl]);

  const handleToggleTemperature = () => {
    const newType = state.currentType === "C" ? "F" : "C";
    const newTemp =
      state.currentType === "C"
        ? convertCelsiusToFahrenheit(state.temp)
        : convertFahrenheitToCelsius(state.temp);

    const newState = {
      ...state,
      temp: newTemp,
      currentType: newType as "C" | "F",
    };

    setState(newState);
    localStorage.setItem(TEMP_PREF_KEY, newType);
    lscache.set(WEATHER_KEY, newState, 60);
  };

  if (isLoading) {
    return (
      <div
        className={`flex flex-col items-center justify-center ${classNames}`}
      >
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section
      className={`tooltip tooltip-left cursor-pointer ${classNames} flex flex-col items-center`}
      data-tip="Click to change between Celsius and Fahrenheit"
      onClick={handleToggleTemperature}
    >
      <h2 className="text-4xl font-bold select-none">
        {Math.round(state.temp)}º {state.currentType}
      </h2>
      <h3 className="text-sm font-bold">
        {state.city}, {state.country}
      </h3>
    </section>
  );
}
const WEATHER_KEY = "LOFI_WEATHER";
const TEMP_PREF_KEY = "LOFI_TEMP_PREF";

const getTempPreference = (): "C" | "F" => {
  if (typeof window !== "undefined") {
    return (localStorage.getItem(TEMP_PREF_KEY) as "C" | "F") || "C";
  }
  return "C";
};

const getInitialState = (): State => {
  const weatherCache = lscache.get(WEATHER_KEY) as State | null;

  if (!weatherCache) {
    return {
      city: "",
      country: "",
      temp: 0,
      currentType: getTempPreference(),
    };
  }

  return weatherCache;
};

async function fetchWeather(fetchUrl: string) {
  try {
    const response = await fetch(fetchUrl, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      const tempPreference = getTempPreference();
      const weatherData =
        tempPreference === "C"
          ? {
              city: data.name,
              country: data.sys.country,
              temp: parseInt(data.main.temp),
              currentType: "C" as const,
            }
          : {
              city: data.name,
              country: data.sys.country,
              temp: convertCelsiusToFahrenheit(parseInt(data.main.temp)),
              currentType: "F" as const,
            };

      lscache.set(WEATHER_KEY, weatherData, 60);
      return weatherData;
    } else {
      console.error("Failed to fetch weather data");
      return null;
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}

const convertCelsiusToFahrenheit = (celsius: number) => {
  return (celsius * 9) / 5 + 32;
};

const convertFahrenheitToCelsius = (fahrenheit: number) => {
  return ((fahrenheit - 32) * 5) / 9;
};
