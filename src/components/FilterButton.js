import React from "react";

// フィルターボタンで表示を切り替えるためのコンポーネント
function FilterButton(props) {
    return (
        <button
            type="button"
            className="btn toggle-btn"
            aria-pressed={props.isPressed}
            // ボタンが押されたフィルターの名前に変更
            onClick={() => props.setFilter(props.name)}
        >
            <span className="visually-hidden">Show </span>
            <span>{props.name}</span>
            <span className="visually-hidden"> tasks</span>
        </button>
    );
}

export default FilterButton;
