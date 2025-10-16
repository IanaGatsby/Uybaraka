import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Typography,
  Radio,
  Divider,
  message,
  Space,
} from 'antd';
import {
  // UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  // HomeOutlined,
  // TeamOutlined,
  // BankOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store';
import { register } from '../../store/slices/authSlice';
import type { UserRole } from '../../types/user';
import './Auth.css';

const { Title, Text, Paragraph } = Typography;

interface RegisterFormValues {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  companyName?: string;
  inn?: string;
  agencyName?: string;
}

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [selectedRole, setSelectedRole] = useState<UserRole>('owner');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleOptions = [
    {
      value: 'owner',
      // icon: <HomeOutlined />,
      label: 'Собственник',
      description: 'Частное лицо, продающее или сдающее недвижимость',
    },
    {
      value: 'realtor',
      // icon: <TeamOutlined />,
      label: 'Риэлтор',
      description: 'Агент по недвижимости или агентство',
    },
    {
      value: 'developer',
      // icon: <BankOutlined />,
      label: 'Застройщик',
      description: 'Строительная компания или застройщик',
    },
  ];

  const onFinish = async (values: RegisterFormValues) => {
    try {
      setIsSubmitting(true);

      const result = await dispatch(
        register({
          email: values.email,
          phone: values.phone,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          role: values.role,
          companyName: values.companyName,
          inn: values.inn,
          agencyName: values.agencyName,
        })
      ).unwrap();

      message.success(
        'Регистрация успешна! Проверьте email для подтверждения.'
      );

      // Перенаправление на страницу входа
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      message.error(error.message || 'Ошибка регистрации. Попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper register-wrapper">
        <div className="auth-card register-card">
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
            <Title level={2}>Регистрация</Title>
            <Text type="secondary">
              Создайте аккаунт и начните размещать объявления
            </Text>
          </div>

          {/* Форма */}
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            requiredMark={false}
            initialValues={{ role: 'owner' }}
          >
            {/* Выбор роли */}
            <Form.Item
              name="role"
              label="Кто вы?"
              rules={[{ required: true, message: 'Выберите роль' }]}
            >
              <Radio.Group
                onChange={(e) => setSelectedRole(e.target.value)}
                className="role-selector"
              >
                <Space
                  direction="vertical"
                  style={{ width: '100%' }}
                >
                  {roleOptions.map((option) => (
                    <Radio.Button
                      key={option.value}
                      value={option.value}
                      className="role-option"
                    >
                      <Space align="start">
                        {/* <span className="role-icon">{option.icon}</span> */}
                        <div>
                          <div className="role-label">{option.label}</div>
                          <div className="role-description">
                            {option.description}
                          </div>
                        </div>
                      </Space>
                    </Radio.Button>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>

            <Divider />

            {/* Имя и Фамилия */}
            <Space.Compact style={{ width: '100%' }}>
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: 'Введите имя' }]}
                style={{ width: '50%', marginBottom: '24px' }}
              >
                <Input placeholder="Имя" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: 'Введите фамилию' }]}
                style={{ width: '50%', marginBottom: '24px' }}
              >
                <Input placeholder="Фамилия" />
              </Form.Item>
            </Space.Compact>

            {/* Email */}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Введите email' },
                { type: 'email', message: 'Введите корректный email' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="example@mail.com"
              />
            </Form.Item>

            {/* Телефон */}
            <Form.Item
              name="phone"
              label="Телефон"
              rules={[
                { required: true, message: 'Введите номер телефона' },
                {
                  pattern: /^(\+998|998)?[0-9]{9}$/,
                  message: 'Введите корректный номер телефона',
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="+998 90 123 45 67"
              />
            </Form.Item>

            {/* Дополнительные поля для риэлторов */}
            {selectedRole === 'realtor' && (
              <Form.Item
                name="agencyName"
                label="Название агентства"
                rules={[
                  { required: true, message: 'Введите название агентства' },
                ]}
              >
                <Input placeholder="Название вашего агентства" />
              </Form.Item>
            )}

            {/* Дополнительные поля для застройщиков */}
            {selectedRole === 'developer' && (
              <>
                <Form.Item
                  name="companyName"
                  label="Название компании"
                  rules={[
                    { required: true, message: 'Введите название компании' },
                  ]}
                >
                  <Input placeholder="ООО 'Название компании'" />
                </Form.Item>
                <Form.Item
                  name="inn"
                  label="ИНН"
                  rules={[
                    { required: true, message: 'Введите ИНН' },
                    { len: 9, message: 'ИНН должен содержать 9 цифр' },
                  ]}
                >
                  <Input
                    placeholder="123456789"
                    maxLength={9}
                  />
                </Form.Item>
              </>
            )}

            {/* Пароль */}
            <Form.Item
              name="password"
              label="Пароль"
              rules={[
                { required: true, message: 'Введите пароль' },
                { min: 6, message: 'Минимум 6 символов' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Минимум 6 символов"
              />
            </Form.Item>

            {/* Подтверждение пароля */}
            <Form.Item
              name="confirmPassword"
              label="Подтвердите пароль"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Подтвердите пароль' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароли не совпадают'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Повторите пароль"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isSubmitting || loading}
                className="auth-button"
              >
                Зарегистрироваться
              </Button>
            </Form.Item>

            <div className="auth-footer">
              <Text type="secondary">
                Уже есть аккаунт?{' '}
                <Link
                  to="/login"
                  className="auth-link"
                >
                  Войти
                </Link>
              </Text>
            </div>

            <Paragraph
              type="secondary"
              style={{ fontSize: '12px', marginTop: '16px' }}
            >
              Регистрируясь, вы соглашаетесь с{' '}
              <Link to="/terms">Условиями использования</Link> и{' '}
              <Link to="/privacy">Политикой конфиденциальности</Link>
            </Paragraph>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
