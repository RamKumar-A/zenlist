import { Box, Stack, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { isOverdue } from '../../helpers/isOverdue';
import { useTask } from '../Tasks/useTask';

function prepareData(tasks) {
  const overdue =
    tasks?.filter((task) => {
      const overdue = isOverdue(task?.dueDate);
      return overdue;
    })?.length || 0;

  const completed = tasks?.filter((task) => task.isCompleted).length;

  const pending = tasks?.filter((task) => {
    const overdue = isOverdue(task?.dueDate);
    return !overdue && !task.isCompleted;
  }).length;

  const important = tasks?.filter(
    (task) => task.isImportant && !task.isCompleted
  ).length;

  const data = [
    {
      id: 0,
      label: 'Pending',
      value: pending,
      color: '#b100f8',
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
      color: '#ff5500',
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
      color: '#393939',
    },
  ];

  return data;
}

function DashboardPieChart() {
  return (
    <Stack
      sx={{
        bgcolor: 'background.paper',
        p: { mobile: 1, tablet: 3 },
        borderRadius: 3,
        // boxShadow: 4,
      }}
      className="w-full "
    >
      <Box>
        <Typography variant="h5" fontSize={18} fontWeight={500}>
          Task Distribution
        </Typography>
      </Box>
      <Box className="h-full w-full p-0.5 flex items-center">
        <Chart />
      </Box>
    </Stack>
  );
}

function Chart() {
  const { data: tasks } = useTask();
  let data = prepareData(tasks);

  const COLORS = data?.map((d) => d.color);
  return (
    <PieChart
      sx={{
        p: 1,
      }}
      width={270}
      height={400}
      colors={COLORS}
      series={[
        {
          data: data,
          innerRadius: 75,
          paddingAngle: 1.5,
          cornerRadius: 5,
          startAngle: -45,
          outerRadius: 130,
          highlightScope: { fade: 'global', highlight: 'item' },
        },
      ]}
      slots={{
        tooltip: {
          color: '#000',
        },
      }}
      margin={{
        top: 0,
        bottom: 50,
        left: 100,
        // right: 100,
      }}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'middle' },
          padding: 0,
          itemGap: 10,
          labelStyle: {
            fontSize: '0.9rem',
            textTransform: 'capitalize',
          },
          markGap: 6,
          itemMarkWidth: 7,
          itemMarkHeight: 7,
        },
      }}
    />
  );
}

export default DashboardPieChart;
