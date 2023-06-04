import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TestApi } from "../api/TestApi";
import { Button, Card, Form, Input, Progress, Select, Switch, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { observer } from "mobx-react-lite";
import { store } from "../store/store";
const { Title } = Typography;

const getAnswerOptions = (questions: any) => questions.map((question: any, index: number) => ({ label: question.question, value: `${String(question.isTrue)} ${index.toString()}` }))

export const Test = observer(() => {

    const { id } = useParams();
    const [test, setTest] = useState<any>();
    const [form] = Form.useForm();

    useEffect(() => {
        (async () => {
            const [test] = await TestApi.getTest(id!);
             const result =  localStorage.getItem(test.id);
             console.log(result)
             setTest(test)
             if(result){
                store.setTestResult(+result, test.id);
             }
           
           
            console.log(test);
        })()
    }, [])

    const onTestComplete = (name: any, { values, forms }: any) => {
        let correctAnswers = 0;
        const amountOfQuestion = Object.keys(forms).length;
        for (const formName in forms) {
            const form = forms[formName];
            const formData = form.getFieldsValue();
            
            const [type, id] = formName.split(' ');
            if (type === 'selectQuestion') {
                if (formData.answer && formData.answer.every((el: any) => el.split(' ')[0] === 'true')) {
                    correctAnswers += 1;
                }
            }

            if (type === 'inputQuestion') {

                const testQuestion = test.inputQuestions.find((el: any) => el.id = id)
                if (testQuestion.answer === formData.answer) {
                    correctAnswers += 1;
                }
            }

            if (type === 'trueFalseQuestion') {
                const testQuestion = test.trueFalseQuestions.find((el: any) => el.id = id)
                if (testQuestion.isTrue === formData.answer) {
                    correctAnswers += 1;
                }
            }
        }
        store.setTestResult(Math.round((correctAnswers / amountOfQuestion) * 100), test.id);
        console.log('правильных', (correctAnswers / amountOfQuestion) * 100)
    }

    if(store.testResult){
        return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '200px' }}>
            <Title style={{textAlign: 'center'}}>{test.name}</Title>
            <Title level={4}  style={{textAlign: 'center'}}>Поздравляю вы прошли тест на {store.testResult}%</Title>
            <Progress percent={store.testResult} type="circle"/>
        </div>
        )
    }

    console.log(id)
    return (
        <Form.Provider
            onFormFinish={onTestComplete}
            
        >
            {test &&  <Title style={{textAlign: 'center'}}>{test.name}</Title>}  
            <Form>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {test && test.trueFalseQuestions.map((testQuestion: any) => {
                        return <Card title={testQuestion.question} style={{ width: '600px', margin: '10px 0' }}>
                            <Form name={`trueFalseQuestion ${testQuestion.id}`} form={form}>
                                <Form.Item name="answer" valuePropName="checked" >
                                    <Switch checkedChildren="Да" unCheckedChildren="Нет" />
                                </Form.Item>
                            </Form>
                        </Card>
                    })}
                    {test && test.inputQuestions.map((testQuestion: any) => {
                        return <Card title={testQuestion.question} style={{ width: '600px', margin: '10px 0' }}>
                            <Form name={`inputQuestion ${testQuestion.id}`} >
                                <Form.Item name="answer" >
                                    <Input placeholder="Введите ответ" />
                                </Form.Item>
                            </Form>
                        </Card>
                    })}
                    {test && test.selectQuestions.map((testQuestion: any) => {
                        return <Card title={testQuestion.question} style={{ width: '600px', margin: '10px 0' }}>
                            <Form name={`selectQuestion ${testQuestion.id}`} >
                                <Form.Item name="answer" >
                                    <Select mode="multiple" placeholder="Введите ответ" options={getAnswerOptions(testQuestion.questions)} style={{ width: '100%' }} />
                                </Form.Item>
                            </Form>
                        </Card>
                    })}
                </div>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="primary" htmlType="submit">
                        Закончить тест
                    </Button>
                </Form.Item>
            </Form>
        </Form.Provider>
    )
})