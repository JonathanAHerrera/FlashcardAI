"use client"
import {Box} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles'

const theme = createTheme({
    palette: {
      primary: {
        main: '#651fff',
      },
      secondary: {
        main: '#ea80fc',
      },
    },
});

export default function Home() {
  return (
    <Box
    width={"100vw"}
    height={"100vw"}
    display={'flex'}
    flexDirection={'column'}
    bgcolor={'#000'}
    >
      <Box>
        <Box width={'100%'} height={"30px"} bgcolor={theme.palette.primary.main}></Box>
      </Box>
    </Box>
  );
}
