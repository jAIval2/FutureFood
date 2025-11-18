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
import { Upload } from 'lucide-react';

const mockDonations = [
  {
    id: 'DON-501',
    restaurant: 'Green Bowl Kitchen',
    item: 'Nourishing Bowl',
    email: 'supporter@email.com',
    status: 'Photo Sent',
    date: '2025-11-18',
  },
  {
    id: 'DON-502',
    restaurant: 'Harvest Moon Café',
    item: 'Comfort Meal',
    email: 'helper@email.com',
    status: 'Pending',
    date: '2025-11-18',
  },
  {
    id: 'DON-503',
    restaurant: 'Earthly Provisions',
    item: 'Plant Power Meal',
    email: 'kind@email.com',
    status: 'Pending',
    date: '2025-11-18',
  },
  {
    id: 'DON-504',
    restaurant: 'Green Bowl Kitchen',
    item: 'Nourishing Bowl',
    email: 'generous@email.com',
    status: 'Photo Sent',
    date: '2025-11-17',
  },
  {
    id: 'DON-505',
    restaurant: 'Harvest Moon Café',
    item: 'Comfort Meal',
    email: 'caring@email.com',
    status: 'Photo Sent',
    date: '2025-11-17',
  },
];

export const AdminDonations: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="mb-2">Donation Records</h1>
          <p className="text-muted-foreground">Track donated meals and upload photos</p>
        </div>
        
        <div className="rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donation ID</TableHead>
                <TableHead>Restaurant</TableHead>
                <TableHead>Donated Item</TableHead>
                <TableHead>Email to Send Photo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>{donation.id}</TableCell>
                  <TableCell>{donation.restaurant}</TableCell>
                  <TableCell>{donation.item}</TableCell>
                  <TableCell className="text-primary">{donation.email}</TableCell>
                  <TableCell>
                    {donation.status === 'Photo Sent' ? (
                      <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                        Photo Sent
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{donation.date}</TableCell>
                  <TableCell>
                    {donation.status === 'Pending' ? (
                      <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90">
                        <Upload className="h-4 w-4" />
                        Upload Photo
                      </button>
                    ) : (
                      <button className="rounded-lg border px-4 py-2 text-muted-foreground transition-colors hover:bg-secondary">
                        View Photo
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};
