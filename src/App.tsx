import { useState } from 'react'
import './App.css'
import SvgBoard from './components/SVGBoard';

export interface FractionBar {
  id: number;
  type: "fraction-bar";
  fraction: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

function App() {
  const [objects, setObjects] = useState<FractionBar[]>([createFractionBar(1), createFractionBar(2, 3/4), createFractionBar(3, 1)]);

  function createFractionBar(id: number, value = 1/2): FractionBar {
    return {
      id,
      type: "fraction-bar",
      fraction: value,
      x: 100,
      y: 100,
      width: 200 * value,
      height: 40,
      color: "#3498db",
    };
  }

  const addFraction = (value: number) => {
    setObjects((objs) => [...objs, createFractionBar(value)]);
  };

  return (
    <div style={{ display: "flex" }}>
      <SvgBoard objects={objects} setObjects={setObjects} />
    </div>
  )
}

export default App
