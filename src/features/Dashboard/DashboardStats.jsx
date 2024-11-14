import { PiSigma } from 'react-icons/pi';
import {
  MdLabelImportantOutline,
  MdOutlinePlaylistAddCheck,
  MdOutlinePlaylistRemove,
} from 'react-icons/md';
import {
  Avatar,
  Grid2,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useDashboardTask } from '../../context/DashboardContext';
import { isOverdue } from '../../helpers/isOverdue';

function DashboardStats() {
  const { allTask } = useDashboardTask();

  const impTaskLen = allTask?.filter((task) => task.isImportant)?.length || 0;
  const finishedTaskLen =
    allTask?.filter((task) => task.isCompleted)?.length || 0;

  const overdue =
    allTask?.filter((task) => {
      const overdue = isOverdue(task);
      return overdue;
    })?.length || 0;

  const allTaskData = [
    {
      title: 'Total Task',
      dataLength: allTask?.length || 0,
      icon: <PiSigma size={25} />,
    },
    {
      title: 'Important',
      dataLength: impTaskLen || 0,
      icon: <MdLabelImportantOutline size={25} />,
    },
    {
      title: 'Finished',
      dataLength: finishedTaskLen,
      icon: <MdOutlinePlaylistAddCheck size={25} />,
    },
    {
      title: 'Ovedue',
      dataLength: overdue,
      icon: <MdOutlinePlaylistRemove size={25} />,
    },
  ];

  return allTaskData.map(({ title, icon, dataLength }) => (
    <Grid2 key={title} size={{ mobile: 6, desktop: 3 }}>
      <ListItem
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 5,
        }}
        className="space-x-1.5 md:space-x-3 lg:space-x-5"
      >
        <Avatar
          sx={{
            width: { mobile: '2.5rem', tablet: '3.5rem' },
            height: { mobile: '2.5rem', tablet: '3.5rem' },
          }}
        >
          {icon}
        </Avatar>
        <ListItemText
          primary={
            <Typography fontWeight={300} fontSize="0.9rem">
              {title}
            </Typography>
          }
          secondary={
            <Typography
              fontWeight={600}
              fontSize={{ mobile: '1.5rem', tablet: '1.8rem' }}
            >
              {dataLength}
            </Typography>
          }
        />
      </ListItem>
    </Grid2>
  ));
}

export default DashboardStats;
