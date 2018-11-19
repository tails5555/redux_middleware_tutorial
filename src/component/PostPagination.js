import React from 'react';
import queryString from 'query-string';
import { withRouter, Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function makeQueryStringAboutPage(qs, pg){
    let clientQueryModel = queryString.parse(qs);
    clientQueryModel = {
        ...clientQueryModel, pg : pg
    }
    return '?' + queryString.stringify(clientQueryModel);
}

class PostPagination extends React.Component {
    constructor(props){
        super(props);
        const { search } = props.location;
        const queryModel = queryString.parse(search);
        this.state = { count : 0, pageBase : queryModel.sz !== undefined ? queryModel.sz : 8 };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { count } = nextProps;
        if(count !== prevState.count){
            return {
                count
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
        let pageItem = null;

        const { count, pageBase } = this.state;
        const { search } = this.props.location;
        const query = queryString.parse(search);
        const pageNums = [];
        const barCount = pageBase;
        const pageCount = Math.ceil(count / pageBase);
        const base = Math.floor((query.pg - 1) / 10) * 10;

        if(base > 0)
            pageNums.push(base);
        
        for(var k = 1; k <= barCount; k++){
            let n = base + k;
            if(n > pageCount) break;
            pageNums.push(n);
        }

        let next = base + 11;
        if(next <= pageCount)
            pageNums.push(next);

        pageItem = pageNums.map((number, idx) => (
            (number > base && number < base + 11) ?
                number === query.pg * 1 ?
                    <PaginationItem active key={`paginate_item_${number}`}>
                        <PaginationLink tag={Link} to={`./list/_ref${makeQueryStringAboutPage(search, number)}`} >
                            {number}
                        </PaginationLink>
                    </PaginationItem> :
                    <PaginationItem key={`paginate_item_${number}`}>
                        <PaginationLink tag={Link} to={`./list/_ref${makeQueryStringAboutPage(search, number)}`} >
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                : 
                (idx === 0) ?
                    <PaginationItem key={`paginate_item_${number}`}>
                        <PaginationLink previous tag={Link} to={`./list/_ref${makeQueryStringAboutPage(search, base)}`}  />
                    </PaginationItem>
                    : 
                    <PaginationItem key={`paginate_item_${number}`}>
                        <PaginationLink next tag={Link} to={`./list/_ref${makeQueryStringAboutPage(search, next)}`}  />
                    </PaginationItem>
        ));
        return(
            <Pagination className="pagination justify-content-center" size={ window.innerWidth < 768 ? 'sm' : 'md'}>
                {pageItem}
            </Pagination>
        )
    }
}

export default withRouter(PostPagination);