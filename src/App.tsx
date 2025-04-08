import React from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import AttendanceView from './components/AttendanceView'
import AttendanceCheck from './components/AttendanceCheck'
import './App.css'

// AttendanceCheck를 감싸는 컴포넌트
const AttendanceCheckWrapper = () => {
  const { studentId } = useParams();
  return <AttendanceCheck studentId={studentId} />;
};

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/bbb" element={<AttendanceCheckWrapper />} />
        <Route path="/aaa" element={<AttendanceView />} />
        <Route path="/" element={<Navigate to="/bbb" replace />} />
      </Routes>
    
    </div>
  )
}

export default App
