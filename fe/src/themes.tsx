import { createTheme } from "@mui/material";

export const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
                disableFocusRipple: true,
                disableRipple: true,
                disableTouchRipple: true,
                variant: 'contained',
              },
              styleOverrides: {
                root: () => ({
                  '&.Mui-disabled': {
                    opacity: 0.5,
                  },
                  '&:active': {
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    color: 'gray',
                  },
                  '&:hover': {
                    backgroundColor: 'gray',
                    boxShadow: 'none',
                    color: 'blue',
                  },
                  fontSize: '13px',
                  fontWeight: 600,
                  lineHeight: '18px',
                  color: 'blueviolet',
                  padding: '1em',
                  backgroundColor: 'white',
                  border: '2px solid grey',
                  borderRadius: 8,
                  textTransform: 'none',
                }),
            },
        },
        MuiToggleButton: {
          styleOverrides: {
            root: () => ({
              backgroundColor: 'white',
              border: '2px solid grey',
              borderRadius: 8,
            })
          }
        },
        MuiToggleButtonGroup: {
          styleOverrides: {
            root: ({ownerState}) => ({
            })
          }
        }
    }
})