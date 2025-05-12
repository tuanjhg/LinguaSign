import React, { useState } from 'react';
import VideoBox from './VideoBox/VideoBox';
import TranslateResultBox from './TranslateResultBox/TranslateResultBox';
import './Translate.css';
import { Header } from '../../components/Header/Header';

const Translate = () => {
  const [language, setLanguage] = useState('vi');
  const [text, setText] = useState('Text');

  return (
    <div className="translate-page">
      <Header UserName="Nguyen Anh Dung" />
      <main className="translate-main">
        <div className="translate-content">
          <VideoBox setText={setText} />
          <TranslateResultBox
            text={text}
            language={language}
            onLanguageChange={setLanguage}
          />
        </div>
      </main>
    </div>
  );
};

export default Translate;