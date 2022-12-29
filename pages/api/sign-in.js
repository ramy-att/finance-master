const checkVerification = async (userInfo) => {
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAOeJauXZyUAUKrlDjsPit1WghL8gP_Ipg";
  const response = await fetch(url, {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idToken: userInfo.idToken,
    }),
  });
  const result = await response.json();
  return result;
};
const getUserExpenses = async (localId, token) => {
  const url =
    "https://financier-2022-default-rtdb.firebaseio.com/users/" +
    localId +
    "/expenses.json?auth=" +
    token;
  const response = await fetch(url, {
    method: "GET",
    header: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  return result;
};
const getUserIncomes = async (localId, token) => {
  const url =
    "https://financier-2022-default-rtdb.firebaseio.com/users/" +
    localId +
    "/incomes.json?auth=" +
    token;
  const response = await fetch(url, {
    method: "GET",
    header: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  return result;
};
const getUserCash = async (localId, token) => {
  const url =
    "https://financier-2022-default-rtdb.firebaseio.com/users/" +
    localId +
    "/cash.json?auth=" +
    token;
  const response = await fetch(url, {
    method: "GET",
    header: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  return result;
};
const getUserInvestments = async (localId, token) => {
  const url =
    "https://financier-2022-default-rtdb.firebaseio.com/users/" +
    localId +
    "/investments.json?auth=" +
    token;
  const response = await fetch(url, {
    method: "GET",
    header: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  return result;
};
async function handler(req, res) {
  const signUpLink =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAOeJauXZyUAUKrlDjsPit1WghL8gP_Ipg";

  if (req.method === "POST") {
    const body = req.body;
    const email = body.email;
    const pass = body.password;
    const response = await fetch(signUpLink, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: pass,
        returnSecureToken: true,
      }),
      header: {
        "Content/type": "application/json",
      },
    });
    const result = await response.json();

    // Some error occured
    if (result && result.error && result.error.message) {
      return res.status(200).json({
        error:
          result.error.message == "INVALID_PASSWORD" ||
          result.error.message == "EMAIL_NOT_FOUND"
            ? "Incorrect Credentials"
            : result.error.message,
      });
    } else {
      const resultVerified = await checkVerification(result);
      const ver = resultVerified.users[0]["emailVerified"];
      if (ver === true) {
        // Fetch Actual User Info
        const expenses = await getUserExpenses(result.localId, result.idToken);
        const incomes = await getUserIncomes(result.localId, result.idToken);
        const investments = await getUserInvestments(
          result.localId,
          result.idToken
        );
        const cash = await getUserCash(result.localId, result.idToken);

        res.status(200).json({
          expenses: { ...expenses },
          incomes: incomes === null ? {} : incomes,
          investments: { ...investments },
          cash: {...cash},
          userInfo: {
            idToken: result.idToken,
            email: result.email,
            localId: result.localId,
          },
        });
      } else {
        res.status(200).json({
          error: "Email Not Verified",
        });
      }
    }
  }
}

export default handler;