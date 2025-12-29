import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Tag, 
  CreditCard, 
  Activity,
  Heart,
  Dumbbell,
  Award,
  FileText,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UserRegistrationData {
  id: string;
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  
  // Address Information
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  // Fitness Profile
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  primaryGoals: string[];
  workoutFrequency: string;
  preferredWorkoutTypes: string[];
  medicalConditions: string;
  injuries: string;
  height: string;
  weight: string;
  bmi: number;
  
  // Membership Details
  membershipType: 'basic' | 'premium' | 'elite' | 'event-only';
  registrationDate: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  
  // Payment Information
  paymentMethod: 'card' | 'paypal' | 'bank-transfer';
  subscriptionPlan: string;
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  
  // Event Preferences
  interestedEventTypes: string[];
  eventsAttended: number;
  upcomingEvents: string[];
  
  // Trainer Preferences (if applicable)
  preferredTrainer: string;
  trainingType: string;
  
  // Additional Information
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  notes: string;
}

interface UserRegistrationDetailsProps {
  userData: UserRegistrationData;
  onEdit?: () => void;
  onContact?: () => void;
  onViewActivity?: () => void;
}

const UserRegistrationDetails: React.FC<UserRegistrationDetailsProps> = ({
  userData,
  onEdit,
  onContact,
  onViewActivity
}) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get membership badge color
  const getMembershipColor = (type: string) => {
    switch (type) {
      case 'elite': return 'bg-purple-100 text-purple-800';
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'basic': return 'bg-gray-100 text-gray-800';
      case 'event-only': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate BMI category
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`} />
            <AvatarFallback>
              {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">
              {userData.firstName} {userData.lastName}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={getStatusColor(userData.status)}>
                {userData.status.toUpperCase()}
              </Badge>
              <Badge className={getMembershipColor(userData.membershipType)}>
                {userData.membershipType.toUpperCase()}
              </Badge>
              <span className="text-sm text-gray-500">
                Member since {formatDate(userData.registrationDate)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            Edit Profile
          </Button>
          <Button variant="outline" size="sm" onClick={onContact}>
            Contact User
          </Button>
          <Button size="sm" onClick={onViewActivity}>
            View Activity
          </Button>
        </div>
      </div>

      {/* Tabs for Organized Information */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-6">
          <TabsTrigger value="personal">
            <User className="h-4 w-4 mr-2" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="fitness">
            <Dumbbell className="h-4 w-4 mr-2" />
            Fitness
          </TabsTrigger>
          <TabsTrigger value="membership">
            <CreditCard className="h-4 w-4 mr-2" />
            Membership
          </TabsTrigger>
          <TabsTrigger value="events">
            <Calendar className="h-4 w-4 mr-2" />
            Events
          </TabsTrigger>
          <TabsTrigger value="medical">
            <Activity className="h-4 w-4 mr-2" />
            Medical
          </TabsTrigger>
          <TabsTrigger value="notes">
            <FileText className="h-4 w-4 mr-2" />
            Notes
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">First Name</p>
                    <p className="font-medium">{userData.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Name</p>
                    <p className="font-medium">{userData.lastName}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      Email
                    </p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      Phone
                    </p>
                    <p className="font-medium">{userData.phone}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Date of Birth
                    </p>
                    <p className="font-medium">{formatDate(userData.dateOfBirth)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium capitalize">{userData.gender}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Street Address</p>
                  <p className="font-medium">{userData.address.street}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">City</p>
                    <p className="font-medium">{userData.address.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">State</p>
                    <p className="font-medium">{userData.address.state}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">ZIP Code</p>
                    <p className="font-medium">{userData.address.zipCode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Country</p>
                    <p className="font-medium">{userData.address.country}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{userData.emergencyContact.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Relationship</p>
                    <p className="font-medium">{userData.emergencyContact.relationship}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      Phone
                    </p>
                    <p className="font-medium">{userData.emergencyContact.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Fitness Profile Tab */}
        <TabsContent value="fitness" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Dumbbell className="h-5 w-5" />
                  Fitness Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Fitness Level</p>
                    <Badge className="capitalize">
                      {userData.fitnessLevel}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Workout Frequency</p>
                    <p className="font-medium">{userData.workoutFrequency}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Height</p>
                    <p className="font-medium">{userData.height}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-medium">{userData.weight}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">BMI</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{userData.bmi.toFixed(1)}</p>
                      <Badge variant="outline">
                        {getBMICategory(userData.bmi)}
                      </Badge>
                    </div>
                  </div>
                  {userData.preferredTrainer && (
                    <div>
                      <p className="text-sm text-gray-500">Preferred Trainer</p>
                      <p className="font-medium">{userData.preferredTrainer}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Goals & Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Primary Goals</p>
                  <div className="flex flex-wrap gap-2">
                    {userData.primaryGoals.map((goal, index) => (
                      <Badge key={index} variant="secondary">
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">Preferred Workout Types</p>
                  <div className="flex flex-wrap gap-2">
                    {userData.preferredWorkoutTypes.map((type, index) => (
                      <Badge key={index} variant="outline">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {userData.trainingType && (
                  <div>
                    <p className="text-sm text-gray-500">Training Type</p>
                    <p className="font-medium">{userData.trainingType}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Membership Tab */}
        <TabsContent value="membership" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Membership Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Membership Type</p>
                    <Badge className={getMembershipColor(userData.membershipType)}>
                      {userData.membershipType.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <Badge className={getStatusColor(userData.status)}>
                      {userData.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Registration Date</p>
                    <p className="font-medium">{formatDate(userData.registrationDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Active</p>
                    <p className="font-medium">{formatDate(userData.lastActive)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Subscription Plan</p>
                    <p className="font-medium">{userData.subscriptionPlan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Billing Cycle</p>
                    <p className="font-medium capitalize">{userData.billingCycle}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium capitalize">{userData.paymentMethod}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  User Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-500">Events Attended</p>
                    <p className="text-2xl font-bold">{userData.eventsAttended}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-500">Account Status</p>
                    <p className="text-lg font-medium capitalize">{userData.status}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">
                      {new Date(userData.registrationDate).getFullYear()}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-500">Activity Level</p>
                    <p className="font-medium capitalize">{userData.fitnessLevel}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Event Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Interested Event Types</p>
                  <div className="flex flex-wrap gap-2">
                    {userData.interestedEventTypes.map((type, index) => (
                      <Badge key={index} variant="secondary">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Total Events Attended</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-2xl font-bold">{userData.eventsAttended}</p>
                    <Badge variant="outline">
                      Active Participant
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>
                  Events this user is registered for
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userData.upcomingEvents.length > 0 ? (
                  <ul className="space-y-3">
                    {userData.upcomingEvents.map((event, index) => (
                      <li key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{event}</p>
                          <p className="text-sm text-gray-500">Registered on {formatDate(userData.registrationDate)}</p>
                        </div>
                        <Badge variant="outline">Confirmed</Badge>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No upcoming events registered
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Medical Tab */}
        <TabsContent value="medical" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Medical Information
                </CardTitle>
                <CardDescription>
                  Important health information for training safety
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Medical Conditions</p>
                  <div className="p-3 border rounded-lg">
                    {userData.medicalConditions || 'No medical conditions reported'}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">Injuries</p>
                  <div className="p-3 border rounded-lg">
                    {userData.injuries || 'No injuries reported'}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Health Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Body Mass Index (BMI)</span>
                    <span className="font-bold">{userData.bmi.toFixed(1)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        userData.bmi < 18.5 ? 'bg-blue-500' :
                        userData.bmi < 25 ? 'bg-green-500' :
                        userData.bmi < 30 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(userData.bmi * 3, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Underweight</span>
                    <span>Normal</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-3 border rounded-lg">
                    <p className="text-sm text-gray-500">Height</p>
                    <p className="text-lg font-bold">{userData.height}</p>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="text-lg font-bold">{userData.weight}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Admin Notes & Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Additional Notes</p>
                  <div className="p-4 border rounded-lg min-h-[100px]">
                    {userData.notes || 'No additional notes provided'}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="font-mono text-sm">{userData.id}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm text-gray-500">Profile Completion</p>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm text-gray-500">Communication Preference</p>
                    <p className="font-medium">Email & SMS</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserRegistrationDetails;

// Example usage component for the admin page
export function AdminUserDetailsPage() {
  // Example user data - you would fetch this from your API
  const exampleUserData: UserRegistrationData = {
    id: 'USR-2024-00123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    
    address: {
      street: '123 Fitness Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    
    fitnessLevel: 'intermediate',
    primaryGoals: ['Weight Loss', 'Muscle Gain', 'Improved Endurance'],
    workoutFrequency: '3-4 times per week',
    preferredWorkoutTypes: ['Strength Training', 'Cardio', 'HIIT', 'Yoga'],
    medicalConditions: 'Mild asthma, controlled with inhaler',
    injuries: 'None currently',
    height: "5'10\"",
    weight: '175 lbs',
    bmi: 24.5,
    
    membershipType: 'premium',
    registrationDate: '2024-01-15',
    lastActive: '2024-03-20',
    status: 'active',
    
    paymentMethod: 'card',
    subscriptionPlan: 'Premium Fitness',
    billingCycle: 'monthly',
    
    interestedEventTypes: ['Marathons', 'Yoga Retreats', 'Strength Competitions'],
    eventsAttended: 12,
    upcomingEvents: ['Spring Marathon 2024', 'Summer Yoga Retreat'],
    
    preferredTrainer: 'Sarah Johnson',
    trainingType: 'Personal Training',
    
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543'
    },
    notes: 'Highly motivated client. Prefers morning sessions. Interested in advanced strength training.'
  };

  const handleEdit = () => {
    console.log('Edit user profile');
    // Implement edit functionality
  };

  const handleContact = () => {
    console.log('Contact user');
    // Implement contact functionality
  };

  const handleViewActivity = () => {
    console.log('View user activity');
    // Implement view activity functionality
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">User Registration Details</h1>
        <p className="text-gray-500">Complete profile information for administrative purposes</p>
      </div>
      
      <UserRegistrationDetails
        userData={exampleUserData}
        onEdit={handleEdit}
        onContact={handleContact}
        onViewActivity={handleViewActivity}
      />
    </div>
  );
}