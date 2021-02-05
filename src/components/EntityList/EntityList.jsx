import React, { useEffect, useState } from "react";
import { usePopulateEntities } from "./usePopulateEntities";
import "./EntityList.css";
import Panel from "../Panel/Panel";
import Entity from "../Entity/Entity";
import { usePopulateDetails } from "./usePopulateDetails";

const EntityList = () => {
  const [selected, setSelected] = useState("");
  const [panels, setPanels] = useState();
  const [loading, setLoading] = useState("false");

  const { entities, addEntityItem } = usePopulateEntities(setLoading);
  usePopulateDetails(selected, setPanels, setLoading);
  useEffect(() => {
    setPanels();
  }, [selected]);

  if (loading) {
    return <div className="Loading">Loading</div>;
  }
  return (
    <Panel panels={panels} selected={selected}>
      {entities.map((item, index) => (
        <Entity key={index} item={item} setSelected={setSelected} />
      ))}
    </Panel>
  );
};
export default EntityList;
