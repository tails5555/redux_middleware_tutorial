import React from 'react';
import { Container } from 'reactstrap';

class HomeContainer extends React.Component {
    constructor(props){
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState){
        for (let stateKey in this.state) {
            if(this.state[stateKey] !== nextState[stateKey]){
                return true;
            }
        }
        for (let propsKey in this.props) {
            if(this.props[propsKey] !== nextProps[propsKey]) {
                return true;
            }
        }
        return false;
    }

    render(){
        return(
            <Container>
                <h1>홈 입니다.</h1>
            </Container>
        );
    }
}

export default HomeContainer;