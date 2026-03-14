import { useState, useEffect } from 'react';
import { getAllIdeas, createIdea, updateIdea, deleteIdea } from '../services/api';

const empty = { title: '', description: '', category: '' };

export default function Admin() {
  const [ideas, setIdeas] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchIdeas(); }, []);

  const fetchIdeas = async () => {
    try {
      const res = await getAllIdeas();
      setIdeas(res.data);
    } catch (e) { console.error(e); }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.title.trim()) return;
    setLoading(true);
    try {
      if (editingId) {
        await updateIdea(editingId, form);
        showToast('Idea updated ✓');
      } else {
        await createIdea(form);
        showToast('Idea created ✓');
      }
      setForm(empty);
      setEditingId(null);
      fetchIdeas();
    } catch (e) {
      showToast('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (idea) => {
    setEditingId(idea.id);
    setForm({ title: idea.title, description: idea.description || '', category: idea.category || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this idea?')) return;
    try {
      await deleteIdea(id);
      showToast('Idea deleted');
      fetchIdeas();
    } catch (e) { showToast('Delete failed'); }
  };

  const handleCancel = () => { setForm(empty); setEditingId(null); };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title"><em>Admin</em> panel</h1>
        <p className="page-subtitle">Create, edit, and delete ideas.</p>
      </div>

      <div className="admin-layout">
        {/* Form */}
        <div className="form-card">
          <h2>{editingId ? 'Edit Idea' : 'New Idea'}</h2>

          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              className="form-input"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter idea title"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the idea..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <input
              className="form-input"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g. Technology, Education..."
            />
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? '...' : editingId ? 'Update Idea' : 'Create Idea'}
            </button>
            {editingId && (
              <button className="btn btn-dark" onClick={handleCancel}>Cancel</button>
            )}
          </div>
        </div>

        {/* Table */}
        <div>
          <div className="section-label">{ideas.length} ideas in database</div>
          {ideas.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <h3>No ideas yet</h3>
              <p>Create your first idea using the form.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ideas.map(idea => (
                  <tr key={idea.id}>
                    <td style={{ fontWeight: 500 }}>{idea.title}</td>
                    <td>
                      {idea.category
                        ? <span className="idea-category-tag">{idea.category}</span>
                        : <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>—</span>
                      }
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button className="btn btn-sm btn-dark" onClick={() => handleEdit(idea)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(idea.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
