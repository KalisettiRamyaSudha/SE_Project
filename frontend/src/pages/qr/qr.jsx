import React, { useEffect, useState } from "react";
import QrScanner from "react-qr-scanner";
import { useNavigate } from "react-router-dom";
import Styles from "./Qr.module.css";
import axios from "../../axios";
import { ToastContainer, toast } from "react-toastify";

const QrCodeScanner = () => {
  const [showScanner, setShowScanner] = useState(false);
  const navigate = useNavigate();

  const handleScan = async (data) => {
    if (data) {
      const scannedData = data.text;
      const id = extractIdFromUrl(scannedData);

      if (!id) {
        alert(
          "The scanned QR code does not contain a valid product ID. Please scan again."
        );
        setShowScanner(false);
        return;
      }

      if (!isValidId(id)) {
        alert(
          "The scanned QR code does not contain a valid product ID. Please scan again."
        );
        setShowScanner(false);
        return;
      }

      try {
        const res = await axios.get(`/product/${id}`);
        if (res.data.notFound) {
          alert("Product not found. Please check the QR code and try again.");
          setShowScanner(false);
          return;
        }
        if (res.data.inValid) {
          alert("Invalid product ID. Please use a valid QR code.");
          setShowScanner(false);
          return;
        }
        setShowScanner(false);
        navigate(`/home/product/${id}`);
      } catch (error) {
        alert("Error fetching product details. Please try again later.");
        console.error(error);
      }
    }
  };


  const handleError = (err) => {
    alert("QR Scan error occurred");
    console.error(err);
  };

  const startScanning = () => {
    setShowScanner(true);
  };

  const isValidId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };

  const extractIdFromUrl = (url) => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 1];
  };

  return (
    <div className={Styles.container}>
      <h2>QR Code Scanner</h2>
      {showScanner && (
        <QrScanner
          className={Styles.qrScanner}
          delay={300}
          onError={handleError}
          onScan={handleScan}
        />
      )}
      {!showScanner ? (
        <button className={Styles.button} onClick={startScanning}>
          Scan QR Code
        </button>
      ) : (
        <button
          className={Styles.closeButton}
          onClick={() => setShowScanner(false)}
        >
          Close Scanner
        </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default QrCodeScanner;
