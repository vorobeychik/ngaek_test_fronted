import { Button, Card, Form, Input, Select } from "antd"
import { SelectionTest as SelectionTestType } from "../types/types"
import { MinusCircleOutlined } from "@ant-design/icons";

interface Props {
    test: SelectionTestType,
}

const getNumberOptions = (amount: number) => [... new Array(amount)].map((number, index) => ({ label: index + 1, value: index + 1 }))

export const SelectionTest = ({ test }: Props) => {
    const [form] = Form.useForm();

    return (
        <Card style={{ width: '600px' }}>
            <Form form={form} name={`selectionTest ${test.id}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Form.Item name="question">
                    <Input placeholder="Вопрос" style={{ width: '330px' }} />
                </Form.Item>
                <Form.List
                    name="questions"
                >{(fields, { add, remove }, { errors }) => (<>
                    {fields.map((field, index) => (
                        <Form.Item
                            required={false}
                            key={field.key + index}
                        >
                            <Form.Item
                                {...field}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "Введите вопрос или удалите поле",
                                    },
                                ]}
                                noStyle
                            >
                                <Input placeholder={`Ответ-${index + 1}`} style={{ width: '330px', marginLeft: "30px" }} />
                            </Form.Item>
                            <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => remove(field.name)}
                                style={{marginLeft: "20px" }}
                            />
                        </Form.Item>
                    ))}
                    <Form.Item name="rightAnswers" style={{ width: '330px' }}>
                        <Select mode="multiple" placeholder="Выбирите правильные ответы" options={getNumberOptions(fields.length)}></Select>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="dashed"
                            onClick={() => add()}
                            style={{ width: '150px' }}
                        >
                            Добавить ответ
                        </Button>
                    </Form.Item>
                </>)}</Form.List>
            </Form>
        </Card>
    )
}