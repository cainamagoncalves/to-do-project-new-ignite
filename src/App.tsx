import { useState } from 'react';

import { TaskForm } from './components/TaskForm';
import { Header } from './components/Header';
import { Task } from './components/Task';

import styles from './App.module.css';
import './styles/global.css';

function App() {
  const [tasks, setTasks] = useState([
    { content: 'Integer urna interdum massa liberowqeq auctor neque turpis turpis semper. Duis vel sed fames integer.', completed: true },
  ]);

  function createNewTask(newTask: string) {
    setTasks([...tasks, { content: newTask, completed: false }]);
  }

  function completeOrRevokeTask(taskToChange: string) {
    const tasksWithoutChange = [...tasks];

    const taskToComplete = tasksWithoutChange.map(task => {
      return task.content === taskToChange ? task.completed === true ? { ...task, completed: false } : { ...task, completed: true } : task
    });

    setTasks(taskToComplete);
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDelete = [...tasks];

    const tasksAfterDelete = tasksWithoutDelete.filter(task => task.content !== taskToDelete);

    setTasks(tasksAfterDelete);
  }

  const createdTasksQuantity = tasks.length;
  const finishedTasksQuantity = tasks.filter(task => task.completed === true).length;

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>

        <TaskForm onCreateNewTask={createNewTask} />

        <header>
          <div className={styles.createdTasks}>
            <p>Tarefas criadas</p>
            <strong>{createdTasksQuantity}</strong>
          </div>
          <div className={styles.finishedTasks}>
            <p>Concluídas</p>
            <strong>{finishedTasksQuantity} de {createdTasksQuantity}</strong>
          </div>
        </header>
        <main>
          {tasks.map(task => {
            return (
              <Task
                key={task.content}
                content={task.content}
                completed={task.completed}
                onCompleteOrRevokeTask={completeOrRevokeTask}
                onDeleteTask={deleteTask}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}

export default App
