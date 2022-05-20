import React from 'react';
import useProducts from "./useProducts";
import ProductsCards from '../../components/productInfos';
import Cart from '../../components/cart';
import ResultPrice from '../../components/resultPrice';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const navigate = useNavigate();
    const {
    handleButtonTypeClick,
    productsFiltered, 
    handleAddItem,
    handleSelectComplement,
    handleSelectFlavor,
    handleDeleteProducts, 
    handleSendToKitchen,
    handleOrderChange,
    productsType,
    total,
    items
  } = useProducts();
  return (
    <main className='menu'>
      <p> MENU </p>
      <div className='request'>
        <button className='btn-request' onClick={() => { navigate('/order') }} value='request'>Pedidos</button>
      </div>
      <div className='menu-type'>
        <button className='btn-menu' onClick={handleButtonTypeClick} value={'breakfast'}>Café da manhã</button>
        <button className='btn-menu' onClick={handleButtonTypeClick} value={'hamburguer'}>Hamburguer</button>
        <button className='btn-menu' onClick={handleButtonTypeClick} value={'side'}>Acompanhamentos</button>
        <button className='btn-menu' onClick={handleButtonTypeClick} value={'drinks'}>Bebidas</button>
      </div> 
      <section>
      {productsType === 'hamburguer' ? (
          <div>
            <select defaultValue={'escolher o sabor'} onChange={handleSelectFlavor}>
              <option value='escolher o sabor'>Escolher o sabor</option>
              <option value='carne'>Carne</option>
              <option value='frango'>Frango</option>
              <option value='vegetariano'>Vegetariano</option>
            </select>
              <p>Escolher complemento</p>
              <input type='radio' name='check' value='queijo' onChange={handleSelectComplement} /> Queijo
              <input type='radio' name='check' value='ovo' onChange={handleSelectComplement} /> Ovo
          </div>
        ) : ''} </section> 
        <section className='cart-info'>
              <label className='menu-labels'>Cliente</label>
              <input className='menu-input' type='text' placeholder='Nome' name='client' autoComplete='off' onChange={handleOrderChange}/>
              <label className='menu-labels'>Mesa</label>
              <select className='menu-select' defaultValue={'Selecione uma mesa'} autoComplete='off' name='table' onChange={handleOrderChange}>
                <option value='Selecione uma mesa'>Selecione uma mesa</option>
                <option value='1'>Mesa 1</option>
                <option value='2'>Mesa 2</option>
                <option value='3'>Mesa 3</option>
                <option value='4'>Mesa 4</option>
                <option value='5'>Mesa 5</option>
                <option value='6'>Mesa 6</option>
                <option value='7'>Mesa 7</option>
                <option value='8'>Mesa 8</option>
                <option value='9'>Mesa 9</option>
                <option value='10'>Mesa 10</option>
              </select>
        </section>  
        <section className='requests'>
          {items.map((item, index) => {
            return (
              <Cart 
              key={index}
              name={item.name}
              flavor={item.flavor} 
              complement={item.complement}
              price={item.price}
              qtd={item.qtd} 
              onClick= {() => handleDeleteProducts(item)}
              />
            )
          })}
          <ResultPrice value={total} />
          <button className='btn-menu' onClick={handleSendToKitchen} value='items'> Finalizar Pedido </button>
        </section>
        <section className='products-list'>
        {productsFiltered().map((elem, index) => {
          return (
            <ProductsCards
            key={index}
            image={elem.image}
            name={elem.name}
            flavor={elem.flavor} 
            complement={elem.complement}
            price={elem.price}
            onClick={() => handleAddItem(elem)}
            />
          )
        })}
      </section>
    </main>
  );
};
export default Menu;
