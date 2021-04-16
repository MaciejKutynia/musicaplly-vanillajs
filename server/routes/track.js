import express from "express";
import Track from "../models/Track.js";

const router = express.Router();

router.get("/latest", async (req, res) => {
  try {
    let tracks = await Track.find().select("-src").sort({ date: -1 });
    tracks = tracks.slice(0, 30);
    const response = {
      tracks,
      length: tracks.length,
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

router.get("/search/:query", async (req, res) => {
  const query = req.params.query;
  if (query !== "undefined") {
    const result = await Track.find({
      $or: [
        { artist: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
      ],
    })
      .select("-src")
      .select("-type");
    res.json(result);
    return;
  }
  res.status(401).json("Tekst wyszukiwania nie może być pusty");
});

export default router;
