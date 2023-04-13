//import { places } from '../../../../lib/db.js';
import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }
    return response.status(200).json(place);
  }

  if (request.method === "PATCH") {
    const updatePlace = request.body;
    await Place.findByIdAndUpdate(id, {
      $set: updatePlace,
    });
    response.status(200).json({ status: `Place ${id} successfully update.` });
  }
}
