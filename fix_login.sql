-- Substitua 'EMAIL_DO_CLIENTE' pelo e-mail que você usou na compra
-- Ao rodar isso, a senha do usuário será resetada para: 12345678

UPDATE auth.users
SET 
    encrypted_password = crypt('12345678', gen_salt('bf')), -- Reseta senha para 12345678
    email_confirmed_at = COALESCE(email_confirmed_at, now()), -- Confirma o email se não estiver confirmado
    raw_app_meta_data = raw_app_meta_data || '{"provider": "email", "providers": ["email"]}'::jsonb
WHERE email = 'EMAIL_DO_CLIENTE'; -- COLOQUE O E-MAIL AQUI

-- Verifica se o perfil existe e se tem as permissões
INSERT INTO public.profiles (id, roles)
SELECT id, ARRAY['acookies']
FROM auth.users
WHERE email = 'EMAIL_DO_CLIENTE' -- COLOQUE O E-MAIL AQUI
ON CONFLICT (id) DO UPDATE
SET roles = CASE 
    WHEN NOT (profiles.roles @> ARRAY['acookies']) THEN array_append(profiles.roles, 'acookies')
    ELSE profiles.roles
END;
