import { useDispatch, useSelector } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions } from "../store";
const CartItem = (props) => {
    const dispatch = useDispatch();
    const { title, quantity, total, price, key } = props.item;

    const increaseQuantity = (e) => {
        dispatch(cartActions.addAndRemove({ title: e.target.id, modify: 1 }));
    };
    const decreaseQuantity = (e) => {
        dispatch(cartActions.addAndRemove({ title: e.target.id, modify: -1 }));
    };
    return (
        <li className={classes.item} key={key}>
            <header>
                <h3>{title}</h3>
                <div className={classes.price}>
                    ${total.toFixed(2)}{" "}
                    <span className={classes.itemprice}>
                        (${price.toFixed(2)}/item)
                    </span>
                </div>
            </header>
            <div className={classes.details}>
                <div className={classes.quantity}>
                    x <span>{quantity}</span>
                </div>
                <div className={classes.actions}>
                    <button onClick={decreaseQuantity} id={title}>
                        -
                    </button>
                    <button onClick={increaseQuantity} id={title}>
                        +
                    </button>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
