export const useGetAnnual = (freq, amount) => {
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
export default useGetAnnual;