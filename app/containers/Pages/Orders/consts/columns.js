import React from 'react';

import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';
import Sum from '../components/Sum';

export const columns = [
  {
    name: 'Имя',
    options: {
      filter: true
    }
  },
  {
    name: 'Название Исполнитель',
    options: {
      filter: true,
    }
  },
  {
    name: 'Тональность',
    options: {
      filter: true
    }
  },
  {
    name: 'Дата',
    options: {
      filter: true,
    }
  },
  {
    name: 'Прогресс',
    options: {
      filter: false,
      customBodyRender: (value) => (
        <LinearProgress variant="determinate" color="secondary" value={value} />
      )
    }
  },
  {
    name: 'Статус',
    options: {
      filter: true,
      customBodyRender: (status) => {
        return (
          <Chip label={status.name} color={status.id === 1 ? 'primary' : 'secondary'} />
        );
      },
    }
  },
  {
    name: 'Сумма',
    options: {
      filter: true,
      customBodyRender: (value) => {
        return (
          <Sum data={value} />
        );
      },
    }
  },
];