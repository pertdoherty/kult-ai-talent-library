import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Home } from './components/Home.tsx';
import { Catalog } from './components/Catalog.tsx';
import { TalentDetail } from './components/TalentDetail.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { TalentForm } from './components/TalentForm.tsx';
import { Login } from './components/Login.tsx';
import { talents as initialTalents } from './data.ts';
import { Talent } from './types.ts';

type ViewState = 'home' | 'catalog' | 'detail' | 'admin' | 'form' | 'login';
type Role = 'user' | 'admin';

export default function App() {
  const [talents, setTalents] = useState<Talent[]>(initialTalents);
  const [role, setRole] = useState<Role>('user');
  const [view, setView] = useState<ViewState>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [selectedTalentId, setSelectedTalentId] = useState<string | null>(null);
  const [editingTalent, setEditingTalent] = useState<Talent | null>(null);

  const navigateToHome = () => {
    setSelectedTalentId(null);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCatalog = () => {
    setView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLibraryClick = () => {
    if (view !== 'home') {
      setView('home');
      // Wait for render then scroll
      setTimeout(() => {
        document.getElementById('talent-overview')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('talent-overview')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToAdmin = () => {
    if (!isAuthenticated) {
      setView('login');
    } else {
      setView('admin');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleSelect = (selectedRole: Role) => {
    if (selectedRole === 'user') {
      setRole('user');
      navigateToHome();
    } else if (selectedRole === 'admin') {
      if (!isAuthenticated) {
        setView('login');
      } else {
        setRole('admin');
        navigateToAdmin();
      }
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setRole('admin');
    setView('admin');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole('user');
    navigateToHome();
  };

  const handleSelectTalent = (id: string) => {
    setSelectedTalentId(id);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddTalentClick = () => {
    setEditingTalent(null);
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditTalentClick = (talent: Talent) => {
    setEditingTalent(talent);
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteTalent = (id: string) => {
    setTalents(prev => prev.filter(t => t.id !== id));
  };

  const handleSaveTalent = (savedTalent: Talent) => {
    setTalents(prev => {
      const exists = prev.find(t => t.id === savedTalent.id);
      if (exists) {
        return prev.map(t => t.id === savedTalent.id ? savedTalent : t);
      } else {
        return [...prev, savedTalent];
      }
    });
    
    // If we were editing a specific talent from the detail view, go back to detail view
    if (selectedTalentId === savedTalent.id) {
      setView('detail');
    } else {
      navigateToAdmin();
    }
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return <Home onSelectTalent={handleSelectTalent} talents={talents} onSeeMore={navigateToCatalog} />;
      case 'catalog':
        return <Catalog onSelectTalent={handleSelectTalent} talents={talents} onBack={navigateToHome} />;
      case 'detail': {
        const selectedTalent = talents.find(t => t.id === selectedTalentId);
        if (!selectedTalent) return <Home onSelectTalent={handleSelectTalent} talents={talents} onSeeMore={navigateToCatalog} />;
        return (
          <TalentDetail 
            talent={selectedTalent} 
            onBack={navigateToHome} 
            isAdmin={role === 'admin' && isAuthenticated}
            onEdit={() => handleEditTalentClick(selectedTalent)}
          />
        );
      }
      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} onCancel={navigateToHome} />;
      case 'admin':
        if (!isAuthenticated) return <Login onLoginSuccess={handleLoginSuccess} onCancel={navigateToHome} />;
        return (
          <AdminDashboard 
            talents={talents} 
            onAddTalent={handleAddTalentClick}
            onEditTalent={handleEditTalentClick}
            onDeleteTalent={handleDeleteTalent}
          />
        );
      case 'form':
        if (!isAuthenticated) return <Login onLoginSuccess={handleLoginSuccess} onCancel={navigateToHome} />;
        return (
          <TalentForm 
            initialData={editingTalent}
            onSave={handleSaveTalent}
            onCancel={() => {
              if (selectedTalentId) {
                setView('detail');
              } else {
                navigateToAdmin();
              }
            }}
          />
        );
      default:
        return <Home onSelectTalent={handleSelectTalent} talents={talents} onSeeMore={navigateToCatalog} />;
    }
  };

  return (
    <div className="min-h-screen bg-kult-black text-white font-sans selection:bg-cyan-500/30">
      <Header 
        onLogoClick={navigateToHome} 
        onLibraryClick={handleLibraryClick}
        role={role}
        isAuthenticated={isAuthenticated}
        onRoleSelect={handleRoleSelect}
        onAdminClick={navigateToAdmin}
        onLogout={handleLogout}
      />
      <main>
        {renderView()}
      </main>
    </div>
  );
}
