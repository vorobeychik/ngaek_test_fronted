import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Spin, Typography } from 'antd';
import { Content } from "antd/es/layout/layout";
import { TestApi } from "../api/TestApi";
const { Title, Link } = Typography;

const routesNames = {
    'teory': 'Теоретический раздел',
    'practica': 'Практический раздел',
    'tests': 'Тесты',
    'vspomogatilnii': 'Вспомогательный раздел',
}



export const Tests = () => {
    const [tests, setTests] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {

        (async () => {
            const tests = await TestApi.getTests()
            setTests(tests)
            setIsLoading(false)
        })()

    }, [])
    console.log(tests)

    return (
        <Content className="site-layout" style={{ padding: '0 50px' }}>
            {//@ts-ignore
                <Title >Тесты</Title>
            }
            {isLoading ? <Spin /> : 
            <div style={{ display: 'flex', flexDirection: 'column', }}>
                {
                    //@ts-ignore
                    tests.map((test, index) =>
                        <Link href={`http://localhost:3000/test/${test.id}`} >{index + ') '} {test.name}</Link>
                    )
                }
            </div>}



        </Content>
    );
}