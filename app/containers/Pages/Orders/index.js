import React, { useEffect, useState } from 'react'
import MUIDataTable, { TableFilterList } from "mui-datatables";

import { withStyles } from '@material-ui/core/styles';
import { columns } from './consts';
import { GetOrders } from './api';
import Filter from './components/Filter';
import Chip from '@material-ui/core/Chip';
import { useSelector } from 'react-redux';

const CustomChip = ({ label, onDelete }) => {
  return (
      <Chip
          variant="outlined"
          color="secondary"
          label={label}
          onDelete={onDelete}
      />
  );
};

const CustomFilterList = (props) => {
  return <TableFilterList {...props} ItemComponent={CustomChip} />;
};

const Orders = () => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const {
    user,
  } = useSelector(state => state.user);

  const isAuthor = (user && user.role.id) === 2;

  const getOrders = async () => {
    const orders = await GetOrders(page, perPage + perPage);

    setItems(orders.data.map((item) => {
      return [
        item.author,
        item.name,
        item.key,
        item.date,
        item.progress,
        item.status,
        item,
      ];
    }));

    setTotal(orders.total);
  };

  useEffect(() => {
    getOrders();
  }, [page, perPage]);

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: perPage,
    rowsPerPageOptions: [5, 10, 20],
    count: total,
    filter: true,
    fullWidth: true,
    pagination: true,
    onTableChange: (action, tableState) => {
      console.log('action, tableState', action, tableState)
      if (action === 'changePage') {
        setPage(tableState.page);
      }
      if (action === 'changeRowsPerPage') {
        setPerPage(tableState.rowsPerPage);
      }
    },
  };

  console.log('page', page)
  const firstColumn = columns.at(0);
  firstColumn.name =  isAuthor ? 'Имя' : 'Автор';
  
  return (
    <MUIDataTable
      key={Math.random()}
      title="Заказы"
      data={items}
      columns={columns}
      options={options}
    />
  );
};

export default Orders;
