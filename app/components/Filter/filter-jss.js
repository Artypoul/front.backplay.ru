const styles = theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  iconButton: {
    color: `${theme.palette.common.white} !important`,
    backgroundColor: `#BDBDBD !important`,

    '&.active': {
      backgroundColor: `${theme.palette.info.main} !important`,
    },
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