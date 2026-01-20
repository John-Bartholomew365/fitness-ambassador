'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/auth';
import { useAuth } from '@/components/contexts/AuthContext';

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

// Define backend response interfaces
interface BackendVest {
  _id: string;
  type: string;
  color: string;
  colorName: string;
  price: string;
  size: string;
}

interface BackendUser {
  _id: string;
  email: string;
  vestId: BackendVest;
  registration_id: string;
  fullName: string;
  phoneNumber: string;
  gender: string;
  dobDay: number;
  dobMonth: string;
  medicalCondition: boolean;
  medicalDetails: string | null;
  emergencyName: string;
  emergencyPhone: string;
  registrationStatus: string;
  payment_status: string;
  paymentProof: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface BackendResponse {
  success: boolean;
  count: number;
  users: BackendUser[];
}

const UserRegistrationDetails = () => {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'pending' | 'verified' | 'rejected'>('pending');
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    if (!authLoading) {
      const token = authService.getToken();
      if (!token || !user) {
        setError('Please login to view registration data');
        setLoading(false);
        router.push('/login');
      } else {
        setAuthChecked(true);
      }
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      // Don't fetch if not authenticated
      const token = authService.getToken();
      if (!token || !user) {
        setError('Authentication required. Please login.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/get-users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.status === 401) {
          throw new Error('Unauthorized - Invalid or expired token');
        }
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        
        const data: BackendResponse = await response.json();
        
        if (data.success && data.users) {
          // Map backend data to your frontend format
          const mappedRegistrations: Registration[] = data.users.map((user, index) => {
            // Map payment_status to your status
            let status: 'pending' | 'verified' | 'rejected' = 'pending';
            const paymentStatus = user.payment_status?.toLowerCase();
            if (paymentStatus === 'verified' || paymentStatus === 'completed' || paymentStatus === 'paid') {
              status = 'verified';
            } else if (paymentStatus === 'rejected' || paymentStatus === 'failed') {
              status = 'rejected';
            }
            
            // Determine vest image based on type and color
            const getVestImage = (type: string, colorName: string) => {
              const color = colorName.toLowerCase().includes('blue') ? 'blue' : 
                           colorName.toLowerCase().includes('green') ? 'green' : 'blue';
              
              if (type.toLowerCase().includes('hoodie')) {
                return `/${color}-hoodie.png`;
              } else if (type.toLowerCase().includes('armless')) {
                return `/${color}-armless.jpeg`;
              } else {
                return `/${color}-shirt.png`;
              }
            };
            
            // Extract filename from paymentProof URL if available
            let receiptFilename = '';
            if (user.paymentProof) {
              const urlParts = user.paymentProof.split('/');
              receiptFilename = urlParts[urlParts.length - 1];
            }
            
            // Format price to include ₦ symbol if not already present
            let formattedPrice = user.vestId.price;
            if (!formattedPrice.includes('₦')) {
              const numericPrice = parseInt(formattedPrice) || 0;
              formattedPrice = `₦${numericPrice.toLocaleString()}`;
            }
            
            // Format month if it's a number
            let birthMonth = user.dobMonth;
            if (!isNaN(parseInt(user.dobMonth))) {
              const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                             'July', 'August', 'September', 'October', 'November', 'December'];
              const monthIndex = parseInt(user.dobMonth) - 1;
              if (monthIndex >= 0 && monthIndex < months.length) {
                birthMonth = months[monthIndex];
              }
            }
            
            return {
              id: user.registration_id,
              vest: {
                id: index + 1,
                type: user.vestId.type,
                color: user.vestId.color,
                colorName: user.vestId.colorName,
                price: formattedPrice,
                image: getVestImage(user.vestId.type, user.vestId.colorName),
                size: user.vestId.size
              },
              bio: {
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                gender: user.gender,
                birthDay: user.dobDay.toString(),
                birthMonth: birthMonth,
                hasMedicalCondition: user.medicalCondition ? 'Yes' : 'No',
                medicalConditionNote: user.medicalDetails || '',
                emergencyContactName: user.emergencyName,
                emergencyContactPhone: user.emergencyPhone
              },
              receiptUrl: user.paymentProof || undefined,
              receiptFilename: receiptFilename || undefined,
              paymentMethod: user.paymentProof ? 'Bank Transfer' : 'Not specified',
              registrationDate: user.createdAt,
              status: status,
              verificationNotes: ''
            };
          });
          
          setRegistrations(mappedRegistrations);
        } else {
          throw new Error('Invalid data format from server');
        }
      } catch (error) {
        console.error('Error fetching registrations:', error);
        if (error instanceof Error) {
          setError(`Failed to load registration data: ${error.message}`);
        } else {
          setError('Failed to load registration data. Please try again later.');
        }
        setRegistrations([]);
      } finally {
        setLoading(false);
      }
    };

    if (authChecked && !authLoading) {
      fetchRegistrations();
    }
  }, [authChecked, authLoading, user]);

  const handleUpdateStatus = async () => {
    if (!selectedRegistration) return;

    const token = authService.getToken();
    if (!token) {
      setError('Authentication required. Please login.');
      return;
    }

    try {
      // Update local state
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
      
      setSelectedRegistration({
        ...selectedRegistration,
        status: selectedStatus,
        verificationNotes: verificationNotes
      });

      // TODO: Make API call to update status on backend
      // await fetch(`/api/update-status/${selectedRegistration.id}`, {
      //   method: 'PUT',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({ 
      //     status: selectedStatus,
      //     verificationNotes: verificationNotes 
      //   })
      // });

      alert('Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

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

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (error) {
      return 'Invalid date';
    }
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

  // Don't render if auth is still loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#008020] border-b-[#ff8a00] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  const token = authService.getToken();
  if (!token || !user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#008020] border-b-[#ff8a00] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Fetching registration data from server...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#008020] text-white font-semibold rounded-lg hover:bg-[#006a1a] transition-colors"
            >
              Retry
            </button>
            <button
              onClick={() => {
                router.push('/login');
              }}
              className="px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors"
            >
              Login Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-0 md:p-4 lg:p-8 w-[95%]">
      <div className="max-w-[100vw] lg:max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-6 lg:mb-8 px-1">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">User Registration Management</h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">View and manage all Walk2Fitness 5.0 registrations</p>
            </div>
            {user && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Logged in as: {user.email}</span>
              </div>
            )}
          </div>
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
                    <div className="text-center p-4 lg:p-8 w-full">
                      <div className="w-16 h-16 lg:w-24 lg:h-24 mx-auto mb-3 lg:mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 lg:w-12 lg:h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="font-medium text-gray-900 text-sm lg:text-base">{selectedRegistration.receiptFilename}</div>
                      <div className="text-xs lg:text-sm text-gray-500">Payment Receipt</div>
                      <div className="mt-3 lg:mt-4">
                        <img 
                          src={selectedRegistration.receiptUrl} 
                          alt="Payment Receipt" 
                          className="max-w-full max-h-64 rounded-lg shadow mx-auto"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                                <div class="w-16 h-16 lg:w-24 lg:h-24 mx-auto mb-3 lg:mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                                  <svg class="w-8 h-8 lg:w-12 lg:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </div>
                                <div class="font-medium text-gray-900 text-sm lg:text-base">${selectedRegistration.receiptFilename}</div>
                                <div class="text-xs lg:text-sm text-gray-500">Unable to load image</div>
                                <div class="mt-2 text-xs text-blue-600">
                                  <a href="${selectedRegistration.receiptUrl}" target="_blank" class="hover:underline">View receipt in new tab</a>
                                </div>
                              `;
                            }
                          }}
                        />
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