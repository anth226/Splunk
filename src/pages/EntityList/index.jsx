import React, { useEffect, useState, useRef, useContext } from 'react';
import { Layer, Text, Rect } from 'react-konva';
import { ObjectContext } from 'context/ObjectContext';
import Panel from 'components/Panel';
import Entity from 'components/Entity';
import OverLayer from 'components/OverLayer';
import { populateDetails } from './usePopulateDetails';

function EntityList() {
  const [selected, setSelected] = useState('');
  const [panels, setPanels] = useState();
  const [loading, setLoading] = useState(false);
  const [refLoading, setRefLoading] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [object, setObject] = useState(null);
  const { state } = useContext(ObjectContext);

  let textRef = useRef(null);

  useEffect(() => { if (selected !== '') populateDetails(selected, setPanels, setLoading, setObject); }, [selected, setPanels, setLoading, setObject]);
  useEffect(() => { if (loading) setRefLoading(true); }, [textRef, loading]);
  useEffect(() => {
    if (loading === false) {
      setRefLoading(false);
      textRef.current = null;
    }
  }, [loading]);

  const handleWheel = ((e) => {
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
          x={refLoading ? state.width / 2 - textRef.current.getWidth() / 2 : 0}
          y={refLoading ? state.height / 2 - textRef.current.getHeight() / 2 : 0}
          fontSize={45}
          text='Loading'
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
        <Rect x={0} y={0} width={state.width} height={state.height} opacity={0} />
        {state.entities.map((item, index) => (
          <Entity key={index} item={item} setSelected={setSelected} />
        ))}
      </Layer>
      <Panel panels={panels} />
      <OverLayer data={object} entity={selected} />
    </>
  );
};

export default EntityList;
