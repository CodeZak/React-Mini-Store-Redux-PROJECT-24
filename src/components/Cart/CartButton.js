import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import { cartActions } from "../store";

const CartButton = (props) => {
    let cartItems = useSelector((state) => state.cartItems);
    let totalQuantity = cartItems.reduce((curr, acc) => {
        return curr + acc.quantity;
    }, 0);

    const dispatch = useDispatch();
    const cartBtnHandler = () => {
        dispatch(cartActions.showCart());
    };
    return (
        <button className={classes.button} onClick={cartBtnHandler}>
            <span>My Cart</span>
            <span className={classes.badge}>{totalQuantity}</span>
        </button>
    );
};

export default CartButton;
