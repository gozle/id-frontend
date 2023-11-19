import { Dialog, DialogContent, List, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useMemo, useState } from 'react';

import { SlideScreensContainer } from '@components/common';
import { LoginHistoryItem } from '@lib/types';

import { ItsNotMeWarning } from './its-not-me-warning.component';
import { LoginHistoryDetailed } from './login-history-detailed.component';
import { LoginHistoryListItem } from './login-history-list-item.component';

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />,
);

Transition.displayName = 'Transition';

interface P {
  data: LoginHistoryItem[];
}

export const LoginHistoryList = ({ data }: P) => {
  const [open, setOpen] = useState(false);
  const [openId, setOpenId] = useState(-1);
  const [screen, setScreen] = useState(0);

  const handleOpen = ({ currentTarget }: React.MouseEvent) => {
    const id = currentTarget.getAttribute('data-id');

    if (id) {
      setOpenId(+id);
      setOpen(true);
    }
  };
  const handleClose = () => setOpen(false);

  const openHistoryItem = useMemo(
    () => data.find((el) => el.id === openId),
    [data, openId],
  );

  return (
    <>
      <List>
        {data.map((el, i) => (
          <LoginHistoryListItem
            data={el}
            key={el.id}
            onClick={handleOpen}
            sx={i > 0 ? { mt: 0.5 } : undefined}
          />
        ))}
      </List>

      <Dialog
        TransitionComponent={Transition}
        open={open}
        maxWidth="xs"
        onClose={handleClose}
        PaperProps={{ sx: { width: '100%' } }}
      >
        <DialogContent>
          {openHistoryItem && (
            <SlideScreensContainer
              screen={screen}
              screenContent={[
                <LoginHistoryDetailed
                  data={openHistoryItem}
                  key="detailed"
                  onCloseClick={handleClose}
                  onNotMeClick={() => setScreen(1)}
                />,
                <ItsNotMeWarning key="not-me" onOkClick={() => setScreen(0)} />,
              ]}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
