// import { places } from '../../../lib/db';
import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    const placeData = request.body;
    const newPlace = new Place(placeData);
    await newPlace.save();
    response.status(201).json({ status: "Created Place" });
  }
  
}
