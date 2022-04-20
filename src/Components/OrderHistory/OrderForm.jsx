import classes from "./OrderForm.module.css";
import { FaRupeeSign } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { SiPhonepe, SiGooglepay } from "react-icons/si";
import { CgPaypal } from "react-icons/cg";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import EcommerceService from "../../service/WishlistService/ecommerceData";
import { useNavigate } from "react-router-dom";
import OrderHistoryService from "../../service/WishlistService/OrderService";

const OrderForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Address: '',
    Phone: ''
  })
  const [searchParams] = useSearchParams();
  const productIdsString = searchParams.get("product");

  const [initialData, setInitialData] = useState([]);

  const getProductDetails = useCallback(async (ids) => {
    const productsData = ids.map((id) => EcommerceService.getDataById(id));
    const res = await Promise.all(productsData);
    setInitialData(res);
  }, []);

  useEffect(() => {
    if (productIdsString === null) {
      navigate("/", {replace: true});
    } else {
      const ids = productIdsString.split(",");
      getProductDetails(ids);
    }
  }, [getProductDetails, productIdsString, navigate]);

  const totalPrice = useMemo(() => {
    let tp = 0;
    initialData.map((p) => (tp += p.price));
    return tp;
  }, [initialData]);

  const inputHandler = (event)=>{
    let name = event.target.name
    let value = event.target.value
    setFormData({...formData,[name]: value})
  }

  const onPurchase = async event => {
    event.preventDefault();
    console.log(formData);
    // Create Order object
    let orderItem = {
      items: [...initialData],
      status: 'pending',
      totalPrice : totalPrice,
      date: Date.now(),
      userDetail:{...formData}
    }
   
    
    console.log(orderItem);
    // Make API
    await OrderHistoryService.orderCreate(orderItem)
    // Navigate to order page
    navigate('/orderhistory')
  }

  return (
    <div className={classes.form}>
      {initialData.map((product) => (
        <div key={product.id} className={classes.orderForm}>
          <div className={classes.image}>
            <div>
              <img src={product.img} className={classes.img} alt="not found" />
              {/* <div><FaCcVisa/> <SiPhonepe/> <SiGooglepay/><p>COD</p></div> */}
            </div>
            <div>
              <p className={classes.customerName}>
                <span>title: </span> <span>{product.title}</span>{" "}
              </p>
              <p className={classes.customerName}>
                <span>description :</span> <span>Nice Product</span>
              </p>
              <p className={classes.customerName}>
                <span>Price:</span>
                <span>{product.price}</span>
              </p>
              <p className={classes.customerName}>
                <span>Quantity :</span>
                <input type="number" className={classes.input}></input>
              </p>
            </div>
          </div>
          <div className={classes.detail}>
            <h6>PRICE DETAILS</h6>
            <p className={classes.customerName}>
              <span>Pin Code :</span>
              <span> 560029 </span>
            </p>
            <p className={classes.customerName}>
              <span>Total MRP : </span>
              <span> {product.price}</span>
            </p>
            <p className={classes.customerName}>
              <span>Discount on MRP :</span>
              <span> 60%</span>
            </p>
            <hr />
          </div>
        </div>
      ))}

      <form className={classes.formWithPaymentMode} onSubmit={onPurchase}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            required
            type="text"
            name='Name'
            value={formData.Name}
            onChange={inputHandler}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name='Email'
            value={formData.Email}
            onChange={inputHandler}
            required
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Address
          </label>
          <input
            type="text"
            required
            value={formData.Address}
            onChange={inputHandler}
            name='Address'
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Phone Number
          </label>
          <input
            type="number"
            required
            value={formData.Phone}
            onChange={inputHandler}
            name='Phone'
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className={classes.paymentMode}>
        <input type="radio" id="huey" name="drone" value="huey"
         checked />
        <label for="huey"><FaCcVisa /></label>

        <input type="radio" id="huey" name="drone" value="huey"
         checked />
        <label for="huey"><SiPhonepe /></label>

        <input type="radio" id="huey" name="drone" value="huey"
         checked />
        <label for="huey"> <CgPaypal /></label>

        <input type="radio" id="huey" name="drone" value="huey"
         checked />
        <label for="huey"> <SiGooglepay /></label>

        <input type="radio" id="huey" name="drone" value="huey"
         checked />
        <label for="huey"> <p>COD</p></label>
          
        </div>
        <div className={classes.totalMoney}>
          <button type="submit" className="btn btn-primary">
            Place Order
          </button>
          <h6>
            Total Payment : <FaRupeeSign />
            {totalPrice}
          </h6>
        </div>
      </form>
    </div>
  );
};
export default OrderForm;
