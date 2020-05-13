const iState = {
    min_percent:0,
    max_percent:100,
    brand_name:'',
    stock:false,
    startdate:'',
    enddate:'',
    page:1,
    data:[]
}

const reducer =(state=iState,action)=>{
    if(action.type==='import'){
        return {
            min_percent:action.min_percent,
            max_percent:action.max_percent,
            brand_name:action.brand_name,
            stock:action.stock,
            startdate:action.startdate,
            enddate:action.enddate,
            page:1,
            data:[]
        }
    }
    else if(action.type==='changedata'){
        return {
            min_percent:state.min_percent,
            max_percent:state.max_percent,
            brand_name:state.brand_name,
            stock:state.stock,
            startdate:state.startdate,
            enddate:state.enddate,
            data:action.data,
            page:action.page
        }
    }
    else if(action.type==='updatepage'){
        return {
            min_percent:state.min_percent,
            max_percent:state.max_percent,
            brand_name:state.brand_name,
            stock:state.stock,
            startdate:state.startdate,
            enddate:state.enddate,
            data:state.data,
            page:action.page
        }
    }
    return state
}

export default reducer