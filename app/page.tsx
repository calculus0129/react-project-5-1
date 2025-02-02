import Player from "@/components/Player";
import TimerChallenge from "@/components/TimerChallenge";

export default function Home() {
  return (
    <>
      <div id="modal"></div>
      <div id="content">
        <header>
          <h1>
            The <em>Almost</em> Final Countdown
          </h1>
          <p>Stop the timer once you estimate that time is (almost) up</p>
        </header>
        <div>
          <Player />
          <div id="challenges">
            <TimerChallenge targetTime={3} />
            <TimerChallenge title="Easy" targetTime={1} />
            <TimerChallenge title="Normal" targetTime={3} />
            <TimerChallenge title="Hard" targetTime={5} />
            <TimerChallenge title="Expert" targetTime={10} />
            <TimerChallenge title="Master" targetTime={15} />
            <TimerChallenge title="King" targetTime={20} />
            <TimerChallenge title="Slayer" targetTime={30} />
          </div>
        </div>
      </div>
    </>
  );
}
