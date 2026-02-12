-- Create a table to track completed recipes
create table completed_recipes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  recipe_title text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, recipe_title)
);

-- Set up RLS
alter table completed_recipes enable row level security;

create policy "Users can view their own completed recipes" on completed_recipes
  for select using (auth.uid() = user_id);

create policy "Users can insert their own completed recipes" on completed_recipes
  for insert with check (auth.uid() = user_id);

create policy "Users can delete their own completed recipes" on completed_recipes
  for delete using (auth.uid() = user_id);
