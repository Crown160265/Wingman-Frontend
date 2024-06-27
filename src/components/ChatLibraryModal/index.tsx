import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CallMadeIcon from '@mui/icons-material/CallMade';

import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

import { libraryMessages } from '../../default/libraryMessages';

interface Props {
  handleSendMessage: (content: string) => void;
}

const CharLibraryModal: React.FC<Props> = ({ handleSendMessage }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSendMessageFromLibrary = (title: string) => {
    handleSendMessage(title);
    handleClose();
  }

  return (
    <div>
      <Button
        sx={{
          borderRadius: '8px',
          color: 'primary.dark',
          border: '1px solid #F0F2F5',
          background: '#F7F8FA',
          boxShadow: '0px 1px 3px 0px rgba(25, 33, 61, 0.10)',
          ':hover': {
            background: '#F7F8FA',
          }
        }}
        onClick={handleOpen}
        variant="contained"
        startIcon={<CollectionsBookmarkIcon />}
      >
        Library
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={open}>
          <ModalContent sx={style}>
            <Typography className="modal-title">
              library
            </Typography>
            <Button
              sx={{
                width: '150px',
                margin: 'auto',
                borderRadius: '8px',
                color: 'primary.dark',
                border: '1px solid #F0F2F5',
                background: '#F7F8FA',
                textTransform: 'none',
              }}
              startIcon={<CollectionsBookmarkIcon />}
            >
              My Prompts
            </Button>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {
                libraryMessages.map((message, index) => {
                  return (
                    <>
                      <Divider />
                      <ListItem key={index}>
                        <ListItemText
                          sx={{ color: 'text.secondary' }}
                          primary={message.title}
                        />
                        <IconButton
                          onClick={() => handleSendMessageFromLibrary(message.title)}
                          edge="end"
                          aria-label="delete"
                          sx={{ borderRadius: '8px', backgroundColor: '#F7F8FA' }}
                        >
                          <CallMadeIcon />
                        </IconButton>
                      </ListItem>
                    </>
                  )
                })
              }
            </List>
          </ModalContent>
        </Fade>
      </Modal>
    </div>
  )
}

const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean }>(
  (props, ref) => {
    const { open, ...other } = props;
    return (
      <Fade in={open}>
        <div ref={ref} {...other} />
      </Fade>
    );
  },
);

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(255 255 255 / 0.8); 
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 520,
};

const ModalContent = styled('div')(
  ({ theme }) => css`
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgb(0 0 0 / 0.2);
    padding: 24px;

    & .modal-title {
      margin: 0;
      line-height: 130%;
      fint-size: 18px;
      font-weight: 500;
      margin-bottom: 8px;
    }
  `,
);

export default CharLibraryModal;
