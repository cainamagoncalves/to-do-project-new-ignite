import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import styles from './index.module.css';

interface ITaskFormProps {
  onCreateNewTask: (newTask: string) => void;
}

export function TaskForm({ onCreateNewTask }: ITaskFormProps) {
  const [newTask, setNewTask] = useState('');

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Insira um valor válido!');
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    onCreateNewTask(newTask);

    setNewTask('');
  }

  const isNewTaskEmpty = newTask.length === 0;

  return (
    <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
      <input
        name="task"
        type="text"
        value={newTask}
        onChange={handleNewTaskChange}
        onInvalid={handleNewTaskInvalid}
        placeholder="Adicione uma nova tarefa"
        required
      />
      <button title="Criar nova tarefa" disabled={isNewTaskEmpty}>Criar <PlusCircle size={20} /></button>
    </form>
  );
}