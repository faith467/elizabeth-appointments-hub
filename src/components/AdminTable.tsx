
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, Clock, Calendar, Phone, FileText } from 'lucide-react';
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

interface AdminTableProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: 'confirmed' | 'completed' | 'cancelled') => void;
}

const AdminTable = ({ appointments, onUpdateStatus }: AdminTableProps) => {
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleStatusUpdate = (id: string, status: 'confirmed' | 'completed' | 'cancelled') => {
    onUpdateStatus(id, status);
    
    const statusMessages = {
      confirmed: 'Appointment confirmed successfully',
      completed: 'Appointment marked as completed',
      cancelled: 'Appointment cancelled'
    };

    toast({
      title: "Status Updated",
      description: statusMessages[status],
    });
  };

  if (appointments.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-teal-100">
        <CardHeader>
          <CardTitle className="text-teal-900">Appointment Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-teal-300 mx-auto mb-4" />
            <p className="text-gray-500">No appointments to manage yet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-teal-100">
      <CardHeader>
        <CardTitle className="text-teal-900">Appointment Management</CardTitle>
        <CardDescription>
          {appointments.length} total appointment{appointments.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id} className="hover:bg-teal-50/50">
                  <TableCell>
                    <div>
                      <div className="font-semibold text-teal-900">{appointment.patientName}</div>
                      {appointment.reason && (
                        <div className="text-sm text-gray-600 flex items-start space-x-1 mt-1">
                          <FileText className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{appointment.reason}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm">
                      <Phone className="w-3 h-3" />
                      <span>{appointment.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{formatDate(appointment.date)}</div>
                      <div className="text-gray-600">{appointment.time}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-teal-700">{appointment.type}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {appointment.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Confirm
                        </Button>
                      )}
                      
                      {appointment.status === 'confirmed' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          Complete
                        </Button>
                      )}
                      
                      {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminTable;
