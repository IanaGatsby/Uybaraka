import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import './Footer.css';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="footer">
      <div className="footer__container">
        <Row gutter={[32, 24]}>
          {/* Компания */}
          <Col
            xs={24}
            sm={12}
            md={6}
          >
            <div className="footer__section">
              <Title
                level={5}
                className="footer__title"
              >
                Компания
              </Title>
              <Space
                direction="vertical"
                size="small"
              >
                <Link
                  href="#"
                  className="footer__link"
                >
                  О компании
                </Link>
                <Link
                  href="#"
                  className="footer__link"
                >
                  Карьера
                </Link>
                <Link
                  href="#"
                  className="footer__link"
                >
                  Пресс-центр
                </Link>
                <Link
                  href="#"
                  className="footer__link"
                >
                  Реклама на сайте
                </Link>
                <Link
                  href="#"
                  className="footer__link"
                >
                  Партнерам
                </Link>
              </Space>
            </div>
          </Col>

          {/* Недвижимость */}
          <Col
            xs={24}
            sm={12}
            md={6}
          >
            <div className="footer__section">
              <Title
                level={5}
                className="footer__title"
              >
                Недвижимость
              </Title>
              <Space
                direction="vertical"
                size="small"
              >
                <Link
                  href="#"
                  className="footer__link"
                >
                  Купить квартиру
                </Link>
                <Link
                  href="#"
                  className="footer__link"
                >
                  Снять квартиру
                </Link>
                <Link
                  href="#"
                  className="footer__link"
                >
                  Новостройки
                </Link>
                <Link
                  href="#"
                  className="footer__link"
                >
                  Коммерческая
                </Link>
                <Link
                  href="#"
                  className="footer__link"
                >
                  Загородная
                </Link>
              </Space>
            </div>
          </Col>

          {/* Сервисы */}
          <Col
            xs={24}
            sm={12}
            md={6}
          >
            <div className="footer__section">
              <Title
                level={5}
                className="footer__title"
              >
                Сервисы
              </Title>
              <Space
                direction="vertical"
                size="small"
              >
                <Link
                  href="#"
                  className="footer__link"
                >
                  Ипотечный калькулятор
                </Link>
                <Link
                  href="#"
                  className="footer__link"
                >
                  Оценка недвижимости
                </Link>
                <Link
                  href="#"
                  className="footer__link"
                >
                  Юридические услуги
                </Link>
                <Link
                  href="#"
                  className="footer__link"
                >
                  Страхование
                </Link>
                <Link
                  href="#"
                  className="footer__link"
                >
                  Аналитика рынка
                </Link>
              </Space>
            </div>
          </Col>

          {/* Контакты */}
          <Col
            xs={24}
            sm={12}
            md={6}
          >
            <div className="footer__section">
              <Title
                level={5}
                className="footer__title"
              >
                Контакты
              </Title>
              <Space
                direction="vertical"
                size="small"
              >
                <div className="footer__contact">
                  <PhoneOutlined className="footer__contact-icon" />
                  <Link
                    href="tel:+74957777777"
                    className="footer__link"
                  >
                    +998 (**) ***-**-**
                  </Link>
                </div>
                <div className="footer__contact">
                  <MailOutlined className="footer__contact-icon" />
                  <Link
                    href="mailto:info@cian.ru"
                    className="footer__link"
                  >
                    info@cian.ru
                  </Link>
                </div>
                <div className="footer__contact">
                  <EnvironmentOutlined className="footer__contact-icon" />
                  <Text className="footer__text">Какой-то адрес</Text>
                </div>
              </Space>
            </div>
          </Col>
        </Row>

        <Divider className="footer__divider" />

        {/* Нижняя часть */}
        <div className="footer__bottom">
          <Row
            justify="space-between"
            align="middle"
          >
            <Col
              xs={24}
              md={12}
            >
              <Text className="footer__copyright">
                © {currentYear} CIAN. Все права защищены.
              </Text>
            </Col>
            <Col
              xs={24}
              md={12}
            >
              <div className="footer__legal">
                <Space wrap>
                  <Link
                    href="#"
                    className="footer__legal-link"
                  >
                    Пользовательское соглашение
                  </Link>
                  <Link
                    href="#"
                    className="footer__legal-link"
                  >
                    Политика конфиденциальности
                  </Link>
                  <Link
                    href="#"
                    className="footer__legal-link"
                  >
                    Правила использования
                  </Link>
                </Space>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
