const loggerMiddleware = store => next => action => {
    console.log('-- Redux Action Start Date : ', new Date().toLocaleString());
    console.log('Current Action State : ', store.getState());
    console.log('Action Object : ', action);

    const result = next(action);

    console.log('Next Action State : ', store.getState());
    console.log('-- End Log --');
    
    return result; 
}

export default loggerMiddleware;