import WishlistService from "../service/WishlistService/wishlistService";
import { useCallback, useEffect, useState } from "react";
import { BsFillSuitHeartFill } from "react-icons/bs";
import "./wishlist.css";
import { Link, useNavigate } from "react-router-dom";

const Wishlist = (props) => {
  const navigate = useNavigate()
  const [wishlistItem, setWishlistItem] = useState([]);

  const updateWishlist = useCallback(async () => {
    const addToWishlist = await WishlistService.wishLIstGetData();
    setWishlistItem(addToWishlist);
    return addToWishlist;
  }, []);

  useEffect(() => {
    updateWishlist();
  }, [updateWishlist]);

  const wishlistDeleteHandler = useCallback(
    async (wishlistId) => {
      await WishlistService.wishListDeleteData(wishlistId);
      await updateWishlist();
    },
    [updateWishlist]
  );

  const buyAllHandler = ()=>{
    // let ids = ""
    //
    // wishlistItem.forEach((element,ind) => {
    //   if(ind===0){
    //     ids+= element.id
    //   }
    //   else{
    //     ids+=','+element.id
    //   }
    // });

    navigate({
      pathname: '/order',
      search: `?product=${wishlistItem.map(p => p.id).join(',')}`
    })
  }

  return (
    <div>
      <div className="container clothPart1">
      <div className='buyAll' onClick={buyAllHandler}>
      <button type="button" className="btn btn-secondary">BUY ALL</button>
      </div>
        <div className="row detail1">
          {wishlistItem.map((value) => {
            return (
              <div className="col-2 column1" key={value.id}>
              <Link to={`/datainformation/${value.id}`}>
                <img src={value.img} alt={value.title} className="cupImage" />
                </Link>
                <div className="wishlist1">
                  <div className="price1">
                  <Link to={`/datainformation/${value.id}`}>
                    <h6 className="title1">{value.title}</h6>
                  </Link>
                    <p className="description1">{value.description}</p>
                    <p className="title1">Rs. {value.price}</p>
                  </div>
                  <div
                    className="wishlistBag1"
                    onClick={() => wishlistDeleteHandler(value.wishlistId)}
                    style={{ color: `red` }}
                  >
                    <BsFillSuitHeartFill />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
