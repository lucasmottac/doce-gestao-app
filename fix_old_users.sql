-- Dá permissão de COOKIES para TODO MUNDO que já existe no banco
-- Isso vai resolver o problema de quem comprou antes da atualização

UPDATE public.profiles
SET roles = array_append(COALESCE(roles, '{}'), 'acookies')
WHERE roles IS NULL OR NOT (roles @> ARRAY['acookies']);
