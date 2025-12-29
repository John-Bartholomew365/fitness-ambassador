'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Vest {
  id: number;
  type: string;
  color: string;
  colorName: string;
  price: string;
  image: string;
  size: string;
}

interface BioData {
  fullName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  birthDay: string;
  birthMonth: string;
  hasMedicalCondition: string;
  medicalConditionNote: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

interface Registration {
  id: string;
  vest: Vest;
  bio: BioData;
  receiptUrl?: string;
  receiptFilename?: string;
  paymentMethod?: string;
  registrationDate: string;
  status: 'pending' | 'verified' | 'rejected';
  verificationNotes?: string;
}

const UserRegistrationDetails = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'pending' | 'verified' | 'rejected'>('pending');

  useEffect(() => {
    const loadRegistrations = () => {
      try {
        const storedData = localStorage.getItem('registrations');
        
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setRegistrations(parsedData);
        } else {
          const demoRegistrations: Registration[] = [
            {
              id: 'W2F5-JDO-7B3C-5891',
              vest: {
                id: 1,
                type: 'Hoodie',
                color: '#1e40af',
                colorName: 'Royal Blue',
                price: '₦12,000',
                image: '/blue-hoodie.png',
                size: 'L'
              },
              bio: {
                fullName: 'John Doe',
                phoneNumber: '+2348012345678',
                email: 'john.doe@example.com',
                gender: 'Male',
                birthDay: '15',
                birthMonth: '6',
                hasMedicalCondition: 'No',
                medicalConditionNote: '',
                emergencyContactName: 'Jane Doe',
                emergencyContactPhone: '+2348098765432'
              },
              receiptUrl: '/receipts/sample-receipt.jpg',
              receiptFilename: 'payment_receipt_001.jpg',
              paymentMethod: 'Bank Transfer - GT Bank',
              registrationDate: '2024-01-15T10:30:00Z',
              status: 'verified',
              verificationNotes: 'Payment verified successfully. Receipt clear and matches amount.'
            },
            {
              id: 'W2F5-ASM-4F2A-6723',
              vest: {
                id: 3,
                type: 'T-Shirt',
                color: '#008020',
                colorName: 'Forest Green',
                price: '₦10,000',
                image: '/green-shirt.png',
                size: 'M'
              },
              bio: {
                fullName: 'Alice Smith',
                phoneNumber: '+2348023456789',
                email: 'alice.smith@example.com',
                gender: 'Female',
                birthDay: '22',
                birthMonth: '8',
                hasMedicalCondition: 'Yes',
                medicalConditionNote: 'Mild asthma - will bring inhaler',
                emergencyContactName: 'Bob Smith',
                emergencyContactPhone: '+2348076543210'
              },
              receiptUrl: '/receipts/sample-receipt-2.jpg',
              receiptFilename: 'payment_receipt_002.jpg',
              paymentMethod: 'Bank Transfer - Jaiz Bank',
              registrationDate: '2024-01-16T14:45:00Z',
              status: 'pending'
            },
            {
              id: 'W2F5-RBW-9E1D-3345',
              vest: {
                id: 5,
                type: 'Armless Vest',
                color: '#008020',
                colorName: 'Forest Green',
                price: '₦10,000',
                image: '/green-armless.jpeg',
                size: 'XL'
              },
              bio: {
                fullName: 'Robert Brown',
                phoneNumber: '+2348034567890',
                email: 'robert.brown@example.com',
                gender: 'Male',
                birthDay: '3',
                birthMonth: '11',
                hasMedicalCondition: 'No',
                medicalConditionNote: '',
                emergencyContactName: 'Sarah Brown',
                emergencyContactPhone: '+2348065432109'
              },
              receiptUrl: '/receipts/sample-receipt-3.jpg',
              receiptFilename: 'payment_receipt_003.pdf',
              paymentMethod: 'Bank Transfer - GT Bank',
              registrationDate: '2024-01-17T09:15:00Z',
              status: 'rejected',
              verificationNotes: 'Receipt amount does not match vest price. Need to pay balance.'
            }
          ];
          
          setRegistrations(demoRegistrations);
          localStorage.setItem('registrations', JSON.stringify(demoRegistrations));
        }
      } catch (error) {
        console.error('Error loading registrations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRegistrations();
  }, []);

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = 
      reg.bio.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.bio.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.bio.phoneNumber.includes(searchTerm) ||
      reg.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return '✓';
      case 'pending': return '⏳';
      case 'rejected': return '✗';
      default: return '?';
    }
  };

  const handleUpdateStatus = () => {
    if (!selectedRegistration) return;

    const updatedRegistrations = registrations.map(reg => {
      if (reg.id === selectedRegistration.id) {
        return {
          ...reg,
          status: selectedStatus,
          verificationNotes: verificationNotes
        };
      }
      return reg;
    });

    setRegistrations(updatedRegistrations);
    localStorage.setItem('registrations', JSON.stringify(updatedRegistrations));
    
    setSelectedRegistration({
      ...selectedRegistration,
      status: selectedStatus,
      verificationNotes: verificationNotes
    });

    alert('Status updated successfully!');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const exportToCSV = () => {
    const headers = [
      'Registration ID',
      'Full Name',
      'Email',
      'Phone',
      'Vest Type',
      'Vest Color',
      'Size',
      'Price',
      'Gender',
      'Date of Birth',
      'Medical Condition',
      'Emergency Contact',
      'Emergency Phone',
      'Payment Method',
      'Registration Date',
      'Status',
      'Verification Notes'
    ];

    const csvData = registrations.map(reg => [
      reg.id,
      reg.bio.fullName,
      reg.bio.email,
      reg.bio.phoneNumber,
      reg.vest.type,
      reg.vest.colorName,
      reg.vest.size,
      reg.vest.price,
      reg.bio.gender,
      `${reg.bio.birthDay}/${reg.bio.birthMonth}`,
      reg.bio.hasMedicalCondition === 'Yes' ? reg.bio.medicalConditionNote : 'None',
      reg.bio.emergencyContactName,
      reg.bio.emergencyContactPhone,
      reg.paymentMethod || 'N/A',
      formatDate(reg.registrationDate),
      reg.status,
      reg.verificationNotes || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `walk2fitness_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calculateStats = () => {
    const total = registrations.length;
    const verified = registrations.filter(r => r.status === 'verified').length;
    const pending = registrations.filter(r => r.status === 'pending').length;
    const rejected = registrations.filter(r => r.status === 'rejected').length;
    
    const revenue = registrations
      .filter(r => r.status === 'verified')
      .reduce((sum, reg) => {
        const amount = parseInt(reg.vest.price.replace(/[^0-9]/g, ''));
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);

    return { total, verified, pending, rejected, revenue };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#008020] border-b-[#ff8a00] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading registration data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-0 md:p-4 lg:p-8 w-[95%]">
      <div className="max-w-[100vw] lg:max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-6 lg:mb-8 px-1">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">User Registration Management</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">View and manage all Walk2Fitness 5.0 registrations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8 px-1">
          <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow border border-gray-100">
            <div className="text-xl lg:text-3xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-xs lg:text-sm text-gray-500">Total Registrations</div>
          </div>
          <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow border border-gray-100">
            <div className="text-xl lg:text-3xl font-bold text-green-600">{stats.verified}</div>
            <div className="text-xs lg:text-sm text-gray-500">Verified</div>
          </div>
          <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow border border-gray-100">
            <div className="text-xl lg:text-3xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-xs lg:text-sm text-gray-500">Pending</div>
          </div>
          <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow border border-gray-100 col-span-2 lg:col-span-1">
            <div className="text-xl lg:text-3xl font-bold text-[#ff8a00]">₦{stats.revenue.toLocaleString()}</div>
            <div className="text-xs lg:text-sm text-gray-500">Total Revenue</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow border border-gray-100 mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 lg:px-4 py-2 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-[#008020] focus:border-transparent outline-none"
                />
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 lg:px-4 py-2 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-[#008020] focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <button
              onClick={exportToCSV}
              className="px-4 lg:px-6 py-2 lg:py-3 cursor-pointer bg-[#008020] text-white font-semibold rounded-lg lg:rounded-xl hover:bg-[#006a1a] transition-colors flex items-center gap-2 text-sm lg:text-base w-full md:w-auto justify-center"
            >
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export CSV
            </button>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow border border-gray-100 overflow-hidden hide-scrollbar">
          <div className="overflow-x-auto hide-scrollbar w-full">
            <table className="w-full min-w-4xl lg:min-w-0">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Reg ID</th>
                  <th className="px-3 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Name</th>
                  <th className="px-3 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Vest Details</th>
                  <th className="px-3 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Contact</th>
                  <th className="px-3 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Date</th>
                  <th className="px-3 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                  <th className="px-3 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRegistrations.map((registration) => (
                  <tr key={registration.id} className="hover:bg-gray-50">
                    <td className="px-3 lg:px-3 py-4 whitespace-nowrap">
                      <code className="text-xs lg:text-sm font-mono text-gray-900">{registration.id}</code>
                    </td>
                    <td className="px-3 lg:px-3 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 text-sm lg:text-base">{registration.bio.fullName}</div>
                      <div className="text-xs lg:text-sm text-gray-500">{registration.bio.gender}</div>
                    </td>
                    <td className="px-3 lg:px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 lg:gap-3">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                          <div 
                            className="w-5 h-5 lg:w-6 lg:h-6 rounded"
                            style={{ backgroundColor: registration.vest.color }}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-sm lg:text-base truncate">{registration.vest.type}</div>
                          <div className="text-xs lg:text-sm text-gray-500 truncate">Size: {registration.vest.size} • {registration.vest.price}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 lg:px-3 py-4 whitespace-nowrap min-w-[150px]">
                      <div className="text-xs lg:text-sm truncate">{registration.bio.phoneNumber}</div>
                      <div className="text-xs lg:text-sm text-gray-500 truncate">{registration.bio.email}</div>
                    </td>
                    <td className="px-3 lg:px-3 py-4 whitespace-nowrap">
                      <div className="text-xs lg:text-sm">{formatDate(registration.registrationDate)}</div>
                    </td>
                    <td className="px-3 lg:px-3 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(registration.status)}`}>
                        <span className="mr-1">{getStatusIcon(registration.status)}</span>
                        <span className="hidden sm:inline">
                          {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                        </span>
                        <span className="sm:hidden">
                          {registration.status.charAt(0).toUpperCase()}
                        </span>
                      </span>
                    </td>
                    <td className="px-3 lg:px-3 py-4 whitespace-nowrap">
                      <div className="flex gap-1 lg:gap-2">
                        <button
                          onClick={() => {
                            setSelectedRegistration(registration);
                            setSelectedStatus(registration.status);
                            setVerificationNotes(registration.verificationNotes || '');
                          }}
                          className="px-2 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            setSelectedRegistration(registration);
                            setShowReceiptModal(true);
                          }}
                          className="px-2 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors whitespace-nowrap"
                        >
                          Receipt
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRegistrations.length === 0 && (
            <div className="text-center py-8 lg:py-12 px-4">
              <div className="text-gray-400 mb-2 lg:mb-4">No registrations found</div>
              <div className="text-gray-500 text-xs lg:text-sm">Try adjusting your search or filter</div>
            </div>
          )}
        </div>
      </div>

      {/* Registration Details Modal */}
      {selectedRegistration && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-2 lg:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg lg:rounded-2xl w-full max-w-[95vw] lg:max-w-4xl max-h-[90vh] overflow-y-auto hide-scrollbar"
          >
            <div className="p-4 lg:p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <h2 className="text-lg lg:text-2xl font-bold text-gray-900 truncate">Registration Details</h2>
                  <p className="text-gray-600 text-sm lg:text-base truncate">ID: {selectedRegistration.id}</p>
                </div>
                <button
                  onClick={() => setSelectedRegistration(null)}
                  className="p-1 lg:p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4 lg:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Left Column - Personal Info */}
                <div className="space-y-4 lg:space-y-6">
                  <div>
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Personal Information</h3>
                    <div className="space-y-3 lg:space-y-4">
                      <div>
                        <label className="text-xs lg:text-sm text-gray-500">Full Name</label>
                        <div className="font-medium text-sm lg:text-base">{selectedRegistration.bio.fullName}</div>
                      </div>
                      <div>
                        <label className="text-xs lg:text-sm text-gray-500">Email Address</label>
                        <div className="font-medium text-sm lg:text-base truncate">{selectedRegistration.bio.email}</div>
                      </div>
                      <div>
                        <label className="text-xs lg:text-sm text-gray-500">Phone Number</label>
                        <div className="font-medium text-sm lg:text-base">{selectedRegistration.bio.phoneNumber}</div>
                      </div>
                      <div>
                        <label className="text-xs lg:text-sm text-gray-500">Gender</label>
                        <div className="font-medium text-sm lg:text-base">{selectedRegistration.bio.gender}</div>
                      </div>
                      <div>
                        <label className="text-xs lg:text-sm text-gray-500">Date of Birth (Day/Month)</label>
                        <div className="font-medium text-sm lg:text-base">{selectedRegistration.bio.birthDay}/{selectedRegistration.bio.birthMonth}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Emergency Contact</h3>
                    <div className="space-y-3 lg:space-y-4">
                      <div>
                        <label className="text-xs lg:text-sm text-gray-500">Contact Name</label>
                        <div className="font-medium text-sm lg:text-base">{selectedRegistration.bio.emergencyContactName}</div>
                      </div>
                      <div>
                        <label className="text-xs lg:text-sm text-gray-500">Contact Phone</label>
                        <div className="font-medium text-sm lg:text-base">{selectedRegistration.bio.emergencyContactPhone}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Medical Information</h3>
                    <div>
                      <label className="text-xs lg:text-sm text-gray-500">Medical Conditions</label>
                      <div className="font-medium text-sm lg:text-base mt-1">
                        {selectedRegistration.bio.hasMedicalCondition === 'Yes' 
                          ? selectedRegistration.bio.medicalConditionNote || 'No details provided'
                          : 'None'
                        }
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Vest & Payment Info */}
                <div className="space-y-4 lg:space-y-6">
                  <div>
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Vest Information</h3>
                    <div className="space-y-3 lg:space-y-4">
                      <div>
                        <label className="text-xs lg:text-sm text-gray-500">Vest Type</label>
                        <div className="font-medium text-sm lg:text-base">{selectedRegistration.vest.type}</div>
                      </div>
                      <div>
                        <label className="text-xs lg:text-sm text-gray-500">Color</label>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-5 h-5 rounded-full border border-gray-300 shrink-0"
                            style={{ backgroundColor: selectedRegistration.vest.color }}
                          />
                          <span className="font-medium text-sm lg:text-base truncate">{selectedRegistration.vest.colorName}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs lg:text-sm text-gray-500">Size</label>
                        <div className="font-medium text-sm lg:text-base">{selectedRegistration.vest.size}</div>
                      </div>
                      <div>
                        <label className="text-xs lg:text-sm text-gray-500">Price</label>
                        <div className="text-lg lg:text-xl font-bold text-[#ff8a00]">{selectedRegistration.vest.price}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Payment Information</h3>
                    <div className="space-y-3 lg:space-y-4">
                      <div>
                        <label className="text-xs lg:text-sm text-gray-500">Payment Method</label>
                        <div className="font-medium text-sm lg:text-base truncate">{selectedRegistration.paymentMethod || 'Not specified'}</div>
                      </div>
                      <div>
                        <label className="text-xs lg:text-sm text-gray-500">Registration Date</label>
                        <div className="font-medium text-sm lg:text-base">{formatDate(selectedRegistration.registrationDate)}</div>
                      </div>
                      <div>
                        <label className="text-xs lg:text-sm text-gray-500">Receipt</label>
                        <button
                          onClick={() => setShowReceiptModal(true)}
                          className="px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors flex items-center gap-1 lg:gap-2"
                        >
                          <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View Receipt
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Status Update Section */}
                  <div>
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Status Management</h3>
                    <div className="space-y-3 lg:space-y-4">
                      <div>
                        <label className="text-xs lg:text-sm text-gray-500 mb-1 lg:mb-2 block">Update Status</label>
                        <div className="flex flex-wrap gap-1 lg:gap-2 mb-3 lg:mb-4">
                          {(['pending', 'verified', 'rejected'] as const).map((status) => (
                            <button
                              key={status}
                              onClick={() => setSelectedStatus(status)}
                              className={`px-2 lg:px-4 py-1.5 lg:py-2 rounded-lg transition-colors text-xs lg:text-sm ${selectedStatus === status 
                                ? status === 'verified' ? 'bg-green-100 text-green-800' 
                                : status === 'pending' ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-xs lg:text-sm text-gray-500 mb-1 lg:mb-2 block">Verification Notes</label>
                        <textarea
                          value={verificationNotes}
                          onChange={(e) => setVerificationNotes(e.target.value)}
                          rows={3}
                          className="w-full px-3 lg:px-4 py-2 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-[#008020] focus:border-transparent outline-none"
                          placeholder="Add notes about verification..."
                        />
                      </div>

                      <button
                        onClick={handleUpdateStatus}
                        className="w-full py-2 lg:py-3 cursor-pointer bg-[#008020] text-white font-semibold rounded-lg lg:rounded-xl hover:bg-[#006a1a] transition-colors text-sm lg:text-base"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceiptModal && selectedRegistration && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-2 lg:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg lg:rounded-2xl w-full max-w-[95vw] lg:max-w-4xl max-h-[90vh] overflow-y-auto hide-scrollbar"
          >
            <div className="p-4 lg:p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <h2 className="text-lg lg:text-2xl font-bold text-gray-900 truncate">Payment Receipt</h2>
                  <p className="text-gray-600 text-sm lg:text-base truncate">ID: {selectedRegistration.id}</p>
                </div>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="p-1 lg:p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4 lg:p-6">
              <div className="flex flex-col items-center">
                {/* Receipt Preview */}
                <div className="w-full max-w-2xl aspect-4/3 bg-gray-100 rounded-lg lg:rounded-xl mb-4 lg:mb-6 flex items-center justify-center">
                  {selectedRegistration.receiptUrl ? (
                    <div className="text-center p-4 lg:p-8">
                      <div className="w-16 h-16 lg:w-24 lg:h-24 mx-auto mb-3 lg:mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 lg:w-12 lg:h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="font-medium text-gray-900 text-sm lg:text-base">{selectedRegistration.receiptFilename}</div>
                      <div className="text-xs lg:text-sm text-gray-500">Payment Receipt</div>
                      <div className="mt-3 lg:mt-4 text-xs lg:text-sm text-gray-500">
                        Note: In a real application, this would display the actual uploaded receipt image
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-4 lg:p-8">
                      <div className="w-16 h-16 lg:w-24 lg:h-24 mx-auto mb-3 lg:mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 lg:w-12 lg:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="font-medium text-gray-900 text-sm lg:text-base">No receipt uploaded</div>
                      <div className="text-xs lg:text-sm text-gray-500">User did not upload a payment receipt</div>
                    </div>
                  )}
                </div>

                {/* Receipt Info */}
                <div className="w-full max-w-2xl space-y-3 lg:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                    <div>
                      <label className="text-xs lg:text-sm text-gray-500">Filename</label>
                      <div className="font-medium text-sm lg:text-base truncate">{selectedRegistration.receiptFilename || 'N/A'}</div>
                    </div>
                    <div>
                      <label className="text-xs lg:text-sm text-gray-500">Uploaded On</label>
                      <div className="font-medium text-sm lg:text-base">{formatDate(selectedRegistration.registrationDate)}</div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3 lg:pt-4">
                    <h3 className="font-medium text-gray-900 mb-1 lg:mb-2 text-sm lg:text-base">Receipt Verification Notes</h3>
                    <div className="bg-gray-50 rounded-lg p-3 lg:p-4 text-sm lg:text-base">
                      {selectedRegistration.verificationNotes || 'No verification notes yet'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 lg:p-6 border-t border-gray-100 bg-gray-50 rounded-b-lg lg:rounded-b-2xl">
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-end">
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="px-4 lg:px-6 py-2 lg:py-3 cursor-pointer border-2 border-gray-300 text-gray-700 font-semibold rounded-lg lg:rounded-xl hover:border-gray-400 transition-colors text-sm lg:text-base w-full sm:w-auto"
                >
                  Close
                </button>
                {selectedRegistration.receiptUrl && (
                  <button
                    onClick={() => window.open(selectedRegistration.receiptUrl, '_blank')}
                    className="px-4 lg:px-6 py-2 lg:py-3 bg-[#ff8a00] cursor-pointer text-white font-semibold rounded-lg lg:rounded-xl hover:bg-[#e67a00] transition-colors text-sm lg:text-base w-full sm:w-auto"
                  >
                    Download Receipt
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserRegistrationDetails;