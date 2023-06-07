import { Route, Routes } from "react-router-dom"
import { Registration } from "../pages/Registration"
import { TestConstructor } from "../pages/TestConstructor"
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { store } from "../store/store";
import { Login } from "../pages/Login";
import { Test } from "../pages/Test"; 
import { Teory } from "../pages/Teory";
import { Tests } from "../pages/Tests";

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
                        <Route path="/test-constructor" element={<TestConstructor />} />
                        <Route path="/teory" element={<Teory />}></Route>
                        <Route path="/practica" element={<Teory />}></Route>
                        <Route path="/tests" element={<Tests />}></Route>
                        <Route path="/teory" element={<Teory />}></Route>
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/Login" element={<Login />}></Route>
                        <Route path="*" element={<Teory />} />
                        <Route path="/test/:id" element={<Test />} />
                    </>
                    :
                    <>
                        <Route path="/teory" element={<Teory />}></Route>
                        <Route path="/practica" element={<Teory />}></Route>
                        <Route path="/tests" element={<Tests />}></Route>
                        <Route path="/teory" element={<Teory />}></Route>
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/Login" element={<Login />}></Route>
                        <Route path="*" element={<Teory />} />
                        <Route path="/test/:id" element={<Test />} />
                    </>
            }
        </Routes>
    )
})

export default AppRoutes 