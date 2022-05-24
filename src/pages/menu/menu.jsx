import useProducts  from './useProducts';
import ProductCards from '../../components/productInfos';
import Cart from '../../components/cart';
import ResultPrice from '../../components/resultPrice';
import MenuHamburguer from '../../components/burgerMenu';

import logo from '../../img/logo.png';
import styles from './menu.module.css';
import { getRole } from '../../service/localStorage';

const Menu = () => {
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
    items,
    orderError,
    orderInfo,
    flavor,
  } = useProducts();
  
  return (
    <div className={styles.root}>
      <main>
        <nav className={styles.navBar}>
          <div className={styles.menuHamburguer}>
            <MenuHamburguer />
          </div>
          <picture>
            <img src={logo} alt='No Ponto Certo' className={styles.logo} />
          </picture>
        </nav>
        <section className={styles.attendantTabe}>
          <section className={styles.orderingTab}>
            <div>
              <div className={styles.orderSelection}>
                <button className={styles.selectionButton} onClick={handleButtonTypeClick} value={'breakfast'}>•  Café da manhã  • </button>
                <button className={styles.selectionButton} onClick={handleButtonTypeClick} value={'hamburguer'}>  Hambúrgueres  •</button>
                <button className={styles.selectionButton} onClick={handleButtonTypeClick} value={'side'}>  Acompanhamentos  •</button>
                <button className={styles.selectionButton} onClick={handleButtonTypeClick} value={'drinks'}>  Bebidas  •</button>
              </div>
              {productsType === 'hamburguer' ? (
                <section className={styles.flavorAndComplementSelection}>
                  <select className={styles.selectFlavor} value={flavor} onChange={handleSelectFlavor}>
                    <option value=''>Sabor</option>
                    <option value='carne'>Carne</option>
                    <option value='frango'>Frango</option>
                    <option value='vegetariano'>Vegetariano</option>
                  </select>
                  <div className={styles.selectComplement} onChange={handleSelectComplement}>
                    <input 
                    type= 'radio'
                    id = 'cheese'                
                    name='check' 
                    value='queijo' 
                    className={styles.cheeseComplement} 
                    onChange={handleSelectComplement}
                    /> {''}
                    <label htmlFor= 'cheese'>queijo</label>
                    <input 
                    type= 'radio'
                    id = 'egg'                
                    name='check' 
                    value='ovo' 
                    className={styles.eggComplement} 
                    onChange={handleSelectComplement}
                    /> {''}
                    <label htmlFor= 'egg'>ovo</label>
                    <input 
                    type= 'radio'
                    id = 'no-complement'                
                    name='check' 
                    value='' 
                    className={styles.noComplement} 
                    onChange={handleSelectComplement}
                    /> {''}
                    <label htmlFor= 'no-complement'>sem complemento</label>
                </div>
                </section>
              ) : ''}
            </div>
            <ul className={styles.productList}>
              {productsFiltered().map((element, index) => {
                return (
                  <ProductCards
                  key={index}
                  image={element.image}
                  name={element.name}
                  flavor={element.flavor}
                  complement={element.complement}
                  price={element.price}
                  onClick={() => handleAddItem(element)}
                  />
                )
              })}
            </ul>
          </section>
          <section className={styles.orderSection}>
            <div className={styles.orderSectionTitle}>
              <h3>PEDIDO</h3>
            </div>
            <div className={styles.clientInformation}>
              <input className={styles.clientName} type='text' placeholder='CLIENTE' name='client' 
              autoComplete='off' onChange={handleOrderChange} value={orderInfo.client}/>
              <select className={styles.clientTable} autoComplete='off' 
              name='table' onChange={handleOrderChange} value={orderInfo.table}>
                <option value=''>MESA</option>
                <option value='1'>MESA 1</option>
                <option value='2'>MESA 2</option>
                <option value='3'>MESA 3</option>
                <option value='4'>MESA 4</option>
                <option value='5'>MESA 5</option>
                <option value='6'>MESA 6</option>
                <option value='7'>MESA 7</option>
                <option value='8'>MESA 8</option>
                <option value='9'>MESA 9</option>
                <option value='10'>MESA 10</option>
              </select>
            </div>
            <ul>
              {items.map((item, index) => {
                return (
                  <Cart 
                  key={index}
                  name={item.name}
                  flavor={item.flavor} 
                  complement={item.complement}
                  price={item.price}
                  qtd={item.qtd} 
                  type={item.sub_type}
                  onClick={() => handleDeleteProducts(item)}
                  />
                )
              })}
            </ul>
            <section className={styles.finalization}>
              <div className={styles.totalOrder}>
                <h4>SUB-TOTAL</h4>
                <ResultPrice value={total} />
              </div>
              <p className={styles.orderError}>{orderError}</p>
              {getRole() === 'attendant' ? (
                <button className={styles.finalizeOrder} onClick={handleSendToKitchen}>Finalizar pedido</button>
              ) : ''}
            </section>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Menu;