

const Contact = require("../models/contact");
const contactValidationSchema = require("../validators/contactValidator");

exports.submitContact = async (req, res) => {
  try {
    const { error } = contactValidationSchema.validate(req.body);
    
    if (error) return res.status(400).json({ error: error.details[0].message });

    if (!req.file) return res.status(400).json({ error: "Resume is required" });

    const { name, email, mobile, message, jobRoleName } = req.body;
   
    const jobRoleId = jobRoleName
      .toLowerCase()
      .replace(/\s+/g, "-")          
      .replace(/[^\w\-]+/g, "")      
      + "-" + Date.now();           
    const newContact = new Contact({
      name,
      email,
      mobile,
      message,
      resume: req.file.filename,
      jobRoleName,
      jobRoleId, 
    })
    await newContact.save();
    res.status(201).json({
      message: "Application submitted successfully.",
      jobRoleId, 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};
