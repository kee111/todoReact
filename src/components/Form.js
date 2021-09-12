import React, { useState } from "react";

// 新しいタスクを追加するためのコンポーネント
function Form(props) {
    // 入力欄に反映させる文字をセットするstate
    const [name, setName] = useState("");

    // 入力された文字をレンダリングするハンドラー
    function handleChange(e) {
        setName(e.target.value);
    }

    // タスク追加ボタンが押された時に、追加処理と、入力欄を空文字列にリセットするハンドラー
    function handleSubmit(e) {
        e.preventDefault();
        props.addTask(name);
        setName("")
    }

    // タスク入力画面のjsx
    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}

export default Form;
