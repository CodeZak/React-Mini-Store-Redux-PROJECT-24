import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/Layout/Notification";
import { cartActions } from "./components/store";

let show_notification1 = true;
let show_notification2 = true;

function App() {
    const showCart = useSelector((state) => state.showCart);
    const cartItems = useSelector((state) => state.cartItems);
    const dispatch = useDispatch();

    const [status, setStatus] = useState("");

    /******************GET DATA */

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://react-mini-store-default-rtdb.firebaseio.com/Orders.json"
                );
                if (!response.ok) {
                    throw new Error("we couldn't fetch Data");
                }
                const data = await response.json();
                dispatch(cartActions.fetchDataHandler(data));
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    /******************SEND DATA */
    useEffect(() => {
        if (show_notification1) {
            show_notification1 = false;
            return;
        }
        if (show_notification2) {
            show_notification2 = false;
            return;
        }
        const sendData = async () => {
            setStatus("pending");
            const response = await fetch(
                "https://react-mini-store-default-rtdb.firebaseio.com/Orders.json",
                {
                    method: "PUT",
                    body: JSON.stringify(cartItems),
                    headers: { "content-type": "application/json" },
                }
            );
            if (!response.ok) {
                setStatus("error");
            }
            setStatus("success");
        };

        sendData().catch((error) => setStatus("error"));
    }, [cartItems]);

    return (
        <>
            {status && <Notification status={status} />}
            <Layout>
                {showCart && <Cart />}
                <Products />
            </Layout>
        </>
    );
}

export default App;
