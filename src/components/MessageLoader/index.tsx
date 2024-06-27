import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

const MessageLoader = () => {
  return (
    <Card sx={{
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: 'transparent',
      minHeight: '60px',
      boxShadow: 'none',
      border: 'none',
      marginBottom: '40px',
    }}>
      <Card sx={{
        width: '80px',
        marginLeft: '2px',
        minHeight: '40px',
        padding: '15px 20px 15px 20px',
        boxShadow: '0px 2px 4px 0px rgba(25, 33, 61, 0.08)',
        border: '1px solid #F0F2F5',
        borderRadius: '16px',
      }}>
        <Box sx={{
          "@keyframes l1": {
            "to": {
              clipPath: "inset(0 -34% 0 0)"
            }
          },
          width: '35px',
          aspectRatio: 4,
          background: 'radial-gradient(circle closest-side,#666F8D 90%,#0000) 0/calc(100%/3) 100% space',
          color: '#666F8D',
          clipPath: 'inset(0 100% 0 0)',
          animation: 'l1 1s steps(4) infinite',
          textAlign: 'center',
        }}>.</Box>
      </Card>
    </Card>
  );
}

export default MessageLoader;
