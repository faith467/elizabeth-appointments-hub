
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import AdminTable from '@/components/AdminTable';
import PDFDocumentationGenerator from '@/components/PDFDocumentationGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { data: appointments, isLoading } = useQuery({
    queryKey: ['admin-appointments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          profiles (
            full_name,
            phone
          )
        `)
        .order('appointment_date', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-teal-800">Admin Dashboard</h1>
          <PDFDocumentationGenerator />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-teal-700">System Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Generate and download comprehensive technical documentation for the Elizabeth Clinic Appointment Management System.
            </p>
            <PDFDocumentationGenerator />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-teal-700">Appointment Management</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4 text-teal-600">Loading appointments...</div>
            ) : (
              <AdminTable appointments={appointments || []} />
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
