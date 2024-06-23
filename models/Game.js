import mongoose from "mongoose";

const gamesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    languages: { type: [String], required: true },
    offer: { type: String, required: false },
    monthlyDownloads: { type: Number, required: true, default: 0 },
  },
  { versionKey: false, strict: false, timestamps: true, collection: "games" }
);

export const Game = mongoose.model("Game", gamesSchema);
