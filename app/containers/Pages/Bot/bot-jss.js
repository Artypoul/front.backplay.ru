export const styles = theme => ({
  background: {
    padding: '20px 8px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: '100%',
    flex: '1 1 auto',
    // height: '100vh',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    width: 80,
    height: 80,

    '&>img': {
      objectFit: 'none',
    },
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    fontSize: 20,
    fontWeight: 500,
    lineHeight: '32px',

    '&>h3': {
      color: 'rgba(0, 0, 0, .8)',
      margin: 0,
    },

    '&>span': {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: '19px',
      color: 'rgba(0, 0, 0, .5)',
      display: 'flex',
      alignItems: 'center',
      gap: 4,

      '&::before': {
        content: '""',
        width: 10,
        height: 10,
        borderRadius: '50%',
        display: 'block',
        backgroundColor: '#CDDC39',
      },
    },
  },
  status: {

  },
  content: {
    flex: '1 1 auto',
    padding: '0px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 38,
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  },
  messageQuestion: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 20,
  },
  messageQuestionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    alignItems: 'flex-end',

    '&>span': {
      fontSize: 11,
      fontWeight: 400,
      lineHeight: '16px',
      color: '#9E9E9E',
    },
    '&>div': {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: '24px',
      color: 'rgba(0, 0, 0, .8)',
      padding: '10px 15px',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      backgroundColor: '#E3F2FD',
      boxShadow: '0 1px 3px rgba(80, 80, 80, .2)',
      maxWidth: 'max-content',
    },
  },
  avatar: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&.empty': {
      backgroundColor: '#BDBDBD',
      borderRadius: '50%',
      color: '#FAFAFA',
    },
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    gap: 48,
  },
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: 48,
  },
  answerResult: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 20,
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,

    '&>span': {
      fontSize: 11,
      fontWeight: 400,
      lineHeight: '16px',
      color: '#9E9E9E',
    },

    '&>div': {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: '24px',
      color: 'rgba(0, 0, 0, .8)',
      padding: '10px 15px',
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      backgroundColor: '#E3F2FD',
      boxShadow: '0 1px 3px rgba(80, 80, 80, .2)',
      maxWidth: 'max-content',
    },
  },
  file: {
    cursor: 'pointer',
    
    display: 'flex',
    alignItems: 'center',
    gap: 12,

    '&>input': {
      display: 'none',
    },
    
    '&>button': {
      pointerEvents: 'none',
    }
  },
  confirm: {
    padding: '12px 68px',
    display: 'flex',
    alignItems: 'center',
    gap: 48,
  },
  input: {
    width: '100%',
    maxWidth: 371,
    
    '&>div': {
      margin: 0,
    }
  },
  accept: {
    display: 'flex',
    alignItems: 'center',
    gap: 63,
  },
  messageField: {
    flex: '1 1 auto',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    gap: 63,
  },
  // file: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   gap: 12,
  // },
  fileWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
});
