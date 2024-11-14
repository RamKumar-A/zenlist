import { useState } from 'react';

import Template from '../../ui/Template';
import { useTask } from '../Tasks/useTask';

function MydayTasks() {
  const [details, setDetails] = useState(null);

  const { data } = useTask();
  const tasks = data?.filter((d) => d?.isToday);

  function handleDetails(list) {
    setDetails(list);
  }

  return (
    <Template
      handleDetails={handleDetails}
      details={details}
      tasks={tasks}
      isTodayTask={true}
      isAllTask={false}
      isImpTask={false}
    />
  );
}

export default MydayTasks;
