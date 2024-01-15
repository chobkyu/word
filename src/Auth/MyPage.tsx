import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import { addr } from '../common/serverAddress';
import { getCookie } from '../common/Cookies';
import { useNavigate } from 'react-router-dom';

interface userData{
    userId:string,
    name : string,
    school :string
}

const MyPage = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const navigator = useNavigate();
    const [userInfo, setUserInfo] = useState<userData>();
    const getMyInfo = async () => {
        fetch(addr+'/user/getUser',{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${getCookie('myToken')}`,
            }
        }).then((res)=>res.json())
        .then((res)=>{
            console.log(res);
            if(res.message==='Unauthorized'){
                alert('먼저 로그인 해주세요');
                navigator('/login')
            }
            setUserInfo(res);
        })
    }

    useEffect(()=>{
        getMyInfo();
    },[]);


    const [selectedFile, setSelectedFile] = useState<any>('');
    const handleFileInput = (e: any) => {
        console.log("event : " + e);
        const file = e.target.files[0];
        console.log(file);
        setSelectedFile(file);
    }

    const onclick = async () => {
        if (selectedFile.size <= 0) {
            return;
        }
       
        const tok = getCookie('myToken');

        fetch(addr + '/user/s3url', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",

            }
        }).then((res) => res.json())
            .then((res) => {
                console.log(res.data);

                let imageUrl = "";

                fetch(res.data, {
                    method: "put",
                    headers: {
                        "Content-Type": "multipart/form-data",

                    },
                    body: selectedFile
                })
              
                if (selectedFile.size > 0) {
                    imageUrl = res.data.split('?')[0];
                } else {
                    imageUrl = "";
                    alert("등록 과정 중 에러발생 \n다시 시도해주세요");

                    return;
                }


                fetch(addr + '/user/modifyImg', {
                    method: "POST",
                    headers: {
                        "Access-Control-Allow-Origin": "http://localhost:5000",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ` + tok,
                    },
                    body: JSON.stringify({
                        imgUrl:imageUrl
                    }),
                }).then((res) => res.json())
                    .then((res) => {
                        if (res.success) {
                            alert("등록 성공");
                            navigator('/myPage')
                        } else {
                            console.log("등록 과정 중 에러 발생.");
                            alert("등록 과정 중 에러발생 \n다시 시도해주세요");
                            
                        }
                    })
            })
    }


    return (
        <div className="AppDesktop">
        <Card title="Member Info">
            <div className="card flex justify-content-center">
                <Image src="https://primefaces.org/cdn/primereact/images/galleria/galleria7.jpg" alt="Image" width="250" />
            </div>
            <div className='login-input'>
                    <Button label="Image Upload" onClick={()=>setVisible(true)}/>
            </div>

            <Dialog header="Image Upload" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <input multiple type="file" onChange={handleFileInput}/>
                <Button label="Image Upload" onClick={onclick}/>
            </Dialog>

            <div className="card flex justify-content-center">
                <div className='login-input'>
                    <h1 className="login">ID  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h1>
                    <InputText className='userId' value={userInfo?.userId} disabled/>
                </div>
                
                <div className='login-input'>
                    <h1 className="login ">NAME&nbsp;&nbsp;</h1>
                    <InputText className='name' value={userInfo?.name} disabled/>
                </div>
                <div className='login-input'>
                    <h1 className="login ">School&nbsp; </h1>
                    <InputText className='school'  value={userInfo?.school} disabled/>
                </div>
               
            </div>
        </Card>
    </div>
    )
}

export default MyPage;