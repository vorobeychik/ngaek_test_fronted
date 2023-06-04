import { Card, Button, Form, Input } from 'antd';
import { store } from '../store/store';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

interface LoginForm {
    password: string;
    username: string;
}

export const Login = observer(() => {
    const navigate = useNavigate();

    const finishHandler = async (values: LoginForm) => {
        const admin = await store.login(values);
        if (admin) {
            navigate('/')
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '200px' }}>
            <Card style={{ width: 450 }}>
                <Form
                    onFinish={finishHandler}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Логин"
                        name="username"
                        rules={[{ required: true, message: 'Пожайлуйста введите логин' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[{ required: true, message: 'Пожайлуйста введите пароль' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <div style={{ display: 'flex' }}>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                        <Link to="/" style={{ marginLeft: '35px', marginTop: '5px' }}>
                            Регистрация
                        </Link>
                    </div>
                </Form>
            </Card>
        </div>
    )
})