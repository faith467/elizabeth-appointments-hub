
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, FileText, Phone } from 'lucide-react';

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

interface AppointmentListProps {
  appointments: Appointment[];
  title?: string;
}

const AppointmentList = ({ appointments, title = "Your Appointments" }: AppointmentListProps) => {
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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (appointments.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-teal-100">
        <CardHeader>
          <CardTitle className="text-teal-900">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-teal-300 mx-auto mb-4" />
            <p className="text-gray-500">No appointments scheduled yet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-teal-100">
      <CardHeader>
        <CardTitle className="text-teal-900">{title}</CardTitle>
        <CardDescription>
          {appointments.length} appointment{appointments.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-4 rounded-xl border border-teal-100 bg-gradient-to-r from-white to-teal-50 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-teal-600" />
                    <span className="font-semibold text-teal-900">{appointment.patientName}</span>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(appointment.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{appointment.phone}</span>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium text-teal-700">{appointment.type}</span>
                  </div>
                  
                  {appointment.reason && (
                    <div className="flex items-start space-x-1 text-sm text-gray-600">
                      <FileText className="w-4 h-4 mt-0.5" />
                      <span>{appointment.reason}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentList;
