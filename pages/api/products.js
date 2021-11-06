const axios = require("axios");

export default async function handler(req, res) {
  const response = await axios.get(`https://fakestoreapi.com/products?limit=${req.query.limit}`);
  res.status(200).json(response.data);
}
