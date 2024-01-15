import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addr } from "../../common/serverAddress";
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';

export interface WordOne{
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

const WordStudyM =() => {
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
    
    const itemTemplate = (product: WordOne) => {
        return (
            <div className="col-12" style={{height:"5.5rem"}}>
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900" style={{marginLeft:"2rem", height:"2rem"}}>
                                <h3>
                                {product.en}  -  {product.kr}

                                </h3>
                            </div>
                            <div style={{marginLeft:'2rem',marginTop:'0.5rem'}}>
                                <span className="flex align-items-center gap-2">
                                   영어 예제 : {product.enSentence}
                                </span>
                                <br></br>
                                <span style={{marginTop:'0.5rem'}} className="flex align-items-center gap-2">
                                   예제 해석 : {product.krSentence}
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-t sm:align-items-end gap-3 sm:gap-2">
                           
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    
    return (
        <div style={{marginTop:'5rem'}}>
           <DataView value={word} itemTemplate={itemTemplate} />
        </div>
    )
}

export default WordStudyM