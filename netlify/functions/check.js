exports.handler = async function (event) {
  try {
    const { id } = JSON.parse(event.body || "{}");

    const apiKey = process.env.SHEETDB_API_KEY;
    const apiURL = `https://sheetdb.io/api/v1/${apiKey}/search?id=${id}`;
    if (apiKey) {
      console.log("found apikey");
    }
    const res = await fetch(apiURL);
    const data = await res.json();

    if (data.length > 0) {
      // Found student
      const student = data[0];
      return {
        statusCode: 200,
        body: JSON.stringify({
          status: student.status.toLowerCase(),
          name: student.name,
        }),
      };
    } else {
      // Not found
      return {
        statusCode: 200,
        body: JSON.stringify({ status: "fail", name: null }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: "error", message: error.message }),
    };
  }
};
