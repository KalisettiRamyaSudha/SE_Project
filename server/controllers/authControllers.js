async function SigUp(req, res) {
    try {
      const { name, email, password } = req.body;
  
      const isUserExist = await Schema.findOne({ email: email });
  
      if (isUserExist) { 
        return res.status(200).json({ AlreadyExist: "Account already exists" });
      }
  
      if (!name || !email || !password) {
        return res.status(200).json({ EnterAllDetails: "Please fill all the fields" });
      }
  
      const data = new Schema({
        name,
        email,
        password,
        otp: "",
        otpExpiresAt: "",
      });
  
      const d = await data.save();
      return res.json(d);
    } catch (error) {
      console.log(error);
    }
  }
  