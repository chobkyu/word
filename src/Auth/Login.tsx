import { Card } from 'primereact/card';
import { useState } from 'react';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { addr } from '../common/serverAddress';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../common/Cookies';


const LoginPage = () => {
    const [id, setId] = useState<string>('');
    const [pw,setPw] = useState<string>('');
    const navigate = useNavigate();

    const loginClick = async () => {
        if(id!=='' && pw!==''){
            fetch(addr+'/user/login',{
                method:'Post',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    userId:id,
                    password:pw
                })
            }).then((res)=>res.json())
            .then((res)=>{
                if(res.message==='Unauthorized'){
                    alert('아직 허가 되지 않은 사용자입니다');
                    navigate('/login')
                }
                if(!res.success){
                    alert('사용자 정보가 일치하지 않습니다');
                    return;
                }
                console.log(res);
                setCookie('myToken', res.token, {
                    path: "/",
                    secure: true,
                    sameSite: "none"
                })

                navigate('/main');

            })
        }else{
            alert('이메일 또는 패스워드를 입력하세요.');
            return;
        }
       
    }

    return (
        <div className="AppDesktop">
            <Card title="Login">
                <div className="card flex justify-content-center">
                    <div className='login-input'>
                        <h1 className="login">ID  &nbsp;&nbsp; </h1>
                        <InputText value={id} onChange={(e) => setId(e.target.value)} />
                    </div>
                    <div className='login-input'>
                        <h1 className="login ">PW&nbsp; </h1><Password value={pw} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPw(e.target.value)} feedback={false} />
                    </div>
                    <div className='login-input'>
                        <Button label="Sign In" onClick={loginClick}/>&nbsp;
                        <Button label="Sign up" onClick={()=>{navigate('/join')}}/>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default LoginPage;