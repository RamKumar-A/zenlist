import { Box, Stack, Typography } from '@mui/material';
import { useTask } from '../Tasks/useTask';
import { BarChart } from '@mui/x-charts';

function prepareData(tasks) {
  const high = tasks?.filter((task) => task.priority === 'high').length;
  const medium = tasks?.filter((task) => task.priority === 'medium').length;
  const low = tasks?.filter((task) => task.priority === 'low').length;

  const data = [
    {
      id: 0,
      label: 'Low',
      value: low,
      color: '#0006ae',
    },
    {
      id: 1,
      label: 'Medium',
      value: medium,
      color: '#eca100',
    },
    {
      id: 2,
      label: 'High',
      value: high,
      color: '#f00',
    },
  ];

  return data;
  // return uData;
}

function DashboardBarChart() {
  const { data: tasks } = useTask();
  let data = prepareData(tasks);
  const xLabels = ['Low', 'Medium', 'High'];

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
        <Typography variant="h5" fontWeight={500} fontSize={18}>
          Task Priority Levels
        </Typography>
      </Box>
      <Box className="h-full w-full p-0.5 flex items-center">
        <BarChart
          height={400}
          series={[
            {
              data: [data[0].value], // Low
              label: 'Low',
              stack: 'total',
              color: data[0].color,
            },
            {
              data: [0, data[1].value], // Medium
              label: 'Medium',
              stack: 'total',
              color: data[1].color,
            },
            {
              data: [0, 0, data[2].value], // High
              label: 'High',
              stack: 'total',
              color: data[2].color,
            },
          ]}
          xAxis={[{ scaleType: 'band', data: xLabels }]}
          yAxis={[{ width: 50 }]}
          slotProps={{
            legend: {
              direction: 'row',
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
      </Box>
    </Stack>
  );
}

export default DashboardBarChart;
