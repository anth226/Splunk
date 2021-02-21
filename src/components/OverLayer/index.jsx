import React, { useState, useEffect, useRef } from 'react';
import { Layer, Group, Rect, Text } from 'react-konva';

const OverLayer = ({ width, data, entity }) => {
  const [refLoading, setRefLoading] = useState(false);
  const textRef = useRef(null);

  useEffect(() => setRefLoading(true), [textRef]);

  let debugParam = false;

  if (window.location.search !== '') {
    const queryParams = window.location.search.split('&');
    queryParams.forEach((item) => {
      if (!debugParam && item.replace('?', '').split('=')[0] === 'debug') debugParam = true;
    });
  }

  if (!debugParam) return null;

  return (
    <Layer draggable>
      <Group
        x={width - 210}
        y={200}
      >
        <Rect
          x={0}
          y={0}
          width={200}
          height={400}
          fill={'#ffffff'}
          opacity={0.6}
          strokeWidth={2}
          stroke={'#ffffff'}
          shadowBlur={10}
          shadowOpacity={0.6}
          shadowOffsetX={5}
          shadowOffsetY={5}
        />
        <Group
          x={refLoading ? 100 - textRef.current.getWidth() / 2 : 0}
          y={refLoading ? 200 - textRef.current.getHeight() / 2 * 4 : 0}
        >
          <Text ref={textRef} text='           ' />
          {data && <Text y={0} text={data.data[0].entityName} fontSize={16} />}
          {data && <Text y={20} text={data.data[0].setName} fontSize={16} />}
          {entity !== '' && <Text y={40} text={entity.entityName} fontSize={16} />}
          {entity !== '' && <Text y={60} text={entity.setName} fontSize={16} />}
        </Group>
      </Group>
    </Layer>
  );
};

export default OverLayer;
