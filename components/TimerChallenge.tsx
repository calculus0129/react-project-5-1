"use client";

import { useState, useRef } from "react";
import ResultModal, { ResultModalHandle } from "./ResultModal";
import { TICKTIME } from "@/constants";

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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const dialogRef = useRef<ResultModalHandle | null>(null);
  const remainingTimeRef = useRef(targetTime * 1000);
  const resultRef = useRef<string | null>(null);

  const [timerState, setTimerState] = useState(TimerState.RESETTED);
  const handleClick = () => {
    switch (timerState) {
      case TimerState.RESETTED:
        setTimerState(TimerState.RUNNING);
        intervalRef.current = setInterval(() => {
          remainingTimeRef.current -= TICKTIME;
          if (remainingTimeRef.current <= 0) {
            setTimerState(TimerState.EXPIRED);
            clearInterval(intervalRef.current!);
            resultRef.current = "You Lost!";
            dialogRef.current?.show();
          }
        }, TICKTIME);
        break;
      case TimerState.RUNNING:
        setTimerState(TimerState.STOPPED);
        clearInterval(intervalRef.current!);
        resultRef.current = "You Win!";
        dialogRef.current?.show();
        break;
      case TimerState.STOPPED:
      case TimerState.EXPIRED:
        setTimerState(TimerState.RESETTED);
        remainingTimeRef.current = targetTime * 1000;
        break;
    }
  };

  return (
    <>
      <ResultModal
        ref={dialogRef}
        result={resultRef.current}
        targetTime={targetTime}
        remainingTime={
          (remainingTimeRef.current ?? 0) < 0 ? 0 : remainingTimeRef.current
        }
      />
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
