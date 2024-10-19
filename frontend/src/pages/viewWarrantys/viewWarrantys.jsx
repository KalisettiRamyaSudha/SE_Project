import React, { useEffect, useState } from 'react'
import axios from "../../axios";
import Styles from "./ViewWarranties.module.css";

const ViewWarranties = () => {

    const userId = localStorage.getItem("userId");

    const [warranty, setWarranty] = useState([]);


    const getWarranty = async () => {

        try {
        const res = await axios.get(`/warranty/${userId}`);
        console.log(res.data.warranty);
        setWarranty(res.data.warranty);

        } catch (error) {
        console.log(error);
        }
    }

    useEffect(() => {
        getWarranty();
    }, [])

  return (
    <div className={Styles.container}>
        <h1>Your Warranties</h1>
        {
            warranty.length === 0 ? <h2>No Warranties</h2> :
            <table className={Styles.table}>
            <thead className={Styles.thead}>
                <tr className={Styles.tr}>
                    <th>Purchase Date</th>
                    <th>Warranty Period</th>
                    <th>Purchase Address</th>
                </tr>
            </thead>
            <tbody className={Styles.tbody}>
                {warranty.map((warranty) => (
                    <tr key={warranty._id}>
                        <td className={Styles.td}>{warranty.purchaseDate.slice(0, 10)}</td>
                        <td className={Styles.td}>{warranty.warrantyPeriod.slice(0, 10)}</td>
                        <td className={Styles.td}>{warranty.purchaseAddress}</td>
                    </tr>
                ))}
            </tbody>
            
        </table>}
        
    </div>
  )
}

export default ViewWarranties