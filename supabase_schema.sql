-- Create a table for public profiles (linked to auth.users)
create table profiles (
  id uuid references auth.users not null primary key,
  sales_goal numeric default 3000,
  business_name text
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Users can view their own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can insert their own profile" on profiles
  for insert with check (auth.uid() = id);

-- Create a table for saved calculations
create table saved_calculations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) not null,
  recipe_name text not null,
  yield_amount int not null,
  total_cost numeric not null,
  suggested_price numeric not null,
  ingredients_cost numeric not null,
  profit_margin numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for saved_calculations
alter table saved_calculations enable row level security;

create policy "Users can view their own calculations" on saved_calculations
  for select using (auth.uid() = user_id);

create policy "Users can insert their own calculations" on saved_calculations
  for insert with check (auth.uid() = user_id);

create policy "Users can delete their own calculations" on saved_calculations
  for delete using (auth.uid() = user_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, roles)
  values (new.id, ARRAY['acookies']);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
