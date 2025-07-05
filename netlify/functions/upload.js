const FormData = require("form-data");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

// Expect env var PINATA_JWT with Bearer token, obtained from Pinata dashboard.
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { fileName, mimeType, data, doctorId } = JSON.parse(event.body);
    if (!data || !fileName) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing file" }) };
    }

    const buffer = Buffer.from(data, "base64");

    const form = new FormData();
    form.append("file", buffer, { filename: fileName, contentType: mimeType });
    // Optional metadata
    const metadata = { name: fileName, keyvalues: { doctorId: doctorId || "" } };
    form.append("pinataMetadata", JSON.stringify(metadata));

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: form,
    });

    const json = await res.json();
    if (!res.ok) {
      console.error(json);
      return { statusCode: res.status, body: JSON.stringify({ error: json.error || json }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ cid: json.IpfsHash }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}; 