import React from 'react';
import { useLocation } from 'react-router-dom';
import Styles from './WarrantyCard.module.css';
import warranty from "../../assets/warranty1.jpg";

const WarrantyCard = () => {
    const product = useLocation().state.warranty;
    console.log(product);

    return (
        <div className={Styles.container}>
            <h3>Warranty Card</h3>
            <div className={Styles.card}>
                <div className={Styles.formContainer}>
                    <div className={Styles.formGroup}>
                        <label htmlFor='purchaseAddress'>Brand:</label>
                        <p className={Styles.ptag}>{product?.productId?.brand}</p>
                    </div>
                    <div className={Styles.formGroup}>
                        <label htmlFor='productName'>Product name:</label>
                        <p className={Styles.ptag}>{product?.productId?.productName}</p>
                    </div>
                    <div className={Styles.formGroup}>
                        <label htmlFor='purchaseDate'>Purchase Date:</label>
                        <p className={Styles.ptag}>{product?.purchaseDate?.slice(0, 10)}</p>
                    </div>
                    <div className={Styles.formGroup}>
                        <label htmlFor='warrantyPeriod'>Manufacturing Address:</label>
                        <p className={Styles.ptag}>{product?.productId?.manufacturingAddress}</p>
                    </div>
                </div>
                <div className={Styles.imageContainer}>
                    <img src={warranty} alt="Warranty Image" className={Styles.warrantyImage} />
                    <p className={Styles.warrantyPeriod}>{product?.productId?.warrantyPeriod} Days</p>
                </div>
            </div>
        </div>
    );
};

export default WarrantyCard;
