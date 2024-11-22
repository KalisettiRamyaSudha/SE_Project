const addWarranty = async (req, res) => {
    const { userId } = req.params;
  
    try {
      if (!userId) {
        return res.status(200).json({ missingId: "User ID is required" });
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(200).json({ userNotFound: "User not found" });
      }
  
      const { purchaseDate, warrantyPeriod, purchaseAddress } = req.body;
  
      if (!purchaseDate || !warrantyPeriod || !purchaseAddress) {
        return res
          .status(200)
          .json({
            missingFields:
              "Purchase date, warranty period, and purchase address are required",
          });
      }
  
      user.warranty.push({
        purchaseDate,
        warrantyPeriod,
        purchaseAddress,
      });
  
      await user.save();
  
      return res
        .status(200)
        .json({ warrantyAdded: "Warranty added successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while adding the warranty" });
    }
  };

  async function getWarranty(req, res) {
    const { userId } = req.params;
    try {
      if (!userId) {
        return res.status(200).json({ missingId: "User ID is required" });
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(200).json({ userNotFound: "User not found" });
      }
  
      return res.status(200).json({ warranty: user.warranty });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while getting the warranty" });
    }
  }

  const getWarrantyById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(200).json({ productNotFound: "Product not found" });
        }
        return res.status(200).json({ warranty: product.warranty });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: "An error occurred while getting the warranty" });
    }
};