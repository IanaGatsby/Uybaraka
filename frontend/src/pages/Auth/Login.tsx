import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Divider,
  message,
} from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store';
import { login } from '../../store/slices/authSlice';
import './Auth.css';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      const result = await dispatch(
        login({
          email: values.email,
          password: values.password,
        })
      ).unwrap();

      message.success('Вы успешно вошли в систему!');

      // Перенаправление в личный кабинет
      navigate('/dashboard');
    } catch (error: any) {
      message.error(error.message || 'Ошибка входа. Проверьте данные.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    // Интеграция с Google OAuth
    message.info('Google авторизация будет доступна позже');
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          {/* Логотип */}
          <div className="auth-logo">
            <Link to="/">
              <span
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#6e5dc6',
                }}
              >
                UYBARAKA
              </span>
            </Link>
          </div>

          {/* Заголовок */}
          <div className="auth-header">
            <Title level={2}>Вход в аккаунт</Title>
            <Text type="secondary">Введите свои данные для входа</Text>
          </div>

          {/* Форма */}
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Введите email' },
                { type: 'email', message: 'Введите корректный email' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="example@mail.com"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Пароль"
              rules={[
                { required: true, message: 'Введите пароль' },
                {
                  min: 6,
                  message: 'Пароль должен содержать минимум 6 символов',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Введите пароль"
              />
            </Form.Item>

            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                <Link
                  to="/forgot-password"
                  className="auth-link"
                >
                  Забыли пароль?
                </Link>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isSubmitting || loading}
                className="auth-button"
              >
                Войти
              </Button>
            </Form.Item>

            <Divider plain>или</Divider>

            <Button
              block
              icon={<GoogleOutlined />}
              onClick={handleGoogleLogin}
              className="google-button"
            >
              Войти через Google
            </Button>

            <div className="auth-footer">
              <Text type="secondary">
                Нет аккаунта?{' '}
                <Link
                  to="/register"
                  className="auth-link"
                >
                  Зарегистрироваться
                </Link>
              </Text>
            </div>
          </Form>
        </div>

        {/* Дополнительная информация */}
        <div className="auth-info">
          <Title level={4}>Добро пожаловать в Uybaraka!</Title>
          <Text>
            Войдите в свой аккаунт, чтобы управлять объявлениями, просматривать
            статистику и многое другое.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Login;
