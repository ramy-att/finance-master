import Block from "../Block/Block";
import { Col, Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import AddCashModal from "../tables/AddCashModal";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { ChartSection } from "./ChartSection";

export const Assets = (props) => {
  const assets = useSelector((state) => state.userCash);
  const userInfo = useSelector((state) => state.userInfo);

  const [showAddCashModal, setShowAddCashModal] = useState(false);
  const [key, setKey] = useState("");
  const [assetAction, setAssetAction] = useState("");

  const dispatch = useDispatch();

  const deleteItem = async (key) => {
    const endpoint = "/api/cash";
    const options = {
      method: "DELETE",
      body: JSON.stringify({
        localId: userInfo.localId,
        token: userInfo.idToken,
        name: key,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (!result.error) {
      dispatch(authActions.deleteCash(result.deletedName));
    }
  };
  return (
    <Container class="budgetContainer">
      <h1 className="budgetRowTitle">Assets</h1>
      <div class="budgetRow">
        {Object.entries(assets).map(([key, val]) => {
          if (val.Type == "Asset") {
            return (
              <Block
                key={`${key}--assetBlock`}
                title={val.AccountName}
                type="assets"
                editElm={() => {
                  setShowAddCashModal(true);
                  setAssetAction("edit");
                  setKey(key);
                }}
                deleteElm={() => {
                  deleteItem(key);
                }}
                elements={val}
              />
            );
          }
        })}
        <Block
          onClick={() => {
            setShowAddCashModal(true);
          }}
          state="addMore"
          type="income"
        />
      </div>
      <h1 className="budgetRowTitle">Cash In The Bank</h1>
      <div class="budgetRow">
        {Object.entries(assets).map(([key, val]) => {
          if (val.Type != "Asset" && val.Type != "Other") {
            return (
              <Block
                key={`${key}--assetBlock`}
                title={val.AccountName}
                type="bankAcc"
                editElm={() => {
                  setShowAddCashModal(true);
                  setAssetAction("edit");
                  setKey(key);
                }}
                deleteElm={() => {
                  deleteItem(key);
                }}
                elements={val}
              />
            );
          }
        })}
        <Block state="addMore" type="income" />
      </div>
      <h1 className="budgetRowTitle">Cash Elsewhere</h1>
      <div class="budgetRow">
        {Object.entries(assets).map(([key, val]) => {
          if (val.Type == "Other") {
            return (
              <Block
                key={`${key}--assetBlock`}
                title={val.AccountName}
                type="otherAsset"
                editElm={() => {
                  setShowAddCashModal(true);
                  setAssetAction("edit");
                  setKey(key);
                }}
                deleteElm={() => {
                  deleteItem(key);
                }}
                elements={val}
              />
            );
          }
        })}
        <Block state="addMore" type="income" />
      </div>
      <AddCashModal
        typeofaction={assetAction}
        cashKey={key}
        show={showAddCashModal}
        type={assetAction}
        onHide={() => setShowAddCashModal(false)}
      />
      {/* Add a bar chart showing In vs Out */}
      <ChartSection cash={assets}/>
    </Container>
  );
};
