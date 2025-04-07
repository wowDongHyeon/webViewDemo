import { useState } from 'react';
import '../styles/AttendanceView.css';

const AttendanceView = () => {
  const [authNumber, setAuthNumber] = useState<string>('');
  const [showAuthView, setShowAuthView] = useState<boolean>(false);

  const generateAuthNumber = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setAuthNumber(randomNum.toString());
    setShowAuthView(true);
  };

  const copyAuthNumber = () => {
    navigator.clipboard.writeText(authNumber);
    alert('인증번호가 복사되었습니다.');
  };

  return (
    <div className="attendance-container">
      <button className="auth-button" onClick={generateAuthNumber}>
        인증번호 생성
      </button>
      
      {showAuthView && (
        <div className="auth-view">
          <h2>인증번호</h2>
          <div className="auth-number">{authNumber}</div>
          <button className="copy-button" onClick={copyAuthNumber}>
            복사하기
          </button>
        </div>
      )}
    </div>
  );
};

export default AttendanceView; 