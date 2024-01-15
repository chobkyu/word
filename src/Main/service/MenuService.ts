export const MenuService = {
    getData(){
        return [
            {
                id:"1",
                menu:"Score",
                image:"bamboo-watch.jpg",
                detail:"점수확인"
            },
            {
                id:"2",
                menu:"Test",
                image:"black-watch.jpg",
                detail:"시험보기"
            },
            {
                id:"3",
                menu:"Study",
                image:"blue-band.jpg",
                detail:"공부하기"
            },
            {
                id:"4",
                menu:"MyPage",
                image:"blue-t-shirt.jpg",
                detail:"마이페이지"
            }
        ]
    },
    
    getMenuSmall() {
        return Promise.resolve(this.getData());
    },
}