import { Card, Button, Form, Input } from 'antd';
import { store } from '../store/store';
import { Link } from 'react-router-dom';

interface RegistrationForm {
    password: string;
    username: string;
}

export const Registration = () => {

    const finishHandler = async (values: RegistrationForm) => {
        store.registration(values);
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px'}}>
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
                    <div style={{ display: 'flex'}}>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    <Link  to="/login" style={{marginLeft: '35px', marginTop: '5px'}}>
                        Логин
                    </Link>
                    </div>
                </Form>
            </Card>
        </div>

    )
}