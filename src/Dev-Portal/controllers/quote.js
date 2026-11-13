const Quotes = require("../../models/quote");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sendCredentialsEmail } = require("../../utils/sendEmail");

const allQuotes = async(req,res)=>{
    try{
        const allquotes = await Quotes.find().sort({createdAt: -1});
        const totalquotes = await Quotes.countDocuments();
        
        return res.status(200).json({success: true, allquotes, totalquotes});
    } catch(err){
        return res.status(500).json({success: false, message: err.message});
    }
}

const deleteQuote = async(req,res)=>{
    try{
        const {id} = req.params;

        const deletedQuote = await Quotes.findByIdAndDelete(id);

        if(!deletedQuote){
            return res.status(404).json({success: false, message: "Quote not found"});
        }

        return res.status(200).json({success: true, message: "Quote deleted successfully"});
    } catch(err){
        return res.status(500).json({success: false, message: err.message});
    }
}

const sendCredentials = async(req,res)=>{
    try{
        const {id} = req.params;

        const quote = await Quotes.findById(id);

        if(!quote){
            return res.status(404).json({success: false, message: "Quote not found"});
        }

        if(!quote.email){
            return res.status(400).json({success: false, message: "Quote has no email"});
        }

        const email = quote.email.toLowerCase().trim();
        const password = crypto.randomInt(10000000, 100000000).toString();
        const hashedPassword = await bcrypt.hash(password, 10);

        quote.password = hashedPassword;
        await quote.save();

        await sendCredentialsEmail(email, password);

        return res.status(200).json({success: true, message: "Credentials sent successfully"});
    } catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: err.message});
    }
}

module.exports = {allQuotes, deleteQuote, sendCredentials};