import { useEffect, useState } from "react";
import { addr } from "../../common/serverAddress";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../common/Cookies";
import Score from "../../Score/Score";
import { DataView } from 'primereact/dataview';
import { Divider } from "@mui/material";

export interface WrongAnswer{
    seq:number;
    en:string;
    kr:string;
    answer:string;
    score:Score;
}

const WrongAnswerM = () => {
    const [wrongAnswer, setWrongAnswer] = useState<WrongAnswer[]>([]);
    const [chapter,setChapter] = useState<number>(0);
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

            if(res.length==0){
                alert('오답이 없습니다');
                window.history.go(-1);
            }else{
                console.log(res);
                setChapter(res[0].score.chapter);
                setWrongAnswer(res);
            }
           
        })
    }

    useEffect(() => {
        list();
    }, []);

    const itemTemplate = (product: WrongAnswer) => {
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
                            <div style={{marginLeft:'15rem',marginTop:'0.5rem'}}>
                                <span className="flex align-items-center gap-2">
                                    오답 : {product.answer}
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
            <h1 style={{marginLeft:'1rem'}}>{chapter}과의 오답노트</h1>
            <Divider/>
            <DataView value={wrongAnswer} itemTemplate={itemTemplate} />
        </div>
    )
}

export default WrongAnswerM;