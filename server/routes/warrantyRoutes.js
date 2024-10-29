const express = require("express");
const { addWarranty, getWarranty } = require("../Controllers/WarrantyController");
const router = express.Router();


router.post("/claim-warranty/:userId", addWarranty);

router.get("/warranty/:userId", getWarranty);

 
module.exports = router;