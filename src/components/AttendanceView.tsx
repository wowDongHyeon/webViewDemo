import { useState } from 'react';
import '../styles/AttendanceView.css';

const AttendanceView = () => {
  const [authNumber, setAuthNumber] = useState<string>('');
  const [showAuthView, setShowAuthView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateAuthNumber = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/verification/generate?phoneNumber=01012345678', {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
          'ngrok-skip-browser-warning': 'true'
        }
      });
      const data = await response.text();
      setAuthNumber(data);
      setShowAuthView(true);
    } catch (error) {
      console.error('인증번호 생성 중 오류 발생:', error);
      alert('인증번호 생성에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyAuthNumber = () => {
    navigator.clipboard.writeText(authNumber);
    alert('인증번호가 복사되었습니다.');
  };

  return (
    <div className="attendance-container">
      <button 
        className="auth-button" 
        onClick={generateAuthNumber}
        disabled={isLoading}
      >
        {isLoading ? '생성 중...' : '인증번호 생성'}
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