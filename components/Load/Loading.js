import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <div className="loadingScreen">
      <Spinner animation="border" />
    </div>
  );
};

export default Loading;
