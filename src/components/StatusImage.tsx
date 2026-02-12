import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { Status } from '@/types/enum';

interface StatusIconProps {
  status: Status;
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {

const statusIconMap: Record<Status, JSX.Element> = {

  [Status.SUCCESS]: <CheckCircleIcon  color="success" fontSize="medium" />,
  [Status.DONE]: <CheckCircleIcon color="success" fontSize="medium" />,
  [Status.FAILED]: <CancelIcon color="error" fontSize="medium" />,
  [Status.IN_PROCESS]: <HourglassEmptyIcon color="warning" fontSize="medium" />,
};
  return <>{statusIconMap[status]}</>;
};

export default StatusIcon;
