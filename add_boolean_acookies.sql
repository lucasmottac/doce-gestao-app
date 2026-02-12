-- Adiciona a coluna 'acookies' (boolean) se ela não existir
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'acookies') THEN
        ALTER TABLE public.profiles ADD COLUMN acookies BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- Sincroniza: Quem já tem 'acookies' no array roles, ganha TRUE na coluna nova
UPDATE public.profiles
SET acookies = TRUE
WHERE roles @> ARRAY['acookies'];

-- Atualiza o trigger de novos usuários para já setar acookies = TRUE
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, roles, acookies)
  VALUES (new.id, ARRAY['acookies'], TRUE);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
