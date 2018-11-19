import React from 'react';
import { FormGroup, Label, Input, FormText, FormFeedback, Col } from 'reactstrap';

const SelectInputRender = ({ input, label, placeholder, type, children, meta: { touched, error, warning }, ...custom }) => (
    <FormGroup row>
        <Label for={input.name} sm={2}>{label}</Label>
        <Col sm={10}>
            <Input type="select" {...input} {...(touched ? { invalid : error !== undefined, valid : error === undefined } : {})} {...custom}>
                <option value="">-- 해당 사항 선택 --</option>
                {children}
            </Input>
            {error && <FormFeedback>{error}</FormFeedback>}
            {!error && warning && <FormText>{warning}</FormText>}
        </Col>
    </FormGroup>
);

export default SelectInputRender;