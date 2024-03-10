import React, { useEffect, useState } from 'react'
import MUIDataTable, { TableFilterList } from "mui-datatables";

import { withStyles } from '@material-ui/core/styles';
import { columns } from './consts';
import { GetOrders } from './api';
import Filter from './components/Filter';
import Chip from '@material-ui/core/Chip';

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

  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const getOrders = async () => {
    const orders = await GetOrders(page + 1, perPage);

    setItems(orders.data.map((item) => {
      return [
        item.name,
        item.author,
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
    page: page,
    count: total,
    filter: true,
    fullWidth: true,
    onTableChange: (action, tableState) => {
      if (action === 'changePage') {
        setPage(tableState.page);
      }
      if (action === 'changeRowsPerPage') {
        setPerPage(tableState.rowsPerPage);
      }
    },
  };

  return (
    <MUIDataTable
      title="Заказы"
      data={items}
      columns={columns}
      options={options}
    />
  );
};

export default Orders;
