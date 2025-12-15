"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  ShoppingBag, 
  Book, 
  Dumbbell, 
  Users, 
  Mail, 
  MessageSquare,
  Image,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  ChevronRight,
  Package,
  TrendingUp,
  UserPlus,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Logo from '@/components/Logo';
import Link from 'next/link';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard' },
  { icon: Calendar, label: 'Events', key: 'events' },
  { icon: ShoppingBag, label: 'Shop / Products', key: 'shop' },
  { icon: Book, label: 'Book Management', key: 'book' },
  { icon: Dumbbell, label: 'Training', key: 'training' },
  { icon: Users, label: 'Subscribers', key: 'subscribers' },
  { icon: MessageSquare, label: 'Contact Messages', key: 'contacts' },
  { icon: Image, label: 'Media Library', key: 'media' },
  { icon: BarChart3, label: 'Analytics', key: 'analytics' },
];

// Mock data
const mockStats = [
  { title: 'Total Orders', value: '156', change: '+12%', icon: Package },
  { title: 'Revenue', value: '₦2.4M', change: '+8%', icon: DollarSign },
  { title: 'Subscribers', value: '1,234', change: '+23%', icon: UserPlus },
  { title: 'Page Views', value: '45.2K', change: '+15%', icon: TrendingUp },
];

const mockOrders = [
  { id: '#001', customer: 'John Doe', product: 'Tank Top - Black', amount: '₦8,500', status: 'Delivered', date: '2024-12-14' },
  { id: '#002', customer: 'Jane Smith', product: 'Training Shorts', amount: '₦12,000', status: 'Pending', date: '2024-12-14' },
  { id: '#003', customer: 'Mike Johnson', product: 'Workout Compass', amount: '₦5,000', status: 'Processing', date: '2024-12-13' },
  { id: '#004', customer: 'Sarah Williams', product: 'Sports Bra - Green', amount: '₦10,500', status: 'Delivered', date: '2024-12-13' },
];

const mockSubscribers = [
  { id: 1, email: 'john@example.com', name: 'John Doe', date: '2024-12-14', status: 'Active' },
  { id: 2, email: 'jane@example.com', name: 'Jane Smith', date: '2024-12-13', status: 'Active' },
  { id: 3, email: 'mike@example.com', name: 'Mike Johnson', date: '2024-12-12', status: 'Active' },
];

const mockContacts = [
  { id: 1, name: 'David Brown', email: 'david@example.com', subject: 'Training Inquiry', message: 'I would like to know more about personal training...', date: '2024-12-14', status: 'Unread' },
  { id: 2, name: 'Lisa Chen', email: 'lisa@example.com', subject: 'Event Registration', message: 'How can I register for Walk2Fitness 5.0?', date: '2024-12-13', status: 'Read' },
];

const mockProducts = [
  { id: 1, name: 'Performance Tank Top', price: '₦8,500', stock: 45, status: 'In Stock' },
  { id: 2, name: 'Training Shorts', price: '₦12,000', stock: 32, status: 'In Stock' },
  { id: 3, name: 'High-Waist Leggings', price: '₦15,000', stock: 5, status: 'Low Stock' },
  { id: 4, name: 'Sports Bra', price: '₦10,500', stock: 0, status: 'Out of Stock' },
];

const mockEvents = [
  { id: 1, name: 'Walk2Fitness 5.0', date: '2025-01-15', registrations: 234, status: 'Upcoming' },
  { id: 2, name: 'Jam2Fit Night', date: '2025-02-10', registrations: 156, status: 'Upcoming' },
  { id: 3, name: 'Afro Groove', date: '2024-11-20', registrations: 312, status: 'Completed' },
];

const Admin = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
      case 'active':
      case 'in stock':
      case 'completed':
        return 'bg-primary/10 text-primary';
      case 'pending':
      case 'upcoming':
      case 'low stock':
        return 'bg-secondary/50 text-foreground';
      case 'processing':
      case 'unread':
        return 'bg-tertiary/20 text-tertiary';
      case 'out of stock':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockStats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-primary mt-1">{stat.change} from last month</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest orders from your shop</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>{order.amount}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case 'events':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Events Management</h2>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" /> Add Event
              </Button>
            </div>
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Registrations</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.name}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.registrations}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case 'shop':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Products Management</h2>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" /> Add Product
              </Button>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search products..." className="pl-10" />
              </div>
              <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
            </div>
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case 'subscribers':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Newsletter Subscribers</h2>
              <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export CSV</Button>
            </div>
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Subscribed Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSubscribers.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell className="font-medium">{sub.name}</TableCell>
                        <TableCell>{sub.email}</TableCell>
                        <TableCell>{sub.date}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(sub.status)}>{sub.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case 'contacts':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Contact Messages</h2>
            <div className="space-y-4">
              {mockContacts.map((contact) => (
                <Card key={contact.id} className={contact.status === 'Unread' ? 'border-primary' : ''}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {contact.name}
                          {contact.status === 'Unread' && <Badge className="bg-tertiary/20 text-tertiary">New</Badge>}
                        </CardTitle>
                        <CardDescription>{contact.email} • {contact.date}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium mb-2">{contact.subject}</p>
                    <p className="text-muted-foreground">{contact.message}</p>
                    <Button variant="outline" className="mt-4">Reply via Email</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'book':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Workout Compass Management</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Book Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input defaultValue="Workout Compass" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Price</label>
                    <Input defaultValue="₦5,000" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <textarea className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue="A practical fitness guide designed to help beginners and experienced gym-goers..." />
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">Update Details</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Sales Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Downloads</span>
                      <span className="font-bold">342</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Revenue</span>
                      <span className="font-bold">₦1,710,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sample Downloads</span>
                      <span className="font-bold">1,245</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'training':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Training Bookings</h2>
              <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
            </div>
            <Tabs defaultValue="pending">
              <TabsList>
                <TabsTrigger value="pending">Pending (5)</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed (12)</TabsTrigger>
                <TabsTrigger value="completed">Completed (45)</TabsTrigger>
              </TabsList>
              <TabsContent value="pending" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground text-center py-8">Connect backend to view real bookings</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 'media':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Media Library</h2>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" /> Upload Media
              </Button>
            </div>
            <Tabs defaultValue="images">
              <TabsList>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
              </TabsList>
              <TabsContent value="images" className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <Image className="w-8 h-8 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics Overview</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Page Views</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground">Chart placeholder</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { page: 'Home', views: '12,345' },
                      { page: 'Shop', views: '8,234' },
                      { page: 'Events', views: '5,678' },
                      { page: 'Book', views: '3,456' },
                    ].map((item) => (
                      <div key={item.page} className="flex justify-between items-center">
                        <span className="text-muted-foreground">{item.page}</span>
                        <span className="font-medium">{item.views}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-card border-r border-border transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            {/* <Logo className="w-10 h-10" /> */}
            {sidebarOpen && <span className="font-bold text-lg">Admin Panel</span>}
          </div>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => setActiveSection(item.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                    activeSection === item.key
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            {sidebarOpen && <span className="font-medium">Back to Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-card border-b border-border px-6 py-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold capitalize">{activeSection}</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Mail className="w-4 h-4" />
              </Button>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                FA
              </div>
            </div>
          </div>
        </header>
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Admin;
