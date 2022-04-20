import classes from "./OrderHistory.module.css";
import { useState, useCallback, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import OrderHistoryService from "../../service/WishlistService/OrderService";

function OrderHistory() {
  const [orderItem, setOrderItem] = useState([]);

  const orderData = useCallback(async () => {
    const dataAddInOrder = await OrderHistoryService.OrderGetData();
    setOrderItem(dataAddInOrder);
  }, []);

  useEffect(() => {
    orderData();
  }, [orderData]);

  const cancelHandler = useCallback(
    async (id) => {
      await OrderHistoryService.orderCancel(id);
      await orderData();
    },
    [orderData]
  );

  return (
    <div>
      {orderItem.map((val) => {
        return (
          <div className={classes.orderHistory} key={val.orderId}>
            <div>
              {val.items.map((value) => {
                return (
                  <div className={classes.info} key={value.id}>
                    <div className="row">
                      <div className="col">
                        <div className={classes.image}>
                          <img
                            src={value.img}
                            alt="val.title"
                            className={classes.img}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className={classes.information}>
                          <h5>{value.title}</h5>
                          <p>{value.description}</p>
                          <p>
                            <FaRupeeSign />
                            Price : {value.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={classes.userInformation}>
              <p>Name : {val.userDetail.Name}</p>
              <p>Email : {val.userDetail.Email}</p>
              <p>Phone : {val.userDetail.Phone}</p>
              <p>Address : {val.userDetail.Address}</p>
            </div>
            <div>
              <p>status:{val.status}</p>
              {val.status === "pending" && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => cancelHandler(val.orderId)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderHistory;
