"use client";
import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [use24HourFormat, setUse24HourFormat] = useState(true);

  useEffect(() => {
    const storedPreference = localStorage.getItem("CLOCK_PREF");
    if (storedPreference) {
      setUse24HourFormat(storedPreference === "24");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("CLOCK_PREF", use24HourFormat ? "24" : "12");
  }, [use24HourFormat]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 60_000);
    return () => clearInterval(intervalId);
  }, []);

  const handleToggleFormat = () => {
    setUse24HourFormat((prev) => !prev);
  };

  return (
    <div
      className="tooltip tooltip-bottom font-bold cursor-pointer select-none"
      data-tip="Click to alternate between 12-hour and 24-hour format"
      onClick={handleToggleFormat}
    >
      <h1 className="text-9xl [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]">
        {formatTime(time, use24HourFormat)}
      </h1>
    </div>
  );
}

const formatTime = (time: Date, is24Hour: boolean) => {
  if (is24Hour) {
    return convertTo24Hour(time);
  } else {
    return convertTo12Hour(time);
  }
};

const convertTo24Hour = (time: Date) => {
  const hours24 = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  return `${hours24}:${minutes}`;
};

const convertTo12Hour = (time: Date) => {
  let hours12 = time.getHours() % 12;
  hours12 = hours12 === 0 ? 12 : hours12;
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const suffix = time.getHours() < 12 ? "AM" : "PM";
  return `${hours12}:${minutes} ${suffix}`;
};
