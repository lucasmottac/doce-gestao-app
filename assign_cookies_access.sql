-- Update the handle_new_user function to assign 'acookies' role by default
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, roles)
  values (new.id, ARRAY['acookies']);
  return new;
end;
$$ language plpgsql security definer;
