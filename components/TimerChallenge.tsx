"use client";

import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

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
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [timerState, setTimerState] = useState(TimerState.RESETTED);
  const handleClick = () => {
    switch (timerState) {
      case TimerState.RESETTED:
        setTimerState(TimerState.RUNNING);
        timerRef.current = setTimeout(() => {
          setTimerState(TimerState.EXPIRED);
          dialogRef.current?.showModal();
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
    <>
      <ResultModal ref={dialogRef} result="You Lost!" targetTime={targetTime} />
      <section className="challenge">
        <h2>{title ?? "untitled"}</h2>
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
    </>
  );
};

export default TimerChallenge;
