const express = require("express");
const { addWarranty, getWarranty, getWarrantyById } = require("../Controllers/WarrantyController");
const router = express.Router();


router.post("/claim-warranty/:userId", addWarranty);

router.get("/warranty/:userId", getWarranty);

router.get("/product/:productId", getWarrantyById);

 
module.exports = router;