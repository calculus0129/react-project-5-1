import { useImperativeHandle, useRef } from "react";

export interface ResultModalHandle {
  show: () => void;
  close: () => void;
}

interface ResultModalProps {
  result: string;
  ref: React.Ref<ResultModalHandle>;
  //   onClose: () => void;
  targetTime: number;
}

const ResultModal: React.FC<ResultModalProps> = ({
  result,
  ref,
  //   onClose,
  targetTime,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

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

  return (
    <dialog ref={dialogRef} className="result-modal">
      <h2>Your Score: {result}</h2>
      <p>
        Target Time: <strong>{targetTime}</strong> seconds.
      </p>
      <p>
        You stopped the timer with <strong>X</strong> seconds left.
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
};

export default ResultModal;
