import React, { useEffect, useState, useRef, useCallback } from "react";
import { Layer, Text, Rect } from 'react-konva';
import { usePopulateEntities } from "./usePopulateEntities";
import Panel from "../Panel/Panel";
import Entity from "../Entity/Entity";
import { usePopulateDetails } from "./usePopulateDetails";

const EntityList = () => {
  const [selected, setSelected] = useState("");
  const [panels, setPanels] = useState();
  const [loading, setLoading] = useState(false);
  const [refLoading, setRefLoading] = useState(false);
  const [zoom, setZoom] = useState(1);

  let textRef = useRef(null);

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
    <>
      <Panel panels={panels} selected={selected} />
      <Layer
        draggable
        scaleX={zoom}
        scaleY={zoom}
        onWheel={handleWheel}
      >
        <Rect x={0} y={0} width={window.innerWidth} height={window.innerHeight} opacity={0} />
        {entities.map((item, index) => (
          <Entity key={index} item={item} setSelected={setSelected} />
        ))}
      </Layer>
    </>
  );
};
export default EntityList;
