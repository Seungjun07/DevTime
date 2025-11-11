import startIcon from "./../assets/Start.png";
import enabledStartIcon from "./../assets/Start-enabled.png";
import pauseIcon from "./../assets/Pause.png";
import enabledPauseIcon from "./../assets/Pause-enabled.png";
import finishIcon from "./../assets/Finish.png";
import enabledFinishIcon from "./../assets/Finish-enabled.png";

export default function IndexPage() {
  return (
    <div>
      <div className="text-center text-7xl">WELCOME</div>
      <div className="pretendard pt-2.5 pb-[50px] text-center text-[10px] leading-3 font-normal">
        DevTime을 사용하려면 로그인이 필요합니다
      </div>

      <div className="text-primary-blue flex justify-center gap-4">
        <div className="border-primary-blue from-primary-blue/0 to-primary-blue/20 h-[300px] w-[260px] rounded-xl border bg-linear-to-br from-0% to-100% px-2">
          <div className="digit-time">00</div>
          <div className="py-9 text-center">HOURS</div>
        </div>
        <p>:</p>
        <div className="border-primary-blue from-primary-blue/0 to-primary-blue/20 h-[300px] w-[260px] rounded-xl border bg-linear-to-br from-0% to-100% px-2">
          <div className="digit-time">00</div>
          <div className="py-9 text-center">MINUTES</div>
        </div>
        <p>:</p>
        <div className="border-primary-blue from-primary-blue/0 to-primary-blue/20 h-[300px] w-[260px] rounded-xl border bg-linear-to-br from-0% to-100% px-2">
          <div className="digit-time">00</div>
          <div className="py-9 text-center">SECONDS</div>
        </div>
      </div>

      <div className="m-auto mt-20 flex justify-center gap-20">
        <img src={startIcon} alt="타이머 시작 버튼" />
        <img src={enabledPauseIcon} alt="타이머 중지 버튼" />
        <img src={enabledFinishIcon} alt="타이머 종료 버튼" />
      </div>
    </div>
  );
}
