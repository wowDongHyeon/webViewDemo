import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  .back-button {
    color: #666;
    margin-right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
  
  .title {
    font-size: 18px;
    font-weight: bold;
    color: #666;
  }
`;

const OptionButton = styled.button<{ color: string }>`
  width: 100%;
  padding: 20px;
  margin-bottom: 15px;
  background-color: ${props => props.color};
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
  font-weight: bold;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const AttendanceOptions = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handlePresent = () => {
    console.log('출석 처리');
    // TODO: 출석 처리 로직

  };

  const handleLate = () => {
    console.log('지각 처리');
    // TODO: 지각 처리 로직

  };

  const handleEarlyLeave = () => {
    console.log('조퇴 처리');
    // TODO: 조퇴 처리 로직

  };

  const handleAbsent = () => {
    console.log('결석 처리');
    // TODO: 결석 처리 로직
  
  };

  const handleOther = () => {
    console.log('기타 처리');
    // TODO: 기타 처리 로직

  };

  return (
    <Container>
      <Header>
        <span className="back-button" onClick={handleBack}>←</span>
        <span className="title">출석 옵션</span>
      </Header>

      <OptionButton 
        color="#4CAF50" 
        onClick={handlePresent}
      >
        출석
      </OptionButton>
      
      <OptionButton 
        color="#2196F3" 
        onClick={handleLate}
      >
        지각
      </OptionButton>
      
      <OptionButton 
        color="#FF9800" 
        onClick={handleEarlyLeave}
      >
        조퇴
      </OptionButton>
      
      <OptionButton 
        color="#F44336" 
        onClick={handleAbsent}
      >
        결석
      </OptionButton>
      
      <OptionButton 
        color="#9C27B0" 
        onClick={handleOther}
      >
        기타
      </OptionButton>
    </Container>
  );
};

export default AttendanceOptions; 