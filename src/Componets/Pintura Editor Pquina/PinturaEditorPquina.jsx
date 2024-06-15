import React, { useState } from "react";
import { PinturaEditor } from "@pqina/react-pintura";
import { getEditorDefaults } from "@pqina/pintura";
import myImage from "../../assets/ring_fin1.png";

import "@pqina/pintura/pintura.css";

const PinturaEditorPquina = () => {
  const [inlineResult, setInlineResult] = useState();
  return (
    <div style={{ height: "100vh" }}>
      <PinturaEditor
        {...getEditorDefaults()}
        src={myImage}
        onProcess={(res) => setInlineResult(URL.createObjectURL(res.dest))}
      />

      {inlineResult && <img src={inlineResult} alt="" />}
    </div>
  );
};

export default PinturaEditorPquina;
