import { useState } from 'react';

import Template from '../../ui/Template';
import { useTask } from './useTask';

function ImportantTasks() {
  const [details, setDetails] = useState(null);

  const { data } = useTask();
  const tasks = data?.filter((d) => d.isImportant);

  function handleDetails(list) {
    setDetails(list);
  }

  return (
    <Template
      tasks={tasks}
      handleDetails={handleDetails}
      isImpTask={true}
      isAllTask={false}
      isList={false}
      details={details}
    />
  );
}

export default ImportantTasks;
