import React from 'react'
import { Layout } from 'antd';
import './style/side.css'
import FilterInput from './FilterInput';
import Contentall from './Contentall';

const { Header, Content, Sider } = Layout;

class SideBar extends React.Component{
    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <h1 style={{color:'white'}}>ShopperCarty</h1>
                </Header>
                <Layout className="content-size">
                    <Sider
                    width="260"
                    breakpoint="lg"
                    collapsedWidth="0"
                    >
                        <FilterInput/> 
                    </Sider>
                    <Content>
                        <Contentall/>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
export default SideBar