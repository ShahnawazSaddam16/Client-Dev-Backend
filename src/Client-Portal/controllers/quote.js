const Quotes = require("../../models/quote");

const sentQuote = async(req,res)=>{
    try{
        const {name, email, message, purpose} = req.body;

        if(!name || !email || !message || !purpose){
            return res.status(401).json({success: false, message: "Please fill all fields"});
        }

        const newQuote = await Quotes.create({
            name,
            email,
            message,
            purpose,
        });
    } catch(err){
        return res.status(500).json({success: false, message: err});
    }
}

module.exports = {sentQuote};