-- Create sales table for Financial CRM
create table if not exists sales (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  product_name text not null,
  quantity integer default 1,
  price_per_unit numeric not null,
  total_amount numeric not null,
  cost_per_unit numeric,
  profit numeric,
  payment_method text, -- 'pix', 'cash', 'card', 'other'
  sale_date timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table sales enable row level security;

create policy "Users can view their own sales" on sales
  for select using (auth.uid() = user_id);

create policy "Users can insert their own sales" on sales
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own sales" on sales
  for update using (auth.uid() = user_id);

create policy "Users can delete their own sales" on sales
  for delete using (auth.uid() = user_id);
