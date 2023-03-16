import { prisma } from "~/server/db";
import { api } from "../../../utils/api";
import bcrypt from 'bcryptjs'

// let isFound = false
// const findUser = async (values: { email: string; password: string; }) => {
//     return await prisma.user.findFirst({
//     where: {
//       email: values.email,
//     },
//   })
// }
class findUser {
    email : string
    pw : string
    constructor(values: { email: string; password: string; }){
        this.email=values.email,
        this.pw=values.password;
     }

    userFound(values: { email: string; password: string; }) {
    return api.user.getUser.useQuery({
      email : values.email,
    });
    }
}

export { findUser }

// if (findUser.email != null)
//     isFound = true

// return isFound

// if (!values.email || !values.password) {
//     alert("Please enter your email and password!");
//   }
//   else {
//     console.log(values)
//   }

  const saltRounds = 10;

  const pw = "thisismypassword"
  
//   const user = api.user.getUser.useQuery({
//     email : values.email,
//   });
//   console.log(user)

//   console.log(findUser(values))

  const hashPassword = async () => {
    const hash = await bcrypt.hash(pw, saltRounds)
    console.log(hash)
    // console.log(await bcrypt.compare(values.password, hash))
    if (await bcrypt.compare("values.password", "hash")) {
      alert("Login successful!")
    }
    else {
      alert("Incorrect email or password.")
    }
  }

      
//   hashPassword()
//   //.catch(err => handle(err))
//   .catch(() => 'obligatory catch')