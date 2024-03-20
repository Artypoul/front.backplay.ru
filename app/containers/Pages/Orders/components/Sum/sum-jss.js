export const styles = theme => ({
  menu: {
    border: '1px solid #2196F3',
    borderRadius: 6,
    padding: 8,
    
    '&>ul': {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
    }
  },
  menuItem: {
    fontSize: 13,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, .54)',
    padding: '3px 8px',
    borderRadius: 10,

    '&>a': {
      textDecoration: 'none',
      color: 'inherit',
    }
  },
  primary: {
    backgroundColor: '#B3E5FC',
    color: '#4A90E2',
  },
});
