const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      yearOfRelease: {
        type: String,
        required: true,
      },
      plot: {
        type: String,
        required: true,
      },
      poster: {
        type: String,
      },
      director: {
        type: String,
        required: true,
      },
      producer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cast",
      },
      actors: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "cast",
        },
      ],
    },
    { timestamps: true }
  );
  
  const movie = new mongoose.model("movie", movieSchema);
  
  module.exports = movie;