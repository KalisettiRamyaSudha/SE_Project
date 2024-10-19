import { Link, useParams } from "react-router-dom";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import Styles from "./Product.module.css";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const { productId } = useParams();

  const { userId } = useParams();

  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await axios(`/product/${productId}`);
        setProductData(res.data);
        console.log(res);
        console.log();
      } catch (error) {
        console.log(error);
      }
    };

    getProductData();
  }, []);

  const currentdate = new Date();

  const warrantyDate = new Date(productData.warrantyPeriod);

  const WarrantyLeft = warrantyDate - currentdate;
  const warranty = Math.ceil(WarrantyLeft / (1000 * 60 * 60 * 24));

  return (
    <div className={Styles.container}>
      <div className={Styles.warrantyLeft}>
        <h3>Warrnty Left </h3>
        <p> {warranty} days</p>
        
        <Link to={`/home/claim/${productId}`}>
          <button className={Styles.claimButton}>Claim</button>
        </Link>

        <div className={Styles.product}>
          <img src={productData.productImage} alt="product img" />
          <h1 className={Styles.productName}> {productData.productName}</h1>
        </div>
      </div>
      <div className={Styles.productInfo}>
        <h3 className={Styles.productName}>Product Info</h3>

        <p className={Styles.price}>
          <strong>MRP:</strong> {productData.price}
        </p>

        <p className={Styles.brand}>
          <strong>Brand:</strong> {productData.brand}
        </p>

        <p className={Styles.warranty}>
          <strong>Warranty: </strong>

          {productData.warrantyPeriod
            ? productData.warrantyPeriod.slice(0, 10)
            : "No Warranty Information"}
        </p>
        <p>
          <strong>Manufacturing Address:</strong>{" "}
          {productData.manufacturingAddress}
        </p>
        <p className={Styles.serialNumber}>
          <strong>Serial No :</strong> {productData.serialNumber}
        </p>
        <p className={Styles.batch}>
          <strong>Batch No :</strong> {productData.batchNumber}
        </p>
        <p className={Styles.description}>
          <strong>Description :</strong> {productData.description}
        </p>
      </div>
    </div>
  );
};

export default Product;
