import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Car, 
  TrendingUp, 
  PlusCircle, 
  Trash2, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  PiggyBank, 
  Clock,
  ArrowRight,
  Sparkles,
  RefreshCw,
  TrendingDown,
  Plus,
  Sliders,
  X,
  Smartphone,
  Share,
  Briefcase,
  Copy,
  QrCode,
  Info
} from 'lucide-react';

// --- DATOS PRECARGADOS INICIALES (AJUSTADOS A TUS REALIDADES DE MAYO) ---
const INITIAL_INCOMES = [
  { id: '1', date: '2026-05-02', app: 'Cabify', amount: 450000, hours: 30, notes: 'Semana de alta eficiencia' },
  { id: '2', date: '2026-05-09', app: 'Uber', amount: 400000, hours: 28, notes: 'Buen ritmo' },
  { id: '3', date: '2026-05-15', app: 'DiDi', amount: 93800, hours: 8, notes: 'Viajes dinámicos' },
  { id: '4', date: '2026-05-16', app: 'Particular', amount: 30000, hours: 2, notes: 'Viaje largo acordado' },
];

const INITIAL_EXPENSES = [
  { id: 'p1', date: '2026-05-01', category: 'Alquiler y cargos', amount: 165964, type: 'Personal' },
  { id: 'p2', date: '2026-05-05', category: 'Supermercado', amount: 138746, type: 'Personal' },
  { id: 'p3', date: '2026-05-02', category: 'Estudios', amount: 97300, type: 'Personal' },
  { id: 'p4', date: '2026-05-01', category: 'Gym', amount: 47000, type: 'Personal' },
  { id: 'p5', date: '2026-05-10', category: 'Casa', amount: 42431, type: 'Personal' },
  { id: 'p6', date: '2026-05-08', category: 'Limpieza', amount: 40000, type: 'Personal' },
  { id: 'p7', date: '2026-05-12', category: 'Restaurantes y bares', amount: 34000, type: 'Personal' },
  { id: 'p8', date: '2026-05-13', category: 'Comilona', amount: 15300, type: 'Personal' },
  { id: 'p9', date: '2026-05-04', category: 'Transporte (Personal)', amount: 8500, type: 'Personal' },
  { id: 'p10', date: '2026-05-14', category: 'Entretenimiento', amount: 4689, type: 'Personal' },
  { id: 'p11', date: '2026-05-15', category: 'Otros Gastos de Vida', amount: 356070, type: 'Personal' },
  { id: 'a1', date: '2026-05-15', category: 'Combustible GNC', amount: 55550, type: 'Auto', isProrated: false },
  { id: 'a2', date: '2026-05-10', category: 'Patente', amount: 40150, type: 'Auto', isProrated: false },
  { id: 'a3', date: '2026-05-01', category: 'Service (Prorrateado)', amount: 30000, type: 'Auto', isProrated: true, originalAmount: 90000, periodMonths: 3 },
  { id: 'a4', date: '2026-05-01', category: 'VTV Anual (Prorrateada)', amount: 8333, type: 'Auto', isProrated: true, originalAmount: 100000, periodMonths: 12 },
  { id: 'a5', date: '2026-05-01', category: 'Oblea GNC (Prorrateada)', amount: 3750, type: 'Auto', isProrated: true, originalAmount: 45000, periodMonths: 12 },
  { id: 'f1', date: '2026-05-05', category: 'Cuota Deuda Familiar', amount: 500000, type: 'Deuda' },
  { id: 'r1', date: '2026-05-01', category: 'Reserva Recompra Auto (USD 226)', amount: 271200, type: 'Recompra' }
];

export default function App() {
  const [incomes, setIncomes] = useState(() => {
    const saved = localStorage.getItem('app_incomes');
    return saved ? JSON.parse(saved) : INITIAL_INCOMES;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('app_expenses');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isInstallGuideOpen, setIsInstallGuideOpen] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(null);
  
  const [monthlyGoal, setMonthlyGoal] = useState(() => {
    const saved = localStorage.getItem('cfg_monthly_goal');
    return saved ? Number(saved) : 1915000;
  });
  const [daysRemaining, setDaysRemaining] = useState(() => {
    const saved = localStorage.getItem('cfg_days_remaining');
    return saved ? Number(saved) : 10;
  });
  const [dollarRate, setDollarRate] = useState(() => {
    const saved = localStorage.getItem('cfg_dollar_rate');
    return saved ? Number(saved) : 1200;
  });

  const [realAppUrl, setRealAppUrl] = useState(() => {
    return localStorage.getItem('cfg_real_app_url') || '';
  });

  const [toast, setToast] = useState(null);

  const [incomeForm, setIncomeForm] = useState({
    date: new Date().toISOString().split('T')[0],
    app: 'Uber',
    amount: '',
    hours: '',
    notes: ''
  });

  const [expenseForm, setExpenseForm] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    amount: '',
    type: 'Personal',
    isProrated: false,
    originalAmount: '',
    periodMonths: '12'
  });

  useEffect(() => {
    localStorage.setItem('app_incomes', JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem('app_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('cfg_monthly_goal', monthlyGoal.toString());
    localStorage.setItem('cfg_days_remaining', daysRemaining.toString());
    localStorage.setItem('cfg_dollar_rate', dollarRate.toString());
    localStorage.setItem('cfg_real_app_url', realAppUrl);
  }, [monthlyGoal, daysRemaining, dollarRate, realAppUrl]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const isUrlSandbox = (url) => {
    return url.includes('usercontent.goog') || url.includes('blob:') || url.includes('localhost') || !url.startsWith('http');
  };

  const handleCopyLink = () => {
    let urlToCopy = realAppUrl || window.location.href;

    if (isUrlSandbox(urlToCopy) && !realAppUrl) {
      showToast('¡Atención! Estás copiando un enlace temporal de desarrollo que dará 404 en tu iPhone.', 'error');
      setIsInstallGuideOpen(true);
      return;
    }

    try {
      const tempInput = document.createElement('textarea');
      tempInput.value = urlToCopy;
      document.body.appendChild(tempInput);
      tempInput.select();
      const success = document.execCommand('copy');
      document.body.removeChild(tempInput);
      
      if (success) {
        showToast('¡Enlace de acceso copiado!');
      } else {
        throw new Error('Fallback failed');
      }
    } catch (err) {
      showToast('Error al copiar automáticamente. Copialo desde la guía de ajustes.', 'error');
    }
  };

  const totalIncome = incomes.reduce((sum, item) => sum + Number(item.amount), 0);
  
  const totalPersonalExpenses = expenses
    .filter(item => item.type === 'Personal')
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalAutoExpenses = expenses
    .filter(item => item.type === 'Auto')
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalDeudaExpenses = expenses
    .filter(item => item.type === 'Deuda')
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalRecompraExpenses = expenses
    .filter(item => item.type === 'Recompra')
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalAllExpenses = totalPersonalExpenses + totalAutoExpenses + totalDeudaExpenses + totalRecompraExpenses;
  const netBalance = totalIncome - totalAllExpenses;
  
  const pendingToGoal = monthlyGoal - totalIncome;
  const dailyTarget = pendingToGoal > 0 && daysRemaining > 0 ? (pendingToGoal / daysRemaining) : 0;
  
  const totalHours = incomes.reduce((sum, item) => sum + Number(item.hours || 0), 0);
  const avgHourlyRate = totalHours > 0 ? totalIncome / totalHours : 0;

  const handleAddIncome = (e) => {
    e.preventDefault();
    if (!incomeForm.amount || Number(incomeForm.amount) <= 0) {
      showToast('Ingresá un monto válido.', 'error');
      return;
    }

    const newIncome = {
      id: Date.now().toString(),
      date: incomeForm.date,
      app: incomeForm.app,
      amount: Number(incomeForm.amount),
      hours: Number(incomeForm.hours || 0),
      notes: incomeForm.notes
    };

    setIncomes([newIncome, ...incomes]);
    setIncomeForm({
      date: new Date().toISOString().split('T')[0],
      app: 'Uber',
      amount: '',
      hours: '',
      notes: ''
    });
    setShowQuickAdd(null);
    showToast('Ingreso guardado');
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseForm.category || !expenseForm.amount || Number(expenseForm.amount) <= 0) {
      showToast('Completa los campos obligatorios.', 'error');
      return;
    }

    let finalAmount = Number(expenseForm.amount);
    let proratedData = {};

    if (expenseForm.isProrated) {
      const months = Number(expenseForm.periodMonths) || 12;
      finalAmount = Number(expenseForm.originalAmount || expenseForm.amount) / months;
      proratedData = {
        isProrated: true,
        originalAmount: Number(expenseForm.originalAmount || expenseForm.amount),
        periodMonths: months
      };
    }

    const newExpense = {
      id: Date.now().toString(),
      date: expenseForm.date,
      category: expenseForm.category,
      amount: finalAmount,
      type: expenseForm.type,
      ...proratedData
    };

    setExpenses([newExpense, ...expenses]);
    setExpenseForm({
      date: new Date().toISOString().split('T')[0],
      category: '',
      amount: '',
      type: 'Personal',
      isProrated: false,
      originalAmount: '',
      periodMonths: '12'
    });
    setShowQuickAdd(null);
    showToast('Gasto guardado');
  };

  const handleDeleteIncome = (id) => {
    setIncomes(incomes.filter(item => item.id !== id));
    showToast('Ingreso eliminado', 'info');
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(item => item.id !== id));
    showToast('Gasto eliminado', 'info');
  };

  const handleResetData = () => {
    if (window.confirm('¿Querés restaurar los datos iniciales de Mayo?')) {
      setIncomes(INITIAL_INCOMES);
      setExpenses(INITIAL_EXPENSES);
      setMonthlyGoal(1915000);
      setDaysRemaining(10);
      setDollarRate(1200);
      setRealAppUrl('');
      showToast('Datos reiniciados', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-[#090b11] text-slate-100 flex flex-col justify-between select-none overflow-x-hidden pb-24 safe-bottom">
      
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
          <div className={`flex items-center gap-2 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md border ${
            toast.type === 'error' ? 'bg-rose-950/95 border-rose-800 text-rose-200' :
            toast.type === 'info' ? 'bg-sky-950/95 border-sky-800 text-sky-200' :
            'bg-emerald-950/95 border-emerald-800 text-emerald-200'
          }`}>
            {toast.type === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle className="w-5 h-5 shrink-0" />}
            <span className="font-semibold text-xs leading-snug">{toast.message}</span>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-[#090b11]/80 backdrop-blur-xl border-b border-slate-900/60 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                DriverFinanzas
              </h1>
              <p className="text-[10px] text-slate-500">Móvil iPhone 17 Edition</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsInstallGuideOpen(true)}
              className="p-2 text-slate-400 hover:text-sky-400 active:scale-95 transition-transform"
              title="Instalar en Pantalla de Inicio"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsConfigOpen(true)}
              className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 active:scale-95 transition-transform flex items-center gap-1"
            >
              <Sliders className="w-4 h-4" />
              <span className="text-[10px] font-semibold pr-1">Config</span>
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-5 flex-1 max-w-md mx-auto w-full">
        
        {isUrlSandbox(realAppUrl || window.location.href) && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3.5 flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-amber-300">Enlace de Desarrollo Activo</h4>
              <p className="text-[10px] text-slate-400 leading-normal">
                Estás visualizando la app en un entorno de pruebas temporales de Google. Para abrirla en tu iPhone sin errores 404, toca el botón de configuración (arriba) y vinculá tu URL definitiva.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-5">
            
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-900 rounded-3xl p-5 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
              
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Mayo Facturado</span>
                  <span className="text-3xl font-black tracking-tight text-white">
                    ${totalIncome.toLocaleString('es-AR')}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Meta del Mes</span>
                  <span className="text-sm font-bold text-slate-300">${monthlyGoal.toLocaleString('es-AR')}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 transition-all duration-500"
                    style={{ width: `${Math.min(100, (totalIncome / monthlyGoal) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Progreso: {Math.min(100, (totalIncome / monthlyGoal) * 100).toFixed(1)}%</span>
                  <span>Te faltan ${(pendingToGoal > 0 ? pendingToGoal : 0).toLocaleString('es-AR')}</span>
                </div>
              </div>

              {pendingToGoal > 0 ? (
                <div className="bg-[#0b1c15] border border-emerald-950 rounded-2xl p-4 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-400/80 block uppercase tracking-wider font-bold">Meta Diaria (Lunes a Viernes)</span>
                    <span className="text-2xl font-black text-emerald-400">
                      ${Math.ceil(dailyTarget).toLocaleString('es-AR')}
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">En base a {daysRemaining} días hábiles restantes.</span>
                  </div>
                  <div className="bg-emerald-500/15 p-2 rounded-xl text-emerald-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
              ) : (
                <div className="bg-amber-950/40 border border-amber-900/30 rounded-2xl p-4 mt-4 text-center">
                  <span className="text-xs text-amber-400 font-bold block">¡Meta mensual batida con éxito! 🏆</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Todo el remanente de estos 10 días es ganancia neta.</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              
              <div className="bg-slate-900/60 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between h-24">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Saldo de Caja</span>
                <div>
                  <span className={`text-lg font-bold block ${netBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    ${netBalance.toLocaleString('es-AR')}
                  </span>
                  <span className="text-[9px] text-slate-500">Mano - Desgastes</span>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between h-24">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Costo Hora Promedio</span>
                <div>
                  <span className="text-lg font-bold text-sky-400 block">
                    ${Math.round(avgHourlyRate).toLocaleString('es-AR')}/h
                  </span>
                  <span className="text-[9px] text-slate-500">Total {totalHours} hs volante</span>
                </div>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setShowQuickAdd('income')}
                className="py-3 px-4 bg-emerald-500 text-[#090b11] rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <Plus className="w-4 h-4" />
                Sumar Recaudación
              </button>
              <button 
                onClick={() => setShowQuickAdd('expense')}
                className="py-3 px-4 bg-slate-900 border border-slate-800 text-rose-400 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <Plus className="w-4 h-4" />
                Registrar Gasto
              </button>
            </div>

            <div className="bg-slate-900/40 border border-slate-900/80 rounded-3xl p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Distribución de Egresos</h3>
              
              <div className="space-y-3">
                {[
                  { name: 'Gastos de Vida', amount: totalPersonalExpenses, color: 'bg-emerald-400', pct: totalAllExpenses > 0 ? (totalPersonalExpenses / totalAllExpenses) * 100 : 0 },
                  { name: 'Gastos Auto', amount: totalAutoExpenses, color: 'bg-blue-400', pct: totalAllExpenses > 0 ? (totalAutoExpenses / totalAllExpenses) * 100 : 0 },
                  { name: 'Cuota Deuda Familiar', amount: totalDeudaExpenses, color: 'bg-rose-400', pct: totalAllExpenses > 0 ? (totalDeudaExpenses / totalAllExpenses) * 100 : 0 },
                  { name: 'Fondo Recambio Auto', amount: totalRecompraExpenses, color: 'bg-pink-400', pct: totalAllExpenses > 0 ? (totalRecompraExpenses / totalAllExpenses) * 100 : 0 }
                ].map(cat => (
                  <div key={cat.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium text-[11px]">{cat.name}</span>
                      <span className="text-slate-400 text-[11px] font-semibold">
                        ${cat.amount.toLocaleString('es-AR')} ({cat.pct.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/20 border border-slate-900 rounded-2xl p-4 flex gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400 leading-relaxed">
                <strong>Consejo del Asesor:</strong> Llevás gastado <strong>${totalPersonalExpenses.toLocaleString('es-AR')}</strong> de vida este mes. Al moderar el gasto de "salidas y comida fuera", bajás tu punto de equilibrio diario y podés terminar tus días de trabajo mucho más temprano.
              </p>
            </div>

          </div>
        )}

        {activeTab === 'incomes' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-slate-100">Registros de Ingreso</h2>
              <span className="text-xs text-slate-500">Mayo 2026</span>
            </div>

            <div className="space-y-2.5">
              {incomes.length === 0 ? (
                <div className="p-8 text-center text-slate-500 bg-slate-900/20 rounded-2xl border border-slate-900">
                  Sin registros de facturación aún.
                </div>
              ) : (
                incomes.map(item => (
                  <div key={item.id} className="bg-slate-900/50 border border-slate-900 rounded-2xl p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        item.app === 'Uber' ? 'bg-sky-400' :
                        item.app === 'Cabify' ? 'bg-indigo-400' :
                        item.app === 'DiDi' ? 'bg-orange-400' : 'bg-teal-400'
                      }`} />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-slate-200">{item.app}</span>
                          <span className="text-[9px] text-slate-500">• {item.date}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{item.notes || 'Sin notas'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <span className="text-xs font-black text-emerald-400">${item.amount.toLocaleString('es-AR')}</span>
                        <span className="text-[9px] text-slate-500 block">{item.hours ? `${item.hours} hs` : ''}</span>
                      </div>
                      <button 
                        onClick={() => handleDeleteIncome(item.id)}
                        className="p-1.5 text-slate-600 active:text-rose-400 active:scale-90 transition-transform"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-slate-100">Registros de Gastos</h2>
              <span className="text-xs text-slate-500">Fijos & Prorrateados</span>
            </div>

            <div className="space-y-2.5">
              {expenses.length === 0 ? (
                <div className="p-8 text-center text-slate-500 bg-slate-900/20 rounded-2xl border border-slate-900">
                  Sin gastos registrados este mes.
                </div>
              ) : (
                expenses.map(item => (
                  <div key={item.id} className="bg-slate-900/50 border border-slate-900 rounded-2xl p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        item.type === 'Personal' ? 'bg-emerald-400' :
                        item.type === 'Auto' ? 'bg-blue-400' :
                        item.type === 'Deuda' ? 'bg-rose-400' : 'bg-pink-400'
                      }`} />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-slate-200">{item.category}</span>
                          <span className="text-[9px] text-slate-500">• {item.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[8px] bg-slate-950 px-1.5 py-0.5 rounded text-slate-400 uppercase font-bold">
                            {item.type}
                          </span>
                          {item.isProrated && (
                            <span className="text-[8px] bg-sky-950 text-sky-300 px-1.5 py-0.5 rounded border border-sky-900/60 font-semibold">
                              Prorrateado {item.periodMonths}m
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-rose-400">${item.amount.toLocaleString('es-AR')}</span>
                      <button 
                        onClick={() => handleDeleteExpense(item.id)}
                        className="p-1.5 text-slate-600 active:text-rose-400 active:scale-90 transition-transform"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'plan' && (
          <div className="space-y-5">
            
            <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-slate-200">Deuda Familiar Pasiva</h3>
                  <p className="text-[10px] text-slate-500">Familiar directo ($5.000.000 total)</p>
                </div>
                <span className="text-[9px] font-black uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-1 rounded-full">
                  Mes 1 de 10
                </span>
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>Devuelto: $500.000 (10%)</span>
                  <span>Restante: $4.500.000</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>

              <div className="bg-slate-950/50 border border-slate-900 rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-slate-500 block">Cuota Mensual (Mayo):</span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                    <CheckCircle className="w-4 h-4" /> CUOTA DE MAYO PAGADA
                  </span>
                </div>
                <span className="text-base font-black text-slate-400">$500.000</span>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-5 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-200">Plan de Recompra (Auto Nuevo)</h3>
                <p className="text-[10px] text-slate-500">Cruce de recambio fijado a los 250.000 km</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950/50 border border-slate-900 rounded-2xl p-3">
                  <span className="text-[9px] text-slate-500 block">Venta actual (250k km):</span>
                  <span className="text-sm font-bold text-slate-300">U$S 6.500</span>
                </div>
                <div className="bg-slate-950/50 border border-slate-900 rounded-2xl p-3">
                  <span className="text-[9px] text-slate-500 block">Brecha a Ahorrar:</span>
                  <span className="text-sm font-bold text-emerald-400">U$S 9.500</span>
                </div>
              </div>

              <div className="bg-pink-500/5 border border-pink-500/10 rounded-2xl p-3.5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400 block">Meta de Ahorro Mayo</span>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Para no descapitalizarte en 42 meses, separá hoy mismo <strong>U$S 226</strong> (aprox. <strong>${(226 * dollarRate).toLocaleString('es-AR')}</strong> al cambio de ${dollarRate}).
                </p>
                <div className="flex justify-between items-center text-[10px] bg-slate-950/60 p-2 rounded-lg">
                  <span className="text-slate-400">Progreso Ahorro Auto:</span>
                  <span className="font-bold text-pink-400">
                    U$S {Math.round(totalRecompraExpenses / dollarRate)} / U$S 226
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {isConfigOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center">
          <div className="bg-slate-950 border-t border-slate-900 rounded-t-[32px] w-full max-w-md p-6 space-y-5 animate-slide-up shadow-2xl safe-bottom max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-black text-slate-200">Ajustes Financieros</h3>
              </div>
              <button 
                onClick={() => setIsConfigOpen(false)}
                className="p-1 bg-slate-900 border border-slate-800 rounded-full text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 block mb-1">Monto Objetivo de Facturación (ARS)</label>
                <input 
                  type="number" 
                  value={monthlyGoal} 
                  onChange={(e) => setMonthlyGoal(Math.max(1, Number(e.target.value)))}
                  className="bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 w-full text-sm font-bold text-slate-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500 block mb-1">Días Hábiles</label>
                  <input 
                    type="number" 
                    value={daysRemaining} 
                    onChange={(e) => setDaysRemaining(Math.max(0, Number(e.target.value)))}
                    className="bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 w-full text-sm font-bold text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-1">Cotización Dólar</label>
                  <input 
                    type="number" 
                    value={dollarRate} 
                    onChange={(e) => setDollarRate(Math.max(1, Number(e.target.value)))}
                    className="bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 w-full text-sm font-bold text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-900 space-y-2">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-sky-400" />
                  Sincronizar con tu iPhone
                </span>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Pegá acá abajo el link de la barra de direcciones de tu navegador de PC (o el del mail/WhatsApp) para que la app genere un link limpio de acceso.
                </p>
                <input 
                  type="text" 
                  placeholder="https://github.com/... (Pegar link real)"
                  value={realAppUrl} 
                  onChange={(e) => setRealAppUrl(e.target.value)}
                  className="bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-xl px-3 py-2 w-full text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button 
                  onClick={handleCopyLink}
                  className="w-full py-2.5 bg-slate-900 border border-slate-800 hover:border-emerald-500/45 text-slate-200 hover:text-emerald-400 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Copy className="w-4 h-4" />
                  Copiar Enlace Guardado
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => {
                  setIsConfigOpen(false);
                  showToast('Ajustes y Sincronización guardados correctamente.');
                }}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-2xl active:scale-95 transition-transform"
              >
                Guardar Ajustes
              </button>
            </div>
          </div>
        </div>
      )}

      {showQuickAdd && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end justify-center">
          <div className="bg-slate-950 border-t border-slate-900 rounded-t-[32px] w-full max-w-md p-6 space-y-5 shadow-2xl safe-bottom">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-slate-200">
                {showQuickAdd === 'income' ? 'Registrar Viaje / Día de Trabajo' : 'Registrar Gasto de Caja'}
              </h3>
              <button 
                onClick={() => setShowQuickAdd(null)}
                className="p-1 bg-slate-900 border border-slate-800 rounded-full text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {showQuickAdd === 'income' ? (
              <form onSubmit={handleAddIncome} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Fecha</label>
                    <input 
                      type="date"
                      value={incomeForm.date}
                      onChange={(e) => setIncomeForm({ ...incomeForm, date: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs w-full text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Plataforma</label>
                    <select
                      value={incomeForm.app}
                      onChange={(e) => setIncomeForm({ ...incomeForm, app: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs w-full text-slate-200 focus:outline-none"
                    >
                      <option value="Uber">Uber</option>
                      <option value="Cabify">Cabify</option>
                      <option value="DiDi">DiDi</option>
                      <option value="Particular">Particular</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Monto de Recaudación ($)</label>
                    <input 
                      type="number"
                      placeholder="Ej: 85000"
                      value={incomeForm.amount}
                      onChange={(e) => setIncomeForm({ ...incomeForm, amount: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs w-full text-emerald-400 font-bold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Horas Trabajadas</label>
                    <input 
                      type="number"
                      placeholder="Ej: 6"
                      value={incomeForm.hours}
                      onChange={(e) => setIncomeForm({ ...incomeForm, hours: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs w-full text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">Comentarios</label>
                  <input 
                    type="text"
                    placeholder="Ej: Jornada del lunes con dinámicas altas..."
                    value={incomeForm.notes}
                    onChange={(e) => setIncomeForm({ ...incomeForm, notes: e.target.value })}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs w-full text-slate-300 focus:outline-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-2xl active:scale-95 transition-transform mt-2"
                >
                  Registrar Entrada
                </button>
              </form>
            ) : (
              <form onSubmit={handleAddExpense} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Fecha</label>
                    <input 
                      type="date"
                      value={expenseForm.date}
                      onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs w-full text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Tipo de Gasto</label>
                    <select
                      value={expenseForm.type}
                      onChange={(e) => setExpenseForm({ ...expenseForm, type: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs w-full text-slate-200 focus:outline-none"
                    >
                      <option value="Personal">Personal (Vida)</option>
                      <option value="Auto">Auto (Operativo)</option>
                      <option value="Deuda">Compromiso / Deuda</option>
                      <option value="Recompra">Reserva Recompra Auto</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Categoría / Ítem</label>
                    <input 
                      type="text"
                      placeholder="Ej: Supermercado"
                      value={expenseForm.category}
                      onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs w-full text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Monto ($ ARS)</label>
                    <input 
                      type="number"
                      placeholder="Monto total"
                      value={expenseForm.amount}
                      onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs w-full text-rose-400 font-bold focus:outline-none"
                    />
                  </div>
                </div>

                {expenseForm.type === 'Auto' && (
                  <div className="bg-slate-900 border border-slate-850 p-3 rounded-xl space-y-2">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox"
                        id="isProratedMobile"
                        checked={expenseForm.isProrated}
                        onChange={(e) => setExpenseForm({ ...expenseForm, isProrated: e.target.checked })}
                        className="rounded border-slate-800 text-emerald-500"
                      />
                      <label htmlFor="isProratedMobile" className="text-[11px] text-slate-300 font-semibold">
                        ¿Prorratear este gasto de auto?
                      </label>
                    </div>
                    {expenseForm.isProrated && (
                      <div className="flex items-center justify-between gap-2 text-[10px]">
                        <span className="text-slate-400">Prorratear en:</span>
                        <select
                          value={expenseForm.periodMonths}
                          onChange={(e) => setExpenseForm({ ...expenseForm, periodMonths: e.target.value })}
                          className="bg-slate-950 border border-slate-800 rounded p-1 text-slate-300"
                        >
                          <option value="3">3 meses (Ej: Service)</option>
                          <option value="12">12 meses (Ej: VTV / GNC)</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full py-3 bg-rose-500 text-slate-950 font-black text-xs rounded-2xl active:scale-95 transition-transform mt-2"
                >
                  Registrar Salida
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {isInstallGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center">
          <div className="bg-[#0e111a] border-t border-slate-900 rounded-t-[32px] w-full max-w-md p-6 space-y-5 shadow-2xl safe-bottom text-center max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-black text-slate-200">Sincronización con tu iPhone</h3>
              <button 
                onClick={() => setIsInstallGuideOpen(false)}
                className="p-1 bg-slate-900 border border-slate-800 rounded-full text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-left space-y-1.5">
              <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                ¿Te saltó error 404 o WebKitBlobResource?
              </span>
              <p className="text-[10px] text-slate-400 leading-normal">
                Es totalmente normal. El link interno de pruebas de Google que genera el lienzo interactivo es temporal y expira. 
              </p>
            </div>

            <div className="space-y-4 text-left text-xs text-slate-300 leading-relaxed">
              <p className="font-bold text-slate-200">Cómo solucionarlo en 2 simples pasos:</p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-slate-900/50 p-3 rounded-2xl border border-slate-900">
                  <div className="bg-sky-500/10 p-2 rounded-xl text-sky-400 font-bold shrink-0">1</div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-200">Copia la URL real</p>
                    <p className="text-[10px] text-slate-400">
                      Entrá a los Ajustes de la app (Botón "Config" arriba a la derecha), pegá el enlace completo que ves en la barra de direcciones de tu computadora y guardalo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#0c181f] p-3 rounded-2xl border border-sky-950/60">
                  <div className="bg-sky-500/10 p-2 rounded-xl text-sky-400 font-bold shrink-0 flex items-center justify-center">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-sky-300">Escaneá con tu Cámara</p>
                    <p className="text-[10px] text-slate-400">
                      Una vez que pegues la URL real, te va a aparecer un código QR interactivo acá. Apuntá con la cámara de tu iPhone 17 y abrí el link real de Safari sin errores.
                    </p>
                  </div>
                </div>
              </div>

              {realAppUrl && !isUrlSandbox(realAppUrl) ? (
                <div className="bg-white p-4 rounded-2xl w-44 h-44 mx-auto flex items-center justify-center shadow-lg border-2 border-slate-900 mt-4">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(realAppUrl)}`} 
                    alt="Código QR de Acceso Seguro"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center space-y-2 mt-4">
                  <p className="text-[10px] text-slate-400">
                    Pegá tu dirección en ajustes para generar tu código QR de escaneo rápido.
                  </p>
                </div>
              )}

              <div className="pt-2">
                <button 
                  onClick={handleCopyLink}
                  className="w-full py-3 bg-emerald-500 text-slate-950 font-black text-xs rounded-2xl flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <Copy className="w-4 h-4" />
                  Copiar Enlace Configurado
                </button>
              </div>
            </div>

            <button 
              onClick={() => setIsInstallGuideOpen(false)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 font-black text-xs rounded-2xl active:scale-95 transition-transform"
            >
              Cerrar Guía
            </button>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#090b11]/90 backdrop-blur-xl border-t border-slate-950 px-4 py-2.5 flex justify-around items-center max-w-md mx-auto rounded-t-2xl shadow-2xl safe-bottom">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'dashboard' ? 'text-emerald-400 scale-105' : 'text-slate-500'}`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-[9px] font-bold">Dashboard</span>
        </button>

        <button 
          onClick={() => setActiveTab('incomes')}
          className={`flex flex-col items-center gap-1 transition-all relative ${activeTab === 'incomes' ? 'text-emerald-400 scale-105' : 'text-slate-500'}`}
        >
          <DollarSign className="w-5 h-5" />
          <span className="text-[9px] font-bold">Ingresos</span>
          {incomes.length > 0 && (
            <span className="absolute -top-1 -right-1.5 bg-emerald-500 text-[#090b11] font-black text-[8px] h-3.5 w-3.5 rounded-full flex items-center justify-center border border-[#090b11]">
              {incomes.length}
            </span>
          )}
        </button>

        <button 
          onClick={() => setActiveTab('expenses')}
          className={`flex flex-col items-center gap-1 transition-all relative ${activeTab === 'expenses' ? 'text-emerald-400 scale-105' : 'text-slate-500'}`}
        >
          <TrendingDown className="w-5 h-5" />
          <span className="text-[9px] font-bold">Gastos</span>
          {expenses.length > 0 && (
            <span className="absolute -top-1 -right-1.5 bg-rose-500 text-white font-black text-[8px] h-3.5 w-3.5 rounded-full flex items-center justify-center border border-[#090b11]">
              {expenses.length}
            </span>
          )}
        </button>

        <button 
          onClick={() => setActiveTab('plan')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'plan' ? 'text-emerald-400 scale-105' : 'text-slate-500'}`}
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[9px] font-bold">Deuda & Auto</span>
        </button>
      </nav>

    </div>
  );
}
