import React, { useRef } from "react";
import { BarcodeDetector } from "barcode-detector";
import "/src/css/scanner.css";
import Receipt from "./Receipt";
import { useDispatch, useSelector } from "react-redux";
import { setBarcode } from "/src/redux/SalesSlice";
import { Button } from "antd";

const Scanner = () => {
  const video = useRef();
  const canvas = useRef();
  const barcode = useSelector((state) => state.sales.barcode);
  const dispatch = useDispatch();

  const openCam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300, height: 300 } })
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
              console.log(data);
              if (data) {
                dispatch(setBarcode(data.rawValue));
              }
            })
            .catch((err) => console.log(err, "Hata"));
        }, 100);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="scanner-container">
      <div className="scanner">
        <video ref={video} autoPlay muted hidden />
        <canvas ref={canvas} />
        <div>barkod : {barcode}</div>
      </div>
      <Button type="primary" danger onClick={openCam}>
        Barkod okutmak için kamerayı başlat
      </Button>
      <Receipt />
    </div>
  );
};

export default Scanner;
