const Summary = (props) => {
  const { title, data } = props;
  return (
    <div className="summaryContainer">
      <h2>{title}</h2>
      {data.map((row,idx) => {
        return (
          <div key={`${idx}--summaryContainer`}>
            <span>{row.title}:</span>
            <span>{row.amount}</span>
          </div>
        );
      })}
    </div>
  );
};
export default Summary;