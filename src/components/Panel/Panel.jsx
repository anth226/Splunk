import React from "react";
import "./Panel.css";
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
  if (!panels) return <div className="entity-field">{children}</div>;
  const { left, right, bottom, top } = panels;
  let wraper = getWraper(panels);

  return (
    <div
      className="upper-wrapper"
      style={{
        width: `${wraper.wrapWidth}px`,
        height: `${wraper.wrapHeight}px`,
      }}
    >
      {Boolean(top) && top.length && (
        <div className="top-side">
          {top.map((panel, index) => (
            <PanelEntity key={index} panel={panel} />
          ))}
        </div>
      )}
      <div
        className="entity-field"
        style={{ marginLeft: `${wraper.leftMargin}px`, marginRight: `${wraper.rightMargin}px` }}
      >
        {children}
      </div>
      {Boolean(left) && left.length && (
        <div className="left-side">
          {left.map((panel, index) => (
            <PanelEntity key={index} panel={panel} />
          ))}
        </div>
      )}

      {Boolean(bottom) && bottom.length && (
        <div className="bottom-side">
          {bottom.map((panel, index) => (
            <PanelEntity key={index} panel={panel} />
          ))}
        </div>
      )}
      {Boolean(right) && right.length && (
        <div className="right-side">
          {right.map((panel, index) => (
            <PanelEntity key={index} panel={panel} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Panel;
