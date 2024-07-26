import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import toast from 'react-hot-toast';

import {
  deleteTaskInList,
  finishedTaskInList,
  getList,
  importantTaskInList,
} from './listSlice';

import {
  deleteTask,
  finishedTask,
  importantTask,
  markedImportantTask,
} from '../Tasks/taskSlice';
import Error from '../../ui/Error';
import Template from '../../ui/Template';
import Section from '../../ui/Section';

function ListTemplate() {
  const location = useLocation();
  const [details, setDetails] = useState({});
  const dispatch = useDispatch();
  const lists = useSelector(getList);
  const selectedList1 = lists.find(
    (list) => list.name === location.state.listName
  );
  const selectedList2 = selectedList1 ? selectedList1.tasks : [];
  const selectedList = [...selectedList2]?.sort((a, b) => {
    if (a.finished && !b.finished) {
      return 1;
    }
    if (!a.finished && b.finished) {
      return -1;
    }
    return 0;
  });

  function handleFinished(task) {
    if (!task.finished) toast.success(`Congrats on finishing ${task?.desc}`);
    dispatch(finishedTask(task.id));
    dispatch(finishedTaskInList({ taskId: task.id, listId: task.listId }));
  }

  function handleDelete(task) {
    toast.error(`${task?.desc} removed `);
    dispatch(
      deleteTaskInList({
        listId: task.listId,
        taskId: task.id,
      })
    );
    dispatch(deleteTask(task.id));
  }

  function handleImportant(task) {
    if (!task.important) toast.success(`${task?.desc} marked as Important`);

    dispatch(markedImportantTask(task.id));
    dispatch(importantTask());
    dispatch(
      importantTaskInList({
        listId: task.listId,
        taskId: task.id,
      })
    );
  }

  function handleDetails(task) {
    setDetails(task);
  }

  if (!selectedList1) return <Error />;

  return (
    <Section title={selectedList1?.name} listId={selectedList1?.listId}>
      <Template
        handleDelete={handleDelete}
        handleDetails={handleDetails}
        handleFinished={handleFinished}
        handleImportant={handleImportant}
        tasks={selectedList}
        isList={true}
        isAllTask={false}
        isImpTask={false}
        listId={selectedList1?.listId}
        details={details}
        detailsOpen="List"
      />
    </Section>
  );
}

export default ListTemplate;
