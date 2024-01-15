import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main/Main';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
//import 'primeflex/primeflex.css';                                   // css utility
import './index.css';
import './css/flags.css';
import Menu from './Main/Menu';
import WordTest from './Word/WordTest';
import WordTestList from './Word/WordTestList';
import WordTestOne from './Word/WordTestOne';
import LoginPage from './Auth/Login';
import Score from './Score/Score';
import WordStudy from './Word/WordStudy';
import WordStudyList from './Word/WordStudyList';
import JoinMember from './Auth/JoinMember';
import Test from './Test';
import MyPage from './Auth/MyPage';
import WrongAnswer from './Score/WrongAnswer';
import MainMobile from './mobile/MainMobile';
import WordTestListM from './mobile/Word/WordTestListM';
import WordTestOneM from './mobile/Word/WordTestOneM';
import LoginM from './mobile/Auth/LoginM';
import ScoreM from './mobile/Score/ScoreM';
import WrongAnswerM from './mobile/Score/WrongAnswerM';
import WordStudyM from './mobile/Study/WordStudyM';
import WordStudyListM from './mobile/Study/WordStudyListM';
import MyPageM from './mobile/Auth/MyPageM';
import CardStudyM from './mobile/Study/CardStudyM';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Menu/>
      <Routes>
        <Route path='/' element={<Main/>}/>

        <Route path='/Main' element={<Main/>}/>
        <Route path='/test' element={<WordTestList/>}/>
        <Route path='/test/:id' element={<WordTest/>}/>
        <Route path='/getTest/:id' element={<WordTestOne/>}/>

        <Route path='/study' element={<WordStudyList/>}/>
        <Route path='/getStudy/:id' element={<WordStudy/>}/>

        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/join' element={<JoinMember/>}/>
        <Route path='/MyPage' element={<MyPage/>}/>

        <Route path='/score' element={<Score/>}/>
        <Route path='/wrongAnswer/:seq' element={<WrongAnswer/>}/>

        <Route path='/test1' element={<Test/>}/>


        {/** mobile page */}
        <Route path='/m' element={<MainMobile/>}/>

        <Route path='/m/main' element={<MainMobile/>}/>

        <Route path='/m/test' element={<WordTestListM/>}/>
        <Route path='/m/getTest/:id' element={<WordTestOneM/>}/>

        <Route path='/m/study' element={<WordStudyListM/>}/>
        <Route path='/m/getStudy/:id' element={<WordStudyM/>}/>
        <Route path='/m/cardStudy/:id' element={<CardStudyM/>}/>

        <Route path='/m/score' element={<ScoreM/>}/>
        <Route path='/m/wrongAnswer/:seq' element={<WrongAnswerM/>}/>

        <Route path='/m/login' element={<LoginM/>}/>
        <Route path='/m/MyPage' element={<MyPageM/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
