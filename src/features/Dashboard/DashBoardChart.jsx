// import { parse } from 'date-fns';
import { Box, Stack, Typography } from '@mui/material';
import { useDashboardTask } from '../../context/DashboardContext';
import { PieChart } from '@mui/x-charts/PieChart';
import { useSearchParams } from 'react-router-dom';
import { isOverdue } from '../../helpers/isOverdue';

function prepareData(tasks) {
  const overdue =
    tasks?.filter((task) => {
      const overdue = isOverdue(task?.dueDate);
      return overdue;
    })?.length || 0;

  const inProgress = tasks?.filter((task) => !task.isCompleted).length;
  const completed = tasks?.filter((task) => task.isCompleted).length;
  const important = tasks?.filter(
    (task) => task.isImportant && !task.isCompleted
  ).length;
  const data = [
    {
      id: 0,
      label: 'In progress',
      value: inProgress,
      color: '#0006ae',
    },
    {
      id: 1,
      label: 'Completed',
      value: completed,
      color: '#008000',
    },
    {
      id: 2,
      label: 'Important',
      value: important,
      color: '#eca100',
    },
    {
      id: 3,
      label: 'Overdue',
      value: overdue,
      color: '#f00f00',
    },
    {
      id: 4,
      label: 'No Data',
      value: tasks?.length <= 0,
      color: '#000',
    },
  ];

  return data;
}

function DashboardChart() {
  return (
    <Stack
      sx={{
        bgcolor: 'background.paper',
        p: 1.5,
        borderRadius: 3,
        boxShadow: 4,
      }}
      className="w-full space-y-3 h-[70vh]"
    >
      <Box>
        <Typography variant="h5">Chart</Typography>
      </Box>
      <Stack className="h-full" alignSelf="center" justifyContent="center">
        <Chart />
      </Stack>
    </Stack>
  );
}

function Chart() {
  const [params] = useSearchParams();
  const { filterTask } = useDashboardTask();
  let data = prepareData(filterTask);
  data =
    params.get('task') !== 'all'
      ? data.filter((d) => d.label !== 'Overdue')
      : data;
  const COLORS = data?.map((d) => d.color);
  return (
    <PieChart
      sx={{ p: 1 }}
      width={300}
      height={300}
      colors={COLORS}
      series={[
        {
          data: data,
          innerRadius: 90,
          paddingAngle: 3,
          cornerRadius: 8,
          startAngle: -45,
          outerRadius: 130,
        },
      ]}
      // slots={{
      //   axisLabel: {
      //     color: '#000',
      //   },
      // }}
      margin={{ top: 0, bottom: 100, left: 100, right: 100 }}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'middle' },
          padding: 0,
          itemGap: 10,
        },
      }}
    />
  );
}

export default DashboardChart;
// <div >
//   <div >
//     <h1 className="text-lg font-medium lg:text-xl">Summary</h1>
//   </div>
//   <ResponsiveContainer
//     Container
//     width="100%"
//     height={400}
//     className=" mb-5 lg:mb-3"
//   >
//     <PieChart >
//       innerRadius={85}
//       outerRadius={110}
//       {filterTasks.length > 0 ? (
//         <Pie
//           data={data}
//           cx="50%"
//           cy="50%"
//           dataKey="value"
//           innerRadius={90}
//           outerRadius={120}
//           paddingAngle={5}
//         >
//           {data.map((entry, i) => (
//             <Cell
//               key={entry.name}
//               stroke={COLORS[i % COLORS.length]}
//               fill={COLORS[i % COLORS.length]}
//             />
//           ))}
//         </Pie>
//       ) : (
//         <Pie
//           data={[{ name: 'No Data', value: 1, color: 'blue' }]}
//           dataKey="value"
//         >
//           {data.map((entry, i) => (
//             <Cell key={entry.name} fill="#3b0764" />
//           ))}
//         </Pie>
//       )}
//       <Tooltip />
//       <Legend
//         // verticalAlign="middle"
//         // align="middle"
//         layout="horizontal"
//         iconSize={10}
//         iconType="square"
//       />
//     </PieChart>
//   </ResponsiveContainer>
// </div>
