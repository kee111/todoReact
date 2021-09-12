import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

// レンダリングされる前のtasks.lengsを保存し、返す関数
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
};

// 引数に入ったオブジェクトのkeyの値だけを取り出す関数
const FILTER_NAMES = Object.keys(FILTER_MAP);

// アプリのmainコンポーネント
function App(props) {
    // index.jsから受け取ったtasksの配列の値を操作するstate
    const [tasks, setTasks] = useState(props.tasks);

    const [filter, setFilter] = useState("All");

    // 引数に受け取った文字列で新しいタスクを追加する関数。Formコンポーネントに渡される
    function addTask(name) {
        const newTask = {
            // nanoidモジュールで重複しない文字列を生成
            id: "todo-" + nanoid(),
            name: name,
            completed: false,
        };
        // tasksに新しいタスクを追加
        setTasks([...tasks, newTask]);
    }

    // タスクを削除する関数。Todoコンポーネントに渡される
    function deleteTask(id) {
        // 配列を扱うfilterメソッドで、deleteボタンをクリックしたコンポーネントのidと、既存のtasksの配列の中から一致するタスクのidを比較
        // 一致しなかったものだけを抽出し新しい配列に作り替えて更新する。
        const remainingTasks = tasks.filter((task) => id !== task.id);
        setTasks(remainingTasks);
    }

    // タスクに新しい名前をつけて更新する関数。Todoコンポーネントに渡される
    function editTask(id, newName) {
        const editedTaskList = tasks.map((task) => {
            // 編集される予定のタスクのidと、既存のタスクを順番に比較。
            if (id === task.id) {
                // 一致したものが、入力した新しい名前に更新されて返り、editedTaskListに返る
                return { ...task, name: newName };
            }
            // 一致しなかったものは何も変更を加えずそのままeditedTaskListに返る
            return task;
        });
        // mapし終わって新しく更新されたeditedTaskListの配列で、tasksの中身が更新される
        setTasks(editedTaskList);
    }

    // タスクにチェックをつけたり、外したりするための関数。Todoコンポーネントに渡される
    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map((task) => {
            // チェックボックスにクリックが入ったタスクのidと、既存のタスクを順番に比較。
            if (id === task.id) {
                // 一致したもののbooleanが反転されて返る。trueで完了(チェック)falseは未完了
                return { ...task, completed: !task.completed };
            }
            // 一致しなかったものは何も変更を加えずそのままupdatedTasksに返る
            return task;
        });
        // mapし終わって新しく更新されたupdatedTasksの配列で、tasksの中身が更新される
        setTasks(updatedTasks);
    }

    // Todoコンポーネントの配列を作成
    const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
        <Todo
            id={task.id}
            name={task.name}
            completed={task.completed}
            key={task.id}
            // タスクにチェックをつけたり、外したりするための関数
            toggleTaskCompleted={toggleTaskCompleted}
            // タスクを削除する関数
            deleteTask={deleteTask}
            // タスクに新しい名前をつけて更新する関数
            editTask={editTask}
        />
    ));

    const filterList = FILTER_NAMES.map((name) => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
    const headingText = `${taskList.length} ${tasksNoun} remaining`;

    const listHeadingRef = useRef(null);
    const prevTaskLength = usePrevious(tasks.length);

    useEffect(() => {
        if (tasks.length - prevTaskLength === -1) {
            listHeadingRef.current.focus();
        }
    }, [tasks.length, prevTaskLength]);

    return (
        <div className="todoapp stack-large">
            <Form addTask={addTask} />
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
                {headingText}
            </h2>
            <ul
                role="list"
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
                {taskList}
            </ul>
        </div>
    );
}

export default App;
