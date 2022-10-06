import { Outlet } from 'react-router-dom';
import { Header } from 'components';

// parent layout that will provide Header and wrappers for all pages
const MainLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
  </div>
  )
}

export default MainLayout