import { useState, useEffect } from 'react';
import { OrderList } from 'primereact/orderlist';
import { addr } from '../common/serverAddress';
import { useNavigate } from 'react-router-dom';


interface testList{
    level:number;
}

const WordTestList = () =>{
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
    
    
    // const onInputChangeQRY_KCD_NATION_CD = (e, name) => {
    //     setDataTbl_KCD_NATION([]);
    //     let val = (e.target && e.target.value) || '';

    //     let temp = new Array();

    //     temp.push(dataTbl_KCD_NATION_Temp.filter((arr) => {
    //         // console.log(val)
    //         // console.log(arr[`${name}`])
    //         // console.log(arr[`${name}`].includes(val))
    //         return arr[`${name}`].includes(val)
            
    //     }));
    //     //console.log(temp);
    //     setDataTbl_KCD_NATION(...temp);

    // }

    const onInputList = (e:any) =>{
        console.log('fuck')
        setTestList([]);
        let val :string= e.target.value;

        let temp = new Array();

        for(let i = 0; i<testListTemp.length ; i++){
            if(testListTemp[i].level == parseInt(val)){
                temp.push(testListTemp[i])
            }
        }
        console.log(temp)
        setTestList([...temp])
        // temp.push(testListTemp.filter((arr)=>{
        //     return arr.level === parseInt(val)? arr :''
        // }))
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
                        <span onClick={()=>{navigate('/getTest/'+item.level)}}>시험보러가기</span>
                    </div>
                </div>
                {/* <span className="font-bold text-900">${item.price}</span> */}
            </div>
        );
    };
    
    return (
        <div className="AppDesktop">
            <OrderList value={testList} onChange={(e) => console.log(e)} itemTemplate={itemTemplate} header="Tests" filter filterBy="name"></OrderList>
        </div>
    )
}

export default WordTestList;