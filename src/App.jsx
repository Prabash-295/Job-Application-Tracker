import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import ApplicationList from './components/ApplicationList';
import ApplicationForm from './components/ApplicationForm';
import ConfirmModal from './components/ConfirmModal';
import { STORAGE_KEY, demoApplications } from './data/demoApplications';

function loadStoredApplications() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return demoApplications;

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : demoApplications;
  } catch (error) {
    console.warn('Could not read saved applications. Using demo data instead.', error);
    return demoApplications;
  }
}

function App() {
  const [applications, setApplications] = useState(loadStoredApplications);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [applicationToDelete, setApplicationToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  const openAddForm = () => {
    setEditingApplication(null);
    setIsFormOpen(true);
  };

  const openEditForm = (application) => {
    setEditingApplication(application);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingApplication(null);
  };

  const handleSaveApplication = (formData) => {
    setApplications((prevApplications) => {
      const isEditing = prevApplications.some((app) => app.id === formData.id);

      if (isEditing) {
        return prevApplications.map((app) => (app.id === formData.id ? formData : app));
      }

      return [...prevApplications, { ...formData, id: crypto.randomUUID() }];
    });
    closeForm();
  };

  const handleConfirmDelete = () => {
    setApplications((prevApplications) =>
      prevApplications.filter((app) => app.id !== applicationToDelete.id)
    );
    setApplicationToDelete(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
  };

  const safeSearchTerm = searchTerm.trim().toLowerCase();
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(safeSearchTerm) ||
      app.role.toLowerCase().includes(safeSearchTerm);
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="app">
      <Navbar />

      <main className="container">
        <Dashboard applications={applications} />

        <div className="toolbar">
          <div className="toolbar__controls">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <FilterBar statusFilter={statusFilter} onStatusChange={setStatusFilter} />
          </div>
          <button className="btn btn--primary" type="button" onClick={openAddForm}>
            + Add Application
          </button>
        </div>

        <ApplicationList
          applications={filteredApplications}
          totalApplications={applications.length}
          onEdit={openEditForm}
          onDelete={setApplicationToDelete}
          onAdd={openAddForm}
          onClearFilters={clearFilters}
        />
      </main>

      <footer className="footer">
        Job Application Tracker &middot; Built with React
      </footer>

      {isFormOpen && (
        <ApplicationForm
          application={editingApplication}
          onSubmit={handleSaveApplication}
          onClose={closeForm}
        />
      )}

      {applicationToDelete && (
        <ConfirmModal
          title="Delete Application?"
          message={`Are you sure you want to delete your application to ${applicationToDelete.company}? This cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setApplicationToDelete(null)}
        />
      )}
    </div>
  );
}

export default App;