import "./MainData.css";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { BsSuitHeart } from "react-icons/bs";
import WishlistService from "../service/WishlistService/wishlistService";
import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
// import OrderHistoryService from "./service/WishlistService/OrderService";

const MainData = (props) => {
  // console.log(props.getData);
  const [itemsInWishlist, setItemsInWishlist] = useState([]);

  const checkWishlistData = useCallback(async () => {
    const checkWishlist = await WishlistService.wishLIstGetData();
    setItemsInWishlist(checkWishlist);
    return checkWishlist;
  }, []);

  useEffect(() => {
    checkWishlistData();
  }, [checkWishlistData]);

  const wishlistData = useCallback(
    async (id) => {
      const isCheck = itemsInWishlist.find((val) => {
        return id === val.id;
      });

      if (isCheck) {
        await WishlistService.wishListDeleteData(isCheck.wishlistId);
      } else {
        const findValue = props.getData.find((val) => id === val.id);
        await WishlistService.wishlistCreate(findValue);
      }
      await checkWishlistData();
    },
    [checkWishlistData, itemsInWishlist, props.getData]
  );

  // const buyHandler = useCallback(
  //   async (id) => {
  //     // console.log(itemsInWishlist);
  //     const addDataInOrder = itemsInWishlist.find((val) => {
  //       return id === val.id;
  //     });

  //     // const order = {
  //     //   items: [addDataInOrder],
  //     //   status: 'pending',
  //     //   date: Date.now()
  //     // }

  //     // []

  //     // await OrderHistoryService.orderCreate(addDataInOrder)
  //   },
  //   [itemsInWishlist]
  // );

  return (
    <div className="container clothPart">
      <div className="row detail">
        {props.getData.map((value) => {
          const isWishlisted = itemsInWishlist.some(
            (wItem) => wItem.id === value.id
          );
          return (
            <div className="col-4 column" key={value.id}>
              <Link to={`/datainformation/${value.id}`}>
                <img src={value.img} alt={value.title} className="img" />
              </Link>
              <div className="wishlist">
                <div className="price">
                  <h6 className="title">{value.title}</h6>
                  <p className="description">{value.description}</p>
                  <p className="title">Rs. {value.price}</p>
                </div>
                <div>
                  {!isWishlisted ? (
                    <div
                      className="wishlistBag"
                      onClick={() => wishlistData(value.id)}
                    >
                      <BsSuitHeart />
                    </div>
                  ) : (
                    <div
                      className="wishlistBag"
                      onClick={() => wishlistData(value.id)}
                      style={{ color: `red` }}
                    >
                      <BsFillSuitHeartFill />
                    </div>
                  )}

                  <button className="cart Button" type="button">
                    Add To Cart
                  </button>
                  <Link
                    to={{ pathname: `/order`, search: `?product=${value.id}` }}
                  >
                    <button className="buy Button" type="button">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MainData;
