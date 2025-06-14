
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AppointmentFormProps {
  onSubmit: (appointment: any) => void;
}

const AppointmentForm = ({ onSubmit }: AppointmentFormProps) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    type: '',
    reason: '',
    patientName: '',
    phone: '',
  });
  const { toast } = useToast();

  const appointmentTypes = [
    'General Consultation',
    'Follow-up Visit',
    'Routine Check-up',
    'Specialist Consultation',
    'Emergency Visit',
    'Vaccination',
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.date || !formData.time || !formData.type) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const appointment = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    onSubmit(appointment);
    
    // Reset form
    setFormData({
      date: '',
      time: '',
      type: '',
      reason: '',
      patientName: '',
      phone: '',
    });

    toast({
      title: "Success",
      description: "Appointment booked successfully!",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-teal-100">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-teal-900">
          <Calendar className="w-5 h-5" />
          <span>Book New Appointment</span>
        </CardTitle>
        <CardDescription>Schedule your visit with Elizabeth Clinic</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patient-name" className="text-teal-900">Patient Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                <Input
                  id="patient-name"
                  type="text"
                  placeholder="Enter patient name"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange('patientName', e.target.value)}
                  className="pl-10 border-teal-200 focus:border-teal-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-teal-900">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="border-teal-200 focus:border-teal-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-teal-900">Appointment Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="pl-10 border-teal-200 focus:border-teal-500"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-teal-900">Time</Label>
              <Select onValueChange={(value) => handleInputChange('time', value)} required>
                <SelectTrigger className="border-teal-200 focus:border-teal-500">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-teal-500" />
                    <SelectValue placeholder="Select time" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-teal-900">Appointment Type</Label>
            <Select onValueChange={(value) => handleInputChange('type', value)} required>
              <SelectTrigger className="border-teal-200 focus:border-teal-500">
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason" className="text-teal-900">Reason for Visit</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
              <Textarea
                id="reason"
                placeholder="Describe your symptoms or reason for visit"
                value={formData.reason}
                onChange={(e) => handleInputChange('reason', e.target.value)}
                className="pl-10 border-teal-200 focus:border-teal-500 min-h-[100px]"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
          >
            Book Appointment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;
