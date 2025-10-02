import React, { useState } from 'react';
import { Home, Users, FileText, Clock, Briefcase, Settings, Plus, Edit, Trash2, Download, X, LogOut, Building2, Upload } from 'lucide-react';

export default function CabosBusinessManagement() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: 'admin', password: 'universal2024' });
  const [businessInfo, setBusinessInfo] = useState({ 
    name: 'BizHome', 
    tagline: 'Building visions, shaping the future', 
    email: 'info@caboshandyman.com', 
    phone: '+52 624 123 4567', 
    address: 'Cabo San Lucas, Baja California Sur, Mexico', 
    invoiceNotes: 'Thank you for your business!'
  });
  const [currentView, setCurrentView] = useState('dashboard');
  const [clients, setClients] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', phone: '624-123-4567', address: '123 Marina Blvd, Cabo San Lucas' }
  ]);
  const [invoices, setInvoices] = useState([
    { id: 1, clientId: 1, clientName: 'John Smith', amount: 2500, status: 'Paid', date: '2024-09-15', items: [{ name: 'Kitchen Remodel', quantity: 1, price: 2500 }], type: 'invoice' }
  ]);
  const [timesheets, setTimesheets] = useState([
    { id: 1, employee: 'Carlos Martinez', date: '2024-10-01', hours: 8, project: 'Kitchen Remodel', workOrderNumber: 'WO-001', notes: 'Completed' }
  ]);
  const [pending, setPending] = useState([
    { id: 1, clientId: 1, clientName: 'John Smith', items: [{ name: 'Cabinet Install', price: 1500 }] }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  const openModal = (type, item) => {
    setModalType(type);
    setEditingItem(item || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setEditingItem(null);
  };

  const generateQuotePDF = (formData, client, total) => {
    const doc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Quote - ${businessInfo.name}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #14b8a6; padding-bottom: 20px; }
    .header h1 { color: #14b8a6; margin: 0; font-size: 32px; }
    .header p { color: #6b7280; margin: 5px 0; }
    .info { display: flex; justify-content: space-between; margin: 30px 0; }
    .info-section { width: 45%; }
    .info-section h3 { color: #374151; margin-top: 0; border-bottom: 2px solid #14b8a6; padding-bottom: 5px; }
    table { width: 100%; border-collapse: collapse; margin: 30px 0; }
    th { background-color: #14b8a6; color: white; padding: 12px; text-align: left; font-weight: 600; }
    td { padding: 12px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
    tr:hover { background-color: #f9fafb; }
    .description { white-space: pre-wrap; max-width: 400px; line-height: 1.5; }
    .total-section { margin-top: 30px; text-align: right; }
    .total { font-size: 24px; font-weight: bold; color: #374151; }
    .total-amount { color: #14b8a6; font-size: 28px; }
    .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${businessInfo.name}</h1>
    <p style="font-style: italic; font-size: 18px;">${businessInfo.tagline}</p>
    <p>${businessInfo.email} | ${businessInfo.phone}</p>
  </div>
  <div class="info">
    <div class="info-section">
      <h3>Quote For:</h3>
      <p><strong style="font-size: 16px;">${client.name}</strong><br>${client.email}<br>${client.phone}<br>${client.address}</p>
    </div>
    <div class="info-section">
      <h3>Quote Details:</h3>
      <p><strong>Quote Date:</strong> ${new Date(formData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}<br>
      <strong>Valid Until:</strong> ${new Date(new Date(formData.date).getTime() + 30*24*60*60*1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}<br>
      <strong>Quote #:</strong> QTE-${Date.now()}</p>
    </div>
  </div>
  <table>
    <thead>
      <tr>
        <th style="width: 50%;">Description</th>
        <th style="width: 15%; text-align: center;">Quantity</th>
        <th style="width: 17%; text-align: right;">Unit Price</th>
        <th style="width: 18%; text-align: right;">Total</th>
      </tr>
    </thead>
    <tbody>
      ${formData.items.map(item => `
        <tr>
          <td class="description">${item.name}</td>
          <td style="text-align: center;">${item.quantity}</td>
          <td style="text-align: right;">$${parseFloat(item.price).toFixed(2)}</td>
          <td style="text-align: right; font-weight: 600;">$${(item.quantity * item.price).toFixed(2)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  <div class="total-section">
    <div class="total">Total: <span class="total-amount">$${total.toFixed(2)}</span></div>
  </div>
  <div class="footer">
    <p style="margin-bottom: 10px;"><strong>${businessInfo.invoiceNotes}</strong></p>
    <p>${businessInfo.address}</p>
    <p style="margin-top: 15px; font-size: 12px;">This quote is valid for 10 days from the date above.</p>
  </div>
</body>
</html>`;
    
    const blob = new Blob([doc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Quote-${client.name.replace(/\s+/g, '-')}-${formData.date}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
      e.preventDefault();
      if (username === adminCredentials.username && password === adminCredentials.password) {
        setIsAuthenticated(true);
      } else {
        setError('Invalid credentials');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-3xl">BH</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">BIZHOME</h1>
            <p className="text-gray-600">Business Management</p>
          </div>
          <div className="space-y-6">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg" required />
            </div>
            <button onClick={handleLogin} className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition-colors">Sign In</button>
            <div className="text-center text-sm text-gray-500">Demo: admin / universal2024</div>
          </div>
        </div>
      </div>
    );
  };

  const Navigation = () => (
    <div className="w-64 bg-slate-800 text-white min-h-screen p-4 flex flex-col">
      <div className="flex items-center space-x-2 mb-8">
        <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
          <span className="font-bold text-xl">BH</span>
        </div>
        <span className="text-xl font-bold">BIZHOME</span>
      </div>
      <nav className="space-y-2 flex-1">
        {[
          { view: 'dashboard', icon: Home, label: 'Dashboard' },
          { view: 'clients', icon: Users, label: 'Clients' },
          { view: 'invoices', icon: FileText, label: 'Invoices' },
          { view: 'timesheets', icon: Clock, label: 'Timesheets' },
          { view: 'pending', icon: Briefcase, label: 'Pending' },
          { view: 'settings', icon: Settings, label: 'Settings' },
          { view: 'admin', icon: Building2, label: 'Admin' }
        ].map(item => {
          const Icon = item.icon;
          return (
            <button key={item.view} onClick={() => setCurrentView(item.view)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${currentView === item.view ? 'bg-teal-600' : 'hover:bg-slate-700'}`}>
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors">
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );

  const Dashboard = () => (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-500 text-white rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold opacity-90 mb-2">Clients</h3>
          <p className="text-3xl font-bold">{clients.length}</p>
        </div>
        <div className="bg-yellow-500 text-white rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold opacity-90 mb-2">Active Invoices</h3>
          <p className="text-3xl font-bold">{invoices.filter(i => i.status !== 'Paid').length}</p>
        </div>
        <div className="bg-green-500 text-white rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold opacity-90 mb-2">Revenue</h3>
          <p className="text-3xl font-bold">${invoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}</p>
        </div>
        <div className="bg-purple-500 text-white rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold opacity-90 mb-2">Pending Work Orders</h3>
          <p className="text-3xl font-bold">{pending.length}</p>
        </div>
      </div>
    </div>
  );

  const AdminSettingsView = () => {
    const [editableInfo, setEditableInfo] = useState(businessInfo);
    const [editableCredentials, setEditableCredentials] = useState(adminCredentials);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
      setBusinessInfo(editableInfo);
      setAdminCredentials(editableCredentials);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    };

    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Settings</h1>
        {saved && <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">Settings saved successfully!</div>}
        <div className="max-w-4xl space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Business Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" value={editableInfo.name} onChange={(e) => setEditableInfo({...editableInfo, name: e.target.value})} className="border rounded-lg px-3 py-2" placeholder="Business Name" />
              <input type="text" value={editableInfo.tagline} onChange={(e) => setEditableInfo({...editableInfo, tagline: e.target.value})} className="border rounded-lg px-3 py-2" placeholder="Tagline" />
              <input type="email" value={editableInfo.email} onChange={(e) => setEditableInfo({...editableInfo, email: e.target.value})} className="border rounded-lg px-3 py-2" placeholder="Email" />
              <input type="tel" value={editableInfo.phone} onChange={(e) => setEditableInfo({...editableInfo, phone: e.target.value})} className="border rounded-lg px-3 py-2" placeholder="Phone" />
              <input type="text" value={editableInfo.address} onChange={(e) => setEditableInfo({...editableInfo, address: e.target.value})} className="col-span-2 border rounded-lg px-3 py-2" placeholder="Address" />
              <textarea value={editableInfo.invoiceNotes} onChange={(e) => setEditableInfo({...editableInfo, invoiceNotes: e.target.value})} className="col-span-2 border rounded-lg px-3 py-2" placeholder="Invoice Notes" rows="2" />
            </div>
            <button onClick={handleSave} className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors">Save Business Info</button>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Login Credentials</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input type="text" value={editableCredentials.username} onChange={(e) => setEditableCredentials({...editableCredentials, username: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input type="password" value={editableCredentials.password} onChange={(e) => setEditableCredentials({...editableCredentials, password: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              </div>
            </div>
            <button onClick={handleSave} className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors">Update Credentials</button>
          </div>
        </div>
      </div>
    );
  };

  const ClientsView = () => (
    <div className="p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Clients</h1>
        <button onClick={() => openModal('client', null)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus size={20} />
          <span>New Client</span>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {clients.map(client => (
              <tr key={client.id}>
                <td className="px-6 py-4">{client.name}</td>
                <td className="px-6 py-4">{client.email}</td>
                <td className="px-6 py-4">{client.phone}</td>
                <td className="px-6 py-4">
                  <button onClick={() => openModal('client', client)} className="text-blue-600 hover:text-blue-800 mr-3"><Edit size={18} /></button>
                  <button onClick={() => setClients(clients.filter(c => c.id !== client.id))} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const InvoicesView = () => {
    const toggleStatus = (id) => {
      setInvoices(invoices.map(inv => 
        inv.id === id ? { ...inv, status: inv.status === 'Paid' ? 'Pending' : 'Paid' } : inv
      ));
    };

    return (
      <div className="p-8">
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold">Invoices & Quotes</h1>
          <button onClick={() => openModal('invoice', null)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus size={20} />
            <span>New Invoice/Quote</span>
          </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {invoices.map(invoice => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4">{invoice.type === 'quote' ? 'QTE' : 'INV'}-{invoice.id}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded ${invoice.type === 'quote' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                      {invoice.type === 'quote' ? 'Quote' : 'Invoice'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{invoice.clientName}</td>
                  <td className="px-6 py-4 font-bold text-green-600">${invoice.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {invoice.type === 'invoice' ? (
                      <button 
                        onClick={() => toggleStatus(invoice.id)}
                        className={`px-3 py-1 text-xs rounded cursor-pointer transition-colors ${invoice.status === 'Paid' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
                      >
                        {invoice.status}
                      </button>
                    ) : (
                      <span className="px-3 py-1 text-xs rounded bg-gray-100 text-gray-800">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => openModal('invoice', invoice)} className="text-blue-600 hover:text-blue-800 mr-3"><Edit size={18} /></button>
                    <button onClick={() => setInvoices(invoices.filter(inv => inv.id !== invoice.id))} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const TimesheetsView = () => (
    <div className="p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Timesheets</h1>
        <button onClick={() => openModal('timesheet', null)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus size={20} />
          <span>New Entry</span>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Work Order #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {timesheets.map(ts => (
              <tr key={ts.id}>
                <td className="px-6 py-4">{ts.employee}</td>
                <td className="px-6 py-4">{ts.date}</td>
                <td className="px-6 py-4 font-bold">{ts.hours}h</td>
                <td className="px-6 py-4">{ts.project}</td>
                <td className="px-6 py-4">{ts.workOrderNumber}</td>
                <td className="px-6 py-4">
                  <button onClick={() => openModal('timesheet', ts)} className="text-blue-600 hover:text-blue-800 mr-3"><Edit size={18} /></button>
                  <button onClick={() => setTimesheets(timesheets.filter(t => t.id !== ts.id))} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const PendingView = () => (
    <div className="p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Pending</h1>
        <button onClick={() => openModal('pending', null)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus size={20} />
          <span>New Pending</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pending.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold">{item.clientName}</h3>
              <div className="flex space-x-2">
                <button onClick={() => openModal('pending', item)} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                <button onClick={() => setPending(pending.filter(t => t.id !== item.id))} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
              </div>
            </div>
            {item.workPhoto && (
              <img src={item.workPhoto} alt={item.clientName} className="w-full h-32 object-cover rounded-lg mb-4" />
            )}
            {item.description && (
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
            )}
            <div className="space-y-2">
              {item.items.map((subItem, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{subItem.name}</span>
                  <span>${subItem.price}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t flex justify-between font-bold">
              <span>Total:</span>
              <span className="text-green-600">${item.items.reduce((sum, subItem) => sum + subItem.price, 0)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">System Information</h2>
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b"><span>Total Clients:</span><span className="font-semibold">{clients.length}</span></div>
          <div className="flex justify-between py-2 border-b"><span>Total Invoices:</span><span className="font-semibold">{invoices.length}</span></div>
          <div className="flex justify-between py-2 border-b"><span>Total Pending:</span><span className="font-semibold">{pending.length}</span></div>
          <div className="flex justify-between py-2"><span>Total Timesheets:</span><span className="font-semibold">{timesheets.length}</span></div>
        </div>
      </div>
    </div>
  );

  const ClientFormModal = () => {
    const [formData, setFormData] = useState(editingItem || { name: '', email: '', phone: '', address: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingItem) {
        setClients(clients.map(c => c.id === editingItem.id ? { ...c, ...formData } : c));
      } else {
        setClients([...clients, { id: Date.now(), ...formData }]);
      }
      closeModal();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">{editingItem ? 'Edit' : 'New'} Client</h2>
            <button onClick={closeModal}><X size={24} /></button>
          </div>
          <div className="space-y-4">
            <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Full Name" />
            <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Email" />
            <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Phone" />
            <textarea required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Address" rows="3" />
            <button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">Save Client</button>
          </div>
        </div>
      </div>
    );
  };

  const InvoiceFormModal = () => {
    const [formData, setFormData] = useState(editingItem || { 
      clientId: '', 
      date: new Date().toISOString().split('T')[0], 
      items: [{ name: '', quantity: 1, price: 0 }], 
      status: 'Pending',
      type: 'invoice'
    });

    const addItem = () => {
      setFormData({ ...formData, items: [...formData.items, { name: '', quantity: 1, price: 0 }] });
    };

    const updateItem = (index, field, value) => {
      const newItems = [...formData.items];
      newItems[index][field] = value;
      setFormData({ ...formData, items: newItems });
    };

    const removeItem = (index) => {
      if (formData.items.length > 1) {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: newItems });
      }
    };

    const calculateTotal = () => {
      return formData.items.reduce((sum, item) => {
        return sum + (parseFloat(item.quantity) * parseFloat(item.price || 0));
      }, 0);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const client = clients.find(c => c.id === parseInt(formData.clientId));
      const total = calculateTotal();
      
      if (editingItem) {
        setInvoices(invoices.map(inv => {
          if (inv.id === editingItem.id) {
            return { 
              ...inv, 
              clientId: parseInt(formData.clientId), 
              clientName: client.name, 
              amount: total, 
              status: formData.status, 
              date: formData.date, 
              items: formData.items,
              type: formData.type
            };
          }
          return inv;
        }));
      } else {
        setInvoices([...invoices, { 
          id: Date.now(), 
          clientId: parseInt(formData.clientId), 
          clientName: client.name, 
          amount: total, 
          status: formData.status, 
          date: formData.date, 
          items: formData.items,
          type: formData.type
        }]);
      }
      closeModal();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
        <div className="bg-white rounded-lg p-8 max-w-3xl w-full my-8 max-h-screen overflow-y-auto">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">{editingItem ? 'Edit' : 'New'} {formData.type === 'quote' ? 'Quote' : 'Invoice'}</h2>
            <button onClick={closeModal}><X size={24} /></button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Document Type</label>
              <div className="flex space-x-4 mb-4">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, type: 'invoice'})}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${formData.type === 'invoice' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  Invoice
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, type: 'quote'})}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${formData.type === 'quote' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  Quote
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Client</label>
                <select required value={formData.clientId} onChange={(e) => setFormData({...formData, clientId: e.target.value})} className="w-full border rounded-lg px-3 py-2">
                  <option value="">Select Client</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              </div>
            </div>
            {formData.type === 'invoice' && (
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full border rounded-lg px-3 py-2">
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-3">Line Items</label>
              <div className="space-y-3">
                {formData.items.map((item, index) => (
                  <div key={index} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-start gap-2">
                      <textarea 
                        required 
                        value={item.name} 
                        onChange={(e) => updateItem(index, 'name', e.target.value)} 
                        className="flex-1 border rounded-lg px-3 py-2 min-h-[100px]" 
                        placeholder="Job description (e.g., Install new kitchen cabinets, repair drywall, paint walls...)"
                        rows="4"
                      />
                      <button 
                        type="button" 
                        onClick={() => removeItem(index)} 
                        className="text-red-600 hover:text-red-800 p-2 transition-colors"
                        disabled={formData.items.length === 1}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="number" 
                        required 
                        min="1" 
                        value={item.quantity} 
                        onChange={(e) => updateItem(index, 'quantity', e.target.value)} 
                        className="border rounded-lg px-3 py-2" 
                        placeholder="Quantity" 
                      />
                      <input 
                        type="number" 
                        required 
                        min="0" 
                        step="0.01" 
                        value={item.price} 
                        onChange={(e) => updateItem(index, 'price', e.target.value)} 
                        className="border rounded-lg px-3 py-2" 
                        placeholder="Price" 
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addItem} className="mt-3 text-blue-600 text-sm font-semibold hover:text-blue-800 transition-colors">
                + Add Line Item
              </button>
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total Amount:</span>
                <span className="text-green-600">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleSubmit} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors">
                {editingItem ? 'Update' : 'Create'} {formData.type === 'quote' ? 'Quote' : 'Invoice'}
              </button>
              {formData.type === 'quote' && formData.clientId && (
                <button 
                  type="button" 
                  onClick={() => {
                    const client = clients.find(c => c.id === parseInt(formData.clientId));
                    if (client) {
                      generateQuotePDF(formData, client, calculateTotal());
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                >
                  <Download size={20} />
                  Download
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TimesheetFormModal = () => {
    const [formData, setFormData] = useState(editingItem || { employee: '', date: new Date().toISOString().split('T')[0], hours: 0, project: '', workOrderNumber: '', notes: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingItem) {
        setTimesheets(timesheets.map(ts => {
          if (ts.id === editingItem.id) {
            return { ...ts, ...formData, hours: parseFloat(formData.hours) };
          }
          return ts;
        }));
      } else {
        setTimesheets([...timesheets, { id: Date.now(), ...formData, hours: parseFloat(formData.hours) }]);
      }
      closeModal();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">{editingItem ? 'Edit' : 'New'} Timesheet Entry</h2>
            <button onClick={closeModal}><X size={24} /></button>
          </div>
          <div className="space-y-4">
            <input type="text" required value={formData.employee} onChange={(e) => setFormData({...formData, employee: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Employee Name" />
            <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
            <input type="number" required min="0" step="0.5" value={formData.hours} onChange={(e) => setFormData({...formData, hours: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Hours Worked" />
            <input type="text" required value={formData.project} onChange={(e) => setFormData({...formData, project: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Project Name" />
            <input type="text" required value={formData.workOrderNumber} onChange={(e) => setFormData({...formData, workOrderNumber: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Work Order Number" />
            <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Notes (optional)" rows="3" />
            <button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">Save Entry</button>
          </div>
        </div>
      </div>
    );
  };

  const PendingFormModal = () => {
    const [formData, setFormData] = useState(editingItem || { clientId: '', clientName: '', items: [{ name: '', price: 0 }], description: '', workPhoto: null });

    const addItem = () => {
      setFormData({ ...formData, items: [...formData.items, { name: '', price: 0 }] });
    };

    const updateItem = (index, field, value) => {
      const newItems = [...formData.items];
      newItems[index][field] = value;
      setFormData({ ...formData, items: newItems });
    };

    const handlePhotoUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, workPhoto: reader.result });
        };
        reader.readAsDataURL(file);
      }
    };

    const handleClientChange = (e) => {
      const clientId = e.target.value;
      const client = clients.find(c => c.id === parseInt(clientId));
      setFormData({ 
        ...formData, 
        clientId: clientId, 
        clientName: client ? client.name : '' 
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const processedItems = formData.items.map(item => {
        return { name: item.name, price: parseFloat(item.price) };
      });
      
      if (editingItem) {
        const updatedPending = pending.map(t => {
          if (t.id === editingItem.id) {
            return { ...t, clientId: parseInt(formData.clientId), clientName: formData.clientName, description: formData.description, workPhoto: formData.workPhoto, items: processedItems };
          }
          return t;
        });
        setPending(updatedPending);
      } else {
        const newPending = { id: Date.now(), clientId: parseInt(formData.clientId), clientName: formData.clientName, description: formData.description, workPhoto: formData.workPhoto, items: processedItems };
        setPending([...pending, newPending]);
      }
      closeModal();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full my-8 max-h-screen overflow-y-auto">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">{editingItem ? 'Edit' : 'New'} Pending</h2>
            <button onClick={closeModal}><X size={24} /></button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Client</label>
              <select required value={formData.clientId} onChange={handleClientChange} className="w-full border rounded-lg px-3 py-2">
                <option value="">Select Client</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Description (optional)" rows="2" />
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {formData.workPhoto ? (
                <div className="relative">
                  <img src={formData.workPhoto} alt="Work" className="w-full h-48 object-cover rounded-lg" />
                  <button type="button" onClick={() => setFormData({...formData, workPhoto: null})} className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center">
                  <Upload size={32} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Upload work photo (optional)</span>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Items</label>
              {formData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 mb-2">
                  <input type="text" required value={item.name} onChange={(e) => updateItem(index, 'name', e.target.value)} className="col-span-8 border rounded-lg px-3 py-2" placeholder="Item name" />
                  <input type="number" required min="0" step="0.01" value={item.price} onChange={(e) => updateItem(index, 'price', e.target.value)} className="col-span-4 border rounded-lg px-3 py-2" placeholder="Price" />
                </div>
              ))}
              <button type="button" onClick={addItem} className="text-blue-600 text-sm font-semibold hover:text-blue-800 transition-colors">+ Add Item</button>
            </div>
            <div className="pt-4 border-t flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span className="text-green-600">${formData.items.reduce((sum, item) => sum + parseFloat(item.price || 0), 0).toFixed(2)}</span>
            </div>
            <button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors">Save Pending</button>
          </div>
        </div>
      </div>
    );
  };

  const renderModal = () => {
    if (!showModal) return null;
    if (modalType === 'client') return <ClientFormModal />;
    if (modalType === 'invoice') return <InvoiceFormModal />;
    if (modalType === 'timesheet') return <TimesheetFormModal />;
    if (modalType === 'pending') return <PendingFormModal />;
    return null;
  };

  const renderView = () => {
    if (currentView === 'dashboard') return <Dashboard />;
    if (currentView === 'clients') return <ClientsView />;
    if (currentView === 'invoices') return <InvoicesView />;
    if (currentView === 'timesheets') return <TimesheetsView />;
    if (currentView === 'pending') return <PendingView />;
    if (currentView === 'settings') return <SettingsView />;
    if (currentView === 'admin') return <AdminSettingsView />;
    return <Dashboard />;
  };

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navigation />
      <div className="flex-1">{renderView()}</div>
      {renderModal()}
    </div>
  );
}
