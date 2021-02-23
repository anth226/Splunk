import React, { useState, useEffect, useRef, useContext } from 'react';
import { Layer, Text } from 'react-konva';
import { ObjectContext } from 'context/ObjectContext';

function Home({ history }) {
  const [refLoading, setRefLoading] = useState(false);
  const { state, getEntities } = useContext(ObjectContext);
  const textRef = useRef(null);

  useEffect(() => {
    if (state.entities.length > 0) {
      history.push('/entityList');
    } else {
      getEntities();
    }
  }, [state, getEntities, history]);
  useEffect(() => setRefLoading(true), [textRef]);

  return (
    <Layer>
      <Text
        ref={textRef}
        x={refLoading ? state.width / 2 - textRef.current.getWidth() / 2 : state.width / 2}
        y={refLoading ? state.height / 2 - textRef.current.height() / 2 : state.height / 2}
        text={'Loading'}
        fontSize={45}
      />
    </Layer>
  );
};

export default Home;
