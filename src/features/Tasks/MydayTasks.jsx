import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import {
  deleteTask,
  finishedTask,
  markedImportantTask,
  importantTask,
  selectTasks,
} from './taskSlice';

import {
  deleteTaskInList,
  finishedTaskInList,
  importantTaskInList,
} from '../Lists/listSlice';

import Template from '../../ui/Template';

function MydayTasks() {
  const [details, setDetails] = useState(null);
  const dispatch = useDispatch();
  const tasks1 = useSelector(selectTasks);
  const tasks = [...tasks1].sort((a, b) => {
    if (a?.finished && !b?.finished) return 1;
    if (!a?.finished && b?.finished) return -1;
    return 0;
  });

  function handleDelete(list) {
    toast.error('Task Removed ');
    dispatch(deleteTask(list.id));
    dispatch(deleteTaskInList({ listId: list.listId, taskId: list.id }));
  }

  function handleDetails(list) {
    setDetails(list);
  }

  function handleFinished(list) {
    if (!list.finished) toast.success('Congrats on finishing task');
    dispatch(finishedTask(list.id));
    dispatch(finishedTaskInList({ listId: list.listId, taskId: list.id }));
  }

  function handleImportant(list) {
    if (!list.important) toast.success('Task Marked as important');
    dispatch(markedImportantTask(list.id));
    dispatch(importantTask());
    dispatch(
      importantTaskInList({
        listId: list.listId,
        taskId: list.id,
      })
    );
  }

  return (
    <Template
      handleDelete={handleDelete}
      handleDetails={handleDetails}
      handleFinished={handleFinished}
      handleImportant={handleImportant}
      details={details}
      detailsOpen="myday"
      tasks={tasks}
      isTodayTask={true}
      isAllTask={false}
      isImpTask={false}
      isList={false}
    />
  );
}

export default MydayTasks;
