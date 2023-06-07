import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { store } from "../store/store";
import { observer } from "mobx-react-lite";



export const HeaderComponent = observer(() => {

    const navigate = useNavigate();

    const routesNames = [
        {
            label: 'Теоретический',
            route: 'teory'
        },
        {
            label: 'Практический',
            route: 'practica',
        },
        {
            label: 'Контроль знаний',
            route: 'tests',
        },
        {
            label: 'Вспомогательный',
            route: 'vspomogatilnii'
        },
        {
            label: 'Авторизация',
            route: 'login',
        },
        ...(store.isAuth ? [{
            label: 'Конструктор тестов',
            route: 'test-constructor',
        }] : [])
    ]



    const onMenuClick = ({ key }: any) => {
        navigate(`${key}`)
    }

    return (
        <Header>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ display: 'flex', justifyContent: 'center' }}
                items={routesNames.map((item, index) => {
                    return {
                        key: item.route,
                        label: item.label,
                    };
                })}
                onClick={onMenuClick}
            >

            </Menu>
        </Header>
    );
})