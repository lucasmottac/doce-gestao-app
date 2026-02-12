-- Create table to track unlocked achievements
create table if not exists user_achievements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  achievement_id text not null,
  unlocked_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, achievement_id)
);

-- Enable RLS on user_achievements
alter table user_achievements enable row level security;

create policy "Users can view their own achievements" on user_achievements
  for select using (auth.uid() = user_id);

create policy "Users can insert their own achievements" on user_achievements
  for insert with check (auth.uid() = user_id);

-- Update profiles table to track login stats
alter table profiles 
add column if not exists last_login timestamp with time zone,
add column if not exists login_streak integer default 0,
add column if not exists total_logins integer default 0;

-- Optional: Create an achievements definition table if distinct from code constants
-- For now, we'll keep definitions in code for simplicity as requested.
