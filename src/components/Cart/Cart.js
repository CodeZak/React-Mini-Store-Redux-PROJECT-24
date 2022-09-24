import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { cartActions } from "../store";
const Cart = (props) => {


    const cartItems = useSelector((state) => state.cartItems);

    return (
        <Card className={classes.cart}>
            <h2>Your Shopping Cart</h2>
            <ul>
                {cartItems.map((e, index) => {
                    return (
                        <CartItem
                            key={index}
                            item={{
                                title: e.title,
                                quantity: e.quantity,
                                total: e.price * e.quantity,
                                price: e.price,
                            }}
                        />
                    );
                })}
            </ul>
        </Card>
    );
};

export default Cart;
