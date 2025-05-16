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
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { isOverdue } from '../../helpers/isOverdue';
import { useTask } from '../Tasks/useTask';

function DashboardStats() {
  const { data: allTask } = useTask();

  const impTaskLen = allTask?.filter((task) => task.isImportant)?.length || 0;
  const finishedTaskLen =
    allTask?.filter((task) => task.isCompleted)?.length || 0;

  const overdue =
    allTask?.filter((task) => {
      const overdue = isOverdue(task?.dueDate);
      return overdue;
    })?.length || 0;

  const allTaskData = [
    {
      title: 'Total Task',
      dataLength: allTask?.length || 0,
      icon: <PiSigma />,
    },
    {
      title: 'Important',
      dataLength: impTaskLen || 0,
      icon: <MdLabelImportantOutline />,
    },
    {
      title: 'Finished',
      dataLength: finishedTaskLen,
      icon: <MdOutlinePlaylistAddCheck />,
    },
    {
      title: 'Ovedue',
      dataLength: overdue,
      icon: <MdOutlinePlaylistRemove />,
    },
  ];
  return (
    // <List sx={{ width: '100%' }}>
    <Grid2
      container
      columnSpacing={{ tablet: 2, mobile: 1 }}
      rowSpacing={1}
      sx={{ width: '100%' }}
    >
      {allTaskData.map(({ title, icon, dataLength }) => (
        <Grid2 key={title} size={{ mobile: 6, desktop: 3 }}>
          <ListItem
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              // boxShadow: 3,
              py: { mobile: 1, tablet: 2 },
            }}
            className="sm:space-x-1.5 md:space-x-3 lg:space-x-5  max-sm:flex-col max-sm:items-center "
          >
            <ListItemIcon sx={{ fontSize: 16 }}>
              <Avatar
                sx={{
                  color: 'text.primary',
                  bgcolor: 'secondary.light',
                }}
              >
                {icon}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <>
                  <Typography
                    fontWeight={600}
                    fontSize={{ mobile: '1.5rem', tablet: 20 }}
                    component="span"
                  >
                    {dataLength}
                    {'  '}
                    <Typography
                      fontSize={16.5}
                      component="span"
                      className="opacity-50"
                    >
                      {title}
                    </Typography>
                  </Typography>
                </>
              }
              // secondary={
              // }
            />
          </ListItem>
        </Grid2>
      ))}
    </Grid2>
    // </List>
  );
}

export default DashboardStats;
