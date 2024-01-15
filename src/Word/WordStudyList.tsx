import { useState, useEffect } from 'react';
import { OrderList } from 'primereact/orderlist';
import { addr } from '../common/serverAddress';
import { useNavigate } from 'react-router-dom';

interface testList{
    level:number;
}

const WordStudyList = () => {
    const [testList, setTestList] = useState<testList[]>([]);
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
        });
    }
    

    useEffect(() => {
        list();
        // ProductService.getProductsSmall().then((data) => setProducts(data));
    }, []);

    const itemTemplate = (item: testList) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                {/* <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`} alt={item.name} /> */}
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.level}과</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span onClick={()=>{navigate('/getStudy/'+item.level)}}>공부하러가기</span>
                    </div>
                </div>
                {/* <span className="font-bold text-900">${item.price}</span> */}
            </div>
        );
    };
    
    return (
        <div className="AppDesktop">
            <OrderList value={testList} onChange={(e) => setTestList(e.value)} itemTemplate={itemTemplate} header="Study" filter filterBy="name"></OrderList>
        </div>
    )
}

export default WordStudyList;