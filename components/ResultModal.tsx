interface ResultModalProps {
  result: string;
  ref: React.RefObject<HTMLDialogElement | null>;
  //   onClose: () => void;
  targetTime: number;
}

const ResultModal: React.FC<ResultModalProps> = ({
  result,
  ref,
  //   onClose,
  targetTime,
}) => {
  return (
    <dialog ref={ref} className="result-modal">
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
