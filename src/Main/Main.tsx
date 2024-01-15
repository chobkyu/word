import { Accordion, AccordionTab } from 'primereact/accordion';
import { useNavigate } from 'react-router-dom';
import ImageMenu from './ImageMenu';

const Main = () => {
    const navigate = useNavigate();

    return (
        <div className='AppDesktop'>
            <div>
                <ImageMenu/>
            </div>
            <Accordion activeIndex={0}>
                <AccordionTab header="Score">
                    <p className="m-0">
                        영어 단어 시험 점수를 확인할 수 있는 페이지입니다.
                    </p>
                    <p onClick={()=>{navigate('/score')}}>이동하기</p>
                </AccordionTab>
                <AccordionTab header="Test">
                    <p className="m-0">
                        영어 단어 시험을 볼 수 있는 페이지입니다.
                    </p>
                    <p onClick={()=>{navigate('/test')}}>이동하기</p>

                </AccordionTab>
                <AccordionTab header="Study">
                    <p className="m-0">
                        영어 단어를 공부할 수 있는 페이지입니다.
                    </p>
                    <p onClick={()=>{navigate('/study')}}>이동하기</p>

                </AccordionTab>
                <AccordionTab header="MyPage">
                    <p className="m-0">
                        나의 정보 페이지입니다.
                    </p>
                    <p onClick={()=>{navigate('/MyPage')}}>이동하기</p>

                </AccordionTab>
            </Accordion>
        </div>
    )
}

export default Main;