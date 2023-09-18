import { createContext, useEffect, useState } from "react";
import { api } from "../../service/api";

export const OrderContext = createContext();

export default function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [dataYears, setDataYears] = useState([]);

  async function getOrders() {
    try {
      const response = await api.get("/order");

      setOrders(response.data);
    } catch (error) {
      console.log(error);
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
  }, []);

  return (
    <OrderContext.Provider value={{ orders, dataYears }}>{children}</OrderContext.Provider>
  );
}
