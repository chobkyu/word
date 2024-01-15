import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { addr } from "../common/serverAddress";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface WordOne{
    en:string,
    kr:string,
    level:number,
    enSentence:string,
    krSentence:string,
}


interface ColumnMeta {
    field: string;
    header: string;
}

const WordStudy = () => {
    const [word,setWord] = useState<WordOne[]>([]);
    const { id } = useParams();

    const list = async () => {
        fetch(addr+'/word/getStudy/'+id,{
            method : "GET",
            headers : {
                "Content-Type":"application/json"
            }
        }).then((res)=>res.json())
        .then((res)=>{
            setWord(res);
        })
    }

    useEffect(()=>{
        list();
    },[]);
    
    const columns: ColumnMeta[] = [
        {field: 'en', header: 'en'},
        {field: 'kr', header: 'kr'},
        {field: 'enSentence', header: 'enSentence'},
        {field: 'krSentence', header: 'krSentence'}
    ];

    return (
        <div>
            <DataTable value={word} tableStyle={{ minWidth: '50rem' }}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </div>
    )
}

export default WordStudy;