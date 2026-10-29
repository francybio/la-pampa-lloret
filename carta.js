/* ==========================================================
   LA PAMPA — la carta (de su carta impresa: entrantes y vinos,
   fotos en Restaurant Guru; parrilla y cortes del chef, leídos
   en una foto de cliente en Google Maps, 2026). Precios en €.
   Plato: [precio | null, [es, ca, en, fr], [descripción] | null, marca]
   marca: 'v' vegetariano · 'p' lleva cerdo · 'x' precio que no se lee
   ========================================================== */
window.LP_CARTA = [
  { id: 'parrilla', fire: 3, t: ['Nuestra parrilla', 'La nostra graella', 'Our grill', 'Notre grill'], note: ['Las carnes de la parrilla se sirven sin guarnición: añade una de la lista', 'Les carns de la graella se serveixen sense guarnició: afegeix-ne una de la llista', 'Grilled meats come without a side: add one from the list', 'Les viandes du grill sont servies sans garniture : ajoutez-en une'], items: [
    [18.5, ['Entraña', 'Entranya', 'Skirt steak (entraña)', 'Hampe (entraña)'], ['Corte argentino, sabroso y jugoso; 300 g', 'Tall argentí, saborós i sucós; 300 g', 'Argentinian cut, flavourful and juicy; 300 g', 'Pièce argentine, savoureuse et juteuse ; 300 g']],
    [26.9, ['Filete', 'Filet', 'Fillet steak', 'Filet'], ['Solomillo, el corte más tierno; 250 g', 'Filet, el tall més tendre; 250 g', 'Tenderloin, the most tender cut; 250 g', 'Filet, la pièce la plus tendre ; 250 g']],
    [null, ['Lomo bajo (sirloin)', 'Llom baix (sirloin)', 'Sirloin steak', 'Faux-filet'], ['Tierno, con grasa e intenso de sabor', 'Tendre, amb greix i intens de sabor', 'Tender, with fat and intense flavour', 'Tendre, persillé et intense'], 'x'],
    [24.9, ['Ojo de bife (ribeye)', 'Ull de bife (ribeye)', 'Ribeye steak', 'Entrecôte (ribeye)'], ['Muy jugoso, con mucho veteado; 300 g', 'Molt sucós, amb molt entreverat; 300 g', 'Very juicy, abundant marbling; 300 g', 'Très juteux, bien persillé ; 300 g']],
    [23.9, ['Churrasco argentino', 'Xurrasco argentí', 'Argentinian churrasco', 'Churrasco argentin'], ['Tierno y jugoso, mucho veteado; 400 g', 'Tendre i sucós, molt entreverat; 400 g', 'Tender and juicy, abundant marbling; 400 g', 'Tendre et juteux, bien persillé ; 400 g']],
    [null, ['Picanha', 'Picanha', 'Picanha', 'Picanha'], ['El clásico brasileño: magro y exótico', 'El clàssic brasiler: magre i exòtic', 'The Brazilian classic: lean and exotic', 'Le classique brésilien : maigre et exotique'], 'x'],
    [18.9, ['Steak con patatas', 'Steak amb patates', 'Steak with fries', 'Steak-frites'], ['Asado lento, tierno y sabroso', 'Rostit lent, tendre i saborós', 'Slow-roasted, tender and flavourful', 'Rôti lentement, tendre et savoureux']],
    [21, ['Asado de tira', 'Costella de vedella (asado de tira)', 'Short ribs (asado de tira)', 'Plat de côtes (asado de tira)'], ['Costilla cortada a lo ancho, al estilo argentino', 'Costella tallada de través, a l’estil argentí', 'Ribs cut crosswise, Argentinian style', 'Côtes coupées en travers, à l’argentine']],
    [8.5, ['Chorizo criollo', 'Xoriço criollo', 'Criollo sausage', 'Chorizo criollo'], ['El chorizo argentino de siempre; 2 unidades', 'El xoriço argentí de sempre; 2 unitats', 'Classic Argentinian sausage; 2 pieces', 'La saucisse argentine classique ; 2 pièces'], 'p'],
    [14.9, ['Parrillada de verduras', 'Graellada de verdures', 'Veggie grill feast', 'Grillade de légumes'], ['Pimiento, zanahoria, cebolla, tomate, berenjena y patatas', 'Pebrot, pastanaga, ceba, tomàquet, albergínia i patates', 'Bell pepper, carrot, onion, tomato, aubergine and potatoes', 'Poivron, carotte, oignon, tomate, aubergine et pommes de terre'], 'v']
  ] },
  { id: 'chef', fire: 4, t: ['Cortes del chef', 'Talls del xef', 'Chef’s cuts', 'Pièces du chef'], note: ['Con guarnición incluida', 'Amb guarnició inclosa', 'Side dish included', 'Garniture comprise'], items: [
    [31.9, ['Filete «La Pampa»', 'Filet «La Pampa»', '“La Pampa” fillet steak', 'Filet « La Pampa »'], ['Con salsa a elegir: champiñones, pimienta o queso azul; 250 g', 'Amb salsa a triar: xampinyons, pebre o formatge blau; 250 g', 'With your choice of mushroom, pepper or blue cheese sauce; 250 g', 'Sauce au choix : champignons, poivre ou bleu ; 250 g']],
    [null, ['Costilla de Nebraska deshuesada', 'Costella de Nebraska desossada', 'Nebraska boneless short rib', 'Short rib du Nebraska désossé'], ['Corte prémium, muy veteado e intenso; 300 g', 'Tall prèmium, molt entreverat i intens; 300 g', 'Premium cut, high marbling, intense flavour; 300 g', 'Pièce premium, très persillée et intense ; 300 g'], 'x'],
    [26, ['Costillas de cerdo BBQ', 'Costelles de porc BBQ', 'BBQ pork ribs', 'Travers de porc BBQ'], ['Braseadas 6 horas a fuego lento en nuestro horno de carbón Josper', 'Brasejades 6 hores a foc lent al nostre forn de carbó Josper', 'Braised 6 hours over low heat in our Josper charcoal oven', 'Braisés 6 heures à feu doux dans notre four à charbon Josper'], 'p'],
    [null, ['Churrasco de ancho', 'Xurrasco d’ample', 'Churrasco de ancho', 'Churrasco de ancho'], ['Corte en espiral, a la parrilla lenta con una capa de chimichurri', 'Tall en espiral, a la graella lenta amb una capa de chimichurri', 'Spiral cut, slow-grilled with a layer of chimichurri', 'Coupe en spirale, grillée lentement avec une couche de chimichurri'], 'x']
  ] },
  { id: 'hueso', fire: 5, t: ['Con hueso', 'Amb os', 'Bone-in steaks', 'Pièces avec os'], note: ['Para compartir', 'Per compartir', 'To share', 'À partager'], items: [
    [35, ['Lomo con hueso (sirloin bone)', 'Llom amb os', 'Sirloin bone steak', 'Faux-filet avec os'], ['Para una persona; 600 g', 'Per a una persona; 600 g', 'For one person; 600 g', 'Pour une personne ; 600 g']],
    [null, ['Chuletón criollo', 'Txuletó criollo', 'Chuletón criollo', 'Côte de bœuf criolla'], ['Para compartir: ribeye con hueso; 1 kg', 'Per compartir: ribeye amb os; 1 kg', 'To share: bone-in ribeye; 1 kg', 'À partager : ribeye avec os ; 1 kg'], 'x'],
    [85, ['Black Angus madurado', 'Black Angus madurat', 'Dry-aged Black Angus', 'Black Angus maturé'], ['Para compartir: ribeye con hueso madurado en seco; 1 kg', 'Per compartir: ribeye amb os madurat en sec; 1 kg', 'To share: dry-aged bone-in ribeye; 1 kg', 'À partager : ribeye avec os maturé à sec ; 1 kg']],
    [70, ['Tomahawk', 'Tomahawk', 'Tomahawk steak', 'Tomahawk'], ['Para compartir: el icónico corte norteamericano; 1,2 kg', 'Per compartir: l’icònic tall nord-americà; 1,2 kg', 'To share: the iconic North American cut; 1.2 kg', 'À partager : l’emblématique pièce nord-américaine ; 1,2 kg']]
  ] },
  { id: 'calientes', fire: 1, t: ['Entrantes calientes', 'Entrants calents', 'Warm starters', 'Entrées chaudes'], items: [
    [3.5, ['Empanada de carne', 'Empanada de carn', 'Meat empanada', 'Empanada à la viande'], ['Ternera cortada a cuchillo, huevo, cebolla y salsa secreta', 'Vedella tallada a ganivet, ou, ceba i salsa secreta', 'Hand-cut beef, egg, onion and secret sauce', 'Bœuf coupé au couteau, œuf, oignon et sauce secrète']],
    [5.9, ['Patatas bravas', 'Patates braves', 'Patatas bravas', 'Patatas bravas'], ['El clásico español', 'El clàssic espanyol', 'The Spanish classic', 'Le classique espagnol'], 'v'],
    [9.9, ['Provoleta', 'Provoleta', 'Provolone cheese', 'Provoleta'], ['Al horno, con orégano', 'Al forn, amb orenga', 'Oven-baked, with oregano', 'Au four, à l’origan'], 'v'],
    [8.9, ['Fritura de pescado', 'Fregit de peix', 'Fried fish mix', 'Friture de poisson'], ['Chipirones y calamares', 'Calamarsets i calamars', 'Baby squid and calamari', 'Petits calamars et calamars']],
    [6.9, ['Sopa de tomate', 'Sopa de tomàquet', 'Tomato soup', 'Soupe de tomate'], ['Tomate natural y albahaca fresca', 'Tomàquet natural i alfàbrega fresca', 'Fresh tomato and basil', 'Tomate fraîche et basilic'], 'v'],
    [21.9, ['Antipasto La Pampa', 'Antipasto La Pampa', 'La Pampa antipasto', 'Antipasto La Pampa'], ['Para compartir: quesos, embutidos, frutos secos y 2 empanadas', 'Per compartir: formatges, embotits, fruits secs i 2 empanades', 'To share: cheeses, cold cuts, mixed nuts and 2 empanadas', 'À partager : fromages, charcuterie, fruits secs et 2 empanadas'], 'p']
  ] },
  { id: 'frios', fire: 0, t: ['Entrantes fríos y ensaladas', 'Entrants freds i amanides', 'Cold starters and salads', 'Entrées froides et salades'], items: [
    [15.9, ['Carpaccio', 'Carpaccio', 'Carpaccio', 'Carpaccio'], ['Rúcula, parmesano y tomate cherry', 'Ruca, parmesà i tomàquet cherry', 'Rocket, Parmesan and cherry tomato', 'Roquette, parmesan et tomate cerise']],
    [18.9, ['Jamón ibérico', 'Pernil ibèric', 'Iberian ham', 'Jambon ibérique'], ['100 g', '100 g', '100 g', '100 g'], 'p'],
    [11.5, ['Ensalada César', 'Amanida Cèsar', 'Caesar salad', 'Salade César'], ['Pollo crujiente, salsa César, picatostes y parmesano', 'Pollastre cruixent, salsa Cèsar, crostons i parmesà', 'Crispy chicken, Caesar sauce, croutons and Parmesan', 'Poulet croustillant, sauce César, croûtons et parmesan']],
    [10.9, ['Ensalada de queso de cabra', 'Amanida de formatge de cabra', 'Goat’s cheese salad', 'Salade de chèvre'], ['Hojas verdes, aguacate tostado, frutos secos y vinagreta de albahaca', 'Fulles verdes, alvocat torrat, fruits secs i vinagreta d’alfàbrega', 'Green leaves, toasted avocado, dried fruit and basil vinaigrette', 'Jeunes pousses, avocat grillé, fruits secs et vinaigrette au basilic'], 'v'],
    [10.9, ['Burrata di bosco', 'Burrata di bosco', 'Burrata di bosco', 'Burrata di bosco'], ['Burrata, espinacas asadas, manzana, aguacate y polvo de aceituna', 'Burrata, espinacs rostits, poma, alvocat i pols d’oliva', 'Burrata, roasted spinach, apple, avocado and olive dust', 'Burrata, épinards rôtis, pomme, avocat et poudre d’olive'], 'v']
  ] },
  { id: 'mar', fire: 1, t: ['Del mar', 'Del mar', 'From the sea', 'De la mer'], items: [
    [18.5, ['Paella de marisco', 'Paella de marisc', 'Seafood paella', 'Paella aux fruits de mer'], ['Mejillones, almejas, langostinos y gambas. Precio por persona, mínimo 2', 'Musclos, cloïsses, llagostins i gambes. Preu per persona, mínim 2', 'Mussels, clams, king prawns and shrimps. Price per person, min. 2', 'Moules, palourdes, gambas et crevettes. Prix par personne, min. 2']],
    [21, ['Salmón al horno', 'Salmó al forn', 'Baked salmon fillet', 'Pavé de saumon au four'], ['Patatas al horno y mantequilla de limón', 'Patates al forn i mantega de llimona', 'Baked potatoes and lemon butter', 'Pommes de terre au four et beurre citronné']],
    [25.9, ['Pulpo a la brasa', 'Pop a la brasa', 'Grilled octopus', 'Poulpe grillé'], ['Pimentón, patatas baby y salsa romesco', 'Pebre vermell, patates baby i salsa romesco', 'Paprika, baby potatoes and romesco sauce', 'Paprika, pommes grenaille et sauce romesco']]
  ] },
  { id: 'cocina', fire: 1, t: ['Escalopes y cocina', 'Escalopes i cuina', 'Escalopes and kitchen', 'Escalopes et cuisine'], items: [
    [15.5, ['Escalope de pollo', 'Escalopa de pollastre', 'Chicken escalope', 'Escalope de poulet'], ['Con patatas fritas', 'Amb patates fregides', 'With fries', 'Avec frites']],
    [16.5, ['Escalope de ternera', 'Escalopa de vedella', 'Beef escalope', 'Escalope de bœuf'], ['Con patatas fritas', 'Amb patates fregides', 'With fries', 'Avec frites']],
    [17.5, ['Napolitana de pollo', 'Napolitana de pollastre', 'Chicken napolitana', 'Napolitana de poulet'], ['Patatas, salsa de tomate, jamón y queso', 'Patates, salsa de tomàquet, pernil i formatge', 'Fries, tomato sauce, ham and cheese', 'Frites, sauce tomate, jambon et fromage'], 'p'],
    [19, ['Napolitana de ternera', 'Napolitana de vedella', 'Beef napolitana', 'Napolitana de bœuf'], ['Patatas, salsa de tomate, jamón y queso', 'Patates, salsa de tomàquet, pernil i formatge', 'Fries, tomato sauce, ham and cheese', 'Frites, sauce tomate, jambon et fromage'], 'p'],
    [12.9, ['Espaguetis', 'Espaguetis', 'Spaghetti', 'Spaghetti'], ['Carbonara, boloñesa, napolitana o arrabbiata', 'Carbonara, bolonyesa, napolitana o arrabbiata', 'Carbonara, Bolognese, napolitana or arrabbiata', 'Carbonara, bolognaise, napolitaine ou arrabbiata'], 'p'],
    [15.9, ['Rigatoni al salmón', 'Rigatoni al salmó', 'Salmon rigatoni', 'Rigatoni au saumon'], ['Con salsa de salmón', 'Amb salsa de salmó', 'In a salmon sauce', 'Sauce au saumon']],
    [14.9, ['Lasaña de carne', 'Lasanya de carn', 'Meat lasagne', 'Lasagnes à la viande'], ['Boloñesa, bechamel y queso', 'Bolonyesa, beixamel i formatge', 'Bolognese, béchamel and cheese', 'Bolognaise, béchamel et fromage']],
    [16.9, ['Contramuslo de pollo con champiñones', 'Cuixa de pollastre amb xampinyons', 'Mushroom chicken thigh', 'Haut de cuisse de poulet aux champignons'], ['Con patatas fritas', 'Amb patates fregides', 'With fries', 'Avec frites']]
  ] },
  { id: 'salsas', fire: 0, t: ['Salsas y extras', 'Salses i extres', 'Sauces and extras', 'Sauces et suppléments'], items: [
    [3, ['Salsa de champiñones', 'Salsa de xampinyons', 'Mushroom sauce', 'Sauce champignons'], null],
    [3, ['Salsa de pimienta', 'Salsa de pebre', 'Pepper sauce', 'Sauce au poivre'], null],
    [3, ['Salsa de queso azul', 'Salsa de formatge blau', 'Blue cheese sauce', 'Sauce au bleu'], null],
    [1.5, ['Chimichurri extra', 'Chimichurri extra', 'Extra chimichurri', 'Supplément chimichurri'], null],
    [1.5, ['Alioli extra', 'Allioli extra', 'Extra aioli', 'Supplément aïoli'], null],
    [1.5, ['Pan extra', 'Pa extra', 'Extra bread', 'Supplément pain'], ['El pan casero con alioli llega a la mesa nada más sentarse', 'El pa casolà amb allioli arriba a taula només seure', 'Homemade bread with aioli arrives as soon as you sit down', 'Le pain maison à l’aïoli arrive dès qu’on s’assoit']]
  ] },
  { id: 'vinos', fire: 0, t: ['Vinos de la casa', 'Vins de la casa', 'House wines', 'Vins de la maison'], note: ['Copa · ½ l · 1 l', 'Copa · ½ l · 1 l', 'Glass · ½ l · 1 l', 'Verre · ½ l · 1 l'], items: [
    [2.9, ['Tinto de la casa · tempranillo', 'Negre de la casa · tempranillo', 'House red · Tempranillo', 'Rouge maison · tempranillo'], ['Copa 2,90 · ½ l 6,90 · 1 l 10,90', 'Copa 2,90 · ½ l 6,90 · 1 l 10,90', 'Glass 2.90 · ½ l 6.90 · 1 l 10.90', 'Verre 2,90 · ½ l 6,90 · 1 l 10,90']],
    [2.9, ['Blanco de la casa · airén', 'Blanc de la casa · airén', 'House white · Airén', 'Blanc maison · airén'], ['Copa 2,90 · ½ l 6,90 · 1 l 10,90', 'Copa 2,90 · ½ l 6,90 · 1 l 10,90', 'Glass 2.90 · ½ l 6.90 · 1 l 10.90', 'Verre 2,90 · ½ l 6,90 · 1 l 10,90']],
    [2.9, ['Rosado de la casa · tempranillo', 'Rosat de la casa · tempranillo', 'House rosé · Tempranillo', 'Rosé maison · tempranillo'], ['Copa 2,90 · botella 10,90', 'Copa 2,90 · ampolla 10,90', 'Glass 2.90 · bottle 10.90', 'Verre 2,90 · bouteille 10,90']],
    [3.5, ['Cava', 'Cava', 'Cava', 'Cava'], ['Copa 3,50 · botella 14,90', 'Copa 3,50 · ampolla 14,90', 'Glass 3.50 · bottle 14.90', 'Verre 3,50 · bouteille 14,90']],
    [3.9, ['Sidra Ladrón de Manzanas', 'Sidra Ladrón de Manzanas', 'Ladrón de Manzanas cider', 'Cidre Ladrón de Manzanas'], ['Botella de 33 cl', 'Ampolla de 33 cl', '33 cl bottle', 'Bouteille de 33 cl']],
    [null, ['Malbec y vinos argentinos', 'Malbec i vins argentins', 'Malbec and Argentinian wines', 'Malbec et vins argentins'], ['Como El Enemigo, que sirven con las empanadas: pregunta en sala', 'Com El Enemigo, que serveixen amb les empanades: pregunta a la sala', 'Such as El Enemigo, served with the empanadas: ask the staff', 'Comme El Enemigo, servi avec les empanadas : demandez en salle'], 'x']
  ] }
];
