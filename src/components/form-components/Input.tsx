import React, {ChangeEventHandler, FC} from "react";
import styled from "styled-components";

const CustomLabel = styled.label`
  font-weight: bold;
`

interface InputProps {
    name: string,
    title: string,
    type: string,
    value: string,
    placeholder?: string,
    handleChange: ChangeEventHandler<HTMLInputElement>,
    className?: string,
    errorDiv?: string,
    errorMsg?: string,
}

const Input: FC<InputProps> = (props) => {
    return (
        <div className="mb-3">
            <CustomLabel htmlFor={props.name} className={"form-label"}>
                {props.title}
            </CustomLabel>
            <input
                type={props.type}
                className={`form-control ${props.className || ""}`}
                name={props.name}
                id={props.name}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.placeholder}
            />
            <div className={props.errorDiv}>
                {props.errorMsg}
            </div>
        </div>
    )
}

export default Input