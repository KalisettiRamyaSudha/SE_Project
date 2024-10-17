import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';
import Styles from './Qr.module.css';

const QrCodeScanner = () => {
  const [showScanner, setShowScanner] = useState(false);

  const navigate = useNavigate();

  const { userId } = localStorage.getItem("userId")

  const handleScan = (data) => {
    if (data) {
      const scannedData = data.text; 
      const id = extractIdFromUrl(scannedData);  
      setShowScanner(false);  
      navigate(`/home/product/${id}`);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  

  const startScanning = () => {
    setShowScanner(true);  
  };


  const extractIdFromUrl = (url) => {
    const urlParts = url.split('/');  
    return urlParts[urlParts.length - 1];  
  };

  

  return (
    <div className={Styles.container}>
      <h2>QR Code Scanner</h2>

      {showScanner && (
        <QrScanner className={Styles.qrScanner}
          delay={300}
          onError={handleError}
          onScan={handleScan}
        />
      )}
      
      { !showScanner ?
      <button className={Styles.button} onClick={startScanning}>Scan QR Code</button> :
      <button className={Styles.closeButton} onClick={() => setShowScanner(false)}>Close Scanner</button>
      }
      
      
      
      
    </div>
  );
};

export default QrCodeScanner;
