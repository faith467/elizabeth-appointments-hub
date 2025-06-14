
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AppointmentForm from '@/components/AppointmentForm';
import AppointmentList from '@/components/AppointmentList';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Activity } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';

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
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedAppointments = data.map(apt => ({
        id: apt.id,
        patientName: apt.patient_name,
        phone: apt.phone,
        date: apt.date,
        time: apt.time,
        type: apt.type,
        reason: apt.reason || '',
        status: apt.status as 'pending' | 'confirmed' | 'completed' | 'cancelled',
        createdAt: apt.created_at,
      }));

      setAppointments(formattedAppointments);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch appointments: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAppointmentSubmit = async (newAppointment: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('appointments')
        .insert({
          user_id: user.id,
          patient_name: newAppointment.patientName,
          phone: newAppointment.phone,
          date: newAppointment.date,
          time: newAppointment.time,
          type: newAppointment.type,
          reason: newAppointment.reason,
          status: 'pending'
        });

      if (error) throw error;

      // Refresh appointments list
      fetchAppointments();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create appointment: " + error.message,
        variant: "destructive",
      });
    }
  };

  const upcomingCount = appointments.filter(apt => 
    apt.status === 'pending' || apt.status === 'confirmed'
  ).length;

  const completedCount = appointments.filter(apt => 
    apt.status === 'completed'
  ).length;

  if (loading) {
    return (
      <Layout userType="user" onLogout={onLogout}>
        <div className="flex items-center justify-center h-64">
          <div className="text-teal-600">Loading...</div>
        </div>
      </Layout>
    );
  }

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
