
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import AppointmentForm from '@/components/AppointmentForm';
import AppointmentList from '@/components/AppointmentList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, Activity } from 'lucide-react';

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

interface UserDashboardProps {
  onLogout: () => void;
}

const UserDashboard = ({ onLogout }: UserDashboardProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleAppointmentSubmit = (newAppointment: Appointment) => {
    setAppointments(prev => [...prev, newAppointment]);
  };

  const upcomingCount = appointments.filter(apt => 
    apt.status === 'pending' || apt.status === 'confirmed'
  ).length;

  const completedCount = appointments.filter(apt => 
    apt.status === 'completed'
  ).length;

  return (
    <Layout userType="user" onLogout={onLogout}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-teal-900 mb-2">Welcome to Your Dashboard</h1>
          <p className="text-teal-600">Manage your appointments and health visits</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100">Total Appointments</p>
                  <p className="text-2xl font-bold">{appointments.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-teal-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Upcoming</p>
                  <p className="text-2xl font-bold">{upcomingCount}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Completed</p>
                  <p className="text-2xl font-bold">{completedCount}</p>
                </div>
                <Activity className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <AppointmentForm onSubmit={handleAppointmentSubmit} />
          </div>
          <div>
            <AppointmentList appointments={appointments} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
