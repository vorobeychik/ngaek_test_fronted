import { Card, Checkbox, Form, Input } from "antd"
import { TrueFalseTest as TrueFalseTestType } from "../types/types";

interface Props {
    test: TrueFalseTestType,
}

export const TrueFalseTest = ({ test }: Props) => {

    const [form] = Form.useForm();
    return (
        <div>
            <Card style={{ width: '600px' }}>
                <Form form={form} name={`trueFalseTest ${test.id}`}>
                    <Form.Item name={`question`} rules={[{ required: true, message: 'Пожалуйста введите ваше имя' }]}>
                        <Input placeholder="Введите вопрос" />
                    </Form.Item>
                    <Form.Item name={'isTrue'} valuePropName="checked">
                        <Checkbox > Ответ верен ?</Checkbox>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}