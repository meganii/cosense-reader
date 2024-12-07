"use client";

import { useEffect } from "react";

export default function Telomere() {
  useEffect(() => {
    const str = localStorage.getItem(location.href) || "";
    const prev_timestamp = str ? JSON.parse(str) : "";
    const curr_timestamp = {
      previus: prev_timestamp.current || 0,
      current: Math.floor(Date.now() / 1000),
    };
    localStorage.setItem(location.href, JSON.stringify(curr_timestamp));
    [...document.querySelectorAll<HTMLElement>(".line")]
      .filter((page) => {
        if (page.dataset.updated) {
          return page.dataset.updated > curr_timestamp.previus;
        } else {
          return false;
        }
      })
      .map((page) => (page.style.cssText = "border: solid;border-width: 0 0 0 10px;border-color: rgb(132 204 22);"));
  });

  return (
    <div></div>
  )
}
