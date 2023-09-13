import { createContext, useEffect, useState } from "react";
import { api } from "../../service/api";

export const OrderContext = createContext()

export default function OrderProvider({ children }) {

  const [orders, setOrders] = useState([])

  useEffect(() => {

    api
    .get("/order")
    .then((response) => {
      
      setOrders(response.data)

    })
    .catch((error) => {

      console.log(error)
      
    })
    
  }, [])

  return (
    <OrderContext.Provider value={{ orders }}>
      { children }
    </OrderContext.Provider>
  )
  
}