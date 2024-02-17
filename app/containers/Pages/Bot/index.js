import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import botIcon from 'dan-images/utils/bot.svg';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { styles } from './bot-jss';
import { GetHistory, GetOrderSteps, LoadFile, MakeOrder, getProjectsInfo } from './api';
import { formateDate } from './handlers';
import Modal from './modal';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

const requestData = {};

const Bot = (props) => {
  const {
    classes,
    firstrops,
  } = props;

  const title = brand.name + ' - Bot Page';
  const description = brand.desc;

  const [history, setHistory] = useState([]);
  const [steps, setSteps] = useState([]);
  const [items, setItems] = useState({});

  const [step, setStep] = useState(1);

  const [isOpened, setIsOpened] = useState(false);

  const {
    projectId,
    type,
    orderId,
  } = useParams();

  const {
    user,
  } = useSelector(state => state.user);

  const handleOpen = () => setIsOpened(true);
  const handleClose = () => setIsOpened(false);

  const selectItem = (field, item) => {
    return () => {
      requestData[field] = item.id;

      handleClose();

      setSteps((prev) => {
        const newArray = Array.from(prev);
        newArray[step - 1].answer = item.name;

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

        return newArray;
      });

      setStep(prev => prev + 1);
    };
  };

  const handleDrumbsState = (value) => {
    return () => {
      requestData.with_drums = value;
      
      setSteps((prev) => {
        const newArray = Array.from(prev);
        newArray[step - 1].answer = value ? 'С баРАБАНАМИ' : 'Без БАРАБАНОВ';

        return newArray;
      });

      setStep(prev => prev + 1);
    };
  };

  const loadFile = async (event) => {
    const [file] = event.target.files;

    if (!file) {
      return;
    }
  
    if (!file.type.match(/|mp4|mp3|mpeg/g)) {
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
    console.log('requestData', requestData)
    requestData.order_type_id = +type;

    if (+type !== 3) {
      requestData.project_id = +projectId;
    }

    const order = await MakeOrder(requestData);
    console.log('order', order)
  };

  const getOrderSteps = async () => {
    if (orderId) {
      const {
        steps,
        orderFiles,
      } = await GetHistory(orderId);
      setHistory(steps);

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
      setSteps(steps);
    }

    const {
      keys,
      changes,
    } = await getProjectsInfo();

    setItems({
      topItems: keys,
      bottomItems: changes,
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
      // const file = null;
      const change = (items.bottomItems || []).find((item) => item.id === message.change_id);
      const key = (items.topItems || []).find((item) => item.id === message.key_id);

      return (
        <div className={classes.answerResult}>
          <div className={`${classes.avatar} empty`}>
            {user.avatar ? (
              <img src={user.avatar.path} alt="avatar" />
            ) : (
              user.first_name.at(0)
            )}
          </div>

          <div className={classes.text}>
            <span>{formateDate()}</span>
            <div>{message.answer || (change && change.name) || (key && key.name) || (message.with_bass ? 'С басом' : 'Без баса')}</div>
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
        </div>

        {actions[type] && (step === (Object.keys(actions[type]).length + 1)) && (
          <div className={classes.action}>
            <span>Чтобы оплатить заказ нажмите</span>
            <Button variant='contained' color='secondary' onClick={makePayment}>ОПЛАТИТЬ</Button>
          </div>
        )}

        {user.role.id === 2 && (
          <div className={classes.confirm}>
            <TextField
              placeholder='+ добавить ссылку на архив'
              className={classes.input}
            />
            <Button variant='contained' color='primary'>На проверку</Button>
          </div>
        )}

        {user.role.id === 3 && (
          <div className={classes.accept}>
            <Input
              placeholder='Type a message'
              className={classes.messageField}
            />

            <div className={classes.buttons}>
              <Button variant='contained' color='primary'>НА добработку</Button>
              <Button variant='contained' color='primary'>Принять</Button>
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
