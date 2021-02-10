import React, { useEffect, useState, useRef } from "react";
import { Layer, Text } from 'react-konva';
import { usePopulateEntities } from "./usePopulateEntities";
import "./EntityList.css";
import Panel from "../Panel/Panel";
import Entity from "../Entity/Entity";
import { usePopulateDetails } from "./usePopulateDetails";

const EntityList = () => {
  const [selected, setSelected] = useState("");
  const [panels, setPanels] = useState();
  const [loading, setLoading] = useState("false");
  const [ refLoading, setRefLoading ] = useState(false);

  const textRef = useRef(null);

  const { entities, addEntityItem } = usePopulateEntities(setLoading);
  usePopulateDetails(selected, setPanels, setLoading);
  useEffect(() => {
    setPanels();
  }, [selected]);

  useEffect(() => setRefLoading(true), [textRef]);

  if (loading) {
    return (
      <Layer>
        <Text
          ref={textRef}
          x={refLoading ? window.innerWidth / 2 - textRef.current.getWidth() / 2 : 0}
          y={refLoading ? window.innerHeight / 2 - textRef.current.getHeight() / 2 : 0}
          fontSize={45}
          text="Loading"
          draggable
          onDragStart={(evt) => console.log('text', evt)}
        />
      </Layer>
    );
  }
  return (
    <Layer>
      {entities.map((item, index) => (
        <Entity key={index} item={item} setSelected={setSelected} />
      ))}
    </Layer>
  );
};
export default EntityList;
