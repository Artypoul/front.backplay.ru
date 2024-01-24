export const styles = theme => ({
  background: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 48,
    padding: '12px 260px',
    zIndex: 1000,
    boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.25)',
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {
      padding: '12px 68px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '12px',
      gap: 24,
    },
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 48,
    [theme.breakpoints.down('sm')]: {
      gap: 24,
    },
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  play: {
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  name: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    color: 'rgba(0, 0, 0, 0.87)',
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
  },
  desc: {
    fontSize: 12,
    fontWeight: 400,
  },
  center: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flex: '1 1 auto',
    maxWidth: 125,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  svg: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    cursor: 'pointer',
    color: theme.palette.primary.main,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
});
