import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import {
  deleteTask,
  finishedTask,
  importantTask,
  markedImportantTask,
  selectImpTask,
} from './taskSlice';
import {
  deleteTaskInList,
  finishedTaskInList,
  importantTaskInList,
} from '../Lists/listSlice';
import Template from '../../ui/Template';

function ImportantTasks() {
  const [details, setDetails] = useState(null);

  const dispatch = useDispatch();

  const impTask = useSelector(selectImpTask);
  const lists = useSelector((state) => state.lists.data);

  const impTaskInList = lists
    .flatMap((all) => all.tasks)
    .filter((task) => task.important);

  const combinedTask = impTask?.concat(impTaskInList);
  const set = new Set(combinedTask.map((task) => task.id));
  const task1 = Array.from(set, (id) =>
    combinedTask.find((task) => task.id === id)
  );

  const task = [...task1]?.sort((a, b) => {
    if (a.finished && !b.finished) {
      return 1;
    }
    if (!a.finished && b.finished) {
      return -1;
    }
    return 0;
  });

  function handleFinished(list) {
    if (!list.finished) toast.success('Congrats on finishing task');
    dispatch(finishedTask(list.id));
    dispatch(finishedTaskInList({ listId: list.listId, taskId: list.id }));
  }

  function handleImportant(list) {
    dispatch(markedImportantTask(list.id));
    dispatch(importantTask());
    dispatch(
      importantTaskInList({
        listId: list.listId,
        taskId: list.id,
      })
    );
  }

  function handleDelete(list) {
    toast.error('Task Removed ');
    dispatch(deleteTask(list.id));
    dispatch(deleteTaskInList({ listId: list.listId, taskId: list.id }));
  }

  function handleDetails(list) {
    setDetails(list);
  }

  return (
    <Template
      tasks={task}
      handleDelete={handleDelete}
      handleDetails={handleDetails}
      handleFinished={handleFinished}
      handleImportant={handleImportant}
      isImpTask={true}
      isAllTask={false}
      isList={false}
      details={details}
      detailsOpen="impTasksOpen"
    />
  );
}

export default ImportantTasks;
