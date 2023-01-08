export const formatNumber = (number) => {
    const x= parseFloat(number).toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 };
 export const getAnnual = (freq, amount) => {
    return freq == "Daily"
      ? parseFloat(amount) * 365
      : freq == "Weekly"
      ? parseFloat(amount) * 52
      : freq == "Biweekly"
      ? parseFloat(amount) * 26
      : freq == "Monthly"
      ? parseFloat(amount) * 12
      : freq == "Quarterly"
      ? parseFloat(amount) * 4
      : freq == "Semi-Annually"
      ? parseFloat(amount) * 2
      : parseFloat(amount);
  };