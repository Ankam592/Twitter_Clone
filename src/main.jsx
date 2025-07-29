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
import EditTweet from './Pages/EditTweet.jsx'
import BookMarks from './Components/BookMarks.jsx'
import { FilterUsers, AuthLayout ,PostTweet,Home} from './Components/Index.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUpWizard from './Components/SignUpWizard.jsx'
import StopWatch from './Components/StopWatch.jsx'
import CollapsibleFolder from './Components/CollapsibleFolder.jsx'
import Dashboard from './Components/Dashboard.jsx'


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
        path: 'dashboard',
        element: <AuthLayout authentication={true}> 
        <Dashboard/>
        </AuthLayout>
      },
      {
        path: 'bookmarks',
        element:<AuthLayout authentication={true}>
           <BookMarks/>
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
        path: 'editTweet/:slug',
        element: <AuthLayout authentication={true}> 
        <EditTweet/>
        </AuthLayout>
      },
      {
        path : 'follow/:email',
        element :
        <AuthLayout authentication={true}>
          
        </AuthLayout>
      },
      {
        path :'stopwatch',
        element :
         <AuthLayout authentication={true}>
          <StopWatch/>
        </AuthLayout>

      },
       {
        path :'signUpWizard',
        element :
         <AuthLayout authentication={true}>
          <CollapsibleFolder/>
        </AuthLayout>

      }
    ]
  }
])
const Root = document.getElementById('root');
createRoot(Root).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
