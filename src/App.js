import "./App.css";
import MainData from "./Components/MainData";
import EcommerceService from "./service/WishlistService/ecommerceData";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]); 

  const initialServiceData = useCallback(async () => {
    const initialData = await EcommerceService.getData();
    // console.log(initialData);
    setItems(initialData);
    return initialData;
  }, []);

  useEffect(() => {
    initialServiceData();
  }, [initialServiceData]);

  return (
    <div className="App">
      <MainData getData={items} />
    </div>
  );
}

export default App;
