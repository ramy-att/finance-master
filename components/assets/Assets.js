import { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Block from "../Block/Block";
import { authActions } from "../store";
import AddCashModal from "../tables/AddCashModal";
import { ChartSection } from "./ChartSection";
import Chart from "chart.js/auto";

export const Assets = (props) => {
  const assets = useSelector((state) => state.userCash);
  const userInfo = useSelector((state) => state.userInfo);

  const [showAddCashModal, setShowAddCashModal] = useState(false);
  const [key, setKey] = useState("");
  const [assetAction, setAssetAction] = useState("");
  const [defType, setDefType] = useState("");
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
  const hideModal = () => {
    setShowAddCashModal(false);
    setKey("");
    setDefType("");
    setAssetAction("");
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
            setDefType("Asset");
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
        <Block
          state="addMore"
          type="income"
          onClick={() => {
            setShowAddCashModal(true);
            setDefType("Chequing Account");
          }}
        />
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
        <Block
          state="addMore"
          type="income"
          onClick={() => {
            setShowAddCashModal(true);
            setDefType("Other");
          }}
        />
      </div>
      {showAddCashModal && (
        <AddCashModal
          typeofaction={assetAction}
          cashKey={key}
          defType={defType}
          show={showAddCashModal}
          type={assetAction}
          hideModal={hideModal}
          onHide={hideModal}
        />
      )}
      {/* Add a bar chart showing In vs Out */}
      <ChartSection cash={assets} />
    </Container>
  );
};
