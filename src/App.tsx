import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { NewBudget } from './pages/NewBudget';
import { BudgetEditor } from './pages/BudgetEditor';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="new" element={<NewBudget />} />
          <Route path="edit/:id" element={<BudgetEditor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
