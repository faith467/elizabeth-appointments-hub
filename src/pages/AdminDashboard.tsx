
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import AdminTable from '@/components/AdminTable';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, CheckCircle, Clock, TrendingUp, Activity } from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  date: string;
  time: string;
  type: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  // Mock data for demonstration
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'John Smith',
      phone: '+1 (555) 123-4567',
      date: '2024-06-15',
      time: '10:00',
      type: 'General Consultation',
      reason: 'Regular check-up and consultation',
      status: 'pending',
      createdAt: '2024-06-14T10:00:00Z',
    },
    {
      id: '2',
      patientName: 'Sarah Johnson',
      phone: '+1 (555) 987-6543',
      date: '2024-06-16',
      time: '14:30',
      type: 'Follow-up Visit',
      reason: 'Follow-up for recent lab results',
      status: 'confirmed',
      createdAt: '2024-06-13T15:30:00Z',
    },
    {
      id: '3',
      patientName: 'Michael Brown',
      phone: '+1 (555) 456-7890',
      date: '2024-06-14',
      time: '09:00',
      type: 'Routine Check-up',
      reason: 'Annual health screening',
      status: 'completed',
      createdAt: '2024-06-12T09:00:00Z',
    },
  ]);

  const handleStatusUpdate = (id: string, newStatus: 'confirmed' | 'completed' | 'cancelled') => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === id 
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
  };

  const stats = {
    total: appointments.length,
    pending: appointments.filter(apt => apt.status === 'pending').length,
    confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
    completed: appointments.filter(apt => apt.status === 'completed').length,
    cancelled: appointments.filter(apt => apt.status === 'cancelled').length,
  };

  return (
    <Layout userType="admin" onLogout={onLogout}>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-teal-900 mb-2">Admin Dashboard</h1>
          <p className="text-teal-600">Manage appointments and clinic operations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total</p>
                  <p className="text-xl font-bold">{stats.total}</p>
                </div>
                <Users className="w-6 h-6 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Pending</p>
                  <p className="text-xl font-bold">{stats.pending}</p>
                </div>
                <Clock className="w-6 h-6 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Confirmed</p>
                  <p className="text-xl font-bold">{stats.confirmed}</p>
                </div>
                <Calendar className="w-6 h-6 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Completed</p>
                  <p className="text-xl font-bold">{stats.completed}</p>
                </div>
                <CheckCircle className="w-6 h-6 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Cancelled</p>
                  <p className="text-xl font-bold">{stats.cancelled}</p>
                </div>
                <Activity className="w-6 h-6 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Table */}
        <AdminTable 
          appointments={appointments} 
          onUpdateStatus={handleStatusUpdate}
        />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
