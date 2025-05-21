const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { id } = JSON.parse(event.body);
  const results = [];

  const dataPath = path.join(__dirname, "../../data/results.csv");

  return new Promise((resolve, reject) => {
    fs.createReadStream(dataPath)
      .pipe(csv())
      .on("data", (row) => results.push(row))
      .on("end", () => {
        const match = results.find((r) => r.id === id);
        if (match) {
          resolve({
            statusCode: 200,
            body: JSON.stringify({ status: match.status }),
          });
        } else {
          resolve({
            statusCode: 404,
            body: JSON.stringify({ status: "ID not found" }),
          });
        }
      });
  });
};