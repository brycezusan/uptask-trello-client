import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/layouts/Layout'
import { IndexPage } from '@/views/projects/IndexPage'
import { CreateProjectView } from '@/views/projects/CreateProjectView'
import { EditProjectView } from '@/views/projects/EditProjectView'
import { DetailsProjectView } from '@/views/projects/DetailsProjectView'


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
  }
])
export default router