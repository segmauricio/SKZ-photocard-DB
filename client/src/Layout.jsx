import MainMenu from './components/MainMenu'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <MainMenu />
      <Outlet />
    </>
  )
}
export default Layout