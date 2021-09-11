import React, { useEffect, useRef, useState } from "react";

// todoリストの編集をレンダリングするコンポーネント
export default function Todo(props) {
    // 画面切り替え用state、falseで標準画面、trueで編集画面
    const [isEditing, setEditing] = useState(false);
    // 編集画面入力フォームのレンダリング
    const [newName, setNewName] = useState("");

    // 編集画面入力フォームを参照、フォーカス
    const editFieldRef = useRef(null);
    // 編集ボタンを参照、フォーカス
    const editButtonRef = useRef(null);

    // 変更前のstateがwasEditingの中に入る。初回はundefined
    const wasEditing = usePrevious(isEditing);

    // フォーカスをする前の厳密な状態チェック
    // 画面が切り替わると実行される
    useEffect(() => {
        // 編集画面かつ編集画面なら、編集画面入力フォームをフォーカス
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
        }
        // 標準画面かつ標準画面なら、編集ボタンをフォーカス
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
        //画面が切り替わったかチェックする
    }, [wasEditing, isEditing]);

    // 引数に画面切り替え用のstate、boolean型のisEditingを受け取り、変更前のstateを返す関数
    function usePrevious(value) {
        const ref = useRef();
        // useEffectで定義しているので、レンダリングが終わった後に実行される
        // 1回目のレンダリング終了時falseがcurrentに代入される
        useEffect(() => {
            ref.current = value;
        });
        // 先に実行される。初回はuseEffectが実行される前に実行されるのでundefinedが返る
        // 2回目の実行時には1回目でcurrentに登録したfalseが入る
        return ref.current;
    }

    // 編集画面入力フォームに入力された内容をレンダリングし続けるハンドラー
    function handleChange(e) {
        setNewName(e.target.value);
    }

    // 編集画面のセーブボタンが押された時に画面を切り替えるハンドラー
    function handleSubmit(e) {
        e.preventDefault();
        // 編集
        props.editTask(props.id, newName);
        // 入力画面を空文字列でリセット
        setNewName("");
        // 画面切り替え
        setEditing(false);
    }

    // 編集時の画面
    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                {/* 入力フォーム */}
                <input
                    id={props.id}
                    className="todo-text"
                    type="text"
                    value={newName}
                    onChange={handleChange}
                    ref={editFieldRef}
                />
            </div>
            <div className="btn-group">
                {/* キャンセルボタン　押すとfalse */}
                <button
                    type="button"
                    className="btn todo-cancel"
                    onClick={() => setEditing(false)}
                >
                    Cancel
                    <span className="visually-hidden">
                        renaming {props.name}
                    </span>
                </button>
                {/* セーブボタン */}
                <button type="submit" className="btn btn__primary todo-edit">
                    Save
                    <span className="visually-hidden">
                        new name for {props.name}
                    </span>
                </button>
            </div>
        </form>
    );
    // 通常時の画面
    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                {/* チェックボックス */}
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <div className="btn-group">
                {/* 編集ボタン 押すとtrue*/}
                <button
                    type="button"
                    className="btn"
                    onClick={() => setEditing(true)}
                    ref={editButtonRef}
                >
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                {/* 消すボタン */}
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => props.deleteTask(props.id)}
                >
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    );

    return (
        <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
    );
}
