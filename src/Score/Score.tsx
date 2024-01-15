import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { addr } from '../common/serverAddress';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../common/Cookies';



interface ColumnMeta {
    field: string;
    header: string;
}

interface Score{
    seq:number;
    score:number;
    chapter:number;
    userSeq:number;
    date:Date;
    grade:string;
}

const Score = () =>{
    const [score, setScore] = useState<Score[]>([]);
    const [selectedCell, setSelectedCell] = useState<any>(null);
    const [metaKey, setMetaKey] = useState(true);

    const navigator = useNavigate();
    
    const columns: ColumnMeta[] = [
        // {field: 'userSeq', header: 'userId'},
        {field: 'score', header: 'score'},
        {field: 'chapter', header: 'chapter'},
        {field: 'grade', header: 'grade'},
        // {field: 'date', header: 'date'}
    ];

    const list = async() => {
        fetch(addr+'/user/scoreAll',{
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

            setScore(res);
        })
    }

    useEffect(() => {
        list();
    }, []);

    const viewWrongAnswer = (e:any) =>{
        console.log(e.value.rowData.seq);
        const seq = e.value.rowData.seq
        navigator('/wrongAnswer/'+seq);
    }

    return(
        <div className="AppDesktop">
            <h1>해당 과를 누르시면 오답을 볼 수 있습니다</h1>
            <DataTable value={score} tableStyle={{ minWidth: '50rem' }} cellSelection selectionMode="single" selection={selectedCell} onSelectionChange={(e) => viewWrongAnswer(e)}>
                {columns.map((col, i) => (
                    <Column  key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </div>
    )
}

export default Score;