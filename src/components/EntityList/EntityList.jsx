import React, { useEffect, useState, useRef, useCallback } from "react";
import { Layer, Text, Rect } from 'react-konva';
import { usePopulateEntities } from "./usePopulateEntities";
import Panel from "../Panel/Panel";
import Entity from "../Entity/Entity";
import { usePopulateDetails } from "./usePopulateDetails";

const EntityList = ({ handleSize }) => {
  const [selected, setSelected] = useState("");
  const [panels, setPanels] = useState();
  const [loading, setLoading] = useState(false);
  const [refLoading, setRefLoading] = useState(false);
  const [zoom, setZoom] = useState(1);

  let textRef = useRef(null);

  const width = window.innerWidth, height = window.innerHeight;
  const { entities, addEntityItem } = usePopulateEntities(setLoading);
  usePopulateDetails(selected, setPanels, setLoading);
  useEffect(() => {
    setPanels();
  }, [selected]);
  useEffect(() => {
    if (loading) setRefLoading(true);
  }, [textRef.current, loading]);
  useEffect(() => {
    if (loading == false) {
      setRefLoading(false);
      textRef.current = null;
    }
  }, [loading]);

  const handleWheel = useCallback((e) => {
    e.evt.preventDefault();
    if (e.evt.deltaY < 0) {
      setZoom(zoom * 1.05);
    } else {
      setZoom(zoom / 1.05);
    }
  });

  if (loading) {
    return (
      <Layer>
        <Text
          ref={textRef}
          x={refLoading ? width / 2 - textRef.current.getWidth() / 2 : 0}
          y={refLoading ? height / 2 - textRef.current.getHeight() / 2 : 0}
          fontSize={45}
          text="Loading"
        />
      </Layer>
    );
  }
  return (
    <>
      <Layer
        draggable
        scaleX={zoom}
        scaleY={zoom}
        onWheel={handleWheel}
      >
        <Rect x={0} y={0} width={width} height={height} opacity={0} />
        {entities.map((item, index) => (
          <Entity key={index} item={item} setSelected={setSelected} />
        ))}
      </Layer>
      <Panel panels={panels} selected={selected} handleSize={handleSize} />
    </>
  );
};
export default EntityList;
