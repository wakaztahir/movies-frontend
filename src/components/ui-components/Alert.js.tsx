import {FC} from "react";

interface AlertProps {
    alertType: string
    alertMessage : string
}

const Alert : FC<AlertProps> = (props) => {
    return (
        <div className={`alert ${props.alertType}`}>
            {props.alertMessage}
        </div>
    )
}

export default Alert