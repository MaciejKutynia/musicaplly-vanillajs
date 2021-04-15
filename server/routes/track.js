import express from "express";
import Track from "../models/Track.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { skip } = req.body;
  try {
    const tracks = await Track.find()
      .sort({ date: "desc" })
      .limit(4)
      .select("-src")
      .skip(skip);
    const allTracks = await Track.find().select("_id");
    const trackLength = allTracks.length;
    const response = {
      length: trackLength,
      tracks,
    };

    res.json(response);
  } catch (error) {
    console.error(error.message);

    res.status(500).json("Błąd serwera");
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, src, artist, cover } = req.body;

    const track = await new Track({
      artist,
      name,
      cover,
      src,
      type: "song",
    });

    await track.save();

    res.json("Plik został zapisany pomyślnie");
  } catch (error) {
    console.error(error.message);

    res.status(500).json("Błąd serwera");
  }
});

router.post("/track", async (req, res) => {
  try {
    const { id } = req.body;

    const src = await Track.findOne({ _id: id }).select("src").select("-_id");

    res.json(src);
  } catch (error) {
    console.error(error.message);

    res.status(500).json("Błąd serwera");
  }
});

//TODO do usunięcia

router.post("/rm", async (req, res) => {
  try {
    const { id } = req.body;
    const toRemove = await Track.findOneAndRemove({ _id: id });
  } catch (error) {
    console.error(error.message);

    res.status(500).json("Błąd serwera");
  }
});

export default router;
