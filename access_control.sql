-- Add roles column to profiles if it doesn't exist
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'roles') then
    alter table public.profiles add column roles text[] default '{}';
  end if;
end $$;

-- Function to securely update roles (append-only logic to avoid overwrites)
create or replace function public.update_user_roles(
  user_id uuid,
  new_role text
)
returns void as $$
declare
  current_roles text[];
begin
  -- Get current roles
  select roles into current_roles from public.profiles where id = user_id;

  -- Initialize if null
  if current_roles is null then
    current_roles := '{}';
  end if;

  -- Add new role if not exists
  if not (current_roles @> array[new_role]) then
    update public.profiles
    set roles = array_append(current_roles, new_role)
    where id = user_id;
  end if;
end;
$$ language plpgsql security definer;

-- Grant execute permission to service_role (for webhooks)
grant execute on function public.update_user_roles(uuid, text) to service_role;
