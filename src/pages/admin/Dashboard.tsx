import React from 'react';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { StatsCard } from '../../components/admin/StatsCard';
import { ShoppingBag, Heart, Store, Mail, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { date: 'Mon', orders: 12 },
  { date: 'Tue', orders: 19 },
  { date: 'Wed', orders: 15 },
  { date: 'Thu', orders: 25 },
  { date: 'Fri', orders: 32 },
  { date: 'Sat', orders: 38 },
  { date: 'Sun', orders: 28 },
];

const recentActivity = [
  { id: 1, text: 'New order from Green Bowl Kitchen', time: '2 minutes ago' },
  { id: 2, text: 'Donation photo uploaded for Order #1234', time: '15 minutes ago' },
  { id: 3, text: 'New restaurant registered: Ocean Bites', time: '1 hour ago' },
  { id: 4, text: 'Email collected from donation order', time: '2 hours ago' },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>
        
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Orders Today"
            value="38"
            icon={<ShoppingBag className="h-6 w-6" />}
            trend="+12% from yesterday"
          />
          <StatsCard
            title="Total Donations Today"
            value="15"
            icon={<Heart className="h-6 w-6" />}
            trend="+8% from yesterday"
          />
          <StatsCard
            title="Restaurants"
            value="12"
            icon={<Store className="h-6 w-6" />}
          />
          <StatsCard
            title="Emails Collected"
            value="248"
            icon={<Mail className="h-6 w-6" />}
            trend="+23 this week"
          />
        </div>
        
        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-xl border bg-card p-6">
              <div className="mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2>Orders Over Time</h2>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#1A5C4E" 
                    strokeWidth={2}
                    dot={{ fill: '#1A5C4E', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="rounded-xl border bg-card p-6">
            <h2 className="mb-6">Recent Activity</h2>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <p className="text-foreground">{activity.text}</p>
                  <p className="text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
