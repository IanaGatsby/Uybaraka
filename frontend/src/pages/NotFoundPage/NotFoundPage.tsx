import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '100px 0', textAlign: 'center' }}>
      <Result
        status="404"
        title="404"
        subTitle="Извините, страница не найдена."
        extra={
          <Button
            type="primary"
            icon={<HomeOutlined />}
            onClick={() => navigate('/')}
          >
            На главную
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
