import { NavLink } from 'react-router-dom';
import User from '../features/Users/User';
import { HiHashtag, HiOutlineCalendarDays } from 'react-icons/hi2';
import Mylist from '../features/Lists/Mylist';

import { FaTasks } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTask } from '../features/Tasks/useTask';

function SideBarElements() {
  const { data: tasks } = useTask();

  const importantTasks = tasks?.filter((task) => task.isImportant);
  const todayTasks = tasks?.filter((task) => task.isToday);

  const datas = [
    {
      to: '/',
      text: 'My Day',
      taskLength: todayTasks,
      icons: <HiOutlineCalendarDays />,
    },
    {
      to: '/importanttasks',
      text: 'Important',
      taskLength: importantTasks,
      icons: <HiHashtag />,
    },
    {
      to: '/alltasks',
      text: 'All Tasks',
      taskLength: tasks,
      icons: <FaTasks />,
    },
    {
      to: '/dashboard?task=today',
      text: 'Dashboard',
      icons: <MdOutlineDashboard />,
    },
  ];

  return (
    <Box sx={{ px: { mobile: 1, tablet: 0 } }}>
      <User />

      <List component="nav" sx={{ width: '100%' }}>
        {datas?.map((item) => (
          <ListItems items={item} key={item.text} />
        ))}
        <Divider />
        <Mylist />
      </List>
    </Box>
  );
}

function ListItems({ items }) {
  return (
    <NavLink to={items?.to}>
      <ListItem component="div" disablePadding sx={{ px: 1, py: 1, my: 1 }}>
        <ListItemIcon sx={{ fontSize: 16, width: 'fit-content' }}>
          <Avatar sx={{ color: 'text.primary', bgcolor: 'secondary.light' }}>
            {items?.icons}
          </Avatar>
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography fontWeight={500} fontSize={16.5}>
              {items?.text}
            </Typography>
          }
        />
        <Typography sx={{ whiteSpace: 'nowrap' }} fontSize={10}>
          {items?.taskLength?.length}
        </Typography>
      </ListItem>
    </NavLink>
  );
}

export default SideBarElements;
