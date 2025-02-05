const companymodel = require("../models/companymodel");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/dataUri");

const registercompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }
    let company = await companymodel.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register same company.",
        success: false,
      });
    }
    company = await companymodel.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getcompany = async (req, res) => {
  try {
    const userId = req.id; // logged in user id
    const companies = await companymodel.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found.",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getcompanybyid = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await companymodel.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const updatecompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    console.log(name, description, website, location);
    const file = req.file;

    //cloudinary
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;
    const updateData = { name, description, website, location, logo };
    const company = await companymodel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registercompany, getcompany, getcompanybyid, updatecompany };
