import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addr } from '../../common/serverAddress';
import { WordOne } from './WordStudyM';
import Card from '@mui/material/Card';
import { CardContent, } from '@mui/material';


function CardStudyM() {
  const [word, setWord] = useState<WordOne[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  const list = async () => {
    fetch(addr + '/word/getStudy/' + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        setWord(res);
        setLoading(true);
      })
  }

  useEffect(() => {
    console.log('?')
    list();
  }, []);

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxword = word.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  /**너비 조정 예정 */
  return (
    loading ? <div style={{ marginTop: '30%' }}>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardContent>
          <Box sx={{ maxWidth: '80%', flexGrow: 1 }}>
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
              <Typography><h1>{word[activeStep].en}</h1></Typography>
            </Paper>
            <Box sx={{ height: 300, maxWidth: 400, width: '100%', p: 2 }}>
              <h2>☝{word[activeStep].kr}</h2>
              <br/>
              <h2>🛡️예제</h2>
              <h4>{word[activeStep].enSentence}</h4>
              <h4>{word[activeStep].krSentence}</h4>
 
            </Box>

            <MobileStepper
              style={{marginLeft:'24%'}}
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

    </div> : <>loading...</>


  );
}

export default CardStudyM;