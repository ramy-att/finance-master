async function handler(req, res) {
  if (req.method == "POST") {
    const body = req.body;
    const url =
      "https://financier-2022-default-rtdb.firebaseio.com/users/" +
      body.localId +
      "/investments.json?auth=" +
      body.token;

    const type = body.type;
    const data = body.data;
    const bodyData = { type: body.type, ...data };
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(bodyData),
      header: {
        "Content/type": "application/json",
      },
    });
    const result = await response.json();
    if (result && result.error && result.error.message) {
      return res.status(200).json({
        error: result.error.message,
      });
    } else {
      const resultName = result.name;
      return res.status(200).json({
        name: resultName,
        ...bodyData,
      });
    }
  } else if (req.method == "PATCH") {
    const body = req.body;
    const url =
      "https://financier-2022-default-rtdb.firebaseio.com/users/" +
      body.localId +
      "/investments.json?auth=" +
      body.token;

    const type = body.type;
    const data = body.data;
    const bodyData = { type: body.type, ...data };
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(bodyData),
      header: {
        "Content/type": "application/json",
      },
    });
    const result = await response.json();
    if (result && result.error && result.error.message) {
      return res.status(200).json({
        error: result.error.message,
      });
    } else {
      const resultName = result.name;
      return res.status(200).json({
        name: resultName,
        ...bodyData,
      });
    }
  } else {
    const body = req.body;
    const name = body.name;

    const url =
      "https://financier-2022-default-rtdb.firebaseio.com/users/" +
      body.localId +
      "/investments/" +
      name +
      ".json?auth=" +
      body.token;

    const response = await fetch(url, {
      method: "DELETE",
      header: {
        "Content/type": "application/json",
      },
    });
    const result = await response.json();
    if (result && result.error && result.error.message) {
      return res.status(200).json({
        error: result.error.message,
      });
    } else {
      return res.status(200).json({
        deleted: true,
        deletedName: name,
      });
    }
  }
}
export default handler;
