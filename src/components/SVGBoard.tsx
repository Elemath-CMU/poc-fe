import { useRef, useState } from "react";
import type { FractionBar } from "../App";

export default function SvgBoard({ objects, setObjects }: {
  objects: FractionBar[];
  setObjects: React.Dispatch<React.SetStateAction<FractionBar[]>>;
}) {
  const svgRef = useRef(null);
  const [dragging, setDragging] = useState(null);

  const onMouseDown = (e, id) => {
    const obj = objects.find(o => o.id === id);

    setDragging({
      id,
      offsetX: e.clientX - obj.x,
      offsetY: e.clientY - obj.y
    });
  };

  const onMouseMove = (e) => {
    if (!dragging) return;

    const { id, offsetX, offsetY } = dragging;
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    setObjects((objs) =>
      [...(objs.filter(o => o.id !== id)),
        { ...objs.find(o => o.id === id)!, x, y }
      ]
    );
  };

  const onMouseUp = () => setDragging(null);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100vh"
      style={{ background: "#f1f1f1" }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {objects.map((obj) => (
        <FractionBarRender
          key={obj.id}
          obj={obj}
          onMouseDown={onMouseDown}
        />
      ))}
    </svg>
  );
}

function FractionBarRender({ obj, onMouseDown }) {
  return (
    <>
      <rect
        x={obj.x}
        y={obj.y}
        width={obj.width}
        height={obj.height}
        fill={obj.color}
        rx="6"
        onMouseDown={(e) => onMouseDown(e, obj.id)}
        style={{ cursor: "grab" }}
      />
      <text
        x={obj.x + obj.width / 2}
        y={obj.y + obj.height / 2 + 6}
        textAnchor="middle"
        fill="white"
        fontSize="18"
        fontWeight="bold"
        pointerEvents="none"
        style={
          {
            userSelect: "none"
          }
        }
      >
        {obj.fraction}
      </text>
    </>
  );
}
