import { createContext, useEffect, useState } from "react";
import { api } from "../../service/api";

export const OrderContext = createContext();

export default function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [haveOrders, setHaveOrders] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [dataYears, setDataYears] = useState([]);
  const [ordersMany, setOrdersMany] = useState([]);
  const [countOrders, setCountOrders] = useState(0)
  const [loadingOrder, setLoadingOrder] = useState(false);


  async function getOrders() {
    setLoadingOrder(true)
    try {
      const response = await api.get("/order?page=0");
      const { data } = await api.get("order/many");

      setOrders(response.data.orders);
      setOrdersMany(data)

      setCountOrders(response.data.count)

      setHaveOrders(true);
    } catch (error) {
      console.log(error);
      setHaveOrders(false);
    } finally {
      setLoadingOrder(false)
    }
  }

  async function getDataYears() {
    try {
      const response = await api.get("/order/years");

      setDataYears(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrders();
    getDataYears();
  }, [refresh]);

  return (
    <OrderContext.Provider value={{ orders, dataYears, setOrders, haveOrders, refresh, setRefresh, countOrders, setCountOrders, ordersMany, loadingOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
