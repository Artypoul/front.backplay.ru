import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { ContactList, ChatRoom } from 'dan-components';
import styles from 'dan-components/Contact/contact-jss';
import {
  fetchChatAction,
  showChatAction,
  sendAction,
  hideDetailAction,
  deleteAction
} from './reducers/chatActions';
import { fetchAction, searchAction } from '../Contact/reducers/contactActions';
import contactData from '../Contact/api/contactData';
import chatData from './api/chatData';
import { GetChats } from './api/getChats';

function Chat(props) {
  // Redux State
  const dataContact = useSelector(state => state.contact.contactList);
  const dataChat = useSelector(state => state.chat.activeChat);
  const chatSelected = useSelector(state => state.chat.chatSelected);
  const showMobileDetail = useSelector(state => state.chat.showMobileDetail);
  const keyword = useSelector(state => state.contact.keywordValue);

  // Dispatcher
  const dispatch = useDispatch();
  // const fetchContactData = useDispatch();
  // const fetchChatData = useDispatch();
  // const hideDetail = useDispatch();
  // const showDetail = useDispatch();
  // const search = useDispatch();
  // const sendMessage = useDispatch();
  // const remove = useDispatch();

  const getChats = async () => {
    const chats = await GetChats();
    console.log('chats', chats);

    // dispatch(fetchChatAction(chats));
    dispatch(fetchAction(chats));
  };
  console.log('dataContact', dataContact, contactData)

  useEffect(() => {
    getChats();
  }, []);

  const title = brand.name + ' - Chat App';
  const description = brand.desc;
  const { classes } = props;

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.root}>
        <ContactList
          total={dataContact.length}
          itemSelected={chatSelected}
          dataContact={dataContact}
          showDetail={(payload) => dispatch(showChatAction(payload))}
          search={(payload) => dispatch(searchAction(payload))}
          keyword={keyword}
        />
        {/* <ChatRoom
          showMobileDetail={showMobileDetail}
          dataChat={dataChat}
          chatSelected={chatSelected}
          dataContact={dataContact}
          sendMessage={(payload) => dispatch(sendAction(payload))}
          remove={() => dispatch(deleteAction)}
          hideDetail={() => dispatch(hideDetailAction)}
        /> */}
      </div>
    </div>
  );
}

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chat);
