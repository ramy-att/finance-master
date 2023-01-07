// Send Verification Email
const verifyUser = async (userInfo) => {
  const verifyUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAOeJauXZyUAUKrlDjsPit1WghL8gP_Ipg";
  const response = await fetch(verifyUrl, {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify({
      requestType: "VERIFY_EMAIL",
      idToken: userInfo.idToken,
    }),
  });
  const result = await response.json();
  return { userVerification: "sent" };
};
const createExpensesExample = async (UID, token) => {
  const categories = [
    "Housing",
    "Transportation",
    "Monthly Living Expenses",
    "Dependants/Children",
    "Monthly Savings",
    "Health Care",
    "Credit Cards",
  ];
  const data = [
    [
      "Rent/Mortgage",
      "Utilities, heat, water, electricity, phone, cable, Internet",
      "Home maintenance & improvements/condo fees",
      "Property Tax",
    ],
    [
      "Car Loan/Lease Payment",
      "Gas/Electricity",
      "Oil & Maintenance",
      "Insurance",
      "Public Transit",
      "Parking Fees",
    ],
    [
      "Groceries",
      "Clothing & Grooming",
      "Coffee, lunches & Dining Out",
      "Charity",
    ],
    ["DayCare, after-school, elder care", "Activities/Lessons"],
    ["TFSA", "RRSP", "RESP", "Workplace Savings", "HISA"],
    [
      "Glasses",
      "Dental",
      "Prescriptions/Non-Prescription",
      "Life Insurance",
      "Health insurance",
    ],
    ["Credit Card"],
  ];
  const url =
    "https://financier-2022-default-rtdb.firebaseio.com/users/" +
    UID +
    "/expenses.json?auth=" +
    token;
  for (let i = 0; i < categories.length; i++) {
    const CategoryExpenses = [];
    data[i].map((CategoryItems) => {
      CategoryExpenses.push({
        ExpenseTitle: CategoryItems,
        ExpenseFreq: "Monthly",
        ExpenseAmount: 0,
      });
    });
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        CategoryTitle: categories[i],
        CategoryAmount: 0,
        CategoryExpenses: [...CategoryExpenses],
      }),
      header: { "Content/type": "application/json" },
    });
    const x = await response.json();
  }
};
const handler = async (req, res) => {
  const signUpLink =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAOeJauXZyUAUKrlDjsPit1WghL8gP_Ipg";
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
      // Sign up successful
      createExpensesExample(result.localId, result.idToken);
      verifyUser(result);
      res.status(200).json({
        idToken: result.idToken,
        email: result.email,
        localId: result.localId,
      });
    }
  }
};

export default handler;
