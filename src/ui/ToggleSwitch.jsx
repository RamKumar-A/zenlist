import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  width: 50px;
  height: 25px;
  background-color: ${(props) => (props.isActive ? '#dc2626' : '#57534e')};
  border-radius: 15px;
  /* border: 2px solid black; */
  position: relative;
  cursor: pointer;
`;

const ToggleSlider = styled.div`
  width: 25px;
  height: 25px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 0;
  /* transform: translateY(7%); */
  left: ${(props) => (props.isActive ? '25px' : '0')};
  transition: left 0.3s ease-in-out;
  /* padding: 5px; */
`;

const ToggleSwitch = ({ tasks, taskId, listId }) => {
  // const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(tasks?.reminder);
  };
  // const { reminder } = tasks;
  // console.log(reminder);
  return (
    <ToggleContainer isActive={isActive} onClick={handleClick}>
      <ToggleSlider isActive={isActive} />
    </ToggleContainer>
  );
};

export default ToggleSwitch;
