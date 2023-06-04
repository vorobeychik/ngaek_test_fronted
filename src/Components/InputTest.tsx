import { Card, Checkbox, Form, Input } from "antd";
import { InputTest as InputTestType } from "../types/types";


interface Props {
    test: InputTestType
}

export const InputTest = ({ test }: Props) => {
    const [form] = Form.useForm();
    return (
        <div>
            <Card style={{width: '600px'}}>
                <Form form={form} name={`inputTest ${test.id}`}>
                    <Form.Item name={`question`} rules={[{ required: true, message: 'Введите вопрос' }]}>
                        <Input placeholder="Введите вопрос" />
                    </Form.Item>
                    <Form.Item name={`answer`} rules={[{ required: true, message: 'Введите ответ' }]}>
                        <Input placeholder="Введите ответ" />
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}