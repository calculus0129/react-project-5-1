"use client";

import { useState, useRef } from "react";

export default function Player() {
  const [playerName, setPlayerName] = useState("unknown entity");
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <section id="player">
      <h2>Welcome {playerName}</h2>
      <p>
        <input ref={inputRef} type="text" />
        <button
          onClick={() => {
            setPlayerName(inputRef.current?.value || "unknown entity");
            if (inputRef.current) {
              inputRef.current.value = "";
            }
          }}
        >
          Set Name
        </button>
      </p>
    </section>
  );
}
