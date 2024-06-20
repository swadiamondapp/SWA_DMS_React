import React from "react";

const Controls = ({
  onAddAnnotation,
  onUndo,
  onRedo,
  onDelete,
  setDrawingArrow,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        padding: "10px",
        background: "rgba(255, 255, 255, 0.9)",
        borderBottom: "1px solid #ccc",
      }}
    >
      <button onClick={() => onAddAnnotation("rectangle")}>
        Add Rectangle
      </button>
      <button
        onClick={() => {
          onAddAnnotation("arrow");
          setDrawingArrow(true); // Enable arrow drawing mode
        }}
      >
        Add Arrow
      </button>
      <button onClick={() => onAddAnnotation("text")}>Add Text</button>
      <button onClick={onUndo}>Undo</button>
      <button onClick={onRedo}>Redo</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Controls;
