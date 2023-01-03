async function handler(req, res) {
  if (req.method == "POST") {
    const body = req.body;
    const url =
      "https://financier-2022-default-rtdb.firebaseio.com/users/" +
      body.localId +
      "/loans.json?auth=" +
      body.token;
    const data = body.data;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
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
      console.log(resultName)
      return res.status(200).json({
        name: resultName,
        ...data,
      });
    }
  } else if (req.method == "PATCH") {
    const body = req.body;
    const url =
      "https://financier-2022-default-rtdb.firebaseio.com/users/" +
      body.localId +
      "/loans/" +
      body.oldName +
      ".json?auth=" +
      body.token;
    const data = body.data;
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
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
      console.log(body.oldName);
      return res.status(200).json({
        name: body.oldName,
        ...data,
      });
    }
  } else {
    const body = req.body;
    const oldName = body.name;

    const url =
      "https://financier-2022-default-rtdb.firebaseio.com/users/" +
      body.localId +
      "/loans/" +
      oldName +
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
        deletedName: oldName,
      });
    }
  }
}
export default handler;
