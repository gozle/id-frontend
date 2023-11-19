import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />,
);

Transition.displayName = 'Transition';

interface P {
  onClose: () => void;
  open: boolean;
  title: string;
}

export const SlideDialog = ({
  children,
  onClose,
  open,
  title,
}: React.PropsWithChildren<P>) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      TransitionComponent={Transition}
      fullScreen={fullScreen}
      open={open}
      maxWidth="xs"
      fullWidth
      onClose={onClose}
      PaperProps={{ sx: { height: fullScreen ? undefined : '80%' } }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          pt: 1,
          pr: 1,
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
