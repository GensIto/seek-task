import { useState, useEffect, ChangeEvent, useMemo } from "react";
import "./App.css";

type TaskType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [tasks, setTasks] = useState([]);

  const url = "https://jsonplaceholder.typicode.com/todos";

  const fetchTasks = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  };

  const handleSeekDone = () => {
    const doneTask = [...tasks];
    const result = doneTask.filter((task: TaskType) => {
      return task.completed == false;
    });
    const doneTasks = [...result];
    setTasks(doneTasks);
    if (!tasks.length) {
      fetchTasks();
    }
  };

  const handleSeekDoing = () => {
    const doingTask = [...tasks];
    const result = doingTask.filter((task: TaskType) => {
      return task.completed == true;
    });
    const doingTasks = [...result];
    setTasks(doingTasks);
    if (!tasks.length) {
      fetchTasks();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    const result = tasks.filter((task: TaskType) => {
      return task.title.includes(searchKeyword);
    });
    setTasks(result);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <p>HI!</p>
      <input value={searchKeyword} onChange={handleChange} />
      <button onClick={handleSeekDone}>Seek Done</button>
      <button onClick={handleSeekDoing}>Seek Doing</button>
      <ul>
        {tasks.map((task: TaskType) => {
          return (
            <li key={task.id}>
              <p>{task.userId}</p>
              <p>{task.title}</p>
              <p>{task.completed ? "doing" : "done"}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
