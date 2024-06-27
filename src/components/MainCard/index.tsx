import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { SxProps, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';

const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

interface MainCardProps {
  title?: string | ReactNode;
  sx?:SxProps;
  children?: React.ReactNode;
  content?: boolean;
  contentSX?: React.CSSProperties;
}

function MainCard( props: MainCardProps) {
  const { 
    title,
    sx = {},
    children,
    content = false,
    contentSX = {},
   } = props;

  const theme = useTheme();

  return (
    <Card
      sx={{
        border: 'none',
        borderRadius: 4,
        padding: '8px',
        '& pre': {
          m: 0,
          p: '1rem !important',
          fontFamily: theme.typography.fontFamily,
          fontSize: '0.75rem'
        },
        ...sx,
      }}
    >

      {title && <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title={title} />}

      {content && <CardContent sx={contentSX}>{children}</CardContent>}
      {!content && children}
    </Card>
  );
}



MainCard.propTypes = {
  title:PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  sx: PropTypes.object,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentSX: PropTypes.object,
};

export default MainCard;