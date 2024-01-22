import { useEffect, useState } from "react";
import { Answer, ColumnMeta, WordOne } from "../../Word/WordTestOne";
import Button from '@mui/material/Button';
import { InputText } from "primereact/inputtext";
import { useParams, useNavigate } from "react-router-dom";
import { getCookie } from "../../common/Cookies";
import { addr } from "../../common/serverAddress";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Card from '@mui/material/Card';
import { Box, CardContent, useTheme, } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const WordTestOneM = () => {
    const [answer,setAnswer] = useState<string>('');

    const [dividedLen, setDividedLen] = useState<number>(0); //3등분 할 숫자
    const [words, setWords] = useState<WordOne[]>([]);

    const [studentAnswerEnd, setStudentAnswerEnd] = useState<Answer[]>([]);
    const { id } = useParams();
    const [visible, setVisible] = useState<boolean>(false);
    const [wordListLen, setWordListLen] = useState<number>(0);

    const navigator = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);

    /**채점 */
    const scoring = async () => {
        setVisible(false);
        
        console.log(studentAnswerEnd)
        fetch(addr + '/word/scoring', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie('myToken')}`,
            },
            body: JSON.stringify({
                answer: studentAnswerEnd,
                len: wordListLen,
                chapter: id
            }),
        }).then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    navigator('/m/score');
                } else {
                    alert('다시 시도해주세요');
                    return;
                }
        });
    }


    /**modal yes or no component */
    const footerContent = (
        <div>
            <Button onClick={() => setVisible(false)} className="p-button-text" >No</Button>
            <Button onClick={scoring}  >Yes</Button>
        </div>
    );

    const list = async () => {
        console.log(getCookie('myToken'))

        fetch(addr + '/word/mobileTest/' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie('myToken')}`,
            },
        }).then((res) => res.json())
            .then((res) => {
                console.log(res);
               
                if (res.message === 'Unauthorized') {
                    alert('먼저 로그인 해주세요');
                    navigator('/m/login')
                }

                if (res.success == false) {
                    alert('error');
                    window.history.go(-1);
                }
                setWords(res);
                setWordListLen(res.length)

            }).then(() => {
                setLoading(true);
            });

    }

    useEffect(() => {
        list();
    }, []);



    const inputAnswer = (en: string, kr: string, type: number, answer: string) => {
        const data = {
            en, kr, type, answer
        }
        const studentAnswer = studentAnswerEnd;
        let flag: boolean = false;
        let idx: number = 0;
        for (let i = 0; i < studentAnswer.length; i++) {
            if (data.en === studentAnswer[i].en) {
                flag = true;
                idx = i;
                break;
            }
        }

        if (flag) {
            studentAnswer[idx].answer = answer.toLowerCase();
        } else {
            studentAnswer.push(data);
        }
        // console.log(studentAnswer)
        setStudentAnswerEnd(studentAnswer);
    }



    /**card */
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxword = words.length;
    const handleNext = () => {
        setAnswer('')
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setAnswer('')
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const boxComponent = (step: number,words:WordOne) => {
        let dividedLen = wordListLen / 3;
        //console.log(step)

        let testCase =Math.trunc(step/dividedLen)
        switch (testCase) {
            case 0:
                return (
                    <>
                        <Paper
                            square
                            elevation={0}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: 50,
                                pl: 2,
                                bgcolor: 'background.default',
                            }}
                        >
                            <Typography><h1>{words.en}</h1></Typography>
                        </Paper>
                        <Box sx={{ height: 180, maxWidth: 400, width: '100%', p: 2 }}>
                            <InputText
                                value = {answer} 
                                onChange={
                                    (e: React.ChangeEvent<HTMLInputElement>) => {
                                        setAnswer(e.target.value);
                                        inputAnswer(words.en, words.kr, 1, e.target.value)
                                    }
                                } 
                            />
                            
                            <br />

                        </Box>
                    </>
                )
            case 1:
                return (
                    <>
                        <Paper
                            square
                            elevation={0}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: 50,
                                pl: 2,
                                bgcolor: 'background.default',
                            }}
                        >

                            <Typography><h1>{words.kr}</h1></Typography>
                        </Paper>
                        <Box sx={{ height: 180, maxWidth: 400, width: '100%', p: 2 }}>
                            <InputText 
                                value={answer}
                                onChange={
                                    (e: React.ChangeEvent<HTMLInputElement>) => {
                                        setAnswer(e.target.value)
                                        inputAnswer(words.en, words.kr, 2, e.target.value)
                                    }
                            } />
                            
                            <br />

                        </Box>
                    </>
                )
            case 2:
                return (
                    <>
                        <Paper
                            square
                            elevation={0}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: 50,
                                pl: 2,
                                bgcolor: 'background.default',
                            }}
                        >

                            <Typography><h1>{words.enSentence}</h1></Typography>
                        </Paper>
                        <h2>{words.krSentence}</h2>
                        <Box sx={{ height: 180, maxWidth: 400, width: '100%', p: 2 }}>
                            <InputText 
                                value={answer}
                                onChange={
                                    (e: React.ChangeEvent<HTMLInputElement>) => {
                                        setAnswer(e.target.value)
                                        inputAnswer(words.en, words.kr, 2, e.target.value)
                                    }
                                } 
                            />
                           
                            <br />

                        </Box>
                    </>
                )
        }

    }


    return (
        loading ?
            <div style={{ marginTop: "3.5rem" }}>
                <div style={{ marginTop: '30%' }}>

                    <Card variant="outlined" sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Box sx={{ maxWidth: '80%', flexGrow: 1 }}>

                                {boxComponent(activeStep,words[activeStep])}

                                <MobileStepper
                                    style={{ marginLeft: '24%' }}
                                    variant="text"
                                    steps={maxword}
                                    position="static"
                                    activeStep={activeStep}
                                    nextButton={
                                        <Button
                                            size="small"
                                            onClick={handleNext}
                                            disabled={activeStep === maxword - 1}
                                        >
                                            Next
                                            {theme.direction === 'rtl' ? (
                                                <KeyboardArrowLeft />
                                            ) : (
                                                <KeyboardArrowRight />
                                            )}
                                        </Button>
                                    }
                                    backButton={
                                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                            {theme.direction === 'rtl' ? (
                                                <KeyboardArrowRight />
                                            ) : (
                                                <KeyboardArrowLeft />
                                            )}
                                            Back
                                        </Button>
                                    }
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </div>



                <div className="AppDesktop">
                    <Button onClick={() => setVisible(true)} >Submit</Button>
                </div>


                <Dialog header="Finish?" visible={visible} footer={footerContent} modal={false} style={{ width: '85vw' }} onHide={() => setVisible(false)}>
                    <p className="m-0">
                        한 번 제출하면 채점이 진행되고 부모님께 메일이 발송됩니다. 그래도 진행하시겠습니까?
                    </p>
                </Dialog>

                {/* <button onClick={()=>console.log(studentAnswerEnd)}>확인</button> */}
            </div> : <>loading...</>
    )
}

export default WordTestOneM;