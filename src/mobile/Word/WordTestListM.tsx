import { useState, useEffect } from 'react';
import { OrderList } from 'primereact/orderlist';
import { addr } from '../../common/serverAddress';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';

interface testList{
    level:number;
}



const WordTestListM = () => {
    const [testList, setTestList] = useState<testList[]>([]);
    const [testListTemp , setTestListTemp] = useState<testList[]>([])
    const navigate = useNavigate();

    const list =async () =>{
        fetch(addr+'/word/getLength',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        }).then((res)=>res.json())
        .then((res)=>{
            // console.log(res);
            setTestList(res);
            setTestListTemp(res);
        });
    }

    useEffect(()=>{
        list();
    },[]);
    

    const getTest = (level:number) => {
        console.log(level);
        navigate('/m/getTest/'+level);
    }

    const itemTemplate = (product: testList) => {
        return (
            <div className="col-12" style={{height:"5.5rem"}}>
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900" style={{marginLeft:"2rem", height:"2rem"}}>
                                <h3>
                                {product.level}과 단어시험

                                </h3>
                            </div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                  
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-t sm:align-items-end gap-3 sm:gap-2">
                           
                            <Button onClick = {()=>getTest(product.level)} style={{marginLeft:'14rem', }} className="p-button-rounded" size="small" label="시험보러가기" raised></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return(
        <div style={{marginTop:'5rem'}}>
            <DataView value={testList} itemTemplate={itemTemplate} />
        </div>
    )
}

export default WordTestListM;