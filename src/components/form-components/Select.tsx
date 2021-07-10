import React, {ChangeEventHandler, FC} from "react";
import styled from "styled-components";

interface SelectProps {
    name: string,
    title: string,
    value: string,
    placeholder: string,
    options: { id: string; value: any }[]
    handleChange: ChangeEventHandler<HTMLSelectElement>,
}

const CustomLabel = styled.label`
  font-weight: bold;
`

const Select: FC<SelectProps> = (props) => {
    return (
        <div className="mb-3">
            <CustomLabel htmlFor={props.name} className="form-label">
                {props.title}
            </CustomLabel>
            <select
                name={props.name}
                id={props.name}
                value={props.value}
                className="form-select"
                onChange={props.handleChange}
            >
                <option value={""}>{props.placeholder}</option>
                {props.options.map((option: { id: string; value: any }) => {
                    return (
                        <option
                            className="form-select"
                            key={option.id}
                            value={option.value}
                        >{option.value}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default Select