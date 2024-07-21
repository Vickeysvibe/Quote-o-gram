import Quotes from "../models/quotes.js";
import User from "../models/user.js";
import Comments from "../models/comments.js";
//Create a Quote
export const createQuote = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const data = req.body.quote;
    const quote = new Quotes({
      quote: data,
      user: user._id,
    });
    await quote.save();
    res.status(201).json(quote);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Get all quotes
export const getQuotes = async (req, res) => {
  try {
    const quotes = await Quotes.find();
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//get user quotes
export const getUserQuotes = async (req, res) => {
  try {
    const { id } = req.params;
    const quotes = await Quotes.find({ user: id });
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Delete a quote
export const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quotes.findByIdAndDelete(id);
    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Update a quote
export const editQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const { quote } = req.body;
    const newQuote = await Quotes.findByIdAndUpdate(id, {
      quote,
      updatedAt: Date.now(),
    });
    res.status(200).json(newQuote);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Like a quote
export const likeQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quotes.findById(id);
    const user = await User.findById(req.user._id);
    if (quote.likes.includes(user._id)) {
      quote.likes.splice(quote.likes.indexOf(user._id), 1);
    } else {
      quote.likes.push(user._id);
    }
    await quote.save();
    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//comment on a quote
export const commentOnQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    const { content } = req.body;
    const comment = new Comments({
      content: content,
      user: user._id,
      quote: id,
    });
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
