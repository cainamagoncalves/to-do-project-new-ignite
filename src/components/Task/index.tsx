import { Trash } from 'phosphor-react';
import { useState } from 'react';

import styles from './index.module.css';

interface ITaskProps {
  content: string;
  completed: boolean;
  onCompleteOrRevokeTask: (task: string) => void;
  onDeleteTask: (task: string) => void;
}

export function Task({ content, completed, onCompleteOrRevokeTask, onDeleteTask }: ITaskProps) {

  function handleCompleteTask() {
    onCompleteOrRevokeTask(content);
  };

  function handleDeleteTask() {
    onDeleteTask(content);
  };

  return (
    <div className={styles.task}>
      <label className={styles.taskContent}>
        <input
          type="radio"
          defaultValue={content}
          checked={completed}
          onClick={handleCompleteTask}
        />
        <span></span>
        <label className={completed ? styles.finishedTask : styles.pendingTask}>{content}</label>
      </label>

      <Trash onClick={handleDeleteTask} size={20} />
    </div>
  );
}