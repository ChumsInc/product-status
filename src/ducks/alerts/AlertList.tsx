import {useSelector} from "react-redux";
import {dismissAlert, selectAlerts} from "./index";
import {useAppDispatch} from "@/app/configureStore.ts";
import {Alert} from "react-bootstrap";

const AlertList = () => {
    const dispatch = useAppDispatch();
    const list = useSelector(selectAlerts);

    const dismissHandler = (id: number) => {
        dispatch(dismissAlert(id));
    }
    return (
        <div>
            {list.map(alert => (
                <Alert key={alert.id} variant="warning" dismissible onClose={() => dismissHandler(alert.id)}>
                    {!!alert.context && (
                        <Alert.Heading>
                            {alert.context}
                            {alert.count > 1 && ` (${alert.count})`}
                        </Alert.Heading>
                    )}
                    {alert.message}
                </Alert>
            ))}
        </div>
    )
}
export default AlertList;
