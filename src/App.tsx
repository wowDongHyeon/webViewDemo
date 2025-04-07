import { Routes, Route, Navigate } from 'react-router-dom'
import AttendanceView from './components/AttendanceView'
import './App.css'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/aaa" element={<AttendanceView />} />
        <Route path="/" element={<Navigate to="/aaa" replace />} />
      </Routes>
    </div>
  )
}

export default App
