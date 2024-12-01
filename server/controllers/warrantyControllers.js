const User = require("../Models/AuthenticationModel"); // Import the User model
const Product = require("../Models/ProductsModel"); // Import the Product model


const nodemailer = require("nodemailer");
const cron = require("node-cron");
const Emails = require("../Models/EmailsModel")


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

        const { purchaseDate, purchaseAddress, productId, warrantyPeriod } = req.body;

        if (!purchaseDate || !purchaseAddress) {
            return res.status(200).json({
                missingFields:
                    "Purchase date and purchase address are required",
            });
        }

        if (
            user.warranty.some(
                (warranty) => warranty.productId.toString() === productId
            )
        ) {
            return res
                .status(200)
                .json({
                    warrantyAlreadyAdded:
                        "You have already claimed this warranty",
                });
        }

        user.warranty.push({
            purchaseDate,
            purchaseAddress,
            productId,
            warrantyPeriod,
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

async function getWarranty(req, res) {
    const { userId } = req.params;
    try {
        if (!userId) {
            return res.status(400).json({ missingId: "User ID is required" });
        }

        const user = await User.findById(userId).populate({
            path: "warranty.productId",
            model: Product,
        });

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




const sendWarrantyRemainderMail = async () => {
    try {
      const users = await User.find();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      const now = new Date();
      const today = new Date().toISOString().split('T')[0]
  
      for (const user of users) {
        let warrantiesToNotify = [];
  
        for (const warranty of user.warranty) {
          const warrantyDate = new Date(warranty.warrantyPeriod);
          //populate product id
          const product = await Product.findById(warranty.productId);
          //console.log(product);
          const differenceInTime = warrantyDate - now;
          const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  
          if ((differenceInDays === 20 || differenceInDays === 10) && differenceInDays > 0) {
  
            const emailRecord = await Emails.findOne({
              
              warrantyId: warranty._id,
              dateSent: today, 
            });
  
            if (!emailRecord) {
              warrantiesToNotify.push({
                warrantyId: warranty._id,
                purchaseAddress: warranty.purchaseAddress,
                daysRemaining: differenceInDays,
              });
            }
          }
        }
  
        if (warrantiesToNotify.length > 0) {
          const warrantyDetails = warrantiesToNotify.map(
            warranty => `<li> Address: ${warranty.purchaseAddress}, Days Remaining: ${warranty.daysRemaining}</li>`
          ).join('');
  
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Warranty Reminder",
            html: `<p>Your following warranties will expire soon:</p><ul>${warrantyDetails}</ul><p>Please renew them.</p>`,
          };
  
          try {
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to: ${user.email}`);
  
  
            for (const warranty of warrantiesToNotify) {
              await Emails.create({
                warrantyId: warranty.warrantyId,
                dateSent: today  
              });
            }
          } catch (error) {
            console.error(`Failed to send email to ${user.email}: ${error}`);
          }
        }
      }
  
      console.log({ message: "Email notifications sent where applicable." });
    } catch (error) {
      console.error(error);
    }
  };
  
  
  
  
  cron.schedule('*/15 * * * * *', async() => {
    try {
      await sendWarrantyRemainderMail();
    } catch (error) {
      console.error(error)
    }
  })






module.exports = {
    addWarranty,
    getWarranty,
    getWarrantyById
};
