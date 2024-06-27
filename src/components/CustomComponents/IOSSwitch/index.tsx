import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';

export const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 40,
    height: 24,
    padding: 2,
    // margin: 4,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 6,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(14px)',
        
        '& .MuiSwitch-thumb': {
            color: 'blue',
            border: '1px solid blue',
        },
        '& + .MuiSwitch-track': {
            border: '1px solid blue',
          backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'white',
          opacity: 1,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      border: '1px solid rgba(180, 180, 180, 1)',
      boxSizing: 'border-box',
      width: 14,
      height: 14,
    },
    '& .MuiSwitch-track': {
        border: '1px solid rgba(180, 180, 180, 1)',
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? 'rgba(244, 244, 244, 1)' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));
  