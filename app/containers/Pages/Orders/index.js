import React, { useEffect, useState } from 'react'
import MUIDataTable from 'mui-datatables';

import { withStyles } from '@material-ui/core/styles';
import { columns } from './consts';
import { GetOrders } from './api';
import Filter from './components/Filter';

const Orders = () => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const getOrders = async () => {
    const orders = await GetOrders(page, perPage);

    setItems(orders.data.map((item) => {
      return [
        item.name,
        item.author,
        item.key,
        item.date,
        item.progress,
        item.status,
        item.amount,
      ];
    }));
  };

  useEffect(() => {
    getOrders();
  }, [page, perPage]);

  const options = {
    filterType: 'dropdown',
    responsive: 'standard',
    print: true,
    rowsPerPage: perPage,
    rowsPerPageOptions:[20, 60, 100],
    page: page - 1,
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
