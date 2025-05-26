import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const arrowStyle = {
  position: 'absolute',
  top: '45%',
  transform: 'translateY(-50%)',
  zIndex: 2,
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  borderRadius: '50%',
  width: 32,
  height: 32,
  minWidth: 0,
  padding: 0,
  '&:hover': {
    backgroundColor: '#f0f0f0',
  }
};

export const NextArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ ...arrowStyle, right: -16 }}>
    <ArrowForwardIos fontSize="small" />
  </IconButton>
);

export const PrevArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ ...arrowStyle, left: -16 }}>
    <ArrowBackIos fontSize="small" />
  </IconButton>
);

