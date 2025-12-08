import { useState } from 'react'
import './App.css'
import SvgBoard from './components/SVGBoard';

function App() {
  const [objects, setObjects] = useState([createFractionBar()]);

  function createFractionBar(value = 1/2) {
    return {
      id: 1,
      type: "fraction-bar",
      fraction: value,
      x: 100,
      y: 100,
      width: 200,
      height: 40,
      color: "#3498db",
    };
  }

  const addFraction = (value) => {
    setObjects((objs) => [...objs, createFractionBar(value)]);
  };

  return (
    <div style={{ display: "flex" }}>
      <SvgBoard objects={objects} setObjects={setObjects} />
    </div>
  )
}

export default App
