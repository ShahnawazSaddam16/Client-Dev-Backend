const Quotes = require("../../models/quote");

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

module.exports = {allQuotes, deleteQuote};