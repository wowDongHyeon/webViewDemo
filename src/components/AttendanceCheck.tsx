import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface AttendanceStatus {
  present: number;
  late: number;
  absent: number;
  pending: number;
}

interface AttendanceRequest {
  lectureName: string;
  classroom: string;
  classTime: string;
  date: string;
  status: string;
  studentName: string;
  testSeq: number;
}

const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
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

const StudentName = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  color: #666;
  
  &:hover {
    background-color: #f8f8f8;
  }
`;

const LectureInfo = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  
  .semester {
    color: #666;
    margin-bottom: 10px;
  }
  
  .lecture-name {
    color: #666;
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .time-location {
    color: #666;
    font-size: 14px;
  }
`;

const AttendButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  margin-bottom: 20px;
  
  .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: red;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  
  .status-item {
    text-align: center;
    
    .count {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 5px;
      color: #666;
    }
    
    .label {
      font-size: 14px;
      color: #666;
    }
  }
`;

// 랜덤 학생 이름 생성을 위한 샘플 데이터
const sampleNames = [
  '김철수', '이영희', '박민수', '정지원', 
  '최유진', '강민준', '윤서연', '장현우',
  '임수진', '한지민', '오태현', '신미래'
];

const getRandomName = () => {
  const randomIndex = Math.floor(Math.random() * sampleNames.length);
  return sampleNames[randomIndex];
};

// const API_BASE_URL = ' https://ba4f-2001-2d8-f235-7f77-5465-5772-64a6-d75e.ngrok-free.app';

const API_BASE_URL = 'http://localhost:8080';

const AttendanceCheck = () => {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState<AttendanceStatus>({
    present: 0,
    late: 1,
    absent: 1,
    pending: 9
  });

  const [studentName, setStudentName] = React.useState(getRandomName());
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchAttendanceCount = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/attendance/count`,
        {
          lectureName: 'WebProgramming',
          classTime: '05'
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('출석 현황 응답:', response.data);
      
      if (typeof response.data === 'number') {
        const newStatus = {
          present: response.data,
          late: 1,
          absent: 1,
          pending: 9
        };
        console.log('새로운 상태:', newStatus);
        setStatus(newStatus);
      } else {
        console.error('예상치 못한 응답 데이터 형식:', response.data);
      }
    } catch (err) {
      console.error('출석 현황 조회 실패:', err);
    }
  };

  useEffect(() => {
    console.log('현재 상태:', status);
  }, [status]);

  useEffect(() => {
    fetchAttendanceCount();
  }, []);

  const handleNameClick = () => {
    setStudentName(getRandomName());
  };

  const handleAttendance = async () => {
    navigate('/options');
  };

  return (
    <Container>
      <Header>
        <span className="back-button">←</span>
        <span className="title">전자출결</span>
      </Header>

      <StudentName onClick={handleNameClick}>
        {studentName}
      </StudentName>

      <LectureInfo>
        <div className="semester">YYYY년도 N 학기</div>
        <div className="lecture-name">
          세계글로벌경영학의 이해와 기초와 서향동의 바라보는 경제
        </div>
        <div className="time-location">
          07-08교시 (15:00 ~ 17:00)<br />
          공학관 1관 502호
        </div>
      </LectureInfo>

      <AttendButton 
        onClick={handleAttendance} 
        disabled={isLoading}
        style={{ opacity: isLoading ? 0.7 : 1 }}
      >
        {isLoading ? '처리중...' : '출석'}
        <span className="badge">1</span>
      </AttendButton>

      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      <StatusGrid>
        <div className="status-item">
          <div className="count">{status.present}</div>
          <div className="label">출석</div>
        </div>
        <div className="status-item">
          <div className="count">{status.late}</div>
          <div className="label">지각</div>
        </div>
        <div className="status-item">
          <div className="count">{status.absent}</div>
          <div className="label">결석</div>
        </div>
        <div className="status-item">
          <div className="count">{status.pending}</div>
          <div className="label">미정</div>
        </div>
      </StatusGrid>
    </Container>
  );
};

export default AttendanceCheck;  