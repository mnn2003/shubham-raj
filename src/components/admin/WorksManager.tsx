import { useState } from 'react';
import { ref, push, remove } from 'firebase/database';
import { database } from '@/lib/firebase';
import { useWorks } from '@/hooks/useFirebaseData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

const WorksManager = () => {
  const { works } = useWorks();
  const [newWork, setNewWork] = useState({
    title: '',
    category: '',
    year: '',
    role: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!newWork.title || !newWork.category || !newWork.year || !newWork.role) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await push(ref(database, 'works'), {
        ...newWork,
        order: works.length
      });
      toast.success('Work added successfully!');
      setNewWork({ title: '', category: '', year: '', role: '', description: '' });
    } catch (error) {
      toast.error('Failed to add work');
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await remove(ref(database, `works/${id}`));
      toast.success('Work deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete work');
    }
  };

  return (
    <div className="space-y-6 bg-card p-6 rounded-lg border border-border">
      <h2 className="text-2xl font-bold">Manage Works</h2>
      
      <div className="space-y-4 border-b border-border pb-6">
        <h3 className="text-xl font-semibold">Add New Work</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Title *</Label>
            <Input
              value={newWork.title}
              onChange={(e) => setNewWork({ ...newWork, title: e.target.value })}
            />
          </div>
          <div>
            <Label>Category *</Label>
            <Input
              value={newWork.category}
              onChange={(e) => setNewWork({ ...newWork, category: e.target.value })}
              placeholder="Short Film, Ad Film, etc."
            />
          </div>
          <div>
            <Label>Year *</Label>
            <Input
              value={newWork.year}
              onChange={(e) => setNewWork({ ...newWork, year: e.target.value })}
            />
          </div>
          <div>
            <Label>Role *</Label>
            <Input
              value={newWork.role}
              onChange={(e) => setNewWork({ ...newWork, role: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <Textarea
              value={newWork.description}
              onChange={(e) => setNewWork({ ...newWork, description: e.target.value })}
            />
          </div>
        </div>
        <Button 
          onClick={handleAdd} 
          disabled={loading}
          className="bg-gradient-primary hover:opacity-90"
        >
          {loading ? 'Adding...' : 'Add Work'}
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Current Works</h3>
        <div className="space-y-4">
          {works.map((work) => (
            <div key={work.id} className="bg-secondary/50 p-4 rounded-lg flex justify-between items-start">
              <div>
                <h4 className="font-bold text-lg">{work.title}</h4>
                <p className="text-sm text-muted-foreground">{work.category} • {work.year} • {work.role}</p>
                {work.description && <p className="text-sm mt-2">{work.description}</p>}
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(work.id)}
              >
                <Trash2 size={20} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorksManager;
