import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Logout } from './Services/Logout.js'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { LoginPage } from './Pages/LoginPage.jsx'
import { SignupPage } from './Pages/SignupPage.jsx'
import { ProfilePage } from './Pages/ProfilePage.jsx'
import { FilterUsers, AuthLayout ,PostTweet,Home} from './Components/Index.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <AuthLayout authentication={false}>
          <Home/>
        </AuthLayout>
      },
      {
        path: 'loginPage',
        element: <AuthLayout authentication={false}>   
         <LoginPage />
         </AuthLayout>
      },
      {
        path: 'explore',
        element:<AuthLayout authentication={true}> 
        <h1>Explore</h1>
        </AuthLayout>
      },
      {
        path: 'signupPage',
        element: <AuthLayout authentication={false}> 
        <SignupPage />
        </AuthLayout> 
      },
      {
        path: 'notifications',
        element: <AuthLayout authentication={true}> 
        <h1>Notifications</h1>
        </AuthLayout>
      },
      {
        path: 'bookmarks',
        element:<AuthLayout authentication={true}>
           <h1>BookMarks</h1>
           </AuthLayout>
      },
      {
        path: 'logout',
        element: <AuthLayout authentication={true}>
           <Logout />
           </AuthLayout> 
      },
      {
        path: 'profile/:ID',
        element: <AuthLayout authentication={true}>
           <ProfilePage />
           </AuthLayout>
      },
      {
        path: 'getUsers/:input',
        element: <AuthLayout authentication={true}> 
        <FilterUsers />
        </AuthLayout>
      },
      {
        path: 'tweetPage',
        element: <AuthLayout authentication={true}> 
        <PostTweet/>
        </AuthLayout>
      },
      {
        path : 'follow/:email',
        element :
        <AuthLayout authentication={true}>
          
        </AuthLayout>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
