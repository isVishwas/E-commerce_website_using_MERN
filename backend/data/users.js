import bcrypt from 'bcryptjs';
const users = [
    {
    name:"Vishwas Pandey",
    email:"vishwas@example.com",
    password:bcrypt.hashSync("123456",10),
    isAdmin:true
    }
    ,
    {
        name:"Tanuj",
        email:"tanuj@example.com",
        password:bcrypt.hashSync("123456",10),
        
    }
    ,
    {
        name:"Santosh",
        email:"santosh@example.com",
        password:bcrypt.hashSync("123456",10),
       
    }
]
export default users;