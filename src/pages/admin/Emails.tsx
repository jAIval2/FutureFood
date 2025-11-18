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
import { Switch } from '../../components/ui/switch';

const mockEmails = [
  {
    id: 1,
    email: 'supporter@email.com',
    orderId: 'ORD-1001',
    consent: true,
    date: '2025-11-18',
  },
  {
    id: 2,
    email: 'helper@email.com',
    orderId: 'ORD-1002',
    consent: true,
    date: '2025-11-18',
  },
  {
    id: 3,
    email: 'kind@email.com',
    orderId: 'ORD-1003',
    consent: true,
    date: '2025-11-18',
  },
  {
    id: 4,
    email: 'generous@email.com',
    orderId: 'ORD-1004',
    consent: false,
    date: '2025-11-17',
  },
  {
    id: 5,
    email: 'caring@email.com',
    orderId: 'ORD-1005',
    consent: true,
    date: '2025-11-17',
  },
  {
    id: 6,
    email: 'community@email.com',
    orderId: 'ORD-1006',
    consent: true,
    date: '2025-11-17',
  },
  {
    id: 7,
    email: 'local@email.com',
    orderId: 'ORD-1007',
    consent: true,
    date: '2025-11-16',
  },
  {
    id: 8,
    email: 'earth@email.com',
    orderId: 'ORD-1008',
    consent: false,
    date: '2025-11-16',
  },
];

export const AdminEmails: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="mb-2">Emails Collected</h1>
          <p className="text-muted-foreground">
            Manage email addresses from donation orders
          </p>
        </div>
        
        <div className="mb-4 rounded-xl bg-accent/10 p-4">
          <p className="text-accent-foreground">
            Total emails collected: <strong>{mockEmails.length}</strong> | 
            Opted in: <strong>{mockEmails.filter(e => e.consent).length}</strong>
          </p>
        </div>
        
        <div className="rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email Address</TableHead>
                <TableHead>Linked Order ID</TableHead>
                <TableHead>Marketing Consent</TableHead>
                <TableHead>Date Collected</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEmails.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-primary">{item.email}</TableCell>
                  <TableCell>{item.orderId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Switch checked={item.consent} />
                      {item.consent ? (
                        <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                          Opted In
                        </Badge>
                      ) : (
                        <Badge variant="outline">Opted Out</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};
