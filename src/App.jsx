import { Fragment } from "react"
import { Routes,Route } from "react-router-dom"
import UploadVideo from './routes/upload-video/upload-video.component';
import Home from "./routes/home/home.component"
import Navbar from "./components/navbar/navbar.component";
import Catalogs from "./routes/catalogs/catalogs.component";
import Catalog from './routes/catalog/catalog.component';
import '@fontsource/poppins';
import '@fontsource/bebas-neue';
import { useUserAuthContext } from "./contexts/user-auth-context.context";
import Dummy from "./routes/dummy/dummy";

function App() {

  const {user}=useUserAuthContext();

  // if(!user){
  //   return <AuthenticateUser/>
  // }
  // console.log(user)

  return (
    <Fragment>
    <Routes>
      <Route path="/" element={<Navbar/>}>
        <Route index element={<Home/>} />
        <Route path="catalogs" element={<Catalogs/>} />
        <Route path="catalog/:catalogName" element={<Catalog/>} />
        <Route path="dummy" element={<Dummy/>} />
      </Route>
    </Routes>
    </Fragment>
  )
}

export default App
