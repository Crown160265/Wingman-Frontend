import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const SearchComponent = () => {
  return (
    <Box sx={{
      backgroundColor: '#fff',
      padding: '12px 6px',
      borderRadius: '8px',
      marginTop: '12px',
      marginBottom: '20px',
      boxShadow: '0px 1px 3px 0px rgba(25, 33, 61, 0.10)',
    }}>
      <TextField
        placeholder='Search for chats...'
        variant='standard'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>)
}

export default SearchComponent;
