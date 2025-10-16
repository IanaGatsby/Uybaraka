import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="flex-1">
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
