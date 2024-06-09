import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/layouts/Layout'
import { IndexPage } from '@/views/projects/IndexPage'
import { CreateProjectView } from '@/views/projects/CreateProjectView'
import { EditProjectView } from '@/views/projects/EditProjectView'
import { DetailsProjectView } from '@/views/projects/DetailsProjectView'
import { AuthLayout } from '@/layouts/AuthLayout'
import { LoginView } from '@/views/auth/LoginView'
import { CreateAccount } from '@/views/auth/CreateAccount'
import { ConfirmAccountView } from '@/views/auth/ConfirmAccountView'
import { RequestNewTokenView } from '@/views/auth/RequestNewTokenView'
import { NewPasswordView } from '@/views/auth/NewPasswordView'
import { ForgatPasswordView } from '@/views/auth/ForgatPasswordView'


const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children:[
      {
        index:true,
        element:<IndexPage />
      },
      {
        path:"/projects/create",
        element:<CreateProjectView />
      },
      {
        path:"/projects/:projectId/edit",
        element:<EditProjectView />
      },
      {
        path:"/projects/:projectId/details",
        element:<DetailsProjectView />
      }
    ]
  },
  {
    path:"/auth",
    element:<AuthLayout />,
    children:[
      {
        path:"login",
        element:<LoginView />
      },
      {
        path:"create-account",
        element:<CreateAccount />
      },
      {
        path:"confirm-account",
        element:<ConfirmAccountView />
      },
      {
        path:"request-token",
        element:<RequestNewTokenView />
      },
      {
        path:"forgat-password",
        element:<ForgatPasswordView />
      },
      {
        path:"new-password",
        element:<NewPasswordView />
      }

    ]
  }
])
export default router