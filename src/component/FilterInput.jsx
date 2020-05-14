import React from 'react'
import { InputNumber, Divider,Input,Switch,DatePicker,Button } from 'antd';
import { ShoppingCartOutlined,CheckOutlined,CloseOutlined,SearchOutlined } from '@ant-design/icons';
import './style/side.css'
import moment from 'moment'
import { connect } from "react-redux";
const { RangePicker } = DatePicker;

class FilterInput extends React.Component{
    constructor(){
        super()
        this.state={
            min_percent:0,
            max_percent:100,
            brand_name:'',
            stock:false,
            startdate:'',
            enddate:''
        }
    }
    onchangedate=(event)=>{
        if(!event){
            this.setState({
                startdate:'',
                enddate:''
            })
            return
        }
        let start=moment(event[0]).format('YYYY-MM-DD');
        let end=moment(event[1]).format('YYYY-MM-DD');
        this.setState({
            startdate:start,
            enddate:end
        })
    }
    onchangemin_percent=(e)=>{
        if(e>=100){
            e=99
        }
        else if(e<=0){
            e=0
        }
        this.setState({
            min_percent:e
        })   
    }
    onchangemax_percent=(e)=>{
        if(e>=100){
            e=100
        }
        else if(e<=0){
            e=1
        }
        this.setState({
            max_percent:e
        })
    }
    onchangebrand=(e)=>{
        this.setState({
            brand_name:e.target.value
        })
    }
    onchangestock=(e)=>{
        this.setState({
            stock:e
        })
    }
    postdata=(e)=>{
        e.preventDefault()
        this.props.changevalue(this.state.min_percent,this.state.max_percent,this.state.brand_name,this.state.stock,this.state.startdate,this.state.enddate)
    }
    render(){
        return (
            <div className="filter-menu-adjust">
                <Divider><div className="divide-style">Discount %</div></Divider>
                <div className="site-input-number-wrapper marginer" >
                    <InputNumber min={0} max={99} type='number' defaultValue={0} onChange={this.onchangemin_percent}/>
                    <span>  to  </span>
                    <InputNumber min={0} max={100} defaultValue={100} type='number' onChange={this.onchangemax_percent}/>
                </div>
                <Divider><div className="divide-style">Brand Name</div></Divider>
                <Input className="input-product" onChange={this.onchangebrand} size="large" placeholder="   Brand" prefix={<ShoppingCartOutlined />} />
                <Divider><div className="divide-style">Stock Availability</div></Divider>
                <div className="marginer">
                    <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked={false}
                    onChange={this.onchangestock}
                    />
                </div>
                <Divider><div className="divide-style">Created between</div></Divider>
                <div className="input-product">
                    <RangePicker onChange={this.onchangedate}/>
                </div>
                <div className="marginer-button">
                    <Button type="primary" size="large" shape="circle" icon={<SearchOutlined />} onClick={this.postdata}/>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        changevalue:(value1,value2,value3,value4,value5,value6)=>{dispatch({
            type:'import',
            min_percent:value1,
            max_percent:value2,
            brand_name:value3,
            stock:value4,
            startdate:value5,
            enddate:value6,
        })}
    }
}

export default connect(null,mapDispatchToProps)(FilterInput)