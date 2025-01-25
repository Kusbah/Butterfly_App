import { ReactComponent as Caterpillar } from "./caterpillar.svg";
import { ReactComponent as Cocoon } from "./cocoon.svg";
import { ReactComponent as Butterfly } from "./butterfly.svg";
import React, { useRef, useState } from "react";

type stageName = "Caterpillar" | "Cocoon" | "Butterfly";

interface Lifesatge {
  component: React.ElementType;
  clicksNeeded: number;
  nextStage: stageName | null;
}
const Lifesatges: Record<stageName, Lifesatge> = {
  Caterpillar: {
    component: Caterpillar,
    clicksNeeded: 10,
    nextStage: "Cocoon",
  },
  Cocoon: {
    component: Cocoon,
    clicksNeeded: 10,
    nextStage: "Butterfly",
  },
  Butterfly: {
    component: Butterfly,
    clicksNeeded: 10,
    nextStage: null,
  },
};

export default function App() {
  const [stage, setStage] = useState<Lifesatge>(Lifesatges.Caterpillar);

  const StageComponent = stage.component;
  const [clickCount, setClickCount] = useState<number>(0);
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    setIsPressed(true);
  };
  const handleMouseUp = () => {
    timeoutRef.current = setTimeout(() => {
      setIsPressed(false);
      timeoutRef.current = null;
    }, 50);
  };
  const handleClick = () => {
    if (clickCount < stage.clicksNeeded - 1) {
      setClickCount((prevCount) => prevCount + 1);
    } else if (stage.nextStage) {
      setStage(Lifesatges[stage.nextStage]);
      setClickCount(0);
    }
  };
  return (
    <div
      className="container"
      onClick={handleClick}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseUp}
    >
      <StageComponent
        style={{ scale: isPressed ? "0.95" : "1" }}
        className="clickable"
      />
    </div>
  );
}
