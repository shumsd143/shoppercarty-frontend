import React from 'react'
import EachContent from './EachContent'
import { Space, Spin, Alert } from 'antd'
import { connect } from "react-redux";
import axios from 'axios'
import './style/content.css'
import ContentScroll from './ContentScroll';

class Contentall extends React.Component{
    constructor(props){
        super(props)
        this.state={
            load:false,
            data:[],
            prprops:this.props
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
            "page":1,
            "filters":obj
        }
        axios.post('https://shoppercarty-backend.herokuapp.com/',obj1).then(res=>{
            this.props.changevalue(res,1,[])
            this.setState({
                data:res.data,
                load:true
            })
        })
    }
    changer=()=>{
        this.setState({load:false,prprops:this.props})
        this.fetcher()
    }
    componentDidMount=()=>{
        this.fetcher()
    }
    render(){
        let {data,load,prprops}=this.state
        let crprops=this.props
        if(prprops.stock!==crprops.stock || prprops.startdate!==crprops.startdate || prprops.enddate!==crprops.enddate || prprops.brand_name!==crprops.brand_name || prprops.min_percent!==crprops.min_percent || prprops.max_percent!==crprops.max_percent){
            this.changer()
        }
        if(data.length>0){
            return (
                <div>
                    <div style={{marginTop:'5px',marginRight:'5px',marginLeft:'5px',display:'flex',flexWrap:'wrap',justifyContent:'space-around'}}>
                        {data.map(el=>
                            <EachContent id={el._id} wholedata={el}/>
                        )}
                    </div>
                    <ContentScroll/>
                </div>
            )
        }
        else{
            if(load===true){
                return(
                    <div style={{marginLeft:'10px',marginRight:'10px',marginTop:'20px',textAlign:"center"}}>
                        <Alert type="error" show="false" message="No data available for related search"/>
                    </div>
                )
            }
            else{
                return (
                    <Space size="large" style={{marginLeft:"48%",marginRight:"48%",marginTop:"20px"}}>
                        <Spin size="large"></Spin>
                    </Space>
                )
            }
        }
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        changevalue:(value1,value2,value3)=>{dispatch({
            type:'changedata',
            data:value1,
            page:value2,
            added_data:value3
        })}
    }
}
const mapStateToProps=(state)=>{
    return {
        ...state
    }   
}

export default connect(mapStateToProps,mapDispatchToProps)(Contentall)