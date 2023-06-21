import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Product, Client, Sale } from "../JSONTypes";
import { getChoices } from '../api';

export default function Form() {
  const [productNames, setProductNames] = useState<string[]>([])
  const [sizes, setSizes] = useState<string[]>([])
  const [shops, setShops] = useState<string[]>([])
  const [salesmen, setSalesmen] = useState<string[]>([])

  useEffect(() => {
    getChoices().then(resp => {
      setProductNames(resp.product_names)
      setSizes(resp.sizes)
      setShops(resp.shops)
      setSalesmen(resp.salesmen)
    })
  }, []);

  const [sale, setSale] = useState<Sale>({
    date: new Date(),
    shop: '',
    salesman: '',
    products: [
      {
        name: '',
        size: '',
        non_standard_size: undefined,
        price: 0,
      }
    ],
    client: {
      name: '',
      phone: '',
      address: '',
    }
  })

  const updateSale = (key: keyof Sale, value: any) => {
    const updated = {...sale};
    if (key == 'date') {
      updated[key] = new Date(value);
    } else {
      updated[key] = value;
    }
    setSale(updated)
  }

  const addProduct = () => {
    const updated = {...sale};
    updated.products.push({
      name: '',
      size: '',
      non_standard_size: undefined,
      price: 0,
    })
    setSale(updated)
  }

  const updateProduct = (i: number, key: keyof Product, value: string | number) => {
    const updated = {...sale};
    (updated.products[i][key] as string | number) = value
    setSale(updated)
  }

  const updateClient = (key: keyof Client, value: string) => {
    const updated = {...sale};
    updated.client[key] = value;
    setSale(updated)
  }

  return (
    <div className="container bg-whitesmoke d-flex flex-column p-5 shadow">
      <label htmlFor="date" className="form-label">Дата</label>
      <input
        type="date"
        id="date"
        className="form-control"
        onChange={e => updateSale('date', e.target.value)} />
      {shops.length && <label htmlFor="shop" className="form-label">Магазин</label>}
      {shops.length && <select id="shop" className="form-select" onChange={e => updateSale('shop', e.target.value)}>
        {shops.map((shop, i) => {
          return <option key={i} value={shop}>{shop}</option>
        })}
      </select>}
      {salesmen.length && <label htmlFor="salesman" className="form-label">Продавец</label>}
      {salesmen.length && <select id="salesman" className="form-select" onChange={e => updateSale('salesman', e.target.value)}>
        {salesmen.map((salesman, i) => {
          return <option key={i} value={salesman}>{salesman}</option>
        })}
      </select>}
      <span className="mt-3 form-label" onClick={() => addProduct()}>Товары <FontAwesomeIcon icon="plus" color="lime"/></span>
      {productNames.length && sizes.length && sale.products.map((product, i) => {
        return <div className='p-3' key={i}>
          <label htmlFor={`productName${i}`} className="form-label">Название продукта</label>
          <select id={`productName${i}`} className="form-select" onChange={e => updateProduct(i, 'name', e.target.value)}>
          {productNames.map((productName, j) => {
            return <option key={j} value={productName}>{productName}</option>
          })}
          </select>
          <label htmlFor={`size${i}`} className="form-label">Размер продукта</label>
          <select id={`size${i}`} className="form-select" onChange={e => updateProduct(i, 'size', e.target.value)}>
          {sizes.map((size, j) => {
            return <option key={j} value={size}>{size}</option>
          })}
          </select>
          <label htmlFor={`non_standard_size${i}`} className="form-label">Нестандартный размер</label>
          <input
            type="text"
            id={`non_standard_size${i}`}
            className="form-control"
            disabled={sale.products[i].size.length < 10}
            onChange={e => updateProduct(i, 'non_standard_size', e.target.value)} />
          <label htmlFor={`price${i}`} className="form-label">Цена</label>
          <input
            type="number"
            id={`price${i}`}
            className="form-control"
            onChange={e => updateProduct(i, 'price', e.target.value)} />
        </div>
      })}
      <label htmlFor="name" className="form-label">Имя Клиента</label>
      <input
        type="text"
        id="name"
        className="form-control"
        onChange={e => updateClient('name', e.target.value)} />
      <label htmlFor="phone" className="form-label">Телефон Клиента</label>
      <input
        type="text"
        id="phone"
        className="form-control"
        onChange={e => updateClient('phone', e.target.value)} />
      <label htmlFor="address" className="form-label">Адрес Клиента</label>
      <input
        type="text"
        id="address"
        className="form-control"
        onChange={e => updateClient('address', e.target.value)} />
      <button className='mt-3 btn btn-primary'>Отправить</button>
    </div>
  );
}
