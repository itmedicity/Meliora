import { taskColor } from "src/color/Color";


export const getStatusInfo = (val) => {
  
  switch (true) {
    case val.inch_level_acknowledge === 1 && val.inch_level_state === 'A' &&
         val.hod_level_acknowledge === 0 && val.condem_level === 0:
      return { text: 'INCHARGE APPROVED', bgcolor: taskColor.lightGreen };

    case val.inch_level_acknowledge === 1 && val.inch_level_state === 'R' &&
         val.hod_level_acknowledge === 0 && val.condem_level === 0:
      return { text: 'INCHARGE REJECTED', bgcolor: taskColor.lightRed };

    case val.hod_level_acknowledge === 1 && val.hod_level_state === 'A' && val.condem_level === 0:
      return { text: 'HOD APPROVED', bgcolor: taskColor.lightGreen };

    case val.hod_level_acknowledge === 1 && val.hod_level_state === 'R' && val.condem_level === 0:
      return { text: 'HOD REJECTED', bgcolor: taskColor.lightRed };

    case val.condem_level > 0 && val.condemn_level_state === 'A':
      return { text: `${val.current_lvl || ''} APPROVED`, bgcolor: taskColor.lightGreen };

    case val.condem_level > 0 && val.condemn_level_state === 'R':
      return { text: `${val.current_lvl || ''} REJECTED`, bgcolor: taskColor.lightRed };

    case val.inch_level_acknowledge === 0 || (val.hod_level_acknowledge === 0 && val.condem_level === 0):
      return { text: 'PENDING APPROVAL', bgcolor: taskColor.lightpurple };

    default:
      return { text: '', bgcolor: taskColor.lightpurple };
  }
};
