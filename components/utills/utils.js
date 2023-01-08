export const formatNumber = (number) => {
    //Do something with the input
    const x= parseFloat(number).toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 };