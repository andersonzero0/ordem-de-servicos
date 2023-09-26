import { createContext, useEffect, useState } from "react";
import { api } from "../../service/api";

export const OrderContext = createContext();

export default function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [haveOrders, setHaveOrders] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [dataYears, setDataYears] = useState([]);

  async function getOrders() {
    try {
      const response = await api.get("/order");

      setOrders(response.data);

      setHaveOrders(true);
    } catch (error) {
      console.log(error);
      setHaveOrders(false);
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
    <OrderContext.Provider value={{ orders, dataYears, setOrders, haveOrders, refresh, setRefresh }}>
      {children}
    </OrderContext.Provider>
  );
}
