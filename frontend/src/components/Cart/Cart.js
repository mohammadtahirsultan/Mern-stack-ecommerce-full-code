import React from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { RemoveShoppingCart } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  const increaseCart = (id, quantity, stock) => {
    if (stock <= quantity) return;
    let qty = quantity + 1;
    dispatch(addToCart(id, qty));
  };

  const decreaseCart = (id, quantity) => {
    if (quantity <= 1) return;
    let qty = quantity - 1;
    dispatch(addToCart(id, qty));
  };

  const totalPrice = cartItems.reduce((accumulator, currentItem) => {
    const itemPrice = currentItem.price * currentItem.quantity;
    return accumulator + itemPrice;
  }, 0);

  const navigate = useNavigate();
  const checkOutHandler = () => {
    if (isAuthenticated === false) {
      navigate("/login?redirect=shipping");
    } else {
      navigate("/shipping");
    }
  };
  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCart />
          <Typography>No Items in Cart</Typography>
          <Link to={"/products"}>See Products</Link>
        </div>
      ) : (
        <div className="cartPage">
          <div className="cartHeader">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>

          {cartItems &&
            cartItems.map((item) => (
              <div className="cartContainer" key={item.id}>
                <CartItemCard item={item} />
                <div className="cartInput">
                  <button onClick={() => decreaseCart(item.id, item.quantity)}>
                    -
                  </button>
                  <input type="number" readOnly value={item.quantity} />
                  <button
                    onClick={() =>
                      increaseCart(item.id, item.quantity, item.stock)
                    }
                  >
                    +
                  </button>
                </div>
                <div className="cartSubtotal">{item.quantity * item.price}</div>
              </div>
            ))}

          <div className="cartGrossTotal">
            <div></div>

            <div className="cartGrossTotalBox">
              <p>Gross Total </p>
              <p>{totalPrice}</p>
            </div>

            <div></div>

            <div className="checkOutBtn">
              <button onClick={checkOutHandler}>Check Out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
