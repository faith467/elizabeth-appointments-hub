
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AdminTable from '@/components/AdminTable';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, CheckCircle, Clock, Activity } from 'lucide-react';
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

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
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

  const handleStatusUpdate = async (id: string, newStatus: 'confirmed' | 'completed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setAppointments(prev => 
        prev.map(appointment => 
          appointment.id === id 
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update appointment: " + error.message,
        variant: "destructive",
      });
    }
  };

  const stats = {
    total: appointments.length,
    pending: appointments.filter(apt => apt.status === 'pending').length,
    confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
    completed: appointments.filter(apt => apt.status === 'completed').length,
    cancelled: appointments.filter(apt => apt.status === 'cancelled').length,
  };

  if (loading) {
    return (
      <Layout userType="admin" onLogout={onLogout}>
        <div className="flex items-center justify-center h-64">
          <div className="text-teal-600">Loading...</div>
        </div>
      </Layout>
    );
  }

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
