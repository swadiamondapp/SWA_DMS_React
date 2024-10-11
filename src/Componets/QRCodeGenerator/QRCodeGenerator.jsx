import React from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = ({ value }) => {
  return (
    <div>
      <QRCode value={value} size={80} />
      {/* <QRCode
        value={value}
        size={256} // Size of the QR code
        bgColor={"#ffffff"} // Background color
        fgColor={"#000000"} // Foreground color
        level={"Q"} // Error correction level: L, M, Q, H
        includeMargin={true} // Include a margin around the QR code
      /> */}
    </div>
  );
};

export default QRCodeGenerator;
