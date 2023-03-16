import bcrypt from 'bcryptjs'
import { api } from '~/utils/api';

export default function isSamePass(unHashPass: string, hashPass: string) {
    // return bcrypt.compare(unHashPass, hashPass).then(function(result: boolean) {
    //     return result;
    // });
    
    console.log(localStorage.getItem("email"))
    console.log(localStorage.getItem("password"))
    const findUser =
        api.user.getUser.useQuery({
            email : localStorage.getItem("email"),
    });
  
    const userData = findUser.data ?? [];
    localStorage.setItem("hashedPass", userData.password)
    if (userData != null) localStorage.setItem("isLoggedIn", "true")
}

