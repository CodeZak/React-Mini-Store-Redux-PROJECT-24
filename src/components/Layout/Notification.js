import classes from "./Notification.module.css";
const Notification = ({status}) => {
    let notification_style,title,message;

    console.log(status === "success");
    if (status === "success") {
        title = "success!"
        message = "Data has been sent successfully!"
        notification_style = classes.success;

    } else if (status === "error") {
        title = "error!"
        message = "something went wrong!"
        notification_style = classes.error;
    } else if (status === "pending") {
        title ="loading..."
        message = "please wait a moment"
        notification_style = classes.pending;
    }
    return (
        <>
            <section className={notification_style}>
                <div className={classes.container}>
                    <div className={classes.title}>{title}</div>
                    <div className={classes.message}>{message}</div>
                </div>
            </section>
        </>
    );
};

export default Notification;
