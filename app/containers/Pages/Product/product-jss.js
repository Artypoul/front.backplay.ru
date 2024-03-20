export const styles = theme => ({
  backgrpund: {
    borderRadius: 8,
    backgroundColor: theme.palette.common.white,
    padding: '28px 20px',
  },
  wrapper: {
    display: 'flex',
    gap: 40,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.down('xs')]: {
      gap: 20,
    },
  },
  left: {
    width: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 94,

    '&.gap': {
      gap: 12,
    },

    [theme.breakpoints.down('md')]: {
      gap: 22,
    },
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  title: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '32.02px',
  },
  label: {
    padding: '8px 16px',
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 18,
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: 600,
    backgroundColor: theme.palette.secondary.main,
    position: 'absolute',
    right: 24,
    bottom: 24,
    maxWidth: 'max-content',
  },
  imgWrapper: {
    position: 'relative',
    cursor: 'pointer',

    '&>img': {
      aspectRatio: '3/2',
      width: '100%',
    },

    '&>input': {
      display: 'none',
    },
  },
  buttonAdd: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  },
  vartiantsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
  },
  vartiants: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  vartiant: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    // flexWrap: 'wrap',
    gap: 16,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      // alignItems: 'flex-start',
    },
  },
  vartiantInner: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      width: '100%',
      '&>button': {
        width: '100%',
      },
    },
  },
  vartiantInput: {
    width: '100%',
    borderRadius: 8,
  },
  right: {
    width: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,
    [theme.breakpoints.down('md')]: {
      '&>button': {
        alignSelf: 'center !important',
      }
    },
  },
  rightWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 35,
  },
  rightInner: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    [theme.breakpoints.down('sm')]: {
      gap: 12,
    },
  },
  types: {
    display: 'flex',
    flexDirection: 'column',
    gap: 40,
    padding: '0 20px',
    [theme.breakpoints.down('md')]: {
      gap: 32,
    },
  },
  input: {
    padding: '24px 12px',
    border: 'none',

    '&>input': {
      padding: 0,
      fontSize: 24,
      fontWeight: 400,
      color: 'rgba(0, 0, 0, 0.87)',
      lineHeight: '32.02px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: 12,
    },
  },
  rightContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  top: {
    display: 'grid',
    alignItems: 'center',
    // gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: 16,
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    // [theme.breakpoints.down('sm')]: {
    //   display: 'grid',
    //   gridTemplateColumns: 'repeat(2, 1fr)',
    //   gap: 16,
    // },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: 16,
    },
  },
  upload: {
    cursor: 'pointer',
    padding: '10px 20px',
    backgroundColor: '#FAFAFA',

    '&>input': {
      display: 'none',
    },

    '&>button': {
      pointerEvents: 'none',
    },
  },
  buy: {
    cursor: 'pointer',
    padding: '10px 20px',
    backgroundColor: '#FAFAFA',
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '24px 12px',
  },
  value: {
    fontSize: 24,
    fontWeight: 400,
  },
  chipDiscount: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.dark,
  },
});
