import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getCookie } from "../common/Cookies";
import { addr } from "../common/serverAddress";
import Score from "./Score";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


interface ColumnMeta {
    field: string;
    header: string;
}


export interface WrongAnswer{
    seq:number;
    en:string;
    kr:string;
    answer:string;
    score:Score;
}
const WrongAnswer = () => {
    const [wrongAnswer, setWrongAnswer] = useState<WrongAnswer[]>([]);
    
    const { seq } = useParams(); 
    const navigator = useNavigate();

    const list = async () => {
        fetch(addr+'/user/wrongAnswer/'+seq,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${getCookie('myToken')}`,

            },
        }).then((res)=>res.json())
        .then((res)=>{
            if(res.message==='Unauthorized'){
                alert('먼저 로그인 해주세요');
                navigator('/login')
            }

            setWrongAnswer(res);
        })
    }

    useEffect(()=>{
        list();
    },[]);

    const columns: ColumnMeta[] = [
        // {field: 'userSeq', header: 'userId'},
        {field: 'en', header: 'English'},
        {field: 'kr', header: 'Korean'},
        {field: 'answer', header: 'Your Wrong Answer'},
        // {field: 'date', header: 'date'}
    ];

    return(
        <div className="AppDesktop">
            <h1>{seq}과의 오답노트</h1>
            <DataTable value={wrongAnswer} tableStyle={{ minWidth: '50rem' }} selectionMode="single"  >
                {columns.map((col, i) => (
                    <Column  key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
            {/* <button onClick={()=>{console.log(score)}}>확인</button> */}
        </div>
    )
}

export default WrongAnswer