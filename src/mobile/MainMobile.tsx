import axios from 'axios';
import { Button } from 'primereact/button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainMobile = () =>{
    const navigate = useNavigate();

    const goToMenu = (endPoint:string) => {
        navigate(endPoint);
    }

    useEffect(() => {
        axios.get('/api/test')
            .then(res =>{
                console.log(res)
            })
    },[]);
    return(
        <div style={{textAlign:'center',marginTop:'13rem',marginLeft:'3.25rem',position:'relative',zIndex:1}}>
            <table>
                <tr>
                    <td>
                        <Button style={{height:'8rem'}} label="공부하러가기" onClick={()=>{goToMenu('/m/study')}} />
                    </td>
                    <td>
                        <Button style={{height:'8rem'}} label="시험보러가기" severity="secondary" onClick={()=>{goToMenu('/m/test')}}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Button style={{height:'8rem'}} label="점수보러가기" severity="success" onClick={()=>{goToMenu('/m/score')}}/>
                    </td>
                    <td>
                        <Button style={{height:'8rem',width:'8.5rem'}} label="마이 페이지" severity="info" onClick={()=>{goToMenu('/m/MyPage')}}/>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default MainMobile;
