import React from 'react'
import EachContent from './EachContent'
import { Alert,Button } from 'antd'
import { connect } from "react-redux";
import axios from 'axios'
import './style/content.css'

class ContentScroll extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props)
        this.state={
            hidespin:false,
            nodata:false,
            data:[],
            page:1,
            button_value:'Click to load more'
        }
    }
    fetcher=()=>{
        let obj=[
            {"key":"similar_products.meta.avg_discount","value":[this.props.min_percent/100,this.props.max_percent/100],"operator":"between"}
        ]
        if(this.props.brand_name !== ''){
            obj.push({"key":"brand.name","value":this.props.brand_name,"operator":"contains"})
        }
        if(this.props.stock===true){
            obj.push({"key":"stock.available","value":true,"operator":"exact"})
        }
        if(this.props.startdate!==''&&this.props.enddate!==''){
            obj.push({"key":"created_at","value":[this.props.startdate,this.props.enddate],"operator":"between"})
        }
        let obj1={
            "page":this.state.page+1,
            "filters":obj
        }
        axios.post('https://shoppercarty-backend.herokuapp.com/',obj1).then(res=>{
            console.log(res)
            if(res.data.length<12){
                this.setState({
                    nodata:true
                })
            }
            let add_data=this.state.data.concat(res.data)
            this.props.changevalue(this.state.page+1)
            this.setState({
                data:add_data,
                hidespin:false,
                button_value:'Click to load more',
                page:this.state.page+1
            })
        })
    }
    handleMore = (e) => { 
        e.preventDefault()
        this.setState({
            button_value:'loading...',
            hidespin:true
        })
        this.fetcher()
    };
    render(){
        let {nodata,hidespin,data,button_value}=this.state
        if(this.props.page===1 && data.length!==0){
            console.log(this.props.page,data.length)
            this.setState({
                data:[]
            })
        }
        if(nodata===true){
            return (
                <div>
                    <div style={{marginTop:'5px',marginRight:'5px',marginLeft:'5px',display:'flex',flexWrap:'wrap',justifyContent:'space-around'}}>
                        {data.map(el=>
                            <EachContent key={el._id} wholedata={el}/>
                        )}
                    </div>
                    <div style={{marginLeft:'10px',marginBottom:'10px',marginRight:'10px',textAlign:"center"}}>
                        <Alert type="error" show="false" message="No more data to show"/>
                    </div>
                </div>
            )    
        }
        else{
            return (
                <div>
                    <div style={{marginTop:'5px',marginRight:'5px',marginLeft:'5px',display:'flex',flexWrap:'wrap',justifyContent:'space-around'}}>
                        {data.map(el=>
                            <EachContent key={el._id} wholedata={el}/>
                        )}
                    </div>
                    <div style={{textAlign:'center',marginBottom:'10px'}}>
                        <Button style={{marginLeft:'auto',marginRight:'auto'}} type="primary" loading={hidespin} onClick={this.handleMore}>{button_value}</Button>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps=(state)=>{
    return {
        ...state
    }   
}
const mapDispatchToProps=(dispatch)=>{
    return {
        changevalue:(value1)=>{dispatch({
            type:'updatepage',
            page:value1
        })}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ContentScroll)