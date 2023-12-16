import React, { useRef, useState } from "react";
import { BarcodeDetector } from "barcode-detector";
const Scanner = () => {
  const video = useRef();
  const canvas = useRef();
  const [barcode, setBarcode] = useState(null);
  const openCam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 240, height: 240 } })
      .then((stream) => {
        video.current.srcObject = stream;
        video.current.play();

        const ctx = canvas.current.getContext("2d");
        const barcode = new BarcodeDetector({
          formats: ["qr_code", "ean_13", "ean_8", "upc_a", "upc_e"],
        });

        setInterval(() => {
          canvas.current.width = video.current.videoWidth;
          canvas.current.height = video.current.videoHeight;
          ctx.drawImage(
            video.current,
            0,
            0,
            video.current.videoWidth,
            video.current.videoHeight
          );
          barcode
            .detect(canvas.current)
            .then(([data]) => {
              if (data) {
                setBarcode(data.rawValue);
              }
            })
            .catch((err) => console.log(err, "Hata"));
        }, 100);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <button onClick={openCam}>aç</button>
      <div className="scanner">
        <video ref={video} autoPlay muted hidden />
        <canvas ref={canvas} />
        <div>barkod : {barcode}</div>
      </div>
    </>
  );
};

export default Scanner;
