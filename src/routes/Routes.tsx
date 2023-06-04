import { Route, Routes } from "react-router-dom"
import { Registration } from "../pages/Registration"
import { TestConstructor } from "../pages/TestConstructor"
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { store } from "../store/store";
import { Login } from "../pages/Login";
import { Test } from "../pages/Test"; 

const AppRoutes = observer(() => {

    useEffect(() => {
        store.authorize();
    }, [])

    console.log('admin', store.isAuth)
    return (
        <Routes>
            {
                store.isAuth ?
                    <>
                        <Route path="/" element={<TestConstructor />} />
                        <Route path="/test/:id" element={<Test />} />
                    </>
                    :
                    <>
                        <Route path="/" element={<Registration />} />
                        <Route path="/Login" element={<Login />}></Route>
                        <Route path="*" element={<Registration />} />
                    </>
            }
        </Routes>
    )
})

export default AppRoutes 