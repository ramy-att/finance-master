async function handler(req, res) {
  if (req.method == "POST") {
    const body = req.body;
    const CategoryTitle = body.CategoryTitle;
    const CategoryTotal = body.CategoryTotal;
    const CategoryExpenses = body.CategoryExpenses;
    const url =
      "https://financier-2022-default-rtdb.firebaseio.com/users/" +
      body.localId +
      "/expenses.json?auth=" +
      body.token;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        CategoryTitle: CategoryTitle,
        CategoryAmount: CategoryTotal,
        CategoryExpenses: CategoryExpenses,
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
        name: result.name,
        CategoryTitle: CategoryTitle,
        CategoryAmount: CategoryTotal,
        CategoryExpenses: CategoryExpenses,
      });
    }
  } else if (req.method == "PATCH") {
    const body = req.body;
    const CategoryTitle = body.CategoryTitle;
    const CategoryTotal = body.CategoryTotal;
    const CategoryExpenses = body.CategoryExpenses;
    const oldName = body.oldName;
    const url =
      "https://financier-2022-default-rtdb.firebaseio.com/users/" +
      body.localId +
      "/expenses/" +
      oldName +
      ".json?auth=" +
      body.token;

    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        CategoryTitle: CategoryTitle,
        CategoryAmount: CategoryTotal,
        CategoryExpenses: CategoryExpenses,
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
        CategoryTitle: result.CategoryTitle,
        CategoryAmount: result.CategoryAmount,
        CategoryExpenses: result.CategoryExpenses,
      });
    }
  } else {
    const body = req.body;
    const name = body.name;

    const url =
      "https://financier-2022-default-rtdb.firebaseio.com/users/" +
      body.localId +
      "/expenses/" +
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
