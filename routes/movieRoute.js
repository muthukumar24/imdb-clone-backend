const express = require("express");
const movie = require("../models/movieModel.js");

const movieRouter = express.Router();

// Get All Movies
movieRouter.get("/all", async (req, res) => {
  try {
    const movies = await movie.find({})
      .populate("producer")
      .populate("actors");
    if (!movies) {
      return res.status(404).json({ error: "No Content Available." });
    }
    res.status(200).json({ data: movies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// Create New Movie
movieRouter.post("/create", async (req, res) => {
  try {
    const newMovie = new movie({ ...req.body });
    const savedMovie = await newMovie.save();
    const populatedMovie = await movie.findById(savedMovie._id)
      .populate("producer")
      .populate("actors");

    res.status(200).json({ data: populatedMovie, message: "Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// Update Movie Data
movieRouter.put("/edit/:id", async (req, res) => {
  try {
    const updatedMovie = await movie.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .populate("producer")
      .populate("actors");

    if (!updatedMovie) {
      return res
        .status(400)
        .json({ error: "Error occurred while updating the data." });
    }

    res.status(200).json({
      data: updatedMovie,
      message: "Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// Delete Movie
movieRouter.delete("/delete/:id", async (req, res) => {
  try {
    const deletedMovie = await movie.findOneAndDelete({ _id: req.params.id })
      .populate("producer")
      .populate("actors");

    if (!deletedMovie) {
      return res
        .status(400)
        .json({ error: "Error occurred while deleting the data." });
    }

    res.status(200).json({
      data: deletedMovie,
      message: "Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

module.exports = movieRouter;
