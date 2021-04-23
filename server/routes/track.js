import express from "express";
import Track from "../models/Track.js";

const router = express.Router();

router.post("/latest", async (req, res) => {
  try {
    const { songs } = req.body;
    let tracks = await Track.find().select("-src").sort({ date: -1 });
    if (songs.length > 0) {
      songs.forEach((song) => {
        tracks = tracks.filter((track) => track.id !== song);
      });
    }

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

router.post("/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const { songs } = req.body;
    if (query !== undefined || query !== "") {
      let tracks = await Track.find({
        $or: [
          { artist: { $regex: query, $options: "i" } },
          { name: { $regex: query, $options: "i" } },
        ],
      }).select("-src");
      if (songs.length > 0) {
        songs.forEach((song) => {
          tracks = tracks.filter((track) => track.id !== song);
        });
      }

      res.json(tracks);
      return;
    }
    res.status(401).json("Tekst wyszukiwania nie może być pusty");
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Błąd serwera");
  }
});

router.post("/edit", async (req, res) => {
  try {
    const { name, cover, id, artist } = req.body;
    await Track.findByIdAndUpdate(
      { _id: id },
      { name: name, cover: cover, artist: artist }
    );
    res.json("Utwór został pomyślnie zmieniony");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Błąd serwera");
  }
});

export default router;
