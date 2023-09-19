export const loginBannerImage="https://images.unsplash.com/photo-1609540969455-ad5ea19be121?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
export const logo="https://trupti-treats-dashboard.vercel.app/static/media/logo.9bb33aa9c93292951fe3.png";
export const getPageFromUrl=(value)=>{
value=+value;
if(typeof value==="number" && value<=0){
    value=1
}
if(!value){
    value=1
}
return value;
}


export const API="http://localhost:4000"


