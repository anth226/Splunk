import React, { useEffect, useState } from 'react';
import { Layer } from 'react-konva';
import PanelEntity from '../PanelEntity';

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
      let h = getCssValue(ti.styles, 'height');
      if (th < h) th = h;
      tw += getCssValue(ti.styles, 'width');
    }
  }

  if (left && left.length > 0) {
    for (let li of left) {
      let w = getCssValue(li.styles, 'width');
      if (lw < w) lw = w;
      lh += getCssValue(li.styles, 'height');
    }
  }

  if (bottom && bottom.length > 0) {
    for (let bi of bottom) {
      let ah = getCssValue(bi.styles, 'height');
      if (bh < ah) bh = ah;
      bw += getCssValue(bi.styles, 'width');
    }
  }

  if (right && right.length > 0) {
    for (let ri of right) {
      let aw = getCssValue(ri.styles, 'width');
      if (rw < aw) rw = aw;
      rh += getCssValue(ri.styles, 'height');
    }
  }

  let wrapWidth = Math.max(tw + rw, bw + lw, rw + lw + 812, window.innerWidth);
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
  result = result.replace('px', '');
  return parseInt(result);
};

const Panel = ({ panels, handleSize }) => {
  const [wraper, setWraper] = useState({});
  let topX = 0 , leftY = 0, rightY = 0, bottomX = 0;

  useEffect(() => { if (panels) setWraper(getWraper(panels)); }, [panels]);
  useEffect(() => { if (wraper.wrapWidth) handleSize(wraper); }, [wraper, handleSize]);

  if (!panels) return null;

  return (
    <>
      {Boolean(panels.top) && panels.top.length && (
        <Layer>
          {panels.top.map((panel, index) => {
            topX = topX + getCssValue(panel.styles, 'width');
            return (
              <PanelEntity
                key={index}
                panel={panel}
                position='top'
                x={topX - getCssValue(panel.styles, 'width') + (index + 1) * 10}
                y={10}
              />
            );
          })}
        </Layer>
      )}
      {Boolean(panels.left) && panels.left.length && (
        <Layer>
          {panels.left.map((panel, index) => {
            if (index === 0) leftY = wraper.wrapHeight;
            leftY = leftY - getCssValue(panel.styles, 'height');
            return (
              <PanelEntity
                key={index}
                panel={panel}
                position='left'
                x={10}
                y={leftY - (index + 1) * 10}
              />
            );
          })}
        </Layer>
      )}
      {Boolean(panels.right) && panels.right.length && (
        <Layer>
          {panels.right.map((panel, index) => {
            rightY = rightY + getCssValue(panel.styles, 'height');
            return (
              <PanelEntity
                key={index}
                panel={panel}
                position='right'
                x={wraper.wrapWidth ? wraper.wrapWidth - getCssValue(panel.styles, 'width') - 10 : -getCssValue(panel.styles, 'width') - 10}
                y={rightY - getCssValue(panel.styles, 'height') + (index + 1) * 10}
              />
            );
          })}
        </Layer>
      )}
      {Boolean(panels.bottom) && panels.bottom.length && (
        <Layer>
          {panels.bottom.map((panel, index) => {
            if (index === 0) bottomX = wraper.wrapWidth;
            bottomX = bottomX - getCssValue(panel.styles, 'width');
            return (
              <PanelEntity
                key={index}
                panel={panel}
                position='bottom'
                x={bottomX - (index + 1) * 10}
                y={wraper.wrapHeight ? wraper.wrapHeight - getCssValue(panel.styles, 'height') - 10 : -getCssValue(panel.styles, 'height') - 10}
              />
            );
          })}
        </Layer>
      )}
    </>
  );
};

export default Panel;
