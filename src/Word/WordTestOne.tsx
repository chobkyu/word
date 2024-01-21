import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addr } from "../common/serverAddress";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { getCookie } from "../common/Cookies";
// import { AutoComplete, } from "primereact/autocomplete";

export interface ColumnMeta {
    field: string;
    header: string;
}

export interface WordOne{
    en:string,
    kr:string,
    level:number,
    enSentence:string,
    krSentence:string,
    answer:any
}

export interface Answer{
    kr:string,
    en:string,
    answer:string,
    type:number
}
const WordTestOne = () => {
    const [wordEn,setWordEn] = useState<WordOne[]>([]);
    const [wordKr,setWordKr] = useState<WordOne[]>([]);
    const [wordSentence,setWordSentence] = useState<WordOne[]>([]);

    const [studentAnswerEnd,setStudentAnswerEnd] = useState<Answer[]>([]);
    const studentAnswer = new Array<Answer>();
    const {id} = useParams();
    const [visible, setVisible] = useState<boolean>(false);
    const [wordListLen,setWordListLen] = useState<number>(0);

    const navigator = useNavigate();

    const scoring = async () => {
        setVisible(false);

        fetch(addr+'/word/scoring',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${getCookie('myToken')}`,
            },
            body:JSON.stringify({
                answer:studentAnswerEnd,
                len:wordListLen,
                chapter:id
            }),
        }).then((res)=>res.json())
        .then((res) => {
            if(res.success){
                navigator('/score');
            }else{
                alert('다시 시도해주세요');
                return;
            }
        })
    }


    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={scoring} autoFocus />
        </div>
    );

    const list = async () => {
        fetch(addr+'/word/getTest/'+id,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${getCookie('myToken')}`,
            },
        }).then((res)=>res.json())
        .then((res)=>{
            console.log(res);
            //setWordEn(res[0]);
            // setWordKr(res[1]);
            // setWordSentence(res[2]);message: 'Unauthorized'
            if(res.message==='Unauthorized'){
                alert('먼저 로그인 해주세요');
                navigator('/login')
            }
            let len = res[0].length + res[1].length + res[2].length;

            setWordListLen(len);
            for(let i = 0; i<res[0].length;i++){
                const data : WordOne ={
                    en :res[0][i].en,
                    kr :res[0][i].kr,
                    level:res[0][i].level,
                    enSentence:res[0][i].enSentence,
                    krSentence:res[0][i].krSentence,
                    answer:answer(res[0][i].en,res[0][i].kr,1)
                }
                setWordEn(wordEn => [...wordEn, data]);
            }
            
            for(let i = 0; i<res[1].length;i++){
                const data : WordOne ={
                    en :res[1][i].en,
                    kr :res[1][i].kr,
                    level:res[1][i].level,
                    enSentence:res[1][i].enSentence,
                    krSentence:res[1][i].krSentence,
                    answer:answer(res[1][i].en,res[1][i].kr,2)
                }
                setWordKr(wordKr => [...wordKr, data]);
            }

            for(let i = 0; i<res[2].length;i++){
                const data : WordOne ={
                    en :res[2][i].en,
                    kr :res[2][i].kr,
                    level:res[2][i].level,
                    enSentence:res[2][i].enSentence,
                    krSentence:res[2][i].krSentence,
                    answer:answer(res[2][i].en,res[2][i].kr,3)
                }
                setWordSentence(wordSentence => [...wordSentence, data]);
            }
        });
        
    }

    useEffect(()=>{
        list();
    },[]);
    
    const columnsEn: ColumnMeta[] = [
        {field: 'en', header: 'english'},
        {field: 'answer', header: 'answer'}
      
    ];

    const columnsKr: ColumnMeta[] = [
        {field: 'kr', header: 'korean'},
        {field: 'answer', header: 'answer'}
      
    ];

    const columnsSentence: ColumnMeta[] = [
        {field: 'enSentence', header: 'english'},
        {field: 'krSentence', header: 'korean'},
        {field: 'answer', header: 'answer'}
      
    ];

//소문자로
    const inputAnswer = (en:string,kr:string,type:number,answer:string) => {
        const data = {
            en,kr,type,answer
        }

        let flag:boolean = false;
        let idx : number = 0;
        for(let i =0; i<studentAnswer.length;i++){
            if(data.en===studentAnswer[i].en){
                flag=true;
                idx = i;
                break;
            }
        }

        if(flag){
            studentAnswer[idx].answer = answer;
        }else{
            studentAnswer.push(data);
        }
        setStudentAnswerEnd(studentAnswer);
    }

    const answer = (en:string,kr:string,type:number) =>{
        return(
            <InputText onChange={(e: React.ChangeEvent<HTMLInputElement>) =>  inputAnswer(en,kr,type,e.target.value)}/>
            // <input type='text' onChange={(e) => inputAnswer(en,kr,type,e.target.value)}/>
            // <AutoComplete value={wordEn} onChange={(e) => inputAnswer(en,kr,1,e.target.value)} />
        )
    }

  
    return (
        <div className="AppDesktop">
            <h1>{id}과</h1>
            <DataTable value={wordEn} tableStyle={{ minWidth: '50rem' }}>
                {columnsEn.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
                    
            <br>
            </br>

            <DataTable value={wordKr} tableStyle={{ minWidth: '50rem' }}>
                {columnsKr.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>

            <br>
            </br>

            <DataTable value={wordSentence} tableStyle={{ minWidth: '50rem' }}>
                {columnsSentence.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
            
            <br/>
            <Button label="Submit"  onClick={() => setVisible(true)} />
            <Dialog header="Header" visible={visible}  footer={footerContent} modal={false} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <p className="m-0">
                   한 번 제출하면 채점이 진행되고 부모님께 메일이 발송됩니다. 그래도 진행하시겠습니까?
                </p>
            </Dialog>

            {/* <button onClick={()=>console.log(studentAnswerEnd)}>확인</button> */}
        </div>
    );

}

export default WordTestOne;