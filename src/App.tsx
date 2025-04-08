import { Routes, Route, Navigate } from 'react-router-dom'
import AttendanceView from './components/AttendanceView'
import AttendanceCheck from './components/AttendanceCheck'
import './App.css'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/bbb" element={<AttendanceCheck />} />
        <Route path="/aaa" element={<AttendanceView />} />
        <Route path="/" element={<Navigate to="/bbb" replace />} />
      </Routes>
    </div>
  )
}

export default App
