import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import botIcon from 'dan-images/utils/bot.svg';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { styles } from './bot-jss';
import { GetHistory, GetOrderSteps, LoadFile, MakeOrder, OrderAccept, OrderDecline, SendToCheck, getProjectsInfo } from './api';
import { formateDate } from './handlers';
import Modal from './modal';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const requestData = {};
let createdOrderId = null;

const Bot = (props) => {
  const {
    classes,
    firstrops,
  } = props;

  const title = brand.name + ' - Bot Page';
  const description = brand.desc;

  const [history, setHistory] = useState([]);
  const [orderFiles, setOrderFiles] = useState([]);
  const [steps, setSteps] = useState([]);
  const [items, setItems] = useState({});

  const [comment, setComment] = useState('');
  const [link, setLink] = useState('');

  const [step, setStep] = useState(1);
  const [project, setProject] = useState(null);

  const [isOpened, setIsOpened] = useState(false);
  const [isPaymentAction, setIsPaymentAction] = useState(false);

  const navigate = useHistory();

  const {
    projectId,
    type,
    orderId,
  } = useParams();

  const {
    user,
  } = useSelector(state => state.user);

  const changeInputValue = (action) => {
    return (event) => {
      action(event.target.value);
    };
  };

  const handleOpen = () => setIsOpened(true);
  const handleClose = () => setIsOpened(false);

  const selectItem = (field, item) => {
    return () => {
      const [keyName] = field.split('_')
      requestData[field] = item[keyName] ? item[keyName].id : item.id;

      handleClose();

      setSteps((prev) => {
        const newArray = Array.from(prev);
        newArray[step - 1].answer = item[keyName] ? item[keyName].name : item.name;

        return newArray;
      });

      setStep(prev => prev + 1);
    };
  };

  const handleBassState = (value) => {
    return () => {
      requestData.with_bass = value;
      
      setSteps((prev) => {
        const newArray = Array.from(prev);
        newArray[step - 1].answer = value ? 'С басом' : 'Без баса';
        newArray[step].text = `Сумма к оплате ${value ? project.price : project.price_without_bass} рублей, для оплаты заказа нажмите оплатить`;

        return newArray;
      });

      setStep(prev => prev + 1);
    };
  };

  console.log('step', step)
  const handleDrumbsState = (value) => {
    return async () => {
      requestData.with_drums = value;
      
      if (step === 3) {
        const order = await makePayment();
        createdOrderId = order.id;

        setSteps((prev) => {
          const newArray = Array.from(prev);
          newArray[step - 1].answer = value ? 'С баРАБАНАМИ' : 'Без БАРАБАНОВ';
          newArray[steps.length - 1].text = `К оплате ${order.amount}p, пожалуйста нажмите кнопку оплатить`;
  
          return newArray;
        });
      }


      setStep(prev => prev + 1);
    };
  };

  const loadFile = async (event) => {
    const [file] = event.target.files;

    if (!file) {
      return;
    }

    if (!file.type.includes('mpeg')) {
      return;
    }

    const loadedFile = await LoadFile(file);
    console.log('loadedFile', loadedFile)

    requestData.file_id = loadedFile.id;

    setSteps((prev) => {
      const newArray = Array.from(prev);
      newArray[step - 1].answer = 'Файл';

      return newArray;
    });

    setStep(prev => prev + 1);
  };

  const makePayment = async () => {
    requestData.order_type_id = +type;

    if (+type !== 3) {
      requestData.project_id = +projectId;
    }

    if (!createdOrderId) {
      const order = await MakeOrder(requestData);
      
      if (+type === 1) {
        navigate.push(`/shop/checkout/${order.id}`);
      }

      return order;
    }

    navigate.push(`/shop/checkout/${createdOrderId}`);
    // if (step !== 4) {
    //   navigate.push(`/shop/checkout/${order.id}`);

    //   return;
    // }

    // const order = await MakeOrder(requestData);
    // return order;
  };

  const sendToCheck = async () => {
    if (!link) {
      return;
    }

    const file = await SendToCheck(orderId, {
      link,
    });

    if (file) {
      setOrderFiles((prev) => {
        const newArray = Array.from(prev);
        newArray.push(file);
  
        return newArray;
      });
    }
  };

  const orderAccept = async () => {
    const uppdatedFile = await OrderAccept(orderId);

    setOrderFiles((prev) => {
      const newArray = Array.from(prev);
      
      const currentFileIndex = newArray.findIndex((file) => file.id === uppdatedFile.id);
      newArray[currentFileIndex] = uppdatedFile;
      console.log('uppdatedFile', uppdatedFile, newArray[currentFileIndex])

      return newArray;
    });
  };

  const orderDecline = async () => {
    if (!comment) {
      return;
    }

    const uppdatedFile = await OrderDecline(orderId, {
      comment,
    });

    setOrderFiles((prev) => {
      const newArray = Array.from(prev);
      
      const currentFileIndex = newArray.findIndex((file) => file.id === uppdatedFile.id);
      newArray[currentFileIndex] = uppdatedFile;

      return newArray;
    });
  };

  const getOrderSteps = async () => {
    if (orderId) {
      const {
        steps,
        orderFiles,
      } = await GetHistory(orderId);
      setHistory(steps);
      setOrderFiles(orderFiles);

      const {
        keys,
        changes,
      } = await getProjectsInfo();
  
      setItems({
        topItems: keys,
        bottomItems: changes,
      });

      return;
    }

    const steps = await GetOrderSteps(type);
    if (steps && steps.length) {
      const endStep = {
        id: 3,
        key: '',
        text: '',
      };
      setSteps([...steps, endStep]);
    }

    const {
      keys,
      changes,
      variants,
      project,
    } = await getProjectsInfo(projectId);

    setProject(project);

    setItems({
      topItems: +type === 3 ? keys : variants,
      bottomItems: +type === 3 ? changes : variants,
    });
  };

  useEffect(() => {
    getOrderSteps();
  }, []);

  const getAction = () => {
    if (!type) {
      return null;
    }

    const data = actions[type][step];
    if (!data) {
      return null;
    }

    return (
      <div className={classes.action}>
        <span>{data.title}</span>

        <div className={classes.actionButtons}>
          {data.buttons.map((button) => {
            if (button.type) {
              return (
                <label className={classes.file}>
                  <input type="file" onChange={button.action} />
                  <Button variant='contained' color='secondary'>{button.title}</Button>
                </label>
              );
            }

            return (
              <Button variant='contained' color='secondary' onClick={button.action}>{button.title}</Button>
            );
          })}
        </div>
      </div>
    );
  };

  const actions = {
    1: {
      1: {
        title: 'Чтобы выбрать тональность нажмите кнопку',
        buttons: [{
          title: 'Тональность',
          action: handleOpen,
        }],
      },
      2: {
        title: 'Выбор варинта',
        buttons: [{
          title: 'С басом',
          action: handleBassState(true),
        }, {
          title: 'Без баса',
          action: handleBassState(false),
        }],
      },
    },
    2: {
      1: {
        title: 'Чтобы выбрать тональность нажмите кнопку',
        buttons: [{
          title: 'Тональность',
          action: handleOpen,
        }],
      },
    },
    3: {
      1: {
        title: 'Чтобы выбрать файл нажмите кнопку “Файл”',
        buttons: [{
          title: 'Файл',
          type: 'file',
          action: loadFile,
        }],
      },
      2: {
        title: 'Чтобы выбрать тональность нажмите кнопку',
        buttons: [{
          title: 'Тональность',
          action: handleOpen,
        }],
      },
      3: {
        title: 'Выбор варинта',
        buttons: [{
          title: 'С баРАБАНАМИ',
          action: handleDrumbsState(true),
        }, {
          title: 'Без БАРАБАНОВ',
          action: handleDrumbsState(false),
        }],
      },
    },
  };

  const getAnswer = (message) => {
    if (message.answer || message.name) {
      const file = message.file_id;
      const change = message.change_id;
      const key = message.key_id;
      const bass = message.with_bass;
      const drumbs = message.with_drums;

      let text = '';
      switch (true) {
        case !!file:
          text = file.name;
          break;
        case !!change:
          text = change.name;
          break;
        case !!key:
          text = key.name;
          break;
        case bass !== null:
          text = bass ? 'С басом' : 'Без баса';
          break;
        case drumbs !== null:
          text = drumbs ? 'С барабанами' : 'Без барабанов';
          break;
        default:
          text = '';
          break;
      }

      return (
        <div className={classes.answerResult}>
          <div className={`${classes.avatar} empty`}>
            {user.avatar ? (
              <img src={user.avatar.path} alt="avatar" />
            ) : (
              user.first_name && user.first_name.at(0)
            )}
          </div>

          <div className={classes.text}>
            <span>{formateDate()}</span>
            <div>{message.answer || text}</div>
          </div>
        </div>
      );
    }

    return getAction();
  };

  const getContent = (message) => {
    return (
      <div className={classes.message}>
        <div className={classes.messageQuestion}>
          <div className={classes.messageQuestionWrapper}>
            <span>{formateDate()}</span>
            <div>{message.text || message.name}</div>
          </div>
          
          <div className={classes.avatar}>
            <img src={botIcon} alt="bot" />
          </div>
        </div>

        <div className={classes.messageAnswer}>
          {getAnswer(message)}
        </div>
      </div>
    );
  }

  return (
    <div style={{display: 'flex', flex: '1 1 auto'}}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>

      <div className={classes.background}>
        <div className={classes.header}>
          <div className={classes.icon}>
            <img src={botIcon} alt="bot" />
          </div>

          <div className={classes.title}>
            <h3>Автоматическое оформление заказа</h3>
            <span className={classes.status}>Online</span>
          </div>
        </div>

        <div className={classes.content}>
          {history.map((message) => getContent(message))}
          {steps.slice(0, step).map((message) => getContent(message))}
          
          {orderFiles.map((orderFile) => (
            <div className={classes.file}>
              <div className={classes.fileWrapper}>
                <audio src={orderFile.link} controls={true}></audio>
                <strong>{orderFile.comment}</strong>
              </div>

              <Checkbox defaultChecked={!!orderFile.is_accepted} disabled={true} />
            </div>
          ))}
        </div>

        {((actions[type] && (step === (Object.keys(actions[type]).length + 1)))) && (
          <div className={classes.action}>
            <span>Чтобы оплатить заказ нажмите</span>
            <Button variant='contained' color='secondary' onClick={makePayment}>ОПЛАТИТЬ</Button>
          </div>
        )}

        {(user.role.id === 2 && ((orderFiles.at(-1) && orderFiles.at(-1).is_accepted === 0) || !orderFiles.length)) && (
          <div className={classes.confirm}>
            <TextField
              placeholder='+ добавить ссылку на архив'
              className={classes.input}
              value={link}
              onChange={changeInputValue(setLink)}
            />
            <Button variant='contained' color='primary' onClick={sendToCheck}>На проверку</Button>
          </div>
        )}

        {((user.role.id === 3 && (orderFiles.at(-1) && orderFiles.at(-1).is_accepted === null))) && (
          <div className={classes.accept}>
            <Input
              placeholder='Type a message'
              className={classes.messageField}
              value={comment}
              onChange={changeInputValue(setComment)}
            />

            <div className={classes.buttons}>
              <Button variant='contained' color='primary' onClick={orderDecline}>НА добработку</Button>
              <Button variant='contained' color='primary' onClick={orderAccept}>Принять</Button>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isOpened}
        titles={[
          'Доступные тональности',
          'Доступные изменения',
        ]}
        items={items}
        onSelect={selectItem}
        onClose={handleClose}
      />
    </div>
  );
};

export default withStyles(styles)(Bot);
