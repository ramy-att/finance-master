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
  result["users"][0].emailVerified;
  return { userVerification: result["users"][0].emailVerified };
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
      return res.status(200).json({ error: result.error.message });
    } else {
      const resultVerified = await checkVerification(result);
      console.log(resultVerified);
      if (resultVerified.userVerification === true) {
        res.status(200).json({
          idToken: result.idToken,
          email: result.email,
          localId: result.localId,
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
