"use client"
import {Box, Button, IconButton, TextField} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Menu from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle'

const theme = createTheme({
    palette: {
      primary: {
        main: '#651fff',
      },
      secondary: {
        main: '#ea80fc',
      },
      white: {
        main: '#ffffff'
      }
    },
});

export default function Home() {


  return (
    <ThemeProvider theme = {theme}>
      <Box
      width={"100vw"}
      height={"100vw"}
      display={'flex'}
      flexDirection={'column'}
      bgcolor={'#000'}
      >
        <Box>
          <Box 
          width={'100%'} 
          height={"50px"} 
          bgcolor={'primary.main'} 
          display={'flex'} 
          padding={'20px'}
          justifyContent={'space-between'} 
          alignItems={'center'}
          color={'white'}>
            <Box display={'flex'} gap={'20px'}>
              <Box color='#ffffff'> Logo </Box>
              <Box color='#ffffff'> AIFlashCards </Box>
            </Box>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'20px'}>
              <Button color='secondary' variant='text' > Menu 1 </Button>
              <Button color='secondary' variant='text'> Menu 2 </Button>
              <Button color='secondary' variant='text'> Menu 3 </Button>
              <IconButton aria-label='Menu' color='secondary'> <Menu /> </IconButton>
              <IconButton aria-label='AccountCircle' color='secondary'> <AccountCircle /> </IconButton>
            </Box>
            
          </Box>
        </Box>
        <Box width={'100%'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} gap={'40px'}>
          <Box color={'#ffffff'} fontSize={'50px'}>Please enter your url!</Box>
          <Box width={'70%'} display={'flex'} justifyContent={'center'} alignItems={'center'} gap='20px'>
            <TextField fullWidth label="UrlTextField" id="UrlTextField" sx={{ input: { color: '#ffffff' } }} focused/>
            <Button variant='contained'>Submit</Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
