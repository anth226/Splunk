import React from "react";
import { Layer } from 'react-konva';
import PanelEntity from "./PanelEntity/PanelEntity";

const getWraper = (panels) => {
  const { left, right, bottom, top } = panels;
  let tw = 0,
    th = 0,
    lw = 0,
    lh = 0,
    rw = 0,
    rh = 0,
    bw = 0,
    bh = 0;
  if (top && top.length > 0) {
    for (let ti of top) {
      let h = getCssValue(ti.styles, "height");
      if (th < h) th = h;
      tw += getCssValue(ti.styles, "width");
    }
  }
  if (left && left.length > 0) {
    for (let li of left) {
      let w = getCssValue(li.styles, "width");
      if (lw < w) lw = w;
      lh += getCssValue(li.styles, "height");
    }
  }
  if (bottom && bottom.length > 0) {
    for (let bi of bottom) {
      let ah = getCssValue(bi.styles, "height");
      if (bh < ah) bh = ah;
      bw += getCssValue(bi.styles, "width");
    }
  }
  if (right && right.length > 0) {
    for (let ri of right) {
      let aw = getCssValue(ri.styles, "width");
      if (rw < aw) rw = aw;
      rh += getCssValue(ri.styles, "height");
    }
  }

  let wrapWidth = Math.max(tw + rw, bw + lw, rw + lw + 812);
  let wrapHeight = Math.max(th + lh, bh + rh, th + bh + 812);
  return {
    wrapWidth,
    wrapHeight,
    leftMargin: lw+7,
    rightMargin: rw+7
  };
};

const getCssValue = (styles, name) => {
  let result = styles[name];
  result = result.replace("px", "");
  return parseInt(result);
};

const Panel = ({ children, panels }) => {
  let topX = 0, leftY = 0, rightY = 0, bottomX = 0;

  if (!panels) return <Layer></Layer>;
  const { left, right, bottom, top } = panels;
  let wraper = getWraper(panels);

  return (
    <>
      {Boolean(top) && top.length && (
        <Layer>
          {top.map((panel, index) => {
            topX = topX + getCssValue(panel.styles, "width");
            return (
              <PanelEntity key={index} panel={panel} x={topX - getCssValue(panel.styles, "width") + index * 10} y={10} />
            );
          })}
        </Layer>
      )}
      {Boolean(left) && left.length && (
        <Layer>
          {left.map((panel, index) => {
            leftY = leftY + getCssValue(panel.styles, "height");
            return (
              <PanelEntity key={index} panel={panel} x={10} y={leftY - getCssValue(panel.styles, "height") + index * 10} />
            );
          })}
        </Layer>
      )}
      {Boolean(right) && right.length && (
        <Layer>
          {right.map((panel, index) => {
            rightY = rightY + getCssValue(panel.styles, "height");
            return (
              <PanelEntity key={index} panel={panel} x={window.innerWidth - getCssValue(panel.styles, "width") - 10} y={rightY - getCssValue(panel.styles, "height") + index * 10} />
            );
          })}
        </Layer>
      )}
      {Boolean(bottom) && bottom.length && (
        <Layer>
          {bottom.map((panel, index) => {
            bottomX = bottomX + getCssValue(panel.styles, "width");
            return (
              <PanelEntity key={index} panel={panel} x={bottomX - getCssValue(panel.styles, "width") + index * 10} y={window.innerHeight - getCssValue(panel.styles, "height") - 10} />
            );
          })}
        </Layer>
      )}
    </>
  );
};
export default Panel;
