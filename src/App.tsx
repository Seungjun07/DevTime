import { useEffect } from "react";
import RootRoute from "./root-route";
import { useTimerStore } from "./store/timer";

function App() {
  const isRunning = useTimerStore((state) => state.isRunning);
  const increment = useTimerStore((state) => state.increment);
  // 초 단위 카운트
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      increment();
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  return <RootRoute />;
}

export default App;
