import { BsFillSuitHeartFill } from "react-icons/bs";
import { BsSuitHeart } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import WishlistService from "../service/WishlistService/wishlistService";
import EcommerceService from "../service/WishlistService/ecommerceData";
import { useState, useCallback, useEffect, useMemo } from "react";
import classes from './DataInformation.module.css'
import { Link, useParams } from "react-router-dom";
import OrderHistoryService from '../service/WishlistService/OrderService'

const DataInformation = (props) => {
  const { id } = useParams();

  const [itemsInWishlist, setItemsInWishlist] = useState([]);
  const [productDetails, setProductDetails] = useState(null);

  const checkWishlistData = useCallback(async () => {
    const checkWishlist = await WishlistService.wishLIstGetData();
    setItemsInWishlist(checkWishlist);
    return checkWishlist;
  }, []);
  
  const initialServiceData = useCallback(async () => {
    const initialData = await EcommerceService.getDataById(id);
    setProductDetails(initialData);
    return initialData;
  }, [id]);

  const buyButton = useCallback(async(id)=>{
    await OrderHistoryService.orderCreate(productDetails)
  },[productDetails])

  useEffect(() => {
    checkWishlistData();
    initialServiceData();
  }, [checkWishlistData, initialServiceData]);

 

  const wishlistData = useCallback(
    async (id) => {
      const isCheck = itemsInWishlist.find((val) => {
        return id === val.id;
      });
      if (isCheck) {
        await WishlistService.wishListDeleteData(isCheck.wishlistId);
      } 
      else {
        await WishlistService.wishlistCreate(productDetails);
      }
      await checkWishlistData();
    },
    [checkWishlistData,itemsInWishlist,productDetails]
  );


  const isWishlisted = useMemo(() => itemsInWishlist.some((item) => item.id === id), [itemsInWishlist, id]);

  if (!productDetails) return <p>Loading...</p>;

 

  return (
    <div className={classes.clothPart}>
      <div className={classes.singleData} key={productDetails.id}>
        <div className={classes.image}>
          <img src={productDetails.img} alt={productDetails.title} className={classes.img} />
          <div className={classes.wishlistIcon}>
          {!isWishlisted ? (
              <div
                className={classes.wishlistBag}
                onClick={() => wishlistData(productDetails.id)}
              >
                <button className={classes.heartIcon}><BsSuitHeart /></button>
              </div>
            ) : (
              <div
                className={classes.wishlistBag}
                onClick={() => wishlistData(productDetails.id)}
                style={{ color: `red` }}
              >
              <button className={classes.heartIcon}><BsFillSuitHeartFill /></button>
              </div>
            )}
          </div>
          
          <div className={classes.cartBuy}>
            <button className={classes.cart}><GrCart/>ADD TO CART</button>
            <Link to={{ pathname: `/order`, search: `?product=${productDetails.id}` }}>
            <button className={classes.buy} onClick={()=>buyButton(productDetails.id)}>
            <MdOutlineDoubleArrow/>BUY NOW
            </button>
            </Link>
            </div>
        </div>
        <div className={classes.Wishlist}>
          <div className={classes.price}>
            <h2 className={classes.title}>{productDetails.title}</h2>
            <p className={classes.description}>{productDetails.description}</p>
            <p className={classes.title}><FaRupeeSign/> {productDetails.price}</p>
          </div>
          <div>
            {/* {!isWishlisted ? (
              <div
                className={classes.wishlistBag}
                onClick={() => wishlistData(productDetails.id)}
              >
                <BsSuitHeart />
              </div>
            ) : (
              <div
                className={classes.wishlistBag}
                onClick={() => wishlistData(productDetails.id)}
                style={{ color: `red` }}
              >
                <BsFillSuitHeartFill />
              </div>
            )} */}
            <p className={classes.description}><h6>Description : </h6>
            MUG DETAIL Professional printing on both the sides of the ceramic mug.
             Color : White, Material: Ceramic Coffee Mug (330ml) Multi-purpose mug: 
             Can be used as tea/coffee or pen stand Package Contents: 2-Piece Milk Mug 
             (330ml/9.5cm) Be Unique Mugs made from Premium Quality Ceramic which is Highly 
             Durable and has a Capacity of 330ML liquid. It comes with “C” Type Handle which 
             helps you get a Good Grip. Print Quality is very great on our Mugs. We ensure that 
             Design will be printed to the highest quality and you get a Top Quality Printed Mug.
              Its gives you Smooth Glossy Finish after many Washes. Our All Mugs is Microwave, 
              Oven, Refrigerator, Freezer and Dishwasher Safe So you can use these mugs with any 
              Hot and Cold Beverage without any quality loss. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DataInformation;
