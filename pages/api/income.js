async function handler(req, res) {
  if (req.method == "POST") {
    const body = req.body;
    const url =
      "https://financier-2022-default-rtdb.firebaseio.com/users/" +
      body.localId +
      "/incomes.json?auth=" +
      body.token;
    const incomeCategory = body.source;
    const incomeAmount = body.amount;
    const incomeFreq = body.incomeFreq;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        Category: incomeCategory,
        Amount: incomeAmount,
        Freq: incomeFreq,
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
        Category: incomeCategory,
        Amount: incomeAmount,
        Freq: incomeFreq,
      });
    }
  } else if (req.method == "PATCH") {
    const body = req.body;
    const incomeCategory = body.source;
    const incomeAmount = body.amount;
    const oldName = body.oldName;
    const freq = body.incomeFreq;
    const url =
      "https://financier-2022-default-rtdb.firebaseio.com/users/" +
      body.localId +
      "/incomes/" +
      oldName +
      ".json?auth=" +
      body.token;

    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        Category: incomeCategory,
        Amount: incomeAmount,
        Freq: freq,
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
        name: oldName,
        Category: result.Category,
        Amount: result.Amount,
        Freq: result.Freq,
      });
    }
  } else if (req.method == "DELETE") {
    const body = req.body;
    const oldName = body.name;

    const url =
      "https://financier-2022-default-rtdb.firebaseio.com/users/" +
      body.localId +
      "/incomes/" +
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
