import { Col, Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import Block from "../Block/Block";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import AddInvestmentModal from "../tables/AddInvestmentModal";

const Investments = () => {
  const investments = useSelector((state) => state.userInvestments);
  const [gics, setGics] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [crypto, setCrypto] = useState([]);
  const [showAddInvestmentModal, setShowAddInvestmentModal] = useState(false);
  const [defaultType, setDefaultType] = useState("GIC/CD");

  useEffect(() => {
    const stocks = [];
    const gics = [];
    const crypto = [];

    Object.entries(investments).map(([key, val]) => {
      if (val.type == "GIC/CD") {
        gics.push({ name: key, ...val });
      } else if (val.type == "Crypto") {
        crypto.push({ name: key, ...val });
      } else {
        stocks.push({ name: key, ...val });
      }
      setStocks(stocks);
      setCrypto(crypto);
      setGics(gics);
    });
  }, [investments]);

  return (
    <Container class="budgetContainer">
      <h1 className="budgetRowTitle">GICs</h1>
      <div class="budgetRow">
        {gics.map((gic, idx) => {
          return (
            <Block
              key={`${idx}--gicBlock`}
              type="investment"
              idx={idx}
              elements={gic}
            />
          );
        })}
        <Block
          state="addMore"
          onClick={() => {
            setShowAddInvestmentModal(true);
            setDefaultType("GIC/CD");
          }}
        />
      </div>
      <h1 className="budgetRowTitle">Market</h1>
      <div class="budgetRow">
        {stocks.map((stock, idx) => {
          return (
            <Block
              key={`${idx}--stockBlock`}
              type="investment"
              idx={idx}
              elements={stock}
            />
          );
        })}
        <Block
          state="addMore"
          onClick={() => {
            setShowAddInvestmentModal(true);
            setDefaultType("Stocks");
          }}
        />
      </div>
      <h1 className="budgetRowTitle">Crypto</h1>
      <div class="budgetRow">
        {crypto.map((crypto, idx) => {
          return (
            <Block
              key={`${idx}--cryptoBlock`}
              type="investment"
              idx={idx}
              elements={crypto}
            />
          );
        })}
        <Block
          state="addMore"
          onClick={() => {
            setShowAddInvestmentModal(true);
            setDefaultType("Crypto");
          }}
        />
      </div>
      <AddInvestmentModal
        show={showAddInvestmentModal}
        defaultType={defaultType}
        onHide={() => setShowAddInvestmentModal(false)}
      />
    </Container>
  );
};
export default Investments;
