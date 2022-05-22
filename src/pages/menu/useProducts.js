import { useEffect, useState } from 'react';
import { getProducts, sendOrder } from '../../service/api';
import { getRole } from '../../service/localStorage.js'

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [productsType, setProductsType] = useState('breakfast');
  const [flavor, setFlavor] = useState();
  const [complement, setComplement] = useState('');
  const [total, setTotal] = useState(0);
  const [orderInfo, setOrderInfo] = useState({ client: '', table: '' });
  const [orderError, setOrderError] = useState('');

  const getData = async () => {
    const data = await getProducts('/products');
    setProducts(data);
  };

  useEffect(() => {
    getData()
  }, []);

  const handleButtonTypeClick = (e) => {
    setProductsType(e.target.value);
  }
  const handleSelectFlavor = (e) => setFlavor(e.target.value);
  const handleSelectComplement = (e) => setComplement(e.target.value);

  const handleAddItem = (product) => {
    const productIndex = items.findIndex((item) => item.id === product.id)
    if(productIndex === -1) {
      setItems([...items, {...product, qtd: 1}])
    } else {
      items[productIndex].qtd += 1
      setItems([...items])
    }
  }

  const productsFiltered = () => {
    if(productsType === 'breakfast') {
      return products.filter((elem) => elem.type === 'breakfast')
    } else if( productsType === 'hamburguer') {
      let filterHamburguer = products.filter((elem) => elem.flavor === flavor);
      if(complement !== '') {
        filterHamburguer = filterHamburguer.filter((elem) => elem.complement === complement)
      }
      return filterHamburguer;
      // return products.filter((elem) => elem.sub_type === 'hamburguer')
      // return products.filter((elem) => elem.id === 33 || elem.id === 42)
    } else if( productsType === 'side' || productsType === 'drinks') {
      return products.filter((elem) => elem.sub_type === productsType)
    }
    console.log(products)
    return []
  }

  const handleDeleteProducts = (elem) => {
    const foundItem = items.findIndex((item) => item.id === elem.id);
    if (foundItem !== -1) {
      const qtd = items[foundItem].qtd
      if (qtd === 1) {
        const removed = items
        removed.splice(foundItem, 1)
        setItems([...removed])
      } else {
        const newArr = items;
        newArr[foundItem].qtd--;
        setItems([...newArr])
      }
    } else {
      setItems(
        [...items,
        {
          id: elem.id,
          qtd: elem.qtd,
          name: elem.name,
          price: elem.price,
          flavor: elem.flavor
        }]);
    }
  };

  useEffect(() => {
    const sum = (previousValue, currentValue) => previousValue + currentValue;
    setTotal(() => {
      const price = items.map((elem) => elem.qtd * elem.price);
      return price.reduce(sum, 0);
    })
  }, [items]);

  const handleOrderChange = (e) => {
    return setOrderInfo(() => {
      const auxValues = { ...orderInfo };
      auxValues[e.target.name] = e.target.value;
      return auxValues;
    });
  };

  const handleSendToKitchen = () => {
    if (getRole() === 'attendant') {
      sendOrder('/orders', orderInfo, items)
        .then((res => res.json()))
        .then((data) => {
          if (data.code === 400) {
            setOrderError('Preencher nome e mesa do cliente')
          } else {
            setItems([]);
            setOrderError('');
            setOrderInfo({ client: '', table: '' });

          }
        });
    } else {
      setOrderError ('Apenas o/a atendente fazer um pedido')
    }
  };

  return {
    handleButtonTypeClick,
    productsFiltered,
    handleAddItem,
    handleSelectFlavor,
    handleDeleteProducts,
    handleSelectComplement,
    handleSendToKitchen,
    handleOrderChange,
    productsType,
    items,
    total,
    orderError,
    orderInfo,
  }
};
export default useProducts;