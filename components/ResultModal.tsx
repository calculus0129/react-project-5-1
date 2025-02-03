import { useImperativeHandle, useRef } from "react";

export interface ResultModalHandle {
  show: () => void;
  close: () => void;
}

interface ResultModalProps {
  result: string | null;
  ref: React.Ref<ResultModalHandle>;
  //   onClose: () => void;
  targetTime: number;
  remainingTime?: number;
}

const ResultModal: React.FC<ResultModalProps> = ({
  result,
  ref,
  //   onClose,
  targetTime,
  remainingTime,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  remainingTime = Math.max(0, remainingTime ?? 0);
  const score = remainingTime
    ? (1 - remainingTime / (targetTime * 1000)) * 100
    : 0;

  useImperativeHandle(ref, () => {
    return {
      show: () => {
        // Filled by other person (e.g.)
        dialogRef.current?.showModal();
      },
      close: () => {
        // Filled by other person (e.g.)
        dialogRef.current?.close();
      },
    };
  });

  /**
	 * Key Points of the <dialog> element's onClose:
		Fires when the <dialog> is closed using close().
		Does not fire if the dialog is hidden using CSS (display: none;).
		The returnValue property of the <dialog> element can be used to determine how it was closed.
	 */

  return (
    <dialog
      ref={dialogRef}
      className="result-modal"
      onClose={
        // Triggered when the dialog is closed
        // The onClose event in the <dialog> element is triggered when the dialog is closed,
        // whether by calling dialog.close() in JavaScript
        // or by the user interacting with the close button (if present).
        () => {}
      }
    >
      <h2>Your Score: {score} %</h2>
      <p>
        Target Time: <strong>{targetTime}</strong> seconds.
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{(remainingTime / 1000).toFixed(3)}</strong> seconds left.
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
};

export default ResultModal;
