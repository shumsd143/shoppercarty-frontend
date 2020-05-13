import React from 'react'
import { Card } from "antd";

const { Meta } = Card;

class EachContent extends React.Component{
    constructor(props){
        super(props)
    }
    go_to_url=(e)=>{
        window.open(this.props.wholedata.url)
    }
    render(){
        return (
            <div style={{marginLeft:'5px',marginRight:'10px',marginBottom:"10px"}}>
                <Card
                    onClick={this.go_to_url}
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={this.props.wholedata.media.standard[0].url} />}
                >
                    <Meta title={this.props.wholedata.name} description={this.props.wholedata.price.regular_price.value} />
                </Card>
            </div>
        )
    }
}

export default EachContent