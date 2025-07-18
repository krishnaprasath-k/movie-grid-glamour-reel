
-- Create movies table to store movie data
CREATE TABLE public.movies (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  tagline TEXT,
  vote_average DECIMAL(3,1),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create user_profiles table to store additional user info
CREATE TABLE public.user_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Insert movie data from our existing JSON
INSERT INTO public.movies (title, tagline, vote_average) VALUES
  ('The Shawshank Redemption', 'Fear can hold you prisoner. Hope can set you free.', 9.3),
  ('The Godfather', 'An offer you can refuse.', 9.2),
  ('The Dark Knight', 'Welcome to a world without rules.', 9.0),
  ('Pulp Fiction', 'Just because you are a character doesn''t mean you have character.', 8.9),
  ('Forrest Gump', 'Life is like a box of chocolates...', 8.8),
  ('Inception', 'Your mind is the scene of the crime.', 8.8),
  ('The Matrix', 'Free your mind.', 8.7),
  ('Goodfellas', 'Three decades of life in the mafia.', 8.7),
  ('The Lord of the Rings: The Return of the King', 'The eye of the enemy is moving.', 8.9),
  ('Schindler''s List', 'Whoever saves one life, saves the world entire.', 8.9),
  ('Fight Club', 'Mischief. Mayhem. Soap.', 8.8),
  ('The Lord of the Rings: The Fellowship of the Ring', 'One ring to rule them all.', 8.8);

-- Enable Row Level Security
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for movies (all authenticated users can read, only admins can write)
CREATE POLICY "Anyone can view movies" ON public.movies FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can insert movies" ON public.movies FOR INSERT TO authenticated 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- RLS policies for user_profiles
CREATE POLICY "Users can view their own profile" ON public.user_profiles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert their own profile" ON public.user_profiles FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own profile" ON public.user_profiles FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, role)
  VALUES (new.id, 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
