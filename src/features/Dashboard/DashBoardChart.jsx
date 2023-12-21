import { parse } from 'date-fns';
import { useDashboardTask } from './DashboardContext';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

function prepareData(tasks) {
  const curDate = new Date();

  const overDue = tasks?.filter(
    (task) =>
      parse(
        task.dueDate + ' ' + task.dueTime,
        'dd/M/yyyy hh:mm a',
        new Date()
      ) < curDate
  ).length;
  const finished = tasks?.filter((task) => task.finished).length;
  const important = tasks?.filter((task) => task.important).length;

  const data = [
    {
      name: 'Overdue',
      value: overDue,
    },
    {
      name: 'Finished',
      value: finished,
    },
    {
      name: 'Important',
      value: important,
    },
  ];

  return data;
}

function DashBoardChart() {
  const { filterTasks } = useDashboardTask();
  const data = prepareData(filterTasks);
  const COLORS = ['#FF0000', '#008000', '#0000FF'];
  return (
    <div className="bg-gray-100 dark:bg-gray-900 w-full rounded-lg border border-gray-500">
      <div className="mx-5 mt-5 ">
        <h1 className="text-xl font-semibold lg:text-2xl dark:text-gray-300">
          Summary
        </h1>
      </div>
      <ResponsiveContainer width="100%" height={400} className=" mb-5 lg:mb-3">
        <PieChart className="">
          innerRadius={85}
          outerRadius={110}
          {filterTasks.length > 0 ? (
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              dataKey="value"
              innerRadius={90}
              outerRadius={120}
              paddingAngle={5}
            >
              {data.map((entry, i) => (
                <Cell
                  key={entry.name}
                  stroke={COLORS[i % COLORS.length]}
                  fill={COLORS[i % COLORS.length]}
                />
              ))}
            </Pie>
          ) : (
            <Pie
              data={[{ name: 'No Data', value: 1, color: 'blue' }]}
              dataKey="value"
            >
              {data.map((entry, i) => (
                <Cell key={entry.name} fill="#3b0764" />
              ))}
            </Pie>
          )}
          <Tooltip />
          <Legend
            // verticalAlign="middle"
            // align="middle"
            layout="horizontal"
            iconSize={10}
            iconType="square"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashBoardChart;
