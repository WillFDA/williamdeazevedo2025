#!/usr/bin/env python3
"""Original editorial diagrams. Run: uv run --with pillow python3 scripts/editorial/generate_covers.py
Requires Lato regular/bold (Debian fonts-lato); override EDITORIAL_FONT_DIR if needed.
No network inputs, random values, prices, quantitative chart scales or third-party imagery.
"""
import json
import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
FONT_DIR = Path(os.environ.get('EDITORIAL_FONT_DIR', '/usr/share/fonts/truetype/lato'))
S = 2
CREAM, INK, BLUE, PALE, LINE, WHITE, MUTED = '#f7f3eb', '#1f2634', '#2744a8', '#e7edff', '#d5d4ce', '#ffffff', '#505969'
entries = []

def font(size, bold=False):
    return ImageFont.truetype(str(FONT_DIR / ('Lato-Bold.ttf' if bold else 'Lato-Regular.ttf')), size*S)

def rect(box, fill=WHITE, outline=None, radius=16):
    d.rounded_rectangle(tuple(int(v*S) for v in box), radius*S, fill=fill, outline=outline, width=2*S)

def text(x,y,s,size=26,fill=INK,bold=False):
    # Fail rather than silently clip text at the image edge.
    f=font(size,bold)
    for n,line in enumerate(s.split('\n')):
        assert x*S+d.textlength(line,font=f) <= 1150*S, (s,x,size)
        d.text((x*S,(y+n*(size+9))*S),line,font=f,fill=fill)

def line(points,fill=BLUE,width=3):
    d.line([(int(x*S),int(y*S)) for x,y in points], fill=fill,width=width*S)

def arrow(x1,y1,x2,y2):
    line([(x1,y1),(x2,y2)])
    if x2>x1: line([(x2-10,y2-7),(x2,y2),(x2-10,y2+7)])
    else: line([(x2-7,y2-10),(x2,y2),(x2+7,y2-10)])

def circle(x,y,r,fill=BLUE):
    d.ellipse(((x-r)*S,(y-r)*S,(x+r)*S,(y+r)*S),fill=fill)

def start(section,title,subtitle):
    global im,d
    im=Image.new('RGB',(1200*S,675*S),CREAM); d=ImageDraw.Draw(im)
    rect((54,44,86,50),BLUE,radius=3)
    text(100,32,section.upper(),18,BLUE,True)
    text(54,82,title,48,bold=True)
    text(56,150,subtitle,24,MUTED)
    line([(54,616),(1146,616)],LINE,1)
    text(54,636,'WILLIAM DE AZEVEDO  /  GUIDES WEB',15,MUTED,True)
    text(945,633,'REPÈRES VISUELS',16,BLUE,True)

def save(slug,alt):
    path=ROOT/'public/articles'/slug/'cover.webp'; path.parent.mkdir(parents=True,exist_ok=True)
    im.resize((1200,675),Image.Resampling.LANCZOS).save(path,'WEBP',quality=87,method=6)
    entries.append({'slug':slug,'src':f'/articles/{slug}/cover.webp','alt':alt,'width':1200,'height':675,'bytes':path.stat().st_size})

start('Budget / création','Un budget se construit par étapes','Séparer le travail initial de la vie du site.')
for i,(title,body) in enumerate([('Cadrer','Objectifs\nPérimètre'),('Concevoir','Contenus\nDesign'),('Construire','Intégration\nTests'),('Faire vivre','Hébergement\nMaintenance')]):
    x=54+i*280
    rect((x,242,x+250,506),PALE if i==3 else WHITE)
    text(x+24,267,f'0{i+1}',20,BLUE,True); text(x+24,313,title,29,bold=True); text(x+24,376,body,26,MUTED)
    if i<3: arrow(x+256,353,x+274,353)
line([(78,532),(838,532)],BLUE,2); text(310,546,'INVESTISSEMENT INITIAL',19,BLUE,True)
text(922,546,'RÉCURRENT',19,BLUE,True)
save('prix-site-vitrine','Budget d’un site vitrine en quatre étapes : cadrer, concevoir, construire, puis faire vivre le site ; les trois premières relèvent du travail initial, la dernière des coûts récurrents.')

start('Budget / fonctionnement','Ce qui fait vivre un site','Des postes récurrents à distinguer dans le contrat.')
rect((435,285,765,482),INK); text(479,323,'Vie du site',38,WHITE,True); text(480,391,'Coûts récurrents',24,WHITE)
for x,y,t,b in [(54,227,'Infrastructure','Domaine · hébergement'),(810,227,'Maintenance','Mises à jour · sauvegardes'),(54,454,'Services tiers','E-mail · outils · licences'),(810,454,'Accompagnement','Contenus · suivi · assistance')]:
    rect((x,y,x+335,y+128)); text(x+20,y+22,t,28,bold=True); text(x+20,y+76,b,21,MUTED)
line([(389,291),(412,291),(412,330),(435,330)])
line([(765,330),(788,330),(788,291),(810,291)])
line([(389,518),(412,518),(412,430),(435,430)])
line([(765,430),(788,430),(788,518),(810,518)])
save('cout-site-internet-par-mois','Quatre composantes des coûts récurrents autour de la vie du site : infrastructure, maintenance, services tiers et accompagnement.')

start('Budget / refonte','Corriger ou reconstruire ?','Le diagnostic décide du périmètre, pas l’envie de tout refaire.')
rect((380,220,820,291),INK); text(422,237,'Diagnostiquer l’existant',30,WHITE,True)
line([(600,291),(600,322),(310,322),(310,352)]); line([(600,322),(890,322),(890,352)])
for x,t,b,tag in [(54,'Problèmes localisés','Parcours ou pages à améliorer\nSocle technique encore adapté','CORRECTIONS CIBLÉES'),(625,'Limites structurelles','Architecture ou outil inadapté\nObjectifs devenus incompatibles','REFONTE COMPLÈTE')]:
    rect((x,352,x+520,582),WHITE)
    text(x+27,377,t,32,bold=True); text(x+27,432,b,25,MUTED)
    rect((x+25,523,x+494,566),PALE,radius=8); text(x+42,533,tag,20,BLUE,True)
save('prix-refonte-site-internet','Arbre de décision : après diagnostic, des problèmes localisés avec un socle adapté orientent vers des corrections ciblées ; des limites structurelles orientent vers une refonte complète.')

start('Migration / référencement','Changer de site, garder le chemin','Associer chaque ancienne URL à une destination pertinente.')
text(74,233,'ANCIENNES URL',19,MUTED,True); text(812,233,'NOUVELLES URL',19,MUTED,True)
for y,a,b in [(284,'/prestations','/services'),(389,'/nos-projets','/realisations')]:
    rect((54,y,449,y+76)); text(81,y+23,a,28,bold=True)
    arrow(462,y+38,537,y+38); rect((552,y,648,y+76),BLUE); text(574,y+22,'301',28,WHITE,True)
    arrow(663,y+38,738,y+38); rect((753,y,1146,y+76)); text(781,y+23,b,28,bold=True)
rect((54,514,1146,581),PALE); text(80,534,'Tester les redirections · Actualiser les liens · Suivre l’indexation',25,BLUE,True)
save('refonte-seo','Deux exemples de correspondance entre anciennes et nouvelles URL via des redirections 301, avec trois contrôles : redirections, liens internes et indexation.')

start('Cadrage / brief','Le bon brief met les priorités à plat','Définir l’essentiel avant d’ajouter des fonctionnalités.')
for x,y,w,h,t,b,c in [(54,228,535,349,'Indispensable','Objectif du site\nPublic à convaincre\nAction attendue',INK),(620,228,526,164,'À préciser','Contenus · budget · échéance',WHITE),(620,416,526,161,'À arbitrer','Options · intégrations · évolutions',PALE)]:
    rect((x,y,x+w,y+h),c); text(x+30,y+25,t,34,WHITE if c==INK else INK,True); text(x+30,y+91,b,27,WHITE if c==INK else MUTED)
text(86,531,'LE SOCLE DU PROJET',18,'#dce6ff',True)
save('cahier-des-charges-site-internet','Brief organisé par priorité : objectif, public et action attendue sont indispensables ; contenus, budget et échéance sont à préciser ; options, intégrations et évolutions sont à arbitrer.')

start('Inspiration / site vitrine','Un parcours, trois questions','Une belle page doit aussi aider à comprendre et à agir.')
for i,(t,q,body) in enumerate([('Offre claire','Que proposez-vous ?','Service · bénéfice · public'),('Preuves','Pourquoi vous croire ?','Projets · avis · méthode'),('Contact','Comment avancer ?','Appel à l’action · formulaire')]):
    x=54+374*i
    rect((x,232,x+344,564)); rect((x+17,249,x+327,274),PALE, radius=5)
    for k in range(3): circle(x+30+k*13,261,3,BLUE)
    text(x+24,301,t,34,bold=True); text(x+24,356,q,25,BLUE,True)
    text(x+24,405,body,21,MUTED)
    if i==0:
        line([(x+25,464),(x+258,464)],LINE,6); line([(x+25,486),(x+208,486)],LINE,6)
    elif i==1:
        for a in range(3): rect((x+25+a*98,459,x+107+a*98,517),PALE,radius=6)
    else:
        rect((x+25,460,x+318,517),BLUE,radius=8); text(x+64,475,'Parlons du projet',24,WHITE,True)
    if i<2: arrow(x+346,392,x+370,392)
save('exemples-sites-vitrines','Trois maquettes schématiques d’un parcours de site vitrine : une offre claire répond à ce qui est proposé, les preuves rassurent, puis le contact permet d’avancer.')

start('Contenus / artisan','Les quatre repères d’un client','Répondre aux questions concrètes avant la prise de contact.')
for x,y,num,t,b in [(54,224,'01','Services','Ce que vous réalisez'),(612,224,'02','Zone d’intervention','Où vous vous déplacez'),(54,418,'03','Preuves','Chantiers, photos et avis'),(612,418,'04','Contact','Comment vous joindre')]:
    rect((x,y,x+534,y+168),WHITE); circle(x+49,y+51,25,PALE); text(x+36,y+38,num,22,BLUE,True)
    text(x+91,y+29,t,33,bold=True); text(x+91,y+89,b,27,MUTED)
save('site-internet-artisan-contenus','Quatre blocs de contenu pour un site d’artisan : services réalisés, zone d’intervention, preuves par les chantiers, photos et avis, puis coordonnées de contact.')

start('Création / intelligence artificielle','Générer n’est pas publier','La vérification humaine reste une étape à part entière.')
rect((54,300,345,510)); text(82,331,'Générer',36,bold=True); text(82,394,'Structure\nPremiers contenus',25,MUTED)
arrow(357,401,405,401)
rect((420,224,780,566),INK); text(450,252,'Vérifier',39,WHITE,True)
for j,t in enumerate(['Faits et droits','Accessibilité','Sécurité','Formulaires']):
    y=330+j*48; rect((452,y+3,471,y+22),None,'#b8c8ff',3); text(490,y,t,25,WHITE)
arrow(795,401,839,401)
rect((855,300,1146,510)); text(883,331,'Publier',36,bold=True); text(883,394,'Mise en ligne\nSuivi et corrections',24,MUTED)
save('creer-site-internet-ia','Parcours de création avec l’IA : générer une structure et des contenus, vérifier les faits, droits, accessibilité, sécurité et formulaires, puis publier et assurer le suivi.')

start('Qualité / accessibilité','Trois tests pour commencer','Des vérifications utiles, pas un audit de conformité complet.')
for i,(t,b) in enumerate([('Clavier','Parcours sans souris\nFocus toujours visible'),('Contraste','Texte et fond distincts\nInformation lisible'),('Libellés','Champs identifiables\nConsignes explicites')]):
    x=54+374*i; rect((x,231,x+344,578)); text(x+25,255,t,33,bold=True)
    text(x+25,492,b,24,MUTED)
rect((82,346,198,412),CREAM,LINE,8); text(106,362,'Tab',30,bold=True)
rect((216,340,365,418),None,BLUE,10); rect((223,347,358,411),BLUE,radius=6); text(244,367,'Suivant',24,WHITE,True)
rect((457,333,710,435),INK,radius=10); text(511,345,'Aa',67,WHITE,True)
text(828,329,'Votre e-mail',24,bold=True); rect((828,375,1117,438),CREAM,BLUE,7); text(845,395,'nom@exemple.fr',23,MUTED)
save('tester-accessibilite-site-web','Trois tests d’accessibilité illustrés : touche Tab et focus visible, texte clair sur fond sombre pour le contraste, et champ e-mail doté d’un libellé explicite. Ce n’est pas un audit complet.')

start('Visibilité / moteurs IA','Être accessible ne garantit pas d’être cité','Trois notions à distinguer, sans promesse de résultat.')
for x,y,t,b in [(54,246,'Exploration','Le robot peut accéder\naux pages autorisées.'),(428,299,'Indexation','Le moteur peut retenir\nle contenu découvert.'),(802,352,'Citation','Une réponse peut choisir\nde mentionner la source.')]:
    rect((x,y,x+344,y+191),WHITE); text(x+25,y+27,t,34,bold=True); text(x+25,y+89,b,24,MUTED)
arrow(398,335,422,335); arrow(772,390,796,390)
rect((54,555,1146,593),PALE,radius=6); text(79,562,'ACCÈS POSSIBLE ≠ INDEXATION ASSURÉE ≠ CITATION GARANTIE',21,BLUE,True)
save('referencement-chatgpt','Trois étapes distinctes en escalier : exploration des pages autorisées, indexation possible du contenu et citation éventuelle dans une réponse. Aucune étape ne garantit la suivante.')

assert len(entries)==10 and len({e['slug'] for e in entries})==10
for e in entries:
    with Image.open(ROOT/'public'/e['src'].lstrip('/')) as check:
        assert check.size==(1200,675) and check.format=='WEBP'
    assert e['bytes'] < 150_000, e
(HERE/'manifest.json').write_text(json.dumps(entries,ensure_ascii=False,indent=2)+'\n')
sheet=Image.new('RGB',(1200,5*370),CREAM)
sd=ImageDraw.Draw(sheet)
for n,e in enumerate(entries):
    x=(n%2)*600; y=(n//2)*370
    with Image.open(ROOT/'public'/e['src'].lstrip('/')) as tile:
        sheet.paste(tile.resize((600,338),Image.Resampling.LANCZOS),(x,y))
    sd.text((x+15,y+343),e['slug'],font=ImageFont.truetype(str(FONT_DIR/'Lato-Regular.ttf'),17),fill=INK)
sheet.save(HERE/'contact-sheet.webp',quality=88,method=6)
print(json.dumps({'covers':len(entries),'total_bytes':sum(e['bytes'] for e in entries),'files':entries,'contact_sheet':str(HERE/'contact-sheet.webp')},ensure_ascii=False,indent=2))
