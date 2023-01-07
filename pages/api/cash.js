async function handler(req, res) {
  if (req.method == "POST") {
    const body = req.body;
    const url =
      "https://financier-2022-default-rtdb.firebaseio.com/users/" +
      body.localId +
      "/cash.json?auth=" +
      body.token;
    const type = body.type;
    const amount = body.amount;
    const bank = body.bank;
    const accName = body.accountName;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        Type: type,
        Amount: amount,
        Bank: bank,
        AccountName: accName,
        returnSecureToken: true,
      }),
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
        Type: type,
        Amount: amount,
        Bank: bank,
        AccountName: accName,
      });
    }
  } else if (req.method == "PATCH") {
    const body = req.body;
    const url =
      "https://financier-2022-default-rtdb.firebaseio.com/users/" +
      body.localId +
      "/cash/" +
      body.oldName +
      ".json?auth=" +
      body.token;
    const type = body.type;
    const amount = body.amount;
    const bank = body.bank;
    const accName = body.accountName;

    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        Type: type,
        Amount: amount,
        Bank: bank,
        AccountName: accName,
      }),
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
        name: body.oldName,
        Type: type,
        Amount: amount,
        Bank: bank,
        AccountName: accName,
      });
    }
  } else {
    const body = req.body;
    const oldName = body.name;

    const url =
      "https://financier-2022-default-rtdb.firebaseio.com/users/" +
      body.localId +
      "/cash/" +
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
