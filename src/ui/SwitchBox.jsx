// import { useState } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

function SwitchBox({ isOn = false, isUpdating, toggleSwitch }) {
  return (
    <Box
      sx={{
        width: '40px',
        height: '20px',
        opacity: isUpdating ? '0.1' : '1',
        display: 'inline-flex',
        borderRadius: '1rem',
        p: '0.25rem',
        alignItems: 'center',
        cursor: 'pointer',
        bgcolor: isOn ? 'primary.main' : '#c2c2c2',
        justifyContent: isOn ? 'flex-end' : 'flex-start',
      }}
      disabled={isUpdating}
      className="switch"
      onClick={toggleSwitch}
    >
      <Handle
        sx={{
          width: '15px',
          height: '15px',
          borderRadius: '50%',
          bgcolor: '#fff',
        }}
        layout
        transition={spring}
      />
    </Box>
  );
}

const Handle = motion.create(Box);

// .switch {
//   width: 160px;
//   height: 100px;
//   background-color: rgba(255, 255, 255, 0.4);
//   display: flex;
//   justify-content: flex-start;
//   border-radius: 50px;
//   padding: 10px;
//   cursor: pointer;
// }

// .switch[data-isOn="true"] {
//   justify-content: flex-end;
// }

// .handle {
//   width: 80px;
//   height: 80px;
//   background-color: white;
//   border-radius: 40px;
// }

export default SwitchBox;
// export default function App() {
//   const [isOn, setIsOn] = useState(false);

//   const toggleSwitch = () => setIsOn(!isOn);

//   return (
//     <div className="switch" data-isOn={isOn} onClick={toggleSwitch}>
//       <motion.div className="handle" layout transition={spring} />
//     </div>
//   );
// }

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};
