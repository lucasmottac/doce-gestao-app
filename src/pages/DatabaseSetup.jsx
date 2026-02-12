import React, { useState } from 'react';
import { Copy, ExternalLink, Check, AlertTriangle, Database } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Layout from '../components/Layout';

const DatabaseSetup = () => {
    const [copied, setCopied] = useState(false);

    const sqlCommand = `

-- 1. SALES TABLE
create table if not exists sales (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  product_name text not null,
  quantity integer default 1,
  price_per_unit numeric not null,
  total_amount numeric not null,
  cost_per_unit numeric,
  profit numeric,
  payment_method text, 
  sale_date timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table sales enable row level security;

drop policy if exists "Users can view their own sales" on sales;
create policy "Users can view their own sales" on sales for select using (auth.uid() = user_id);

drop policy if exists "Users can insert their own sales" on sales;
create policy "Users can insert their own sales" on sales for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update their own sales" on sales;
create policy "Users can update their own sales" on sales for update using (auth.uid() = user_id);

drop policy if exists "Users can delete their own sales" on sales;
create policy "Users can delete their own sales" on sales for delete using (auth.uid() = user_id);

-- 2. COMPLETED RECIPES (Progress)
create table if not exists completed_recipes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  recipe_title text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, recipe_title)
);
alter table completed_recipes enable row level security;

drop policy if exists "Users can view their own completed recipes" on completed_recipes;
create policy "Users can view their own completed recipes" on completed_recipes for select using (auth.uid() = user_id);

drop policy if exists "Users can insert their own completed recipes" on completed_recipes;
create policy "Users can insert their own completed recipes" on completed_recipes for insert with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own completed recipes" on completed_recipes;
create policy "Users can delete their own completed recipes" on completed_recipes for delete using (auth.uid() = user_id);

-- 3. SAVED CALCULATIONS (Calculator)
create table if not exists saved_calculations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  recipe_name text,
  yield_amount numeric,
  ingredients_cost numeric,
  total_cost numeric,
  suggested_price numeric,
  profit_margin numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table saved_calculations enable row level security;

drop policy if exists "Users can view their own calculations" on saved_calculations;
create policy "Users can view their own calculations" on saved_calculations for select using (auth.uid() = user_id);

drop policy if exists "Users can insert their own calculations" on saved_calculations;
create policy "Users can insert their own calculations" on saved_calculations for insert with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own calculations" on saved_calculations;
create policy "Users can delete their own calculations" on saved_calculations for delete using (auth.uid() = user_id);

-- 4. ACHIEVEMENTS
create table if not exists user_achievements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  achievement_id text not null,
  unlocked_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, achievement_id)
);
alter table user_achievements enable row level security;

drop policy if exists "Users can view their own achievements" on user_achievements;
create policy "Users can view their own achievements" on user_achievements for select using (auth.uid() = user_id);

drop policy if exists "Users can insert their own achievements" on user_achievements;
create policy "Users can insert their own achievements" on user_achievements for insert with check (auth.uid() = user_id);

-- 5. UPDATE PROFILES (Statistics)
alter table profiles 
add column if not exists last_login timestamp with time zone,
add column if not exists login_streak integer default 0,
add column if not exists total_logins integer default 0;
`;

    const handleCopy = () => {
        navigator.clipboard.writeText(sqlCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const projectRef = supabaseUrl ? supabaseUrl.split('.')[0].split('//')[1] : '';
    const sqlEditorUrl = projectRef ? `https://supabase.com/dashboard/project/${projectRef}/sql/new` : 'https://supabase.com/dashboard';

    return (
        <Layout>
            <div className="max-w-4xl mx-auto pt-8 pb-20">
                <div className="flex items-center gap-3 mb-8">
                    <Database className="text-emerald-400" size={32} />
                    <h1 className="text-3xl font-extrabold text-white">Configuração do Banco de Dados</h1>
                </div>

                <GlassCard className="p-8 mb-8 !bg-red-500/10 !border-red-500/20">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-red-500/20 rounded-full text-red-400">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Ação Necessária</h3>
                            <p className="text-white/70 mb-4">
                                Para que o sistema de vendas funcione, você precisa criar as tabelas no seu banco de dados Supabase.
                                Eu não consigo fazer isso automaticamente por motivos de segurança.
                            </p>
                        </div>
                    </div>
                </GlassCard>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="relative">
                            <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-emerald-500/30"></div>
                            <div className="space-y-6">
                                <div className="relative">
                                    <div className="absolute -left-[25px] top-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold text-xs ring-4 ring-black">1</div>
                                    <h4 className="text-white font-bold text-lg mb-2">Copie o Código SQL</h4>
                                    <p className="text-white/50 text-sm">Este código cria a tabela de vendas e configura as permissões de segurança.</p>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[25px] top-1 w-6 h-6 rounded-full bg-neutral-700 flex items-center justify-center text-white font-bold text-xs ring-4 ring-black">2</div>
                                    <h4 className="text-white font-bold text-lg mb-2">Abra o Editor SQL</h4>
                                    <p className="text-white/50 text-sm mb-3">Clique no botão abaixo para abrir o editor SQL do seu projeto Supabase.</p>
                                    <a
                                        href={sqlEditorUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                                    >
                                        Abrir Supabase SQL <ExternalLink size={16} />
                                    </a>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[25px] top-1 w-6 h-6 rounded-full bg-neutral-700 flex items-center justify-center text-white font-bold text-xs ring-4 ring-black">3</div>
                                    <h4 className="text-white font-bold text-lg mb-2">Execute o Comando</h4>
                                    <p className="text-white/50 text-sm">Cole o código no editor e clique em <strong>RUN</strong>.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <GlassCard className="p-0 overflow-hidden flex flex-col">
                        <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                            <span className="text-xs font-mono text-white/50">schema.sql</span>
                            <button
                                onClick={handleCopy}
                                className={`flex items-center gap-2 text-xs font-bold py-1.5 px-3 rounded-lg transition-all ${copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white hover:bg-white/20'}`}
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? 'Copiado!' : 'Copiar Código'}
                            </button>
                        </div>
                        <div className="flex-1 p-4 bg-[#0d1117] overflow-auto max-h-[400px]">
                            <pre className="text-xs font-mono text-white/80 whitespace-pre-wrap">{sqlCommand}</pre>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </Layout>
    );
};

export default DatabaseSetup;
