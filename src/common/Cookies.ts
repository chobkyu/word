import { Cookies} from "react-cookie";

const cookies = new Cookies();

/*쿠키 저장*/
export const setCookie = (name:string, value:string, option?:any) => {
    return cookies.set(name,value,{...option})
}

/*쿠키 겟^^*/
export const getCookie = (name:string) => {
    return cookies.get(name);
}

export const getAllCookie = () => {
    return cookies.getAll();
}

/*쿠키 제거*/
export const removeCookie = (name:string) => {
    try{
        cookies.remove(name);
        return {success:true};
    }catch(err){
        console.log(err);
        return {success:false};
    }
}
