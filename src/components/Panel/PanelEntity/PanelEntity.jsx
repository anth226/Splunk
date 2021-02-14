import React, { useState, useEffect, useRef } from "react";
import { Text, Group, Rect } from 'react-konva';

const getCssValue = (styles, name) => {
  let result = styles[name];
  result = result.replace("px", "");
  return parseInt(result);
};

const PanelEntity = ({ panel, position, x, y }) => {
  const [ refLoading, setRefLoading ] = useState(false);
  const textRef = useRef(null);
  const isVisible = panel.visible === "True";

  useEffect(() => setRefLoading(true), [textRef]);

  if (!isVisible) return null;
  return (
    <Group
      draggable
      dragBoundFunc={(pos) => {
        let dragPos;
        switch (position) {
          case "top":
          case "bottom":
            dragPos = {
              x: pos.x,
              y: 0,
            };
            break;
          case "right":
          case "left":
            dragPos = {
              x: 0,
              y: pos.y,
            };
            break;
        }
        return dragPos;
      }}
    >
      <Rect
        x={x}
        y={y}
        width={getCssValue(panel.styles, "width")}
        height={getCssValue(panel.styles, "height")}
        fill={'#ffffff'}
        opacity={0.8}
        strokeWidth={2}
        stroke={`#${panel.styles.borderColor}`}
        shadowBlur={10}
        shadowOpacity={0.6}
        shadowOffsetX={5}
        shadowOffsetY={5}
      />
      <Group
        x={refLoading ? x + getCssValue(panel.styles, "width") / 2 - textRef.current.getWidth() / 2 : 0}
        y={refLoading ? y + getCssValue(panel.styles, "height") / 2 - textRef.current.getHeight() / 2 * 3 : 0}
      >
        <Text ref={textRef} y={0} text={`Name: ${panel.name}`} fontSize={16} />
        <Text y={20} text={`Type: ${panel.type}`} fontSize={16} />
        <Text y={40} text={`Title: ${panel.title}`} fontSize={16} />
      </Group>
    </Group>
  );
};
export default PanelEntity;
