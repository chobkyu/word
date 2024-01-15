import { Card } from 'primereact/card';
import { ReactElement, useState } from 'react';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { addr } from '../common/serverAddress';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../common/Cookies';

interface userJoin{
    userId:string,
    password:string,
    name:string,
    school:string,
    motherEmail:string
}
const JoinMember = () =>{
    const [user, setUser] = useState<userJoin>({
        userId:'',
        password:'',
        name:'',
        school:'',
        motherEmail:''
    });
    const navigate = useNavigate();

    //const {name,value} = user
    const onChangeUserInfo = (e:React.ChangeEvent<HTMLInputElement>) => {
        
       //console.log(e.target)
        const { placeholder, value } = e.target;
        
        setUser({...user,[placeholder]:value})

    }

    const signUp = async () =>{
        fetch(addr+'/user/signUp',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                userId:user.userId,
                password:user.password,
                name:user.name,
                school:user.school,
                motherEmail:user.motherEmail
            })
        }).then((res)=>res.json())
        .then((res)=>{
            if(res.success){
                alert('회원가입이 완료 되었습니다');
                navigate('/login');
            }else{
                alert("error! try again!!");
                return;
            }
        })
    }

    
    return (
        <div className="AppDesktop">
            <Card title="Sign Up">
                <div className="card flex justify-content-center">
                    <div className='login-input'>
                        <h1 className="login">ID  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h1>
                        <InputText className='userId' placeholder='userId' onChange={(e)=>onChangeUserInfo(e)}/>
                    </div>
                    <div className='login-input'>
                        <h1 className="login ">PW&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h1>
                        <Password className='password' placeholder='password' feedback={true} onChange={(e)=>onChangeUserInfo(e)}/>
                    </div>
                    <div className='login-input'>
                        <h1 className="login ">NAME&nbsp;&nbsp;&nbsp;</h1>
                        <InputText className='name' placeholder='name' onChange={(e)=>onChangeUserInfo(e)} />
                    </div>
                    <div className='login-input'>
                        <h1 className="login ">School&nbsp;&nbsp; </h1>
                        <InputText className='school' placeholder='school' onChange={(e)=>onChangeUserInfo(e)} />
                    </div>
                    <div className='login-input'>
                        <h3 className="login ">Mother email&nbsp; </h3>
                        <InputText className='motherEmail' placeholder='motherEmail' onChange={(e)=>onChangeUserInfo(e)} />
                    </div>
                    <div className='login-input'>
                        <Button onClick = {signUp} label="Sign up" />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default JoinMember;