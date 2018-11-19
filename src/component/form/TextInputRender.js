import React from 'react';
import { FormGroup, Label, Input, FormText, FormFeedback, Col } from 'reactstrap';

const TextInputRender = ({ input, label, placeholder, type, meta: { touched, error, warning }, ...custom }) => (
    <FormGroup row>
        <Label for={input.name} sm={2}>{label}</Label>
        <Col sm={10}>
            <Input type={type} {...(touched ? { invalid : error !== undefined, valid : error === undefined } : {})} {...input} placeholder={placeholder} {...custom} />
            {error && <FormFeedback>{error}</FormFeedback>}
            {!error && warning && <FormText>{warning}</FormText>}
        </Col>
    </FormGroup>
);

export default TextInputRender;