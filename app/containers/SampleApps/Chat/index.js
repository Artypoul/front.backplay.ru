import React, { useEffect, useRef, useState } from 'react';
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
  deleteAction,
  fillMessages
} from './reducers/chatActions';
import { fetchAction, searchAction } from '../Contact/reducers/contactActions';
import contactData from '../Contact/api/contactData';
import chatData from './api/chatData';
import { GetChats } from './api/getChats';
import { bindChannel, initPusher, unsubscribeChannel } from './handlers';
import { CreateChat, GetMessages, SendMessage } from './api';

let chatId = null;

function Chat(props) {
  const dataContact = useSelector(state => state.contact.contactList);
  const dataChat = useSelector(state => state.chat.activeChat);
  const chatSelected = useSelector(state => state.chat.chatSelected);
  const showMobileDetail = useSelector(state => state.chat.showMobileDetail);
  const keyword = useSelector(state => state.contact.keywordValue);

  const [chats, setChats] = useState([]);

  const {
    user,
  } = useSelector(state => state.user);
  
  const dispatch = useDispatch();
  
  const pusherRef = useRef(null);

  const getChats = async () => {
    const {
      users,
      chats,
    } = await GetChats();
    setChats(chats);

    dispatch(fetchChatAction(users));
    dispatch(fetchAction(users));
  };

  const connectPusher = () => {
    const pusher = initPusher();
    pusherRef.current = pusher;

    bindChannel(pusher, user.id, dispatch);
  };

  const sendMessage = async (value) => {
    const trimedValue = value.trim();
    if (!trimedValue.length) {
      return;
    }

    SendMessage(chatId, trimedValue);
    dispatch(sendAction({
      userId: user.id,
      text: trimedValue,
    }));
  };

  useEffect(() => {
    getChats();
    connectPusher();

    return () => {
      unsubscribeChannel(pusherRef.current, user.id);
    };
  }, []);

  const chatInitialization = async () => {
    // if (!chats.length || !dataContact.length) {
    //   const chat = await CreateChat({
    //     user_id: dataContact[chatSelected].id,
    //   });

    //   chatId = chat.id;
    //   return;
    // }

    chatId = chats.find((chat) => {
      const currentChat = dataContact[chatSelected];
      if (user.role.id === 2) {
        return chat.user.id === currentChat.id;
      }

      return chat.author.id === currentChat.id;
    }).id;

    const {
      messages,
    } = await GetMessages(chatId);

    if (messages) {
      dispatch(fillMessages(messages));
    }
  };

  useEffect(() => {
    if (!chats.length || !dataContact.length) {
      return;
    }

    chatInitialization();
  }, [chats, dataContact, chatSelected]);

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
        <ChatRoom
          showMobileDetail={showMobileDetail}
          dataChat={dataChat}
          chatSelected={chatSelected}
          dataContact={dataContact}
          // sendMessage={(payload) => di/spatch(sendAction(payload))}
          sendMessage={(payload) => sendMessage(payload)}
          remove={() => dispatch(deleteAction)}
          hideDetail={() => dispatch(hideDetailAction)}
          userId={user.id}
        />
      </div>
    </div>
  );
}

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chat);
