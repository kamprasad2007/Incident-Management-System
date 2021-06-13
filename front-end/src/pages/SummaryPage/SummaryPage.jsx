import React from 'react'
import { Layout } from 'antd';
import SummaryContainer from '../../containers/SummaryContainer'
import HeaderContainer from '../../containers/HeaderContainer';
const { Header, Footer } = Layout;


const SummaryPage = (props) => {

    return (
        <Layout>
            <Header>
                <HeaderContainer {...props}/>
            </Header>
            <Layout>
                <SummaryContainer {...props}/>
            </Layout>
            <Footer></Footer>
        </Layout>
    )
}

export default SummaryPage;