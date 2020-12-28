import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./HandMatrix.css";

export const combos = [
  "AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
  "AKo", "KK", "KQs", "KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s",
  "AQo", "KQo", "QQ", "QJs", "QTs", "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s", "Q3s", "Q2s",
  "AJo", "KJo", "QJo", "JJ", "JTs", "J9s", "J8s", "J7s", "J6s", "J5s", "J4s", "J3s", "J2s",
  "ATo", "KTo", "QTo", "JTo", "TT", "T9s", "T8s", "T7s", "T6s", "T5s", "T4s", "T3s", "T2s",
  "A9o", "K9o", "Q9o", "J9o", "T9o", "99", "98s", "97s", "96s", "95s", "94s", "93s", "92s",
  "A8o", "K8o", "Q8o", "J8o", "T8o", "98o", "88", "87s", "86s", "85s", "84s", "83s", "82s",
  "A7o", "K7o", "Q7o", "J7o", "T7o", "97o", "87o", "77", "76s", "75s", "74s", "73s", "72s",
  "A6o", "K6o", "Q6o", "J6o", "T6o", "96o", "86o", "76o", "66", "65s", "64s", "63s", "62s",
  "A5o", "K5o", "Q5o", "J5o", "T5o", "95o", "85o", "75o", "65o", "55", "54s", "53s", "52s",
  "A4o", "K4o", "Q4o", "J4o", "T4o", "94o", "84o", "74o", "64o", "54o", "44", "43s", "42s",
  "A3o", "K3o", "Q3o", "J3o", "T3o", "93o", "83o", "73o", "63o", "53o", "43o", "33", "32s",
  "A2o", "K2o", "Q2o", "J2o", "T2o", "92o", "82o", "72o", "62o", "52o", "42o", "32o", "22",
];

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const ComboTile = React.memo(
  ({
    combo,
    styles = {},
    comboSubtext = "",
    showText = true,
    colorize = true,
  }) => {
    return (
      <div
        data-combo={combo}
        className="hand-matrix-cell"
        style={{ flex: "1 1 0px" }}
      >
        <div
          data-combo={combo}
          className={colorize ? getComboClassName(combo) : null}
          style={{
            display: "flex",
            flexDirection: "column",
            ...styles,
          }}
        >
          {showText && (
            <>
              <div data-combo={combo} style={{ flexGrow: 1 }} type="keyboard">
                {combo}
              </div>
              <div data-combo={combo}>{comboSubtext}</div>
            </>
          )}
        </div>
      </div>
    );
  }
);

const ComboRow = React.memo(
  ({
    row,
    comboStyle,
    comboSubtext,
    showText,
    colorize,
  }) => (
    <div className="hand-matrix-row">
      {row.map((combo, j) => (
        <ComboTile
          key={j}
          combo={combo}
          showText={showText}
          comboSubtext={comboSubtext ? comboSubtext(combo) : ""}
          styles={comboStyle ? comboStyle(combo) : {}}
          colorize={colorize}
        />
      ))}
    </div>
  )
);

/**
 * Texas Hold'em hand matrix component
 */
function HandMatrix({
  comboSubtext,
  comboStyle,
  onSelect,
  onPointerDown,
  onPointerUp,
  onPointerEnter,
  onPointerMove,
  showText,
  colorize,
}) {
  let currentlyPointingAt;
  const getComboForPointerEvent = (e) => document.elementFromPoint(e.clientX, e.clientY).dataset.combo;
  const comboEventDispatcher = fn => e => {
    if (!fn) return;
    const combo = getComboForPointerEvent(e);
    if (combo && combos.indexOf(combo) !== -1) {
      fn && fn(combo)
    }
  }

  return (
    <div
      className={`hand-matrix ${onSelect || onPointerDown ? "selectable" : "unselectable"}`}
      onClick={comboEventDispatcher(onSelect)}
      onPointerUp={comboEventDispatcher(onPointerUp)}
      onPointerDown={comboEventDispatcher(onPointerDown)}
      onPointerMove={comboEventDispatcher((combo) => {
        onPointerMove && onPointerMove(combo);
        if (combo !== currentlyPointingAt) {
          currentlyPointingAt = combo;
          // Note: This is used instead of onPointerEnter for Safari support
          onPointerEnter && onPointerEnter(combo)
        }
      })}
    >
      {chunk(combos, 13).map((row, i) => (
        <ComboRow
          key={i}
          showText={showText}
          comboSubtext={comboSubtext}
          comboStyle={comboStyle}
          row={row}
          colorize={colorize}
        />
      ))}
    </div>
  );
}

function getComboClassName(combo) {
  if (combo.length === 2) {
    return "pair";
  } else if (combo.endsWith("s")) {
    return "suited";
  } else {
    return "offsuit";
  }
}

HandMatrix.propTypes = {
  /**
   * Whether to apply default colors to the hand matrix to distinguish
   * pairs vs offsuit vs suited hands. The result of the comboStyle
   * function will override the default colors.
   */
  colorize: PropTypes.bool,
  /**
   * Whether to show the text in the combo tyles
   */
  showText: PropTypes.bool,
  /**
   * Function which receives the combo (e.g. AKo) and must return
   * the text or React components to display beneath the combo text.
   * Default is for no text to be displayed. Useful for displaying
   * information such as combo equity
   */
  comboSubtext: PropTypes.func,
  /**
   * Function which receives the combo (e.g. AKo) and must return
   * an object containing the styles to apply to the matrix tile
   * for that combo e.g. {background: "#FFFFFF"}. Useful for
   * displaying ranges.
   */
  comboStyle: PropTypes.func,
  /**
   * Click/touch event handler for a combo tile. Will be called with
   * combo e.g. AKo
   */
  onSelect: PropTypes.func,
  /**
   * Pointer up event handler for a combo tile. Will be called with
   * combo e.g. AKo
   */
  onPointerUp: PropTypes.func,
  /**
   * Pointer down event handler for a combo tile. Will be called with
   * combo e.g. AKo
   */
  onPointerDown: PropTypes.func,
  /**
   * Pointer enter event handler for a combo tile. Will be called with
   * combo e.g. AKo
   */
  onPointerEnter: PropTypes.func,
  /**
   * Pointer move event handler for a combo tile. Will be called with
   * combo e.g. AKo
   */
  onPointerMove: PropTypes.func,
};

HandMatrix.defaultProps = {
  showText: true,
  colorize: true,
};

export default HandMatrix;
