import { Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import LinuxSetup from '@/pages/guides/LinuxSetup'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/guides/linux-setup" element={<LinuxSetup />} />
    </Routes>
  )
}

export default App
