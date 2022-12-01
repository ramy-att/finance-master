async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    console.log(body);
    const url =
      "https://financier-2022-default-rtdb.firebaseio.com/users/" +
      body.localId +
      "/incomes.json?auth=" +
      body.token;
    const incomeCategory = body.source;
    const incomeAmount = body.amount;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        Category: incomeCategory,
        Amount: incomeAmount,
        returnSecureToken: true,
      }),
      header: {
        "Content/type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    if (result && result.error && result.error.message) {
      return res.status(200).json({
        error: result.error.message,
      });
    } else {
    // This result should be pushed to array containing all incomes, 
    // should also create a redux storage var that stores the total income amount and expense amoun,
    // increment total income amount by incomeAmount
    // incomes [{name:{category: '', amount: ''}},{name:{category: '', amount: ''}}]
      res.status(200).json({
        newIncome: {
          name: result.name,
          incomeCategory: incomeCategory,
          incomeAmount: incomeAmount,
        },
      });
    }
  }
}
export default handler;
