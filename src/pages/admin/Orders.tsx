import React from 'react';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const mockOrders = [
  {
    id: 'ORD-1001',
    restaurant: 'Green Bowl Kitchen',
    items: 'Rainbow Buddha Bowl x2',
    donation: true,
    email: true,
    status: 'Delivered',
    date: '2025-11-18 14:30',
  },
  {
    id: 'ORD-1002',
    restaurant: 'Harvest Moon Café',
    items: 'Wild Mushroom Risotto x1',
    donation: false,
    email: false,
    status: 'In Progress',
    date: '2025-11-18 14:15',
  },
  {
    id: 'ORD-1003',
    restaurant: 'Earthly Provisions',
    items: 'Jackfruit Tacos x3, Spring Rolls x2',
    donation: true,
    email: true,
    status: 'Pending',
    date: '2025-11-18 14:00',
  },
  {
    id: 'ORD-1004',
    restaurant: 'Green Bowl Kitchen',
    items: 'Green Goddess Salad x1',
    donation: false,
    email: false,
    status: 'Delivered',
    date: '2025-11-18 13:45',
  },
  {
    id: 'ORD-1005',
    restaurant: 'Harvest Moon Café',
    items: 'Rustic Vegetable Tart x2',
    donation: true,
    email: true,
    status: 'In Progress',
    date: '2025-11-18 13:30',
  },
];

export const AdminOrders: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-accent/20 text-accent-foreground';
      case 'In Progress':
        return 'bg-primary/20 text-primary';
      case 'Pending':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="mb-2">Orders</h1>
          <p className="text-muted-foreground">Manage and track all orders</p>
        </div>
        
        <div className="rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Restaurant</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Donation</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.restaurant}</TableCell>
                  <TableCell className="max-w-xs truncate">{order.items}</TableCell>
                  <TableCell>
                    {order.donation ? (
                      <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                        Yes
                      </Badge>
                    ) : (
                      <Badge variant="outline">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {order.email ? (
                      <Badge variant="secondary" className="bg-primary/20 text-primary">
                        Provided
                      </Badge>
                    ) : (
                      <Badge variant="outline">N/A</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select defaultValue={order.status}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};
