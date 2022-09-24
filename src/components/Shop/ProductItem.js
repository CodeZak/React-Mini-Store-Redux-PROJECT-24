import { useDispatch } from "react-redux";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { cartActions } from "../store";

const ProductItem = (props) => {
    const { title, price, description, quantity = 1 } = props;
    const dispatch = useDispatch();

    const addToCartHandler = () => {
        const item = { title, price, description, quantity };
        dispatch(cartActions.cartItems(item));
    };

    return (
        <li className={classes.item}>
            <Card>
                <header>
                    <h3>{title}</h3>
                    <div className={classes.price}>${price.toFixed(2)}</div>
                </header>
                <p>{description}</p>
                <div className={classes.actions}>
                    <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
            </Card>
        </li>
    );
};

export default ProductItem;
