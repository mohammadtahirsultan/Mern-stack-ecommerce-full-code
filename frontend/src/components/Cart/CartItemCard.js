import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-hot-toast";
const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item Removed From Cart");
  };

  return (
    <>
      <div className="CartItemCard">
        <img src={item.image} alt={item.name} />
        <div>
          <Link to={`/product/${item.product}`}>{item.name}</Link>
          <span>{`Price ${item.price}`}</span>
          <p onClick={() => removeFromCartHandler(item.id)}>Remove</p>
        </div>
      </div>
    </>
  );
};

export default CartItemCard;
