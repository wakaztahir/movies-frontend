import React, {ChangeEventHandler, FC} from "react";
import styled from "styled-components";

interface TextAreaProps {
    name: string,
    title: string,
    value: string,
    placeholder?: string,
    handleChange: ChangeEventHandler<HTMLTextAreaElement>,
}

const CustomLabel = styled.label`
  font-weight: bold;
`

const TextArea: FC<TextAreaProps> = (props) => {
    return (
        <div className="mb-3">
            <CustomLabel htmlFor={props.name} className="form-label">
                {props.title}
            </CustomLabel>
            <textarea
                name={props.name} id={props.name}
                rows={3}
                className="form-control"
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default TextArea