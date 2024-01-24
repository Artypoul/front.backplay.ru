const styles = theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    padding: 2,
    maxWidth: '100%',
    overflowY: 'hidden',
  },
  iconButton: {
    color: `${theme.palette.common.white} !important`,
    backgroundColor: `#BDBDBD !important`,
    minWidth: 40,

    '&.active': {
      backgroundColor: `${theme.palette.info.main} !important`,
    },
  },
  itemsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flex: '1 1 auto',
  },
  items: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  item: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    '&.active': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.info.main,
    },
  },
});

export default styles;