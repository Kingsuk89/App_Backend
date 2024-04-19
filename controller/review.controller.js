import axios from "axios";

export const review = async () => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.PLACE_ID}&key=${process.env.GOOGLE_API_KEY}`;
    await axios(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      },
    }).then((res) => {
      const data = res.data;
      console.log(data);
    });
  } catch (e) {
    console.log(e);
  }
};
