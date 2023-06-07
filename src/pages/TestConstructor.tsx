import { observer } from "mobx-react-lite"
import { store } from "../store/store"
import { Button, Card, Form, Input } from "antd"
import { Test } from "../Components/Test"
import { TestTypes } from "../enums/enums"
import { TestApi } from "../api/TestApi"
import { useNavigate } from "react-router-dom"


export const TestConstructor = observer(() => {

    const navigate = useNavigate();
    const onSelectName = ({ username }: { username: string }) => {

        store.setUserName(username);
    }

    const addInputTest = () => {
        store.addInputTest();
    }

    const addTrueFalse = () => {
        store.addTrueFalseTest();
    }

    const addSelectionTest = () => {
        store.addSelectionTest();
    }

    const onSaveTest = async (name: any, { values, forms }: any) => {

        const data: any = {
            inputQuestions: [],
            selectQuestions: [],
            trueFalseQuestions: [],
        }
        for (const formName in forms) {
            const form = forms[formName];
            const formData = form.getFieldsValue();
            console.log(formData);
            const [type, id] = formName.split(' ');

            switch (type) {
                case TestTypes.InputTest:
                    console.log(form)
                    data.inputQuestions.push({
                        type: TestTypes.InputTest,
                        question: formData.question,
                        answer: formData.answer,
                    });
                    break;
                case TestTypes.SelectionTest:
                    const qustions = formData.questions.filter((el: any) => typeof el === 'string');
                    const answers = formData.questions.rightAnswers;

                    data.selectQuestions.push({
                        type: TestTypes.SelectionTest,
                        question: formData.question,
                        questions: qustions.map((qustion: string, index: number) => ({
                            question: qustion,
                            isTrue: answers.some((el: number) => el === (index + 1)),
                        }))
                    })
                    break;
                case TestTypes.TrueFalseTest:
                    data.trueFalseQuestions.push({
                        type: TestTypes.TrueFalseTest,
                        question: formData.question,
                        isTrue: !!formData.isTrue,
                    });
                    break;
            }

        }
        const test = await TestApi.saveTest({ name: store.userName, ...data });
        navigate('/tests')

    }

    console.log(store.testLink);


    return (
        <div>
            {
                store.userName ?
                    <Form.Provider
                        onFormFinish={onSaveTest}
                    >
                        <div>
                            <div style={{display: 'flex', flexDirection: 'column' ,alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px'}}>
                                {store.tests.map((test) => <Test test={test} />)}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', gap: '10px' }}>
                                <Button onClick={addInputTest} type="dashed">Добавить вопрос поле</Button>
                                <Button onClick={addTrueFalse}  type="dashed">Добавить вопрос правда ложь</Button>
                                <Button onClick={addSelectionTest}  type="dashed">Добавить вопрос выбор</Button>
                                <Form>
                                    <Form.Item >
                                        <Button type="primary" htmlType="submit">
                                            Сохранить Тест
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </Form.Provider>
                    :
                    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        <Card title="Cоздание теста" style={{ width: '450px', marginTop: '200px', height: '300px' }}>
                            <Form onFinish={onSelectName} autoComplete="off" >
                                <Form.Item name="username" rules={[{ required: true, message: 'Пожалуйста введите ваше имя' }]} style={{ marginTop: '50px', width: '350px', display: 'flex', justifyContent: 'center', alignContent: 'center', }}>
                                    <Input placeholder="Введите название теста" style={{ width: '400px', }} />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button type="primary" htmlType="submit">
                                        Сохранить
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
            }
        </div >
    )
})