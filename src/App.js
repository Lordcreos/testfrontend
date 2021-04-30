import { Layout, Menu, Breadcrumb, Tabs } from 'antd';
import {ListPostsComponent} from './components/ListPostscomponent'
import './App.css';
const { Header, Content, Footer } = Layout;

const { TabPane } = Tabs;
function App() {
  return (
    <Layout>
      <Content style={{ padding: '0 50px', height: '100vh' }}>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Morse/Human" key="1">
          <ListPostsComponent/>
          </TabPane>
        </Tabs>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Mauss ©2021 Created by Leonardo Sanchez
      </Footer>
    </Layout>
  );
}

export default App;