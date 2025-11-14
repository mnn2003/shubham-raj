import { useState, useEffect } from 'react';
import { ref, onValue, remove, update } from 'firebase/database';
import { database } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Trash2, Mail, MailOpen } from 'lucide-react';

interface ContactLead {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
  status: 'new' | 'read';
}

const ContactLeadsManager = () => {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const contactsRef = ref(database, 'contacts');
    
    const unsubscribe = onValue(contactsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const leadsList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        // Sort by timestamp, newest first
        leadsList.sort((a, b) => b.timestamp - a.timestamp);
        setLeads(leadsList);
      } else {
        setLeads([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await remove(ref(database, `contacts/${id}`));
      toast.success('Lead deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete lead');
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await update(ref(database, `contacts/${id}`), { status: 'read' });
      toast.success('Marked as read');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return <div className="text-center py-8">Loading leads...</div>;
  }

  return (
    <div className="space-y-6 bg-card p-6 rounded-lg border border-border">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Contact Leads</h2>
        <div className="text-sm text-muted-foreground">
          Total: {leads.length} | New: {leads.filter(l => l.status === 'new').length}
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No contact submissions yet
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div 
              key={lead.id} 
              className={`border rounded-lg p-4 space-y-3 ${
                lead.status === 'new' 
                  ? 'border-primary/50 bg-primary/5' 
                  : 'border-border'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {lead.status === 'new' ? (
                      <Mail className="w-4 h-4 text-primary" />
                    ) : (
                      <MailOpen className="w-4 h-4 text-muted-foreground" />
                    )}
                    <h3 className="font-semibold">{lead.name}</h3>
                    {lead.status === 'new' && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{lead.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(lead.timestamp)}
                  </p>
                </div>
                <div className="flex gap-2">
                  {lead.status === 'new' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkAsRead(lead.id)}
                    >
                      Mark Read
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(lead.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
              <div className="bg-background/50 rounded p-3 mt-2">
                <p className="text-sm whitespace-pre-wrap">{lead.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactLeadsManager;
