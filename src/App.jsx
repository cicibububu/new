import React, { useEffect, useState, useRef } from 'react';
import { Modal } from 'antd';
import './App.css';
import image1 from './assets/before.png';
import image2 from './assets/after.png';
import image3 from './assets/bottom.png';
import image4 from './assets/answer.png';
import image5 from './assets/back.png';
import image6 from './assets/next.png';

const App = () => {
  const [showImage1, setShowImage1] = useState(true);
  const [showImage2, setShowImage2] = useState(false);
  const [showImage3, setShowImage3] = useState(false);
  const [isSpeechTriggered, setIsSpeechTriggered] = useState(false);
  const [isSpeechFinished, setIsSpeechFinished] = useState(false);
  const [delayElapsed, setDelayElapsed] = useState(false);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const image3Ref = useRef(null);
  const [answers, setAnswers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');


  const text =
    'Arr, my pirate ship, pretty Betty, is the best ship in the world! It has a wonderful crew of hardworking pirates,who are always happy to help me navigate the rough seas. It also has a lovely, black sail which is made of the best silk that can be found. It will never tear, even in the strongest winds!';

  const handleSpeechSynthesis = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    setIsSpeechFinished(true);
    setIsSpeechTriggered(true);
    document.removeEventListener('click', handleSpeechSynthesis);
  };

  const handleAnswerImageClick = () => {
    setModalVisible(true);
    };

  useEffect(() => {
    setTimeout(() => {
      setShowImage2(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!isSpeechTriggered) {
      document.addEventListener('click', handleSpeechSynthesis);
    }

    return () => {
      document.removeEventListener('click', handleSpeechSynthesis);
    };
  }, [isSpeechTriggered]);

  useEffect(() => {
    if (isSpeechFinished) {
      const timer = setTimeout(() => {
        setIsSpeechFinished(true);
        setDelayElapsed(true);
        setShowImage1(false);
      
      }, 17000);

      return () => clearTimeout(timer);
    }
  }, [isSpeechFinished]);

  useEffect(() => {
    if (isSpeechFinished) {
      const timer = setTimeout(() => {
        setShowImage3(true);
      }, 19000);

      return () => clearTimeout(timer);
    }
  }, [isSpeechFinished]);

  const handleInput1Change = (e) => {
    setInputValue1(e.target.value);
    setAnswer1(e.target.value);
  };

  const handleInput2Change = (e) => {
    setInputValue2(e.target.value);
    setAnswer2(e.target.value);
  };
  const handleImage4Click = () => {
    setModalVisible(true);
  };
  
  const handleInput1Blur = (e) => {
    handleSubmit(e); // 将事件对象作为参数传递给 handleSubmit
  };
  
  const handleInput2Blur = (e) => {
    handleSubmit(e); // 将事件对象作为参数传递给 handleSubmit
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止表单默认的提交行为

    // 将输入的答案添加到答案数组
    const newAnswers = [...answers, { reason1: inputValue1, reason2: inputValue2 }];
    setAnswers(newAnswers);
    console.log(newAnswers);

    // 执行其他操作...

    // 重置输入框的值
    setInputValue1('');
    setInputValue2('');
  };

  return (
    <div className="container">
      <div className="images-container">
        {showImage1 && (
          <img src={image1} className={`image ${showImage2 ? '' : 'fade-in'}`} alt="Image 1" />
        )}
        {showImage2 && (
          <img
            src={image2}
            className={`image ${showImage2 ? 'fade-in' : 'hidden'}`}
            alt="Image 2"
            style={
              isSpeechFinished && delayElapsed
                ? {
                    transform: 'translate(-50%, -50%) scale(0.8)',
                    top: '20%',
                    left: '50%',
                    transition: 'top 2s ease, transform 2s ease, opacity 2s ease-in 1s',
                    position: 'fixed',
                  }
                : {}
            }
          />
        )}
        {showImage3 && (
          <form onSubmit={handleSubmit}>
            <img
              src={image3}
              className={`image fade-in`}
              alt="Image 3"
              style={{
                transform: 'translate(-50%, -50%)',
                top: '65%',
                left: '50%',
                transition: 'opacity 3s ease-in 3s',
                position: 'fixed',
              }}
            />

            <textarea
              className="text-box1"
              style={{
                top: '71.5%',
                left: '55%',
                position: 'fixed',
                transform: 'translate(-50%, -50%)',
              }}
              placeholder="Enter reason 1..."
              value={inputValue1}
              onChange={handleInput1Change}
              onBlur={(e) => {
                handleInput1Blur(e);
                setAnswer1(e.target.value);
              }}
            />
            <textarea
              className="text-box2"
              style={{
                top: '84%',
                left: '55%',
                position: 'fixed',
                transform: 'translate(-50%, -50%)',
              }}
              placeholder="Enter reason 2..."
              value={inputValue2}
              onChange={handleInput2Change}
              onBlur={(e) => {
                handleInput2Blur(e);
                setAnswer2(e.target.value);
              }}
            />
          </form>
        )}

        {/* Answer */}
        <img
  src={image4}
  className="answer-image"
  alt="Answer"
  style={{
    width: '75px',
    position: 'fixed',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  }}
  onClick={handleImage4Click}
/>
<Modal
  title="Answer"
  visible={modalVisible}
  onCancel={() => setModalVisible(false)}
  mask={false}
  footer={null}
>
  <br />
  <p style={{
            fontSize:'20px',
          }}>answer1: answer1</p>
          <br />

          <p style={{
            fontSize:'20px',
          }}>answer2: answer2</p>
</Modal>


        {/* Next */}
        <img
          src={image6}
          className="next-image"
          alt="Next"
          style={{
            width:'190px',
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            cursor: 'pointer',
          }}
        />

        {/* Before */}
        <img
          src={image5}
          className="before-image"
          alt="Before"
          style={{
            width:'190px',
            position: 'fixed',
            bottom: '10px',
            left: '10px',
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  );
};

export default App;
