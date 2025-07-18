
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';

interface AddMovieFormProps {
  onMovieAdded: () => void;
}

const AddMovieForm = ({ onMovieAdded }: AddMovieFormProps) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [voteAverage, setVoteAverage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !voteAverage) {
      toast.error('Please fill in title and rating');
      return;
    }

    const rating = parseFloat(voteAverage);
    if (isNaN(rating) || rating < 0 || rating > 10) {
      toast.error('Rating must be a number between 0 and 10');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('movies')
        .insert({
          title,
          tagline: tagline || null,
          vote_average: rating,
        });

      if (error) throw error;
      
      toast.success('Movie added successfully!');
      setTitle('');
      setTagline('');
      setVoteAverage('');
      setShowForm(false);
      onMovieAdded();
    } catch (error: any) {
      toast.error(error.message || 'Error adding movie');
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return (
      <Button 
        onClick={() => setShowForm(true)}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Movie
      </Button>
    );
  }

  return (
    <Card className="bg-gray-900 border-gray-800 mb-6">
      <CardHeader>
        <CardTitle className="text-white">Add New Movie</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Movie title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            required
          />
          <Textarea
            placeholder="Movie tagline (optional)"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            rows={2}
          />
          <Input
            type="number"
            step="0.1"
            min="0"
            max="10"
            placeholder="Rating (0-10)"
            value={voteAverage}
            onChange={(e) => setVoteAverage(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            required
          />
          <div className="flex space-x-2">
            <Button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              {loading ? 'Adding...' : 'Add Movie'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForm(false)}
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMovieForm;
