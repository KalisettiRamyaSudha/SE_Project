import React, { useEffect, useState } from "react";
import axios from "../../axios";
import Styles from "./ViewWarranties.module.css";
import { useNavigate } from "react-router-dom";

const ViewWarranties = () => {
    const userId = localStorage.getItem("userId");
    const [warranty, setWarranty] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const navigate = useNavigate();
    const getWarranty = async () => {
        try {
            const res = await axios.get(`/warranty/${userId}`);
            setWarranty(res.data.warranty);
        } catch (error) {
            console.log(error);
        }
    };

    const handleViewWarranty = (warranty) => {
        navigate(`/home/warranty`, { state: { warranty } });
    };

    useEffect(() => {
        getWarranty();
    }, []);

    const calculateDaysLeft = (purchaseDate, warrantyPeriod) => {
        if (!purchaseDate || isNaN(Number(warrantyPeriod))) return "Invalid data";
        const purchase = new Date(purchaseDate);
        if (isNaN(purchase)) return "Invalid data";

        const expiration = new Date(purchase);
        expiration.setDate(purchase.getDate() + Number(warrantyPeriod));

        const today = new Date();
        const timeDiff = expiration.getTime() - today.getTime();
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        return daysLeft >= 0 ? `${daysLeft} days` : <p style={{ color: "red" }}>Expired</p>;
    };

    const filteredWarranties = warranty.filter(item => {
        const productName = item?.productId?.productName?.toLowerCase() || "";
        const purchaseDate = new Date(item?.purchaseDate);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;

        const matchesSearchTerm = productName.includes(searchTerm.toLowerCase().trim());
        const withinDateRange =
            (!from || purchaseDate >= from) && (!to || purchaseDate <= to);

        return matchesSearchTerm && withinDateRange;
    });

    return (
        <div className={Styles.main}>
            <div className={Styles.search}>
                <div className={Styles.searchDiv}>
                    <label>Search : </label>
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="text"
                        placeholder="Enter Product Name"
                    />
                </div>
                <p className={Styles.or}>or</p>
                <div className={Styles.dates}>
                    <div>
                        <label>From : </label>
                        <input type="date" onChange={(e) => setFromDate(e.target.value)} />
                    </div>
                    <div>
                        <label>To : </label>
                        <input type="date" onChange={(e) => setToDate(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className={Styles.container}>
                {filteredWarranties.length === 0 ? (
                    <h2>No Warranties</h2>
                ) : (
                    <table className={Styles.table}>
                        <thead className={Styles.thead}>
                            <tr className={Styles.tr}>
                                <th>Product Name</th>
                                <th>Product Image</th>
                                <th>Warranty Left</th>
                                <th>Purchase Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className={Styles.tbody}>
                            {filteredWarranties.map((item) => (
                                <tr key={item._id}>
                                    <td className={Styles.td}>
                                        {item?.productId?.productName}
                                    </td>
                                    <td className={Styles.td}>
                                        <img
                                            src={item?.productId?.productImage}
                                            alt={item?.productId?.productName}
                                            style={{ width: "50px", height: "50px" }}
                                        />
                                    </td>
                                    <td className={Styles.td}>
                                        {calculateDaysLeft(item?.purchaseDate, item?.productId?.warrantyPeriod)}
                                    </td>
                                    <td>
                                        {new Date(item?.purchaseDate).toLocaleDateString()}
                                    </td>
                                    <td className={Styles.td}>
                                        <button onClick={() => handleViewWarranty(item)} className={Styles.button}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ViewWarranties;
