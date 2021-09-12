// アプリのエントリーポイントになるファイル
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// 3つのオブジェクトの配列を持つ変数、DATA
// この配列がタスクを管理している
const DATA = [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false },
];

// htmlの"root"というIDがついたタグに、reactの基本データがレンダリングされる
// App.jsにtasksという名前でpropsを渡している
ReactDOM.render(<App tasks={DATA} />, document.getElementById("root"));
