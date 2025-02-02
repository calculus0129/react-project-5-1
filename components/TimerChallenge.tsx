"use client";

import { useState, useRef } from "react";

export type TimerChallengeProps = {
  title?: string;
  targetTime: number;
};

const enum TimerState {
  RESETTED,
  RUNNING,
  EXPIRED,
  STOPPED,
}

const TimerChallenge: React.FC<TimerChallengeProps> = ({
  title,
  targetTime,
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [timerState, setTimerState] = useState(TimerState.RESETTED);
  const handleClick = () => {
    switch (timerState) {
      case TimerState.RESETTED:
        setTimerState(TimerState.RUNNING);
        timerRef.current = setTimeout(() => {
          setTimerState(TimerState.EXPIRED);
        }, targetTime * 1000);
        break;
      case TimerState.RUNNING:
        clearTimeout(timerRef.current!);
        setTimerState(TimerState.STOPPED);
        break;
      case TimerState.EXPIRED:
        setTimerState(TimerState.RESETTED);
        break;
      case TimerState.STOPPED:
        setTimerState(TimerState.RESETTED);
        break;
    }
  };

  return (
    <section className="challenge">
      <h2>{title ?? "untitled"}</h2>
      {timerState === TimerState.EXPIRED && <p>You Lost!</p>}
      {/* {timerState === TimerState.STOPPED && <p>You Win!</p>} */}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={handleClick}>
          {(() => {
            switch (timerState) {
              case TimerState.RESETTED:
                return "Start";
              case TimerState.RUNNING:
                return "Stop";
              case TimerState.EXPIRED:
                return "Reset";
              case TimerState.STOPPED:
                return "Reset";
            }
          })()}{" "}
          Challenge
        </button>
      </p>
      <p className={timerState === TimerState.RUNNING ? "active" : undefined}>
        {/* "Timer inactive" */}
        {(() => {
          switch (timerState) {
            case TimerState.RUNNING:
              return "Timer is running...";
            case TimerState.EXPIRED:
              return "Timer is expired!";
            case TimerState.STOPPED:
              return "Timer inactive";
          }
        })()}
      </p>
    </section>
  );
};

export default TimerChallenge;
