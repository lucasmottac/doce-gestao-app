
// Mock data generator for 66 recipes
const generateRecipes = () => {
    // 1. Image Pools (Fallbacks)
    const imagePools = {
        traditional: [
            '/cookie_traditional_1770262023965.png',
            '/cookie_dark_chocolate_1770262038297.png'
        ],
        gourmet: [
            '/cookie_red_velvet_1770262010302.png',
            '/cookie_pistachio_1770262068438.png'
        ],
        special: [
            '/cookie_lemon_1770262053081.png',
            '/cookie_special_vegan_dark_1770264161581.png'
        ]
    };

    // 2. Specific Mappings (Best Matches)
    const specificImages = {
        // Traditional
        "Clássico com Gotas": '/cookie_traditional_1770262023965.png',
        "Gotas de Chocolate Ao Leite": '/cookie_traditional_double_chocochips_1770311947895.png',
        "Aveia e Mel": '/cookie_trad_oatmeal_honey_1770264298216.png',
        "Funcional Aveia": '/cookie_trad_oatmeal_honey_1770264298216.png',
        "Chocolate 50%": '/cookie_dark_chocolate_1770262038297.png',
        "Chocochips Duplo": '/cookie_traditional_double_chocochips_1770311947895.png',

        // New Traditional Images
        "Baunilha Simples": '/cookie_traditional_vanilla_simple_1770311805730.png',
        "Formigueiro": '/cookie_traditional_sprinkles_1770311831138.png',
        "Coco Queimado": '/cookie_traditional_burnt_coconut_1770311858606.png',
        "Manteiga de Amendoim": '/cookie_traditional_peanut_butter_1770311879955.png',
        "Banana com Canela": '/cookie_traditional_banana_cinnamon_1770311893440.png',
        "Mesclado": '/cookie_traditional_marbled_1770311925342.png',
        "Crocante de Nozes": '/cookie_traditional_walnut_crunch_1770311973185.png',
        "Café Expresso": '/cookie_traditional_espresso_1770311987447.png',
        "Laranja Cristalizada": '/cookie_traditional_candied_orange_1770312012609.png',
        "Gengibre": '/cookie_traditional_ginger_1770312027112.png',
        "Shortbread": '/cookie_traditional_shortbread_1770312052105.png',
        "Amanteigado Simples": '/cookie_traditional_butter_1770312064475.png',

        // Fallbacks for quota-limited images (using similar generated ones)
        "Leite Ninho": '/cookie_traditional_butter_1770312064475.png', // Similar to Butter
        "Churros": '/cookie_traditional_banana_cinnamon_1770311893440.png', // Similar tones
        "Fubá com Erva Doce": '/cookie_traditional_vanilla_simple_1770311805730.png', // Similar to Vanilla
        "Limão Taiti": '/cookie_limao_taiti_1770606063418.png',
        "Maracujá": '/cookie_maracuja_1770606078373.png',

        // New Mappings for Remaining Traditional (Ensuring Uniqueness)
        "Chocolate Branco com Limão": '/cookie_choc_branco_limao_1770606107600.png',
        "Red Velvet Simples": '/cookie_red_velvet_simples_1770606130254.png',
        "Cappuccino com Avelã": '/cookie_cappuccino_avela_1770606154963.png',
        "Menta com Chocolate": '/cookie_menta_chocolate_1770606179335.png',
        "Morango com Suspiro": '/cookie_morango_suspiro_1770606202852.png',
        "Coco com Doce de Leite": '/cookie_coco_doce_leite_1770606228949.png',
        "Ameixa com Coco": '/cookie_ameixa_coco_1770606257244.png',
        "Milho com Goiabada": '/cookie_milho_goiabada_1770606283467.png',

        // --- GOURMET CATEGORY (Fully Mapped - Unique Images) ---
        // 1-15: Newly Generated Unique Images
        "Red Velvet com Cream Cheese": '/cookie_gourmet_red_velvet_cream_cheese_1770491127671.png',
        "Nutella Stuffed": '/cookie_gourmet_nutella_stuffed_1770491142298.png',
        "Kinder Bueno Supreme": '/cookie_gourmet_kinder_bueno_supreme_1770491157459.png',
        "Pistache Trufado": '/cookie_gourmet_pistache_trufado_1770491171623.png',
        "Ferrero Rocher": '/cookie_gourmet_ferrero_rocher_1770491185172.png',
        "Ninho com Nutella": '/cookie_gourmet_ninho_nutella_1770491209597.png',
        "Oreo Overload": '/cookie_gourmet_oreo_overload_1770491222088.png',
        "Caramelo Salgado": '/cookie_gourmet_caramelo_salgado_1770491234578.png',
        "S'mores (Marshmallow)": '/cookie_gourmet_smores_marshmallow_1770491247230.png',
        "Banoffee Pie": '/cookie_gourmet_banoffee_pie_1770491259992.png',
        "Torta de Limão": '/cookie_gourmet_torta_limao_1770491284051.png',
        "Cheesecake de Frutas Vermelhas": '/cookie_gourmet_cheesecake_vermelhas_1770491297943.png',
        "Dark Coffee Truffle": '/cookie_gourmet_dark_coffee_truffle_1770491323483.png',
        "Macadâmia Gold": '/cookie_gourmet_macadamia_gold_1770491336305.png',
        "White Choc Cranberry": '/cookie_gourmet_white_choc_cranberry_1770491348201.png',

        // 16-30: Mapped to Unique Existing Assets (Best Fit, No Repetition within Gourmet)
        "Rafaello (Coco e Amêndoa)": '/cookie_rafaello_coco_amendoa_1770606719142.png',
        "Romeu e Julieta": '/cookie_romeu_julieta_1770606733603.png',
        "Paçoca Cremosa": '/cookie_pacoca_cremosa_1770606761607.png',
        "Triple Chocolate": '/cookie_triple_chocolate_1770606791879.png',
        "Brownie Cookie": '/cookie_brownie_cookie_1770606809749.png',
        "Praliné de Avelã": '/cookie_praline_avela_1770646161990.png',
        "Doce de Leite Argentino": '/cookie_doce_leite_argentino_1770646185410.png',
        "Ovomaltine Vulcão": '/cookie_ovomaltine_vulcao_1770646202536.png',
        "Goiabada Cascão Premium": '/cookie_goiabada_cascao_1770646217921.png',
        "Lemon Pie Brulée": '/cookie_lemon_pie_brulee_1770646252538.png',
        "Prestígio Gold": '/cookie_prestigio_gold_1770646266227.png',
        "Chokito Crock": '/cookie_chokito_crock_1770646314675.png',
        "Diamante Negro": '/cookie_diamante_negro_1770646329718.png',
        "Alpino Suíço": '/cookie_alpino_suico_1770646367686.png',
        "Maracujá Trufado": '/cookie_maracuja_trufado_1770646381551.png',

        // Special Category Mappings (Mapped to Best Available Assets)
        "Vegano Dark": '/cookie_vegano_dark_1770734284056.png',
        "Low Carb Amêndoas": '/cookie_low_carb_amendoas_1770734299983.png',
        "Sem Glúten Mix": '/cookie_sem_gluten_mix_1770734329748.png',
        "Proteico Whey": '/cookie_proteico_whey_1770734369489.png',
        "Keto Coco": '/cookie_keto_coco_1770734405155.png',
        "Funcional Aveia": '/cookie_funcional_aveia_1770734455255.png', // Oat texture
        "Diet Chocolate": '/cookie_diet_chocolate_1770734472485.png', // Dark simple
        "Integral Castanhas": '/cookie_integral_castanhas_1770734513619.png', // Nutty
        "Sem Lactose Cacau": '/cookie_sem_lactose_cacau_1770734541187.png', // Dark/Vegan
        "Batata Doce Fit": '/cookie_brownie_cookie_1770606809749.png', // Fudgy/Dense

        "Abóbora com Especiarias (Pumpkin)": '/cookie_special_pumpkin_spice_1770264174459.png', // Existing asset
        "Matcha Green Tea": '/cookie_matcha_green_tea_1770734644570.png', // Green fallback
        "Lavanda e Mel": '/cookie_lavanda_mel_1770734750317.png', // Pale/Simple
        "Cardamomo Spice": '/cookie_traditional_ginger_1770312027112.png', // Spiced look
        "Pimenta Rosa": '/cookie_special_pimenta_rosa_v3_1770758214729.png', // Reddish tint
        "Flor de Sal & Dark": '/cookie_special_flor_de_sal_dark_1770736136748.png', // Dark with texture
        "Alfarroba": '/cookie_special_alfarroba_1770758235883.png', // Dark chips
        "Gergelim & Mel": '/cookie_trad_oatmeal_honey_1770264298216.png', // Grainy texture
        "Tâmaras e Nozes": '/cookie_traditional_walnut_crunch_1770311973185.png', // Nutty
        "Damasco Real": '/cookie_traditional_candied_orange_1770312012609.png', // Orange pieces

        "Figo Turco": '/cookie_ameixa_coco_1770606257244.png', // Dark fruit pieces
        "Cranberry & Pistache Fit": '/cookie_gourmet_pistache_trufado_1770491171623.png', // Green/Nuts
        "Keto Amendoim": '/cookie_pacoca_cremosa_1770606761607.png', // Peanut/Paçoca look
        "Vegano Banana Bread": '/cookie_traditional_banana_cinnamon_1770311893440.png', // Banana look
        "Low Carb Coco & Limão": '/cookie_limao_taiti_1770606063418.png', // Lemon/Coconut
        "Sem Glúten & Lactose": '/cookie_traditional_1770262023965.png', // Classic
        "Funcional Granola": '/cookie_trad_oatmeal_honey_1770264298216.png', // Grains
        "Proteico White": '/cookie_special_proteico_white_1770758258783.png', // Pale
        "Diet Coco": '/cookie_special_diet_coco_1770758280831.png', // Coconut
        "Integral Maçã": '/cookie_special_integral_maca_v2_1770758322032.png' // Apple/Cinnamon
    };

    const categories = {
        traditional: [
            "Clássico com Gotas", "Gotas de Chocolate Ao Leite", "Aveia e Mel", "Chocolate 50%", "Baunilha Simples",
            "Formigueiro", "Coco Queimado", "Manteiga de Amendoim", "Banana com Canela", "Mesclado",
            "Chocochips Duplo", "Crocante de Nozes", "Café Expresso", "Laranja Cristalizada", "Gengibre",
            "Shortbread", "Amanteigado Simples", "Leite Ninho", "Churros", "Fubá com Erva Doce",
            "Limão Taiti", "Maracujá",
            "Chocolate Branco com Limão", "Red Velvet Simples", "Cappuccino com Avelã", "Menta com Chocolate",
            "Morango com Suspiro", "Coco com Doce de Leite", "Ameixa com Coco", "Milho com Goiabada"
        ],
        gourmet: [
            "Red Velvet com Cream Cheese", "Nutella Stuffed", "Kinder Bueno Supreme", "Pistache Trufado", "Ferrero Rocher",
            "Ninho com Nutella", "Oreo Overload", "Caramelo Salgado", "S'mores (Marshmallow)", "Banoffee Pie",
            "Torta de Limão", "Cheesecake de Frutas Vermelhas", "Dark Coffee Truffle", "Macadâmia Gold", "White Choc Cranberry",
            "Rafaello (Coco e Amêndoa)", "Romeu e Julieta", "Paçoca Cremosa", "Triple Chocolate", "Brownie Cookie",
            "Praliné de Avelã", "Doce de Leite Argentino",
            "Ovomaltine Vulcão", "Goiabada Cascão Premium", "Lemon Pie Brulée", "Prestígio Gold", "Chokito Crock",
            "Diamante Negro", "Alpino Suíço", "Maracujá Trufado"
        ],
        special: [
            "Vegano Dark", "Low Carb Amêndoas", "Sem Glúten Mix", "Proteico Whey", "Keto Coco",
            "Funcional Aveia", "Diet Chocolate", "Integral Castanhas", "Sem Lactose Cacau", "Batata Doce Fit",
            "Abóbora com Especiarias (Pumpkin)", "Matcha Green Tea", "Lavanda e Mel", "Cardamomo Spice", "Pimenta Rosa",
            "Flor de Sal & Dark", "Alfarroba", "Gergelim & Mel", "Tâmaras e Nozes", "Damasco Real",
            "Figo Turco", "Cranberry & Pistache Fit",
            "Keto Amendoim", "Vegano Banana Bread", "Low Carb Coco & Limão", "Sem Glúten & Lactose",
            "Funcional Granola", "Proteico White", "Diet Coco", "Integral Maçã"
        ]
    };

    const traditionalDetails = {
        "Clássico com Gotas": {
            ingredients: ["200g Farinha de Trigo", "100g Manteiga sem Sal", "100g Açúcar Mascavo", "80g Açúcar Cristal", "1 Ovo", "1 col. chá Fermento", "150g Gotas de Chocolate"],
            prep: ["1. Misture a manteiga derretida com os açúcares até virar uma pasta.", "2. Coloque o ovo e um pouquinho de baunilha.", "3. Junte a farinha e o fermento e mexa.", "4. Coloque as gotas de chocolate.", "5. Deixe na geladeira por 20 min.", "6. Asse por 12-15 min (forno médio)."]
        },
        "Gotas de Chocolate Ao Leite": {
            ingredients: ["200g Farinha de Trigo", "100g Manteiga", "150g Açúcar", "1 Ovo", "200g Gotas de Chocolate ao Leite"],
            prep: ["1. Bata manteiga e açúcar na batedeira (ou na mão).", "2. Coloque o ovo e bata bem.", "3. Misture a farinha aos poucos.", "4. Coloque bastante chocolate.", "5. Faça bolinhas e asse por 15 min."]
        },
        "Aveia e Mel": {
            ingredients: ["150g Aveia em Flocos", "100g Farinha Integral", "80g Manteiga", "100g Mel", "1 col. chá Canela", "1 Ovo"],
            prep: ["1. Misture a aveia, farinha e canela numa vasilha.", "2. Em outra, misture manteiga derretida, mel e ovo.", "3. Junte tudo.", "4. Faça bolinhas e aperte um pouco.", "5. Asse até as bordas ficarem douradas (15 min)."]
        },
        "Chocolate 50%": {
            ingredients: ["180g Farinha", "50g Cacau em Pó 50%", "120g Manteiga", "150g Açúcar", "1 Ovo", "Raspas de Chocolate"],
            prep: ["1. Misture farinha e cacau.", "2. Bata manteiga e açúcar em outra vasilha.", "3. Junte tudo e mexa bem.", "4. Asse com cuidado para não queimar."]
        },
        "Baunilha Simples": {
            ingredients: ["250g Farinha de Trigo", "150g Manteiga", "120g Açúcar de Confeiteiro", "2 col. chá Baunilha", "1 Pitada de Sal"],
            prep: ["1. Bata manteiga e açúcar até ficar clarinho.", "2. Coloque a baunilha.", "3. Junte a farinha e misture (não sove muito).", "4. Abra a massa e corte.", "5. Asse em forno baixo para não escurecer."]
        },
        "Formigueiro": {
            ingredients: ["200g Farinha", "100g Manteiga", "120g Açúcar", "1 Ovo", "100g Granulado de Chocolate", "Baunilha"],
            prep: ["1. Faça a massa igual a de baunilha.", "2. Depois, jogue o granulado dentro.", "3. Mexa só para espalhar.", "4. Asse em forno médio (180ºC)."]
        },
        "Coco Queimado": {
            ingredients: ["200g Farinha", "100g Manteiga", "100g Açúcar", "100g Coco Ralado Queimado", "1 Ovo", "Leite de Coco"],
            prep: ["1. Toste o coco na frigideira rapidinho.", "2. Faça a massa misturando tudo.", "3. Junte o coco frio na massa.", "4. Asse até ficar bem douradinho."]
        },
        "Manteiga de Amendoim": {
            ingredients: ["200g Farinha", "100g Manteiga", "100g Pasta de Amendoim", "100g Açúcar Mascavo", "1 Ovo", "Amendoim Picado"],
            prep: ["1. Misture manteiga, pasta de amendoim e açúcar.", "2. Coloque o ovo.", "3. Junte a farinha e o amendoim.", "4. Faça bolinhas e aperte com um garfo (fazendo cruz).", "5. Asse por 12 min."]
        },
        "Banana com Canela": {
            ingredients: ["2 Bananas Maduras", "150g Aveia", "50g Mel", "1 col. chá Canela", "Nozes (opcional)", "Passas (opcional)"],
            prep: ["1. Amasse bem as bananas com um garfo.", "2. Misture com a aveia, mel e canela.", "3. Coloque nozes ou passas se quiser.", "4. Coloque colheradas na assadeira.", "5. Asse por 20 min."]
        },
        "Mesclado": {
            ingredients: ["Massa de Baunilha (100g)", "Massa de Chocolate (100g)", "Manteiga", "Açúcar", "Ovo"],
            prep: ["1. Faça metade de massa branca e metade de chocolate.", "2. Pegue um pedaço de cada.", "3. Junte e torça levemente para misturar as cores.", "4. Asse normalmente."]
        },
        "Chocochips Duplo": {
            ingredients: ["180g Farinha", "40g Cacau em Pó", "120g Manteiga", "150g Açúcar", "100g Gotas Chocolate Branco", "100g Gotas Chocolate Escuro"],
            prep: ["1. Faça a massa de chocolate com cacau.", "2. Jogue as gotas brancas e escuras dentro.", "3. Misture bem.", "4. Asse em forno médio."]
        },
        "Crocante de Nozes": {
            ingredients: ["200g Farinha", "120g Manteiga", "100g Açúcar Mascavo", "150g Nozes picadas", "Canela em pó"],
            prep: ["1. Dê uma tostada nas nozes antes.", "2. Misture manteiga e açúcar.", "3. Jogue as nozes na massa.", "4. Asse até ficar firme."]
        },
        "Café Expresso": {
            ingredients: ["200g Farinha", "120g Manteiga", "100g Açúcar", "2 col. sopa Café Solúvel", "Cacau em pó", "Gotas de Chocolate"],
            prep: ["1. Dissolva o café em um pouquinho de água quente.", "2. Misture com a manteiga.", "3. Faça a massa e coloque as gotas.", "4. Asse. O cheiro é incrível!"]
        },
        "Laranja Cristalizada": {
            ingredients: ["200g Farinha", "100g Manteiga", "100g Açúcar", "Raspas de 2 Laranjas", "100g Laranja Cristalizada picada"],
            prep: ["1. Misture raspas de laranja no açúcar.", "2. Bata com a manteiga.", "3. Jogue os pedacinhos de laranja na massa.", "4. Asse até dourar um pouco."]
        },
        "Gengibre": {
            ingredients: ["200g Farinha", "100g Manteiga", "100g Melado ou Mel", "2 col. chá Gengibre em pó", "1 col. chá Canela", "Cravo em pó"],
            prep: ["1. Derreta manteiga com melado no microondas.", "2. Misture os temperos na farinha.", "3. Junte tudo numa massa firme.", "4. Faça bolinhas.", "5. Asse até ficar crocante."]
        },
        "Shortbread": {
            ingredients: ["250g Farinha de Trigo", "170g Manteiga com Sal (gelada)", "80g Açúcar"],
            prep: ["1. Misture farinha e açúcar.", "2. Esfarele a manteiga com a mão na farinha.", "3. Aperte até virar uma massa (não sove demais).", "4. Abra na forma, fure com garfo.", "5. Asse em forno baixo por 40 min."]
        },
        "Amanteigado Simples": {
            ingredients: ["200g Farinha", "130g Manteiga", "80g Açúcar", "Raspas de Limão (opcional)"],
            prep: ["1. Misture manteiga e açúcar até virar creme.", "2. Coloque a farinha aos poucos.", "3. Use saco de confeitar se quiser bonitinho.", "4. Asse até a base ficar dourada."]
        },
        "Leite Ninho": {
            ingredients: ["200g Amido de Milho (Maizena)", "1 lata Leite Condensado", "100g Manteiga", "4 col. sopa Leite Ninho"],
            prep: ["1. Misture o leite condensado com a manteiga.", "2. Coloque o leite ninho.", "3. Vá colocando maizena até soltar da mão.", "4. Faça bolinhas e aperte com garfo.", "5. Asse rápido (10-15 min). Não deixe dourar em cima!"]
        },
        "Churros": {
            ingredients: ["200g Farinha", "100g Manteiga", "100g Açúcar", "Canela em Pó", "Doce de Leite"],
            prep: ["1. Faça uma massa com bastante canela.", "2. Asse os cookies.", "3. Passe no açúcar e canela quando sair do forno.", "4. Sirva com um pingo de doce de leite em cima."]
        },
        "Fubá com Erva Doce": {
            ingredients: ["150g Fubá", "100g Farinha", "120g Açúcar", "100g Manteiga", "1 Ovo", "2 col. chá Erva Doce"],
            prep: ["1. Misture os secos e a erva doce.", "2. Coloque manteiga e ovo.", "3. Amasse bem com a mão.", "4. Faça bolinhas.", "5. Asse até rachar em cima (igual broa)."]
        },
        "Limão Taiti": {
            ingredients: ["200g Farinha", "100g Manteiga", "100g Açúcar", "Suco e Raspas de 2 Limões", "Açúcar de Confeiteiro"],
            prep: ["1. Misture raspas e açúcar.", "2. Faça a massa colocando o suco de limão.", "3. Faça bolinhas e passe no açúcar de confeitar.", "4. Asse. Elas vão rachar e ficar lindas."]
        },
        "Maracujá": {
            ingredients: ["200g Amido (Maizena)", "100g Manteiga", "80g Açúcar", "Polpa de 1 Maracujá", "Sementes para decorar"],
            prep: ["1. Misture manteiga e açúcar.", "2. Coloque o suco de maracujá (sem semente).", "3. Dê o ponto com a maizena.", "4. Enfeite com sementinhas em cima.", "5. Asse em forno baixo."]
        },
        "Chocolate Branco com Limão": {
            ingredients: ["200g Farinha", "100g Manteiga", "100g Açúcar", "Raspas de 2 limões", "100g Chocolate Branco Picado"],
            prep: ["1. Misture o açúcar com raspas.", "2. Bato com manteiga e ovo.", "3. Adicione farinha e chocolate branco.", "4. Asse até dourar. O cítrico do limão corta o doce do chocolate."]
        },
        "Red Velvet Simples": {
            ingredients: ["200g Farinha", "20g Cacau", "Corante Vermelho", "100g Manteiga", "120g Açúcar", "Gotas de Chocolate Branco"],
            prep: ["1. Massa vermelha clássica, mas sem recheio cremoso.", "2. Coloque gotas de chocolate branco na massa.", "3. Asse. Fica lindo na vitrine."]
        },
        "Cappuccino com Avelã": {
            ingredients: ["200g Farinha", "2 col. sopa Café", "1 col. chá Canela", "50g Avelãs picadas", "100g Manteiga"],
            prep: ["1. Dissolva o café no leite (pouquinho).", "2. Misture na massa de manteiga.", "3. Junte as avelãs.", "4. Asse. Perfeito com... café!"]
        },
        "Menta com Chocolate": {
            ingredients: ["Massa de Chocolate Escura", "Essência de Menta", "Gotas de Chocolate Verde (ou Branco tingido)"],
            prep: ["1. Adicione essência de menta na massa de chocolate.", "2. Use gotas coloridas para dar o charme.", "3. Sabor refrescante tipo 'After Eight'."]
        },
        "Morango com Suspiro": {
            ingredients: ["Massa de Baunilha", "Pedaços de Morango Desidratado", "Minis suspiros"],
            prep: ["1. Misture o morango na massa.", "2. Asse o cookie.", "3. Cole um suspiro em cima com chocolate derretido depois de assar."]
        },
        "Coco com Doce de Leite": {
            ingredients: ["Massa de Coco", "Pedaços de Doce de Leite em barra"],
            prep: ["1. Massa amanteigada com coco ralado.", "2. Pique doce de leite de corte em cubinhos.", "3. Misture na massa e asse. O doce carameliza."]
        },
        "Ameixa com Coco": {
            ingredients: ["200g Farinha", "100g Manteiga", "50g Coco Ralado", "100g Ameixa Preta picada"],
            prep: ["1. O clássico 'Beijinho' versão cookie.", "2. Misture coco e ameixa na massa branca.", "3. Asse."]
        },
        "Milho com Goiabada": {
            ingredients: ["150g Farinha de Milho Fina", "50g Trigo", "100g Manteiga", "Cubos de Goiabada"],
            prep: ["1. Massa amarelinha de milho.", "2. Coloque um cubo de goiabada no topo de cada cookie antes de assar.", "3. Sabor de festa junina."]
        }
    };

    // 4. Detalhes Especiais para Gourmet (Com sub-receitas completas)
    const gourmetDetails = {
        "Red Velvet com Cream Cheese": {
            ingredients: [
                "RECHEIO:", "200g Cream Cheese (firme)", "50g Açúcar de Confeiteiro", "Gotas de Chocolate Branco (para o recheio)",
                "MASSA:", "300g Farinha de Trigo", "20g Cacau em Pó 100%", "1 col. chá Corante Gel Vermelho", "150g Manteiga", "150g Açúcar Cristal", "1 Ovo"
            ],
            prep: [
                "1. PREPARO DO RECHEIO: Misture o cream cheese, açúcar de confeiteiro e as gotas de chocolate branco.",
                "2. Faça bolinhas com esse creme e leve ao congelador por no mínimo 4 horas (tem que ficar duro igual pedra).",
                "3. PREPARO DA MASSA: Bata a manteiga e açúcar. Adicione o ovo e o corante vermelho.",
                "4. Peneire a farinha e cacau e misture.",
                "5. MONTAGEM: Pegue uma porção de massa, abra na palma da mão.",
                "6. Coloque a bolinha de recheio congelada no centro.",
                "7. Feche a massa cobrindo totalmente o recheio (sem deixar buracos).",
                "8. Asse a 180ºC por 12-14 min."
            ]
        },
        "Nutella Stuffed": {
            ingredients: [
                "RECHEIO:", "350g de Nutella (Pura)",
                "MASSA:", "200g Farinha", "100g Manteiga", "80g Açúcar Mascavo", "60g Açúcar Cristal", "1 Ovo", "Avelãs picadas"
            ],
            prep: [
                "1. RECHEIO: Forre uma tábua com papel manteiga.",
                "2. Faça 12 montinhos generosos de Nutella (aprox. 1 colher de sopa cheia cada).",
                "3. Leve ao freezer por 4 horas até congelar.",
                "4. MASSA: Faça a massa base de baunilha misturando manteiga, açúcares, ovo e farinha.",
                "5. MONTAGEM: Pegue a massa, abra um disco na mão.",
                "6. Coloque o disco de Nutella congelado.",
                "7. Feche bem as bordas para a Nutella não vazar no forno.",
                "8. Jogue avelãs picadas por cima.",
                "9. Asse por 12 min. A Nutella vai derreter dentro!"
            ]
        },
        "Kinder Bueno Supreme": {
            ingredients: [
                "RECHEIO:", "200g Pasta de Avelã Branca (Crema di Nocciola)",
                "MASSA:", "180g Farinha", "40g Cacau", "120g Manteiga", "140g Açúcar",
                "DECORAÇÃO:", "Chocolate Branco derretido", "Kinder Bueno (pedaços)"
            ],
            prep: [
                "1. RECHEIO: Congele colheradas da pasta de avelã branca por 4 horas.",
                "2. MASSA: Misture manteiga, açúcares e ovo. Adicione farinha e cacau peneirados.",
                "3. MONTAGEM: Abra a massa de chocolate, coloque a pasta branca congelada no meio.",
                "4. Feche fazendo uma bolinha alta.",
                "5. Asse a 180ºC.",
                "6. Assim que sair do forno, pressione um pedaço de Kinder Bueno no topo.",
                "7. Faça riscos com chocolate branco derretido para decorar."
            ]
        },
        "Pistache Trufado": {
            ingredients: [
                "RECHEIO:", "1 Lata de Leite Condensado", "100g Pasta de Pistache Pura", "1 col. sopa Manteiga",
                "MASSA:", "Farina de Trigo", "Farinha de Pistache (50g)", "Manteiga", "Açúcar",
                "COBERTURA:", "Pistaches triturados sem sal"
            ],
            prep: [
                "1. BRIGADEIRO DE PISTACHE: Na panela, misture leite condensado, pasta de pistache e manteiga.",
                "2. Cozinhe até desgrudar do fundo (ponto firme). Deixe esfriar totalmente.",
                "3. Faça bolinhas com esse brigadeiro.",
                "4. MASSA: Misture a manteiga, açúcar e ovo. Adicione a farinha de trigo e a farinha de pistache.",
                "5. MONTAGEM: Envolva o brigadeiro com a massa de cookie.",
                "6. Asse.",
                "7. Decore com mais pasta de pistache e pistaches picados em cima."
            ]
        },
        "Ferrero Rocher": {
            ingredients: [
                "RECHEIO:", "12 Bombons Ferrero Rocher", "100g de Nutella",
                "MASSA:", "Massa de Chocolate com Avelã Triturada na massa",
                "FINALIZAÇÃO:", "Avelãs Tostadas"
            ],
            prep: [
                "1. MASSA: Prepare a massa de chocolate e adicione 50g de avelãs trituradas.",
                "2. MONTAGEM: Pegue a massa, faça uma cavidade.",
                "3. Coloque um pouquinho de Nutella e (se quiser ousar) um Ferrero inteiro dentro. Ou coloque o Ferrero em cima depois.",
                "4. Se estiver dentro: Feche bem a bolinha.",
                "5. Se for por cima: Asse o cookie, e assim que sair, pressione o bombom no centro.",
                "6. O calor do cookie vai derreter levemente a base do bombom."
            ]
        },
        "Ninho com Nutella": {
            ingredients: [
                "RECHEIO:", "Nutella Pura (Congelada)",
                "MASSA:", "200g Farinha", "50g Leite Ninho em Pó", "100g Manteiga", "100g Açúcar",
                "COBERTURA:", "Leite Ninho para polvilhar"
            ],
            prep: [
                "1. RECHEIO: Como sempre, congele as porções de Nutella.",
                "2. MASSA: Misture farinha e Leite Ninho. Bata manteiga e açúcar.",
                "3. Una tudo formando uma massa clara e cheirosa.",
                "4. MONTAGEM: Recheie a massa com a Nutella congelada.",
                "5. Asse até a borda dourar levemente (o centro deve ficar macio).",
                "6. Ao sair do forno, peneire bastante Leite Ninho por cima para ficar branquinho."
            ]
        },
        "Oreo Overload": {
            ingredients: [
                "RECHEIO:", "Brigadeiro Branco Cremoso (Leite condensado + Creme de leite)",
                "MASSA:", "Massa Black (Cacau Black intenso)", "1 Pacote de Oreo",
                "DECORAÇÃO:", "Mini Oreos"
            ],
            prep: [
                "1. RECHEIO: Faça um brigadeiro branco ponto de enrolar. Esfrie e faça bolinhas.",
                "2. MASSA: Triture metade dos Oreos e misture na massa black.",
                "3. MONTAGEM: Envolva o brigadeiro branco com a massa escura.",
                "4. Asse.",
                "5. Decore com um Mini Oreo no topo."
            ]
        },
        "Caramelo Salgado": {
            ingredients: [
                "RECHEIO:", "200g Açúcar", "100g Creme de Leite Fresco", "50g Manteiga (Toffee Caseiro)",
                "MASSA:", "Massa de Baunilha",
                "FINALIZAÇÃO:", "Flor de Sal"
            ],
            prep: [
                "1. CARAMELO (TOFFEE): Derreta o açúcar até cor de âmbar. Adicione manteiga e depois creme de leite fervendo. Mexa com cuidado. Deixe firmar na geladeira.",
                "2. Faça bolinhas do caramelo firme.",
                "3. MASSA: Prepare a massa clássica.",
                "4. MONTAGEM: Recheie com o caramelo.",
                "5. Asse.",
                "6. Polvilhe Flor de Sal imediatamente ao tirar do forno."
            ]
        },
        "S'mores (Marshmallow)": {
            ingredients: [
                "RECHEIO/TOPO:", "Marshmallows grandes (brancos)", "Chocolate ao Leite em barra (quadradinhos)",
                "MASSA:", "200g Farinha", "100g Manteiga", "50g Biscoito Maizena triturado (na massa)", "100g Açúcar Mascavo", "1 Ovo"
            ],
            prep: [
                "1. MASSA: Triture o biscoito maizena grosseiramente e misture na massa de baunilha. Dá o gosto de 'graham cracker'.",
                "2. MONTAGEM: Abra a massa, coloque um quadradinho de chocolate dentro.",
                "3. Asse o cookie.",
                "4. Nos últimos 2 minutos de forno, coloque o marshmallow em cima para estufar e dourar.",
                "5. Se tiver maçarico, toste o marshmallow na hora de servir. Fica show!"
            ]
        },
        "Banoffee Pie": {
            ingredients: [
                "RECHEIO:", "Doce de Leite firme (ponto de corte)", "Rodelas de Banana Passa (ou Banana Nanica em rodelas se for consumo imediato)",
                "MASSA:", "Massa de Baunilha com Canela",
                "FINALIZAÇÃO:", "Cacau em pó ou Canela para polvilhar"
            ],
            prep: [
                "1. RECHEIO: Use doce de leite gelado/firme.",
                "2. MASSA: Acrescente 1 colher de canela na massa base.",
                "3. MONTAGEM: Abra a massa, coloque o doce de leite e uma rodela de banana no centro.",
                "4. Feche bem.",
                "5. Asse.",
                "6. Polvilhe canela assim que sair do forno."
            ]
        },
        "Torta de Limão": {
            ingredients: [
                "RECHEIO:", "1 Lata Leite Condensado", "Suco de 2 Limões Taiti", "Raspas de Limão",
                "MASSA:", "Massa Branca Amanteigada", "Bolacha Maria quebrada",
                "COBERTURA:", "Chocolate Branco derretido + Raspas"
            ],
            prep: [
                "1. RECHEIO: Misture leite condensado e limão até engrossar (não vai ao fogo). Congele em forminhas.",
                "2. MASSA: Misture pedaços de bolacha na massa crua.",
                "3. MONTAGEM: Envolva a 'pedra' de limão congelada com a massa.",
                "4. Asse (o recheio vai derreter e ficar cremoso).",
                "5. Decore com chocolate branco a raspas frescas."
            ]
        },
        "Cheesecake de Frutas Vermelhas": {
            ingredients: [
                "RECHEIO:", "200g Cream Cheese", "50g Açúcar", "Geleia de Frutas Vermelhas (morango, amora...)",
                "MASSA:", "Massa Branca com toque de limão"
            ],
            prep: [
                "1. RECHEIO: Misture cream cheese e açúcar. Faça bolinhas e faça um 'buraco' nelas com a geleia. Congele tudo junto.",
                "2. MASSA: Prepare a massa base.",
                "3. MONTAGEM: Envolva o recheio congelado (cuidado, é sensível!).",
                "4. Asse.",
                "5. O resultado é um cookie com cuore ('coração') de queijo e fruta."
            ]
        },
        "Dark Coffee Truffle": {
            ingredients: [
                "RECHEIO (GANACHE):", "150g Chocolate Meio Amargo", "50g Creme de Leite", "1 col. sopa Café Solúvel forte",
                "MASSA:", "Massa de Cacau 100% (bem escura)"
            ],
            prep: [
                "1. RECHEIO: Derreta o chocolate com creme de leite e café. Deixe gelar até firmar.",
                "2. Faça bolinhas de ganache.",
                "3. MASSA: Use cacau black se tiver.",
                "4. MONTAGEM: Recheie a massa escura com a ganache de café.",
                "5. Asse. Ao partir, o recheio é denso e trufado."
            ]
        },
        "Macadâmia Gold": {
            ingredients: [
                "MASSA:", "Massa de Baunilha Especial", "Extrato de Baunilha Real",
                "ITEMS NOBRES:", "100g Macadâmias inteiras ou metades", "100g Chocolate 'Gold' (Caramelizado) ou Branco nobre"
            ],
            prep: [
                "1. PREPARO: Toste as macadâmias no forno por 5 min para ativar o óleo essencial (faz toda a diferença).",
                "2. MASSA: Misture as macadâmias frias e o chocolate picado na massa.",
                "3. MONTAGEM: Faça bolas rústicas, deixando pedaços de macadâmia aparentes.",
                "4. Asse até dourar bem as bordas (caramelização)."
            ]
        },
        "White Choc Cranberry": {
            ingredients: [
                "MASSA:", "Massa Branca Suave",
                "RECHEIO/MISTURA:", "100g Chocolate Branco Nobre", "100g Cranberries Secas (Vermelhas)"
            ],
            prep: [
                "1. DICA DE OURO: Hidrate as cranberries em suco de laranja ou água morna por 10 min, depois seque bem. Isso deixa elas macias e não borrachudas no forno.",
                "2. MASSA: Incorpore as frutas e o chocolate.",
                "3. Asse. O azedinho da fruta corta o doce do chocolate branco."
            ]
        },
        "Rafaello (Coco e Amêndoa)": {
            ingredients: [
                "RECHEIO:", "Ganache de Chocolate Branco com Coco", "Amêndoas Inteiras (sem pele)",
                "MASSA:", "Massa de Amêndoas (farinha de amêndoa na massa)",
                "COBERTURA:", "Coco Ralado Fino"
            ],
            prep: [
                "1. RECHEIO: Misture chocolate branco derretido com creme de leite e coco. Gele.",
                "2. Faça bolinhas e coloque uma amêndoa inteira dentro de cada bolinha de recheio.",
                "3. MONTAGEM: Envolva com a massa.",
                "4. Role o cookie cru no coco ralado.",
                "5. Asse (o coco de fora tosta, o de dentro fica cremoso)."
            ]
        },
        "Romeu e Julieta": {
            ingredients: [
                "RECHEIO:", "Cubos de Goiabada Cascão (tem que ser firme)",
                "MASSA:", "Massa de Queijo (50g Parmesão Ralado Fino + 50g Cream Cheese na massa)"
            ],
            prep: [
                "1. MASSA: A massa leva queijo de verdade! Bata manteiga, cream cheese, parmesão e açúcar. Depois farinha.",
                "2. MONTAGEM: Abra a massa, coloque um cubo generoso de goiabada.",
                "3. IMPORTANTE: Feche MUITO bem, a goiabada derrete e quer fugir.",
                "4. Asse até dourar. O cheiro de queijo assado com goiaba é irresistível."
            ]
        },
        "Paçoca Cremosa": {
            ingredients: [
                "RECHEIO:", "Creme de Paçoca (Paçoca rolha amassada + um pouco de Creme de Leite)",
                "MASSA:", "Massa de Amendoim (substitua 50g de trigo por amendoim moído)",
                "DECORAÇÃO:", "Paçoca esfarelada"
            ],
            prep: [
                "1. RECHEIO: Faça uma pastinha de paçoca e congele bolinhas.",
                "2. MASSA: A massa já tem gosto de amendoim.",
                "3. MONTAGEM: Recheie.",
                "4. Asse.",
                "5. Assim que tirar do forno, aperte uma paçoca rolha em cima para ela desmanchar."
            ]
        },
        "Triple Chocolate": {
            ingredients: [
                "MASSA:", "Massa Black (Cacau Alcalino)",
                "CHOCOLATES:", "Gotas Brancas", "Gotas Ao Leite", "Gotas Meio Amargas (Callebaut se possível)"
            ],
            prep: [
                "1. MASSA: Use cacau de boa qualidade para ficar bem escura.",
                "2. MISTURA: Adicione os 3 tipos de chocolate na massa.",
                "3. MONTAGEM: Faça bolas altas.",
                "4. DICA: Reserve algumas gotas brancas para colocar no topo antes de assar (dá contraste lindo).",
                "5. Asse."
            ]
        },
        "Brownie Cookie": {
            ingredients: [
                "MASSA ÚNICA (BROWNIE):", "200g Chocolate Meio Amargo Nobre", "50g Manteiga", "2 Ovos", "150g Açúcar", "50g Farinha (pouca farinha!)", "1/2 col. chá Fermento"
            ],
            prep: [
                "1. PREPARO DIFERENTE: Derreta chocolate com manteiga.",
                "2. Na batedeira, bata ovos e açúcar por 5 min (tem que ficar um creme fofo e pálido). Isso cria a casquinha craquelada.",
                "3. Misture o chocolate derretido suavemente.",
                "4. Adicione a farinha peneirada delicadamente.",
                "5. A massa é mole. Pingue colheradas na forma (deixe espaço, espalha muito!).",
                "6. Asse rápido (10-12 min). Centro deve ser úmido."
            ]
        },
        "Praliné de Avelã": {
            ingredients: [
                "PRALINÉ (CROCANTE):", "100g Açúcar", "100g Avelãs inteiras",
                "MASSA:", "Massa de Baunilha Amanteigada",
                "DECORAÇÃO:", "Fios de Chocolate"
            ],
            prep: [
                "1. PRALINÉ: Faça um caramelo com o açúcar, jogue as avelãs. Despeje no tapete silicone, esfrie e quebre com martelo/faca em pedacinhos crocantes.",
                "2. MASSA: Misture metade do praliné na massa.",
                "3. Asse.",
                "4. Use o resto do praliné para decorar em cima.",
                "5. Crocância extrema!"
            ]
        },
        "Doce de Leite Argentino": {
            ingredients: [
                "RECHEIO:", "Doce de Leite Argentino (Havana ou similar, bem escuro)",
                "MASSA:", "Massa com Canela e toque de Rum (opcional)",
                "COBERTURA:", "Açúcar e Canela"
            ],
            prep: [
                "1. RECHEIO: O segredo é o doce de leite ser de qualidade e estar GELADO.",
                "2. Faça bolotas de doce de leite e congele.",
                "3. MASSA: Massa base com especiarias.",
                "4. MONTAGEM: Envolva o doce de leite.",
                "5. Asse em temperatura alta (200ºC) por menos tempo, para selar fora e manter líquido dentro."
            ]
        },
        "Ovomaltine Vulcão": {
            ingredients: [
                "RECHEIO:", "200g Creme de Ovomaltine Crocante", "50g Creme de Leite (para suavizar)",
                "MASSA:", "180g Farinha", "50g Ovomaltine Flocos", "30g Cacau 50%", "100g Manteiga", "100g Açúcar",
                "COBERTURA:", "Flocos de Ovomaltine para polvilhar"
            ],
            prep: [
                "1. RECHEIO: Misture o creme de Ovomaltine com o creme de leite para ficar menos enjoativo. Gele até firmar e faça bolinhas.",
                "2. MASSA: Misture os secos (farinha, cacau e o pó de Ovomaltine).",
                "3. Bata manteiga e açúcar. Incorpore os secos.",
                "4. MONTAGEM: Recheie a massa com a bolinha gelada.",
                "5. Asse a 180ºC.",
                "6. Assim que sair do forno, pressione mais flocos crocantes no topo."
            ]
        },
        "Goiabada Cascão Premium": {
            ingredients: [
                "RECHEIO:", "200g Goiabada Cascão (com pedaços de fruta)",
                "MASSA:", "200g Farinha", "50g Queijo Minas Padrão Ralado Fino (na massa)", "100g Manteiga", "80g Açúcar", "50g Cream Cheese"
            ],
            prep: [
                "1. RECHEIO: Corte a goiabada em cubos médios.",
                "2. MASSA (O Segredo): Misture o queijo ralado e o cream cheese na manteiga com açúcar antes de por a farinha.",
                "3. A massa fica levemente salgadinha, equilibrando o doce.",
                "4. MONTAGEM: Envolva o cubo de goiabada.",
                "5. Asse até dourar bem. O queijo na massa gratina levemente."
            ]
        },
        "Lemon Pie Brulée": {
            ingredients: [
                "RECHEIO:", "1 Lata Leite Condensado", "80ml Suco de Limão Siciliano", "Raspas de Limão",
                "MASSA:", "Massa Amanteigada de Baunilha (Shortbread) com raspas",
                "COBERTURA:", "Açúcar Demerara ou Cristal para maçaricar"
            ],
            prep: [
                "1. RECHEIO: Misture leite condensado e limão (engrossa na hora). Congele porções.",
                "2. MASSA: Massa clássica com toque cítrico.",
                "3. MONTAGEM: Cookie recheado aberto (estilo tortinha) ou fechado.",
                "4. Se for fechado: Asse normalmente.",
                "5. DICA FINAL: Jogue açúcar em cima do cookie pronto e use o maçarico para criar uma casquinha de vidro (brulée)."
            ]
        },
        "Prestígio Gold": {
            ingredients: [
                "RECHEIO:", "1 Lata Leite Condensado", "100g Coco Fresco Ralado Grosso", "1 col. sopa Manteiga",
                "MASSA:", "Massa de Chocolate 50% Cacau",
                "COBERTURA:", "Chocolate Meio Amargo derretido e Coco em Fitas"
            ],
            prep: [
                "1. RECHEIO: Faça um beijinho de panela usando coco fresco (é mais úmido que o seco). Deixe esfriar e enrole.",
                "2. MASSA: Prepare a massa de chocolate.",
                "3. MONTAGEM: Envolva o beijinho com a massa.",
                "4. Asse.",
                "5. Decoração: Faça riscos de chocolate e coloque fitas de coco por cima."
            ]
        },
        "Chokito Crock": {
            ingredients: [
                "RECHEIO:", "150g Açúcar (para caramelo)", "100ml Creme de Leite", "Flocos de Arroz (Crocante)",
                "MASSA:", "Massa de Chocolate",
                "COBERTURA:", "200g Chocolate ao Leite derretido misturado com Flocos de Arroz"
            ],
            prep: [
                "1. RECHEIO: Faça um caramelo toffee. Misture um pouco de flocos de arroz nele.",
                "2. MASSA: Massa de chocolate tradicional.",
                "3. Asse o cookie recheado.",
                "4. GLACAGEM: Misture flocos de arroz no chocolate derretido.",
                "5. Banhe metade do cookie pronto nessa mistura 'Chokito' (chocolate com crocante)."
            ]
        },
        "Diamante Negro": {
            ingredients: [
                "MASSA:", "Massa Dark (Cacau Black)", "100g Chocolate Meio Amargo picado",
                "CRISTAIS (Diamond):", "100g Açúcar", "1 col. sopa Glucose", "1 col. chá Bicarbonato (efeito aerado/Favo de Mel)"
            ],
            prep: [
                "1. CRISTAIS (Honeycomb): Derreta açúcar e glucose até caramelo.",
                "2. Jogue o bicarbonato e misture violento (vai espumar). Despeje no silicone.",
                "3. Quando esfriar, quebre esse caramelo aerado em pedacinhos.",
                "4. MASSA: Misture os pedacinhos de caramelo na massa escura.",
                "5. Asse. Os cristais derretem parcialmente criando 'bolsões' de caramelo crocante."
            ]
        },
        "Alpino Suíço": {
            ingredients: [
                "RECHEIO:", "200g Chocolate Alpino (barra)", "100g Creme de Leite",
                "MASSA:", "Massa com Cacau 30% (mais suave) e Essência de Baunilha",
                "DECORAÇÃO:", "1 quadradinho de Alpino por cookie"
            ],
            prep: [
                "1. RECHEIO: Derreta o Alpino com creme de leite. Deixe firmar na geladeira (Ganache).",
                "2. MASSA: Uma massa de chocolate mais doce e suave.",
                "3. MONTAGEM: Recheie com a ganache firme.",
                "4. Asse.",
                "5. Coloque um quadradinho de Alpino no topo assim que sair do forno (ele amolece mas mantém o formato)."
            ]
        },
        "Maracujá Trufado": {
            ingredients: [
                "RECHEIO:", "200g Chocolate Branco", "50ml Suco Concentrado de Maracujá (reduzido)",
                "MASSA:", "Massa Black (Cacau Alcalino)",
                "COBERTURA:", "Sementes de Maracujá com geleia de brilho (opcional)"
            ],
            prep: [
                "1. RECHEIO: Ferva o suco de maracujá até reduzir pela metade (ficar fortíssimo).",
                "2. Misture no chocolate branco derretido (Ganache). Gele.",
                "3. MASSA: Use Cacau Black para contraste de cor.",
                "4. MONTAGEM: Recheie a massa preta com o creme amarelo.",
                "5. Asse. O contraste visual e de sabor (doce/azedo) é perfeito."
            ]
        },
        "Praliné de Avelã": {
            ingredients: [
                "PRALINÉ (CROCANTE):", "100g Açúcar", "100g Avelãs inteiras com pele",
                "MASSA:", "Massa de Baunilha Amanteigada com farinha de amêndoas (substituindo 20% do trigo)",
                "DECORAÇÃO:", "Fios de Chocolate"
            ],
            prep: [
                "1. PRALINÉ: Faça um caramelo seco com o açúcar. Jogue as avelãs torradas. Despeje em mármore untado.",
                "2. Depois de frio, quebre em pedaços irregulares (alguns pó, alguns grandes).",
                "3. MASSA: Misture manteiga, açúcares, ovo. Incorpore farinhas e 70% do praliné.",
                "4. Asse a 180ºC.",
                "5. Decore com o restante do praliné por cima para garantir a crocância máxima."
            ]
        }
    };

    // 5. Detalhes Especiais para Categoria "Special" (Fit, Vegan, Funcional)
    const specialDetails = {
        "Vegano Dark": {
            ingredients: [
                "200g Farinha de Trigo", "50g Cacau em Pó 100% Alcalino", "120g Açúcar Mascavo",
                "80g Óleo de Coco (estado sólido/frio)", "60ml Leite Vegetal (Amêndoa ou Coco)",
                "1 col. sopa Linhaça Dourada triturada (Ovo Vegano)", "1/2 col. chá Bicarbonato"
            ],
            prep: [
                "1. OVO VEGANO: Hidrate a farinha de linhaça em 3 colheres de água morna por 10 min até formar um gel.",
                "2. CREME: Na batedeira, bata o óleo de coco sólido com o açúcar mascavo até obter uma pasta.",
                "3. Adicione o gel de linhaça e o leite vegetal. Bata mais um pouco.",
                "4. MASSA: Incorpore a farinha, cacau e bicarbonato peneirados. A massa fica densa e escura.",
                "5. Asse a 180ºC por 12-14 min. O interior fica úmido (fudgy) e intenso."
            ]
        },
        "Low Carb Amêndoas": {
            ingredients: [
                "200g Farinha de Amêndoas Fina", "50g Eritritol ou Xilitol", "1 Ovo Grande",
                "30g Manteiga Ghee ou Óleo de Coco derretido", "1 col. chá Extrato de Baunilha",
                "30g Lâminas de Amêndoa (para decorar)", "Pitada de Sal"
            ],
            prep: [
                "1. MISTURA: Em uma tigela, misture o adoçante com a manteiga/ghee e a baunilha.",
                "2. Adicione o ovo e bata ligeiramente com um fouet.",
                "3. MASSA: Junte a farinha de amêndoas e o sal. Misture até formar uma bola úmida.",
                "4. DECORAÇÃO: Faça bolinhas, achate levemente e pressione as lâminas de amêndoa no topo.",
                "5. Asse por 10-12 min a 180ºC. Fique de olho, pois a farinha de amêndoas queima rápido. Deixe esfriar totalmente para firmar."
            ]
        },
        "Sem Glúten Mix": {
            ingredients: [
                "100g Farinha de Arroz", "50g Fécula de Batata", "50g Polvilho Doce",
                "100g Manteiga (ponto pomada)", "100g Açúcar Demerara", "1 Ovo",
                "1/2 col. chá Goma Xantana (essencial para liga)", "1 col. chá Fermento"
            ],
            prep: [
                "1. MIX SEM GLÚTEN: Peneire a farinha de arroz, fécula, polvilho e goma xantana juntos.",
                "2. CREME: Bata a manteiga com o açúcar até ficar fofo.",
                "3. Adicione o ovo e bata bem.",
                "4. MASSA: Junte o mix de farinhas aos poucos. A massa é mais quebradiça que a de trigo, manuseie com delicadeza.",
                "5. Asse a 180ºC até as bordas dourarem. A textura fica arenosa e derrete na boca."
            ]
        },
        "Proteico Whey": {
            ingredients: [
                "60g Whey Protein sabor Chocolate ou Baunilha", "150g Pasta de Amendoim Integral",
                "1 Banana Nanica bem madura amassada", "1 Clara de Ovo",
                "30g Aveia em Flocos Finos (para dar ponto)", "1 col. chá Cacau (opcional)"
            ],
            prep: [
                "1. BASE: Amasse bem a banana e misture com a pasta de amendoim até ficar homogêneo.",
                "2. Adicione a clara e misture vigorosamente.",
                "3. PONTO: Acrescente o Whey Protein. Se a massa ficar muito mole, vá adicionando a aveia aos poucos até desgrudar das mãos.",
                "4. Asse por 10-12 min. Não asse demais para o Whey não ficar borrachudo. Ótimo pós-treino!"
            ]
        },
        "Keto Coco": {
            ingredients: [
                "150g Coco Ralado Seco (sem açúcar, floco médio)", "3 Claras de Ovo",
                "3 col. sopa Adoçante Stevia ou Eritritol", "1 col. sopa Óleo de Coco",
                "Raspas de Limão (opcional)"
            ],
            prep: [
                "1. CLARAS: Bata as claras levemente (apenas para espumar, não precisa ser neve firme).",
                "2. MISTURA: Envolva o coco ralado, o adoçante e as raspas de limão.",
                "3. LIGA: Adicione o fio de óleo de coco para dar umidade.",
                "4. MODELAGEM: Use uma colher ou pegador de sorvete para fazer montinhos compactos.",
                "5. Asse até as pontinhas do coco ficarem douradas e crocantes."
            ]
        },
        "Funcional Aveia": {
            ingredients: [
                "2 xíc Aveia em Flocos Grossos", "2 Bananas Prata bem maduras",
                "50g Uvas Passas Pretas", "1 col. sopa Sementes de Chia",
                "1 col. chá Canela em Pó", "1 col. sopa Mel (opcional se a banana não estiver muito doce)"
            ],
            prep: [
                "1. MISTURA ÚMIDA: Amasse as bananas até virar um purê.",
                "2. MISTURA SECA: Adicione a aveia, chia, canela e as passas.",
                "3. HIDRATAÇÃO: Misture tudo muito bem e deixe descansar por 10 minutos. A aveia e a chia vão absorver a umidade da banana.",
                "4. Asse a 180ºC por 15-20 min. Fica macio, estilo barra de cereal, perfeito para café da manhã."
            ]
        },
        "Diet Chocolate": {
            ingredients: [
                "150g Farinha de Aveia", "50g Cacau 100%", "Adoçante Culinário em pó (equivale a 100g açúcar)",
                "100g Manteiga sem sal", "1 Ovo", "Gotas de Chocolate Diet"
            ],
            prep: [
                "1. CREME: Bata a manteiga com o adoçante culinário como se fosse açúcar.",
                "2. Adicione o ovo e bata emulsificar.",
                "3. MASSA: Peneire o cacau e a farinha de aveia sobre o creme. Misture.",
                "4. FINALIZAÇÃO: Incorpore as gotas de chocolate diet.",
                "5. Asse. O sabor é intenso e não deixa nada a desejar para o tradicional."
            ]
        },
        "Integral Castanhas": {
            ingredients: [
                "200g Farinha de Trigo Integral Fina", "120g Açúcar Mascavo", "100g Manteiga",
                "100g Mix de Castanhas (Pará, Caju e Nozes) picadas grosseiramente", "1 Ovo",
                "1 col. chá Essência de Baunilha"
            ],
            prep: [
                "1. DICA: Use farinha integral moída fina para não ficar pesado.",
                "2. CREME: Misture manteiga derretida com açúcar mascavo e ovo.",
                "3. MASSA: Incorpore a farinha integral e o mix de castanhas.",
                "4. Asse a 180ºC por 15 min. Fica com uma textura rústica e crocante, excelente com café."
            ]
        },
        "Sem Lactose Cacau": {
            ingredients: [
                "200g Farinha de Trigo", "100g Creme Vegetal (sabor Manteiga zero leite) ou Óleo de Coco",
                "120g Açúcar Cristal", "50g Cacau em Pó", "1 Ovo",
                "Pedaços de Chocolate Zero Lactose/Vegano"
            ],
            prep: [
                "1. GORDURA: Se usar óleo de coco, leve à geladeira para firmar antes de bater. O creme vegetal pode usar direto.",
                "2. MISTURA: Bata a gordura com o açúcar e ovo.",
                "3. MASSA: Adicione o cacau e farinha.",
                "4. RECHEIO: Misture os pedaços de chocolate sem lactose.",
                "5. Asse. O sabor é idêntico ao tradicional, seguro para intolerantes."
            ]
        },
        "Batata Doce Fit": {
            ingredients: [
                "1 xíc Batata Doce cozida e amassada (purê frio)", "2 col. sopa Cacau em Pó 100%",
                "2 col. sopa Mel, Melado ou Agave", "2 col. sopa Óleo de Coco",
                "Farinha de Coco ou Aveia (para dar ponto, aprox. 1/2 xic)"
            ],
            prep: [
                "1. BASE: Misture o purê de batata doce com o cacau, mel e óleo.",
                "2. PONTO: Vá adicionando a farinha escolhida aos poucos até a massa desgrudar levemente das mãos (ela continua um pouco pegajosa).",
                "3. MODELAGEM: Unte as mãos com óleo, faça bolinhas e achate na assadeira.",
                "4. Asse por 15-20 min. A textura interna lembra um brownie fudgy."
            ]
        },
        "Abóbora com Especiarias (Pumpkin)": {
            ingredients: [
                "100g Purê de Abóbora Cabotiá (assada, não cozida na água)", "200g Farinha de Trigo",
                "100g Manteiga", "100g Açúcar Mascavo", "1 Ovo",
                "1 col. chá Pumpkin Spice (Canela, Cravo, Gengibre, Noz Moscada)", "Gotas de Chocolate Branco"
            ],
            prep: [
                "1. PREPARO DA ABÓBORA: Asse a abóbora no forno para ficar bem seca e concentrada. Faça um purê.",
                "2. CREME: Bata manteiga e açúcar. Adicione o ovo e o purê de abóbora frio.",
                "3. MASSA: Peneire a farinha com as especiarias e misture ao creme. A cor fica linda, alaranjada.",
                "4. Incorpore as gotas de chocolate e asse. Perfuma a casa inteira com cheiro de outono."
            ]
        },
        "Matcha Green Tea": {
            ingredients: [
                "220g Farinha de Trigo", "100g Manteiga sem sal", "100g Açúcar Refinado",
                "1 Ovo", "1 col. sopa cheia de Matcha (Chá Verde em pó de boa qualidade)",
                "100g Chocolate Branco Picado"
            ],
            prep: [
                "1. COR E SABOR: Peneire o matcha junto com a farinha para não empelotar.",
                "2. CREME: Bata a manteiga e o açúcar até ficar pálido.",
                "3. MASSA: Junte o ovo e depois a mistura de farinha verde.",
                "4. CONTRASTE: Misture o chocolate branco picado.",
                "5. Asse a 170ºC (forno mais baixo) para não dourar muito e manter a cor verde vibrante."
            ]
        },
        "Lavanda e Mel": {
            ingredients: [
                "200g Farinha de Trigo", "100g Manteiga", "60g Açúcar", "50g Mel (para adoçar e perfumar)",
                "1 col. chá Flores de Lavanda Secas (grau culinário)", "Raspas de 1/2 Limão Siciliano"
            ],
            prep: [
                "1. INFUSÃO A FRIO: Esfregue as flores de lavanda e as raspas de limão no açúcar com os dedos para liberar os óleos essenciais.",
                "2. CREME: Bata a manteiga com esse açúcar aromatizado e o mel.",
                "3. MASSA: Incorpore o ovo e a farinha.",
                "4. Asse até as bordas dourarem. O sabor é floral, delicado e sofisticado."
            ]
        },
        "Cardamomo Spice": {
            ingredients: [
                "200g Farinha", "100g Manteiga", "100g Açúcar", "1 col. chá Cardamomo em pó (recém moído)",
                "50g Pistache picado", "1 col. chá Água de Rosas (opcional)"
            ],
            prep: [
                "1. ESPECIARIA: Retire as sementes da fava de cardamomo e macere no pilão na hora. O aroma é incomparável.",
                "2. MASSA: Prepare a massa base amanteigada adicionando o cardamomo e a água de rosas no creme inicial.",
                "3. CROCÂNCIA: Misture os pistaches picados.",
                "4. Asse. Um cookie com perfil de sabor do Oriente Médio."
            ]
        },
        "Pimenta Rosa": {
            ingredients: [
                "180g Farinha", "40g Cacau 100%", "120g Manteiga", "120g Açúcar",
                "1 col. chá Pimenta Rosa moida", "1 col. chá Pimenta Rosa inteira (para decorar)",
                "100g Chocolate Meio Amargo picado"
            ],
            prep: [
                "1. MISTURA: Moa levemente a pimenta rosa (ela é aromática, não arde).",
                "2. MASSA: Faça uma massa de chocolate Dark.",
                "3. Incorpore a pimenta moída e os pedaços de chocolate.",
                "4. MONTAGEM: Antes de assar, coloque alguns grãos de pimenta rosa inteiros no topo para decorar.",
                "5. Asse. A pimenta ressalta as notas frutadas do cacau."
            ]
        },
        "Flor de Sal & Dark": {
            ingredients: [
                "180g Farinha", "50g Cacau Black (ou Alcalino)", "100g Manteiga", "120g Açúcar Mascavo",
                "150g Chocolate 70% em pedaços grandes", "Flor de Sal (para finalizar)"
            ],
            prep: [
                "1. INTENSIDADE: Use cacau de boa qualidade e açúcar mascavo para uma massa úmida e profunda.",
                "2. MASSA: Prepare a massa dark e misture os pedaços generosos de chocolate 70%.",
                "3. Asse.",
                "4. TOQUE FINAL: Assim que tirar do forno, com o chocolate ainda derretido no topo, polvilhe a Flor de Sal.",
                "5. O contraste do salgado com o chocolate amargo é clássico."
            ]
        },
        "Alfarroba": {
            ingredients: [
                "200g Farinha de Arroz", "60g Alfarroba em Pó (substituto do cacau sem estimulantes)",
                "100g Óleo de Coco", "100g Açúcar de Coco ou Mascavo", "1 Ovo", "1 col. chá Fermento"
            ],
            prep: [
                "1. INGREDIENTE: A alfarroba é naturalmente doce e não contém cafeína/teobromina.",
                "2. MISTURA: Bata o óleo de coco gelado com o açúcar de coco e o ovo.",
                "3. MASSA: Peneire a farinha de arroz e a alfarroba. Misture até ficar homogêneo.",
                "4. Asse. Uma opção saudável e saborosa para quem evita cacau."
            ]
        },
        "Gergelim & Mel": {
            ingredients: [
                "150g Farinha de Trigo", "100g Tahine (Pasta de Gergelim puro)", "80g Mel",
                "50g Manteiga", "1 Ovo", "Gergelim Branco e Preto para rolar"
            ],
            prep: [
                "1. GORDURA DUPLA: Bata a manteiga com o tahine e o mel. O tahine traz uma untuosidade única.",
                "2. MASSA: Adicione o ovo e a farinha. A massa fica macia.",
                "3. CROSTA: Faça bolinhas e role na mistura de gergelim branco e preto.",
                "4. Asse até dourar. Fica crocante por fora, macio por dentro e rico em cálcio."
            ]
        },
        "Tâmaras e Nozes": {
            ingredients: [
                "1 xíc Tâmaras sem caroço (tipo Medjool são melhores)", "1 xíc Nozes",
                "1 Ovo", "1 pitada de Sal", "NÃO VAI FARINHA NEM AÇÚCAR ADICIONADO"
            ],
            prep: [
                "1. PROCESSADOR: Coloque as tâmaras e as nozes no processador. Pulse até triturar bem, mas sem virar óleo.",
                "2. LIGA: Adicione o ovo e pulse apenas para misturar.",
                "3. MODELAGEM: A massa é pegajosa. Com as mãos úmidas, faça bolinhas e achate na assadeira (use papel manteiga ou silpat).",
                "4. Asse por 10-12 min. É um cookie de pura energia (energy bite assado)."
            ]
        },
        "Damasco Real": {
            ingredients: [
                "200g Farinha", "100g Manteiga", "80g Açúcar", "100g Damascos Turcos picados",
                "50g Amêndoas picadas", "50g Chocolate Meio Amargo (para banhar)"
            ],
            prep: [
                "1. PREPARO DAS FRUTAS: Pique o damasco em cubinhos pequenos para distribuir bem na massa.",
                "2. MASSA: Faça uma massa branca amanteigada. Misture o damasco e as amêndoas.",
                "3. Asse e deixe esfriar completamente.",
                "4. ACABAMENTO: Derreta o chocolate. Mergulhe metade de cada cookie no chocolate e deixe secar sobre papel manteiga."
            ]
        },
        "Figo Turco": {
            ingredients: [
                "180g Farinha", "50g Farinha de Nozes (nozes trituradas)", "100g Manteiga", "80g Mel",
                "100g Figos Secos (Turcos)", "1 pitada de Canela"
            ],
            prep: [
                "1. HIDRATAÇÃO: Pique os figos secos e deixe de molho em água morna por 10 min. Escorra bem e seque.",
                "2. MASSA: Prepare a massa base usando o mel como adoçante principal e a farinha de nozes para sabor.",
                "3. Incorpore os pedaços de figo.",
                "4. Asse. Fica um cookie úmido, com a textura crocante das sementinhas do figo."
            ]
        },
        "Cranberry & Pistache Fit": {
            ingredients: [
                "1 xíc Farinha de Aveia", "1/2 xíc Farinha de Amêndoas", "1/4 xíc Óleo de Coco",
                "1/3 xíc Melado ou Mel", "Handful de Cranberries", "Handful de Pistaches descascados"
            ],
            prep: [
                "1. MISTURA FIT: Numa tigela, misture as farinhas, óleo e melado até formar uma massa coesa.",
                "2. CORES: Adicione as cranberries (vermelho) e pistaches inteiros ou grosseiramente picados (verde).",
                "3. MODELAGEM: Faça discos compactos.",
                "4. Asse por 12-15 min. Visual festivo e nutricionalmente denso."
            ]
        },
        "Keto Amendoim": {
            ingredients: [
                "1 xíc Pasta de Amendoim Integral (sem açúcar)", "1/2 xíc Adoçante Eritritol",
                "1 Ovo", "1 col. chá Extrato de Baunilha", "Amendoim torrado para decorar"
            ],
            prep: [
                "1. SEM FARINHA: Este cookie não leva nenhuma farinha, a estrutura vem da pasta de amendoim e ovo.",
                "2. MISTURA: Bata o ovo com o adoçante e baunilha. Adicione a pasta de amendoim e misture até virar uma bola.",
                "3. MODELAGEM: Faça bolinhas e faça a marca de 'jogo da velha' com um garfo (clássico peanut butter cookie).",
                "4. Asse rápido (8-10 min). Deixe esfriar na assadeira, ele sai mole e endurece depois."
            ]
        },
        "Vegano Banana Bread": {
            ingredients: [
                "2 Bananas Nanicas bem maduras", "1/4 xíc Óleo Vegetal", "1/2 xíc Açúcar Mascavo",
                "1.5 xíc Farinha (Trigo ou Aveia)", "1/2 xíc Nozes picadas", "Muito Canela em pó"
            ],
            prep: [
                "1. BASE ÚMIDA: Amasse as bananas e misture com óleo e açúcar até emulsionar.",
                "2. SECOS: Adicione a farinha e canela. Não bata muito para não desenvolver glúten (se usar trigo).",
                "3. CROCÂNCIA: Dobre as nozes na massa.",
                "4. Asse. O resultado é um 'pão de banana' em formato de cookie: macio, úmido e aromático."
            ]
        },
        "Low Carb Coco & Limão": {
            ingredients: [
                "1/2 xíc Farinha de Coco", "1/4 xíc Manteiga derretida ou Óleo de Coco",
                "3 Ovos", "1/3 xíc Adoçante Xilitol", "Raspas de 2 Limões", "1 col. chá Fermento"
            ],
            prep: [
                "1. ATENÇÃO À FARINHA: A farinha de coco absorve MUITÍSSIMO líquido.",
                "2. MISTURA: Bata os ovos com o adoçante e a manteiga.",
                "3. MASSA: Adicione a farinha de coco, raspas e fermento. Deixe descansar 5 min para a fibra hidratar/espessar.",
                "4. Modele bolinhas (a massa não espalha no forno, então achate no formato desejado).",
                "5. Asse até dourar."
            ]
        },
        "Sem Glúten & Lactose": {
            ingredients: [
                "200g Mix de Farinhas sem Glúten (Arroz/Polvilho)", "100g Óleo de Girassol ou Coco",
                "120g Açúcar Demerara", "1 Ovo", "100g Gotas de Chocolate 70% (sem leite/glúten)"
            ],
            prep: [
                "1. TÉCNICA: Bata bem o óleo com o açúcar e ovo para criar uma emulsão aerada, já que não temos a rede de glúten.",
                "2. MASSA: Incorpore o mix de farinhas suavemente.",
                "3. RECHEIO: Adicione as gotas de chocolate seguro para alérgicos.",
                "4. Asse. Cookie inclusivo coringa, atende celíacos e intolerantes à lactose."
            ]
        },
        "Funcional Granola": {
            ingredients: [
                "2 xíc Granola Caseira (com castanhas e frutas secas)", "2 Claras de Ovo",
                "2 col. sopa Mel", "1 col. sopa Farinha de Aveia (se precisar dar liga)"
            ],
            prep: [
                "1. REAPROVEITAMENTO: Use aquela granola rica que sobrou.",
                "2. LIGA: Misture a granola com as claras e o mel. A clara serve como 'cola' proteica.",
                "3. PONTO: Se a granola for muito solta, polvilhe um pouco de farinha de aveia para segurar.",
                "4. Asse em forno baixo (160ºC) para secar e ficar super crocante sem queimar as frutas da granola."
            ]
        },
        "Proteico White": {
            ingredients: [
                "60g Whey Protein sabor Baunilha", "100g Farinha de Amêndoas", "50g Farinha de Coco",
                "2 Claras", "1 col. sopa Óleo de Coco", "50g Chocolate Branco Zero Açúcar picado"
            ],
            prep: [
                "1. BASE PROTEICA: Misture o whey com as farinhas low carb.",
                "2. LIGA: Adicione as claras e o óleo de coco até obter uma massa modelável.",
                "3. RECHEIO: Misture os pedaços de chocolate branco diet.",
                "4. Asse rápido (8-10 min). Cuidado para não ressecar, pois o Whey endurece se passar do ponto."
            ]
        },
        "Diet Coco": {
            ingredients: [
                "200g Coco Ralado Seco sem açúcar", "200ml Leite de Coco (garrafinha)",
                "Adoçante em pó a gosto", "2 Claras"
            ],
            prep: [
                "1. HIDRATAÇÃO: Misture o coco seco com o leite de coco e adoçante. Deixe hidratar por 10 min.",
                "2. ESTRUTURA: Adicione as claras (não precisa bater em neve) apenas para ligar.",
                "3. Modele cocadas/cookies rústicos.",
                "4. Asse até ficar bem dourado por fora. O interior fica cremoso como uma cocada mole."
            ]
        },
        "Integral Maçã": {
            ingredients: [
                "200g Farinha Integral", "2 Maçãs (Gala ou Fuji)", "100g Manteiga", "100g Açúcar Mascavo",
                "1 col. chá Canela", "1 Ovo"
            ],
            prep: [
                "1. SEGREDO: Rale as maçãs no ralo grosso e APERTE nas mãos ou peneira para tirar o excesso de suco (beba o suco!). Se não tirar, o cookie vira bolo.",
                "2. MASSA: Faça a massa integral com açúcar mascavo e canela.",
                "3. Misture a maçã ralada espremida.",
                "4. Asse. Fica macio, úmido e fibroso, perfeito para lanche da tarde."
            ]
        }
    };

    const getRecipeDetails = (category, index, title) => {
        // Use specific data for Traditional category
        if (category === 'traditional') {
            const key = title.replace('Cookie ', '');
            if (traditionalDetails[key]) {
                return {
                    time: `${20 + (index % 5) * 5} min`,
                    yield: `${12 + (index % 4)} un`,
                    cost: (2.50 + (index * 0.1)).toFixed(2),
                    ...traditionalDetails[key]
                };
            }
        }

        if (category === 'gourmet') {
            // Remove "Cookie " prefix if present, though titles in cat array usually don't have it, 
            // but generateRecipes adds it to the final object title. 
            // Here we use the title from the loop which is clean.
            if (gourmetDetails[title]) {
                return {
                    time: "25-30 min",
                    yield: "8-10 un (grandes)",
                    cost: (4.50 + (index * 0.2)).toFixed(2),
                    ...gourmetDetails[title]
                };
            }
        }

        if (category === 'special') {
            if (specialDetails[title]) {
                return {
                    time: "20-25 min",
                    yield: "10-12 un",
                    cost: (5.00 + (index * 0.1)).toFixed(2), // Special ingredients are pricier
                    ...specialDetails[title]
                };
            }
        }

        // Fallback generic
        const baseIngredients = [
            "200g de Farinha de Trigo", "100g de Manteiga", "150g de Açúcares", "1 ovo"
        ];

        let extraIngredients = [];
        if (category === 'gourmet') extraIngredients = ["150g de Recheio Cremoso", "50g de Topping"];
        if (category === 'special') extraIngredients = ["Farinha de Amêndoas (Subst)", "Adoçante Xilitol"];

        return {
            time: `${25 + (index % 5) * 5} min`,
            yield: `${10 + (index % 3)} un`,
            cost: (category === 'gourmet' ? 4.50 : 3.50 + (index * 0.1)).toFixed(2),
            ingredients: [...baseIngredients, ...extraIngredients],
            prep: [
                "1. Bata a manteiga com os açúcares.",
                "2. Adicione os ovos e essência.",
                category === 'gourmet' ? "3. Recheie a massa com o creme congelado." : "3. Misture os secos suavemente.",
                "4. Asse a 180ºC por 12-15 min."
            ]
        };
    };

    const allRecipes = [];
    let idCounter = 1;

    Object.entries(categories).forEach(([catKey, titles]) => {
        titles.forEach((title, i) => {
            const details = getRecipeDetails(catKey, i, title);

            // Try to find specific image, otherwise use fallback pool
            let image = specificImages[title];
            if (!image) {
                const pool = imagePools[catKey];
                image = pool[i % pool.length];
            }

            allRecipes.push({
                id: idCounter++,
                category: catKey,
                title: `Cookie ${title}`,
                image: image,
                ...details
            });
        });
    });

    return allRecipes;
};

export const recipesData = generateRecipes();
