import { getJson } from "serpapi";

export const review = async (req, res) => {
  try {
    getJson(
      {
        engine: "google_maps_reviews",
        api_key:
          "65ca78a66b5bab3ccec8ff92fa4592ddd5658bf2ce56a58758eb8b838f372701",
      },
      (json) => {
        console.log(json);
        console.log(json["reviews"]);
        res.status(200).json(json["reviews"]);
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server issue" });
  }
};
