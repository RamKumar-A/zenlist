import React, { useState } from 'react';
import { useLocation } from 'react-router';

import Template from '../../ui/Template';
import { useTask } from '../Tasks/useTask';

function List() {
  const location = useLocation();
  const { listId } = location.state;
  const [details, setDetails] = useState({});

  const { data } = useTask();
  const tasks = data?.filter((d) => d.listId === listId);

  function handleDetails(task) {
    setDetails(task);
  }

  return (
    <Template handleDetails={handleDetails} details={details} tasks={tasks} />
  );
}

export default List;
