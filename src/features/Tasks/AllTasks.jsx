import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import {
  deleteTaskInList,
  finishedTaskInList,
  importantTaskInList,
} from '../Lists/listSlice';

import {
  selectAllTask,
  deleteTask,
  finishedTask,
  markedImportantTask,
  importantTask,
} from './taskSlice';

import Template from '../../ui/Template';

function AllTasks() {
  const [details, setDetails] = useState(null);
  const dispatch = useDispatch();
  const allTask = useSelector(selectAllTask);
  const lists = useSelector((state) => state.lists.data);

  const newTaskInList = lists.flatMap((all) => all.tasks);
  const combinedTask = allTask.concat(newTaskInList);
  const set = new Set(combinedTask.map((task) => task.id));
  const allTasks1 = Array.from(set, (id) =>
    combinedTask.find((task) => task.id === id)
  );

  const allTasks = [...allTasks1]?.sort((a, b) => {
    if (a.finished && !b.finished) {
      return 1;
    }
    if (!a.finished && b.finished) {
      return -1;
    }
    return 0;
  });

  function handleFinished(list) {
    if (!list.finished) toast.success(`Congrats on finishing ${list?.desc}`);
    dispatch(finishedTask(list.id));
    dispatch(finishedTaskInList({ listId: list.listId, taskId: list.id }));
  }

  function handleDelete(list) {
    toast.error(`${list?.desc} removed `);
    dispatch(deleteTaskInList({ listId: list.listId, taskId: list.id }));
    dispatch(deleteTask(list.id));
  }

  function handleImportant(list) {
    if (!list.important) toast.success(`${list?.desc} marked as Important`);
    dispatch(markedImportantTask(list.id));
    dispatch(importantTask());
    dispatch(
      importantTaskInList({
        listId: list.listId,
        taskId: list.id,
      })
    );
  }

  function handleDetails(list) {
    setDetails(list);
  }

  return (
    <Template
      isAllTask={true}
      isImpTask={false}
      isList={false}
      handleDetails={handleDetails}
      handleDelete={handleDelete}
      handleFinished={handleFinished}
      handleImportant={handleImportant}
      tasks={allTasks}
      details={details}
      detailsOpen="allTasksOpen"
    />
  );
}

export default AllTasks;
