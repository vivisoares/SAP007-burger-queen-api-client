import { useState } from 'react';
import { getOrders, updateOrderStatus } from '../../service/api';
import { getRole } from '../../service/localStorage.js';

const useKitchen = () => {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [error, setError] = useState('');

  const getData = () => {
    getOrders('/orders')
      .then((data) => sortById(data))
      .then((newData) => setOrders(newData));
  };

  const sortById = (data) => {
    return data.sort((a, b) => {
      return b.id - a.id;
    });
  };

  const ordersFiltered = () => {
    return orders.filter(
      (item) => item.status === 'pending' || item.status === 'preparando'
    );
  };

  const handleStatus = (elem) => {
    if (getRole() === 'chef') {
      if (elem.status === 'pending') {
        updateOrderStatus('/orders/', elem.id, 'preparando').then(() =>
          setOrderStatus([
            ...orderStatus,
            {
              id: elem.id,
              status: 'preparando',
            },
          ])
        );
      } else if (elem.status === 'preparando') {
        updateOrderStatus('/orders/', elem.id, 'finalizado').then(() =>
          setOrderStatus([
            ...orderStatus,
            {
              id: elem.id,
              status: 'finalizado',
            },
          ])
        );
      }
    } else {
      setError('Apenas o(a) chef pode atualizar um pedido');
    }
  };

  return {
    orders,
    setOrders,
    orderStatus,
    getData,
    ordersFiltered,
    handleStatus,
    error,
  };
};
export default useKitchen;