import { useEffect } from "react"
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages"
import { useDispatch, useSelector } from 'react-redux'
import { getAuthMe, selectIsAuth } from './redux/slises/auth'

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  useEffect(() => {
    dispatch(getAuthMe())
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
