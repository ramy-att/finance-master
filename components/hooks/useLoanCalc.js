import { useState, useEffect } from "react";

const schedule = (owed, int, freq, payment, numberPayments) => {
  let balance = owed;
  let totalInterest = 0;
  const paymentAmt = payment;
  const payments = [];
  let paidTilNow = 0;
  const p = 0;
  while (numberPayments > 0) {
    const interestAmt = int * balance;
    totalInterest += parseFloat(interestAmt);
    payments.push({
      payment: parseFloat(paymentAmt).toFixed(3),
      interest: interestAmt.toFixed(3),
      principal: (payment - interestAmt).toFixed(3),
      paidToDate: (paymentAmt + paidTilNow).toFixed(3),
    });
    paidTilNow += paymentAmt;
    balance -= paymentAmt - interestAmt;
    numberPayments--;
    p = parseFloat(p) + parseFloat((payment - interestAmt).toFixed(3));
  }
  // Total Interest Paid:
  const totalPaid = owed + totalInterest;
  return {
    frequency: freq,
    initialOwed: owed.toFixed(3),
    totalPaid: totalPaid.toFixed(3),
    totalInterest: totalInterest.toFixed(3),
    payments: [...payments],
  };
};
const useLoanCalc = (downRef, principalRef, intRef, yearsRef, freqRef, dep) => {
  const [result, setResult] = useState(null);
  const calculator = () => {
    const down = downRef.current.value || 0;
    const principal = principalRef.current.value;
    const int = intRef.current.value || 0;
    const years = yearsRef.current.value;
    const freq = freqRef.current.value;
    //M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
    //P= i(PV)/(1-(1+int)^-n)
    const princ = parseFloat(principal) - (down || 0);
    const ints = int / 100;
    //Find Number Of Periods
    let n;
    let f;
    if (freq == "annual") {
      //annual
      n = years;
    } else if (freq == "semi-annual") {
      //semi
      n = years * 2;
      ints = ints / 2;
    } else if (freq == "quarterly") {
      //quarter
      ints = ints / 4;
      n = years * 4;
    } else if (freq == "monthly") {
      //month
      ints = ints / 12;
      n = years * 12;
    } else if (freq == "biweekly") {
      //biweekly
      ints = (ints * 12) / 26;
      n = (years * 12) / 26;
    }
    const paymentAmt =
      princ * ((ints * Math.pow(1 + ints, n)) / (Math.pow(ints + 1, n) - 1));
    const d = schedule(princ, ints, freq, paymentAmt, n);
    setResult({
      initialOwed: principal,
      downPayment: down,
      interestRate: int/100,
      duration: years,
      ...d,
    });
  };
  useEffect(() => {
    if (dep) {
      calculator();
    }
  }, [dep]);
  return result;
};
export default useLoanCalc;
