import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';
import { MenuService } from './service/MenuService';
import { useNavigate } from 'react-router-dom';

interface wordTestMenu {
    id:string;
    menu:string;
    image:string;
    detail:string;
}
const ImageMenu = () => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState<wordTestMenu[]>([]);
    const responsiveOptions: CarouselResponsiveOption[] = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];


    useEffect(() => {
        MenuService.getMenuSmall().then((data) => setMenu(data));
    }, []);

   

    const menuTemplate = (menu:wordTestMenu) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3" onClick = {()=>navigate(`/${menu.menu}`)}>
                <div className="mb-3">
                    <img src={`https://primefaces.org/cdn/primereact/images/product/${menu.image}`} alt={menu.menu} className="w-6 shadow-2" />
                </div>
                <div>
                    <h4 className="mb-1">{menu.menu}</h4>
                    <h6 className="mt-0 mb-3">{menu.detail}</h6>
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-search" className="p-button p-button-rounded" />
                        {/* <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" /> */}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Carousel value={menu} numScroll={1} numVisible={3} responsiveOptions={responsiveOptions} itemTemplate={menuTemplate} />
        </div>
    )
}

export default ImageMenu;