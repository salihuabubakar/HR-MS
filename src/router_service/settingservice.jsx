
import Companysettings from '../MainPage/Administration/Settings/companysettings';
import Rolepermission from '../MainPage/Administration/Settings/rolespermission';
import ChangePassword from '../MainPage/Administration/Settings/changepassword';


export default [  
   {
      path: 'companysetting',
      component: Companysettings
   },
   {
      path: 'roles-permissions',
      component: Rolepermission
   },
   {
      path: 'change-password',
      component: ChangePassword
   },
]