import React, { useEffect, useState } from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import { useLocation, useNavigate,  } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../menubar.css'
import { addr } from '../common/serverAddress';
import { getCookie, removeCookie } from '../common/Cookies';

const Menu = () =>{
    const param = useLocation();
    const [checkMobile,setCheckMobile] = useState<boolean>(false); 
    const [buttonClick,setButtonClick] = useState<boolean>(false);
    const [isLogined,setIsLogined] = useState<boolean>(false);
    useEffect(()=>{
        getCheck();
    },[])

    const getCheck = () => {
        console.log(param.pathname);
        
        if(getCookie('myToken')===undefined){
            setIsLogined(false);
        }else{
            setIsLogined(true);
        }

        let path : string = param.pathname;
        let pathName = new Array();
        pathName = [...path];
        pathName[1]==='m'? setCheckMobile(true) : setCheckMobile(false);
    }


    const items: MenuItem[] = [
        {label: 'Home', icon: 'pi pi-fw pi-home'},
        {label: 'Score', icon: 'pi pi-fw pi-calendar'},
        {label: 'Test', icon: 'pi pi-fw pi-pencil'},
        {label: 'Study', icon: 'pi pi-fw pi-file'},
        {label: 'MyPage', icon: 'pi pi-fw pi-cog'}
    ];

    const itemsM:Array<string> =[
        'Home','Score','Test','Study','MyPage'
    ]
    const [activeIndex, setActiveIndex] = useState<number>(3);

    const navigate = useNavigate();

    const onClickMovePage = (e:number) => {
        setActiveIndex(e);
        switch (e){
            case 0:
                navigate('/Main');
                break;
            case 1:
                navigate('/score');
                break;
            case 2:
                navigate('/test');
                break;
            case 3:
                navigate('/study');
                break;
            case 4:
                navigate('/MyPage');
                break;
        }
    }

    const onClick = (e:any) => {
        console.log(e);
    }

    const menuList = () => {
       setButtonClick(!buttonClick);
    }

    const movePage= (name:string) =>{
        setButtonClick(false);
        navigate('/m/'+name);
    }

    const checkLogin = () => {
        console.log('check login : ' + getCookie('myToken'))
        if(getCookie('myToken')==undefined){
            console.log(getCookie('myToken'))
            navigate('/m/login')
        }else{
            goToLoginPage();
        }
    }

    const goToLoginPage = async () => {
        
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
                navigate('/m/login')
            }else{
                alert('이미 로그인 되었습니다.');
                return;
            }
           
        })
    }

    const logOut = () => {
        removeCookie('myToken');
        alert('로그아웃 되었습니다');
        setIsLogined(false);
        getCheck();
    }

    //https://jeewonscript.tistory.com/6
    
    return(
       <>
        {checkMobile ?  
               <Box sx={{ flexGrow: 1 }}>
               <AppBar position="fixed">
                 <Toolbar>
                   <IconButton
                     size="large"
                     edge="start"
                     color="inherit"
                     aria-label="menu"
                     sx={{ mr: 2 }}
                     onClick={menuList}
                     classes={<div style={{backgroundColor:'black'}}>
                     fffff
                     dsfdas
                     asdfadsf
                     adadf
                 </div>}
                   >
                     <MenuIcon/>
                   </IconButton>
                   <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                     WordTest
                   </Typography>

                   {isLogined ?  
                    <Button color="inherit" onClick={logOut}>LogOut</Button>
                    :
                    <Button color="inherit" onClick={checkLogin}>Login</Button>
                   }
                 </Toolbar>
               </AppBar>
               {buttonClick ? 
                    <ul className="header__menulist" style={{height:'20rem',position:'relative',zIndex:2}}> 
                        <li style={{marginTop:'3.5rem'}} onClick={()=>{movePage('main')}}>Home</li>
                        <li onClick={()=>{movePage('score')}}>Score</li>
                        <li onClick={()=>{movePage('test')}}>Test</li>
                        <li onClick={()=>{movePage('study')}}>Study</li>
                        <li onClick={()=>{movePage('MyPage')}}>MyPage</li>
                    </ul>:<></>}
               
             </Box>
             :
            <div className='card'>
                <TabMenu activeIndex={activeIndex} onTabChange={(e) => onClickMovePage(e.index)} model={items} />
            </div> 
        }
       </>
       
        
      
    )


}

export default Menu;