async function handler(req, res) {
  if (req.method == "POST") {
    const body = req.body;
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAOeJauXZyUAUKrlDjsPit1WghL8gP_Ipg";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: body.email,
        requestType: "PASSWORD_RESET",
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
      res.status(200).json({
        reset: true,
      });
    }
  }
}
export default handler;