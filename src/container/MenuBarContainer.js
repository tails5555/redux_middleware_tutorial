import React from 'react';

import { bindActionCreators } from 'redux'; 
import queryString from 'query-string';

import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import * as typeActions from '../action/action_type';

const mapStateToProps = (state) => ({
    typeList : state.type.typeList
});

const mapDispatchToProps = (dispatch) => ({
    typeListAction : bindActionCreators(typeActions, dispatch)
});

class MenuBarContainer extends React.Component { 
    constructor(props) {
        super(props);
        this.state = { isOpen : false, storeTypes : [], storeLoading : false, storeError : null };
    }

    toggle() {
        const { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen
        });
    }

    componentDidMount() {
        const { typeListAction } = this.props;
        typeListAction.fetch_all_bbs_types();
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { types, loading, error } = nextProps.typeList;
        if(
            prevState.storeTypes !== types ||
            prevState.storeLoading !== loading ||
            prevState.storeError !== error
        ) {
            return {
                storeTypes : types,
                storeLoading : loading,
                sotreError : error
            };
        }
        return null;
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

    componentDidUpdate(prevProps, prevState) {
        if (this.props.location !== prevProps.location) {
            console.log(this.props.location);
        }
    }

    render(){
        const { isOpen, storeTypes, selectType } = this.state;
        const { location } = this.props.history;
        const { pathname, search } = location;

        const activeStyle = {
            backgroundColor : 'powderblue',
            color : 'black',
            borderRadius : '5px',
            border : '2px solid blue',
            padding : '5px'
        }

        console.log(search);
        console.log(pathname);

        const bbsNavs = storeTypes.map((type, idx) => (
            <NavItem key={`nav_item_bbs_${idx}`}>
                <NavLink style={ type.id === selectType ? activeStyle : null } tag={Link} to={`/bbs/list/_ref?type=${type.id}&pg=1`}><i className="fas fa-check-square" />
                    { type && type.name }
                </NavLink>
            </NavItem>
        ));

        return (
            <Navbar color="primary" expand="lg" dark className="sticky-top">
                <NavbarBrand tag={Link} to="/">
                    <h1>Redux BBS Tutorial</h1>
                </NavbarBrand>
                <NavbarToggler onClick={() => this.toggle()} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink style={ pathname === '/' ? activeStyle : null } tag={Link} to="/"><i className="fas fa-home" /> 홈</NavLink>
                        </NavItem>
                        { bbsNavs }
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuBarContainer));