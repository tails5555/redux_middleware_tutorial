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
    typeAction : bindActionCreators(typeActions, dispatch)
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
        const { typeAction } = this.props;
        typeAction.fetch_all_bbs_types();
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
                storeError : error
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
    
    render(){
        const { isOpen, storeTypes, storeLoading, storeError } = this.state;
        const { location } = this.props.history;
        const { pathname, search } = location;
        const queryModel = queryString.parse(search);

        const activeStyle = {
            backgroundColor : 'powderblue',
            color : 'black',
            borderRadius : '5px',
            border : '2px solid blue',
            padding : '5px'
        }
        
        const loadingView = 
            storeLoading ? 
                <NavItem>
                    <NavLink>
                        <i className="fa fa-spinner fa-spin" /> 게시판 메뉴를 불러오는 중입니다...
                    </NavLink>
                </NavItem> : null;

        const typeNavs = 
            storeTypes.length > 0 ?
                storeTypes.map((type, idx) => (
                    <NavItem key={`nav_item_bbs_${idx}`}>
                        <NavLink style={ queryModel.type !== undefined && type.id === Number(queryModel.type) ? activeStyle : null } tag={Link} to={`/bbs/list/_ref?type=${type.id}&pg=1`}>
                            <i className="fab fa-elementor" /> { type && type.name }
                        </NavLink>
                    </NavItem>
                )) : null;
        
        const errorView =
            storeError !== null ?
                <NavItem>
                    <NavLink>
                        <i className="fas fa-exclamation-triangle" /> {storeError}
                    </NavLink>
                </NavItem> : null;

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
                        <NavItem>
                            <NavLink style={ pathname === '/bbs/create' ? activeStyle : null } tag={Link} to="/bbs/create"><i className="fas fa-plus-square" /> 게시글 추가</NavLink>
                        </NavItem>
                        { loadingView }
                        { typeNavs }
                        { errorView }
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MenuBarContainer)
);