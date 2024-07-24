// src/injectStyles.js
import { useState } from "react";
import { colorsB, colorsL } from "./constants";

const currentTheme =
  localStorage.getItem("theme") === "light" ? "light" : "dark";
if (currentTheme === "dark") {
  const root = document.documentElement;
  root.style.setProperty("--primary", colorsB.primary);
  root.style.setProperty("--secondary", colorsB.secondary);
  root.style.setProperty("--cyan", colorsB.cyan);
  root.style.setProperty("--fontcolor", colorsB.color);
} else {
  const root = document.documentElement;
  root.style.setProperty("--primary", colorsL.primary);
  root.style.setProperty("--secondary", colorsL.secondary);
  root.style.setProperty("--cyan", colorsL.cyan);
  root.style.setProperty("--fontcolor", colorsL.color);
}
export const changeTheme = () => {
  const currentTheme =
    localStorage.getItem("theme") === "dark" ? "light" : "dark";
  localStorage.setItem("theme", currentTheme);
  if (currentTheme === "dark") {
    const root = document.documentElement;
    root.style.setProperty("--primary", colorsB.primary);
    root.style.setProperty("--secondary", colorsB.secondary);
    root.style.setProperty("--cyan", colorsB.cyan);
    root.style.setProperty("--fontcolor", colorsB.color);
  } else {
    const root = document.documentElement;
    root.style.setProperty("--primary", colorsL.primary);
    root.style.setProperty("--secondary", colorsL.secondary);
    root.style.setProperty("--cyan", colorsL.cyan);
    root.style.setProperty("--fontcolor", colorsL.color);
  }
};
