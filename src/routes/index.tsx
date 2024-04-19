import { useRoutes } from 'react-router-dom';
import Home from './Home';
import Profile, { BaseView, SupportView } from './Profile';

const Routes = () => useRoutes([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <Profile />,
    children: [
      {
        path: '',
        element: <BaseView />
      },
      {
        path: 'support',
        element: <SupportView />
      }
    ]
  }
]);

export default Routes;