import React, { useState, useEffect, useRef } from "react";
import { Group, Circle, Text } from 'react-konva';
import { getBasicParams } from "./getBasicParams";
const Entity = ({ setSelected, item }) => {
  const [ objectHover, setObjectHover ] = useState(false);
  const [ refLoading, setRefLoading ] = useState(false);

  const textRef = useRef(null);
  const { left, top, name, property } = getBasicParams(item);
  const radius = 75;

  useEffect(() => setRefLoading(true), [textRef]);

  const handleHover = () => setObjectHover(true);
  const handleOut = () => setObjectHover(false);

  return (
    <Group
      x={left + radius}
      y={top + radius}
      onClick={() => setSelected(item)}
    >
      <Circle
        radius={radius}
        strokeEnabled
        fill={objectHover ? '#778899' : '#ffffff'}
        opacity={0.9}
        strokeWidth={2}
        stroke={'#00000020'}
        shadowBlur={10}
        shadowOpacity={0.6}
        shadowOffsetX={5}
        shadowOffsetY={5}
        onMouseOver={handleHover}
        onMouseOut={handleOut}
      />
      <Text
        ref={textRef}
        x={refLoading ? -textRef.current.getWidth() / 2 : 0}
        y={refLoading ? -textRef.current.height() / 2 : 0}
        text={name}
        fontSize={16}
      />
    </Group>
  );
};
export default Entity;
