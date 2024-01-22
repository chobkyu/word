import { Button } from "primereact/button";
import { DataView } from 'primereact/dataview';
import { async } from "q";
import { useEffect, useState } from "react";
import { getCookie } from "../../common/Cookies";
import { addr } from "../../common/serverAddress";
import { useNavigate } from "react-router";

interface Score{
    seq:number;
    score:number;
    chapter:number;
    userSeq:number;
    date:Date|null;
    grade:string;
}

const ScoreM = () =>{
    const [score, setScore] = useState<Score[]>([]);
    const [scoreList,setScoreList] = useState<Score[]>();

    const navigator = useNavigate();

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
                navigator('/m/login')
            }
            console.log(res);
            setScore(res);
        })
    }

    useEffect(() => {
        list();
    }, []);


    const viewWrongAnswer = (seq:number) =>{
        
        navigator('/m/wrongAnswer/'+seq);
    }

    const getDate = (dateExam:Date|null) => {
        //console.log(date)

        if(dateExam!==null){
            //console.log(date)
            let date = new Date(dateExam) 
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let day = date.getDate();
            
            return `${year}년 ${month}월 ${day}일`
        }else{
            return '-'
        }
       
    }

    const itemTemplate = (product: Score) => {
        return (
            <div className="col-12" style={{height:"6rem"}}>
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900" style={{marginLeft:"2rem", height:"2rem"}}>
                                <h3>
                                {product.chapter}과 단어시험 점수는 {product.score}

                                </h3>
                            </div>
                            <div style={{float:'right',margin:'0.5rem'}}>
                                <span className="flex align-items-center gap-2" style={{width:'100%'}}>
                                  응시 일시 : <>{getDate(product.date)}</>&nbsp;
                                  등급 : {product.grade}
                                </span>
                                <div style={{display:'block'}}>
                                    <Button label="오답보기" onClick={()=>viewWrongAnswer(product.seq)} style={{width:'10rem',height:'1.1rem',float:'right'}} />

                                </div>

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
            <DataView value={score} itemTemplate={itemTemplate} />
        </div>
    )
}

export default ScoreM;