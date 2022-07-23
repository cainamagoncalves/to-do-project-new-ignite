import { useState } from 'react';

import { TaskForm } from './components/TaskForm';
import { Header } from './components/Header';
import { Task } from './components/Task';

import clipboardImage from './assets/clipboard-image.svg';

import styles from './App.module.css';
import './styles/global.css';

interface ITasksProps {
  content: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITasksProps[]>([]);

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
  const isTasksEmpty = tasks.length === 0;

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
          {isTasksEmpty ? (
            <div className={styles.emptyTasks}>
              <img src={clipboardImage} alt="Prancheta vazia" />
              <div className={styles.emptyTasksContent}>
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            </div>
          ) : (
            tasks.map(task => {
              return (
                <Task
                  key={task.content}
                  content={task.content}
                  completed={task.completed}
                  onCompleteOrRevokeTask={completeOrRevokeTask}
                  onDeleteTask={deleteTask}
                />
              )
            })
          )}

        </main>
      </div>
    </div>
  )
}

export default App
