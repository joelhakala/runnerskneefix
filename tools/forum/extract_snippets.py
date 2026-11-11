import json,re,sys,collections
posts=[json.loads(l) for l in open(sys.argv[1])]
R={'rest':r'\b(rest(ed|ing)?|time off|took .{0,12}(weeks?|months?) off|stop(ped)? running)\b',
'roll':r'foam roll|roller|pvc|tennis ball|lacrosse ball|the stick',
'stretch':r'stretch|yoga|pigeon',
'massage':r'massage|\bART\b|active release|graston|dry needl|chiro',
'hip':r'glute|hip (strength|abduct|work|exerc)|clam ?shell|side leg|abductor|monster walk',
'quad':r'\bvmo\b|vastus|quad (strength|work|exerc)|leg extension|wall sit|squats?|lunges?',
'shoes':r'shoes?|orthotic|insole|inserts?',
'strap':r'strap|brace|tap(e|ing)|cho.?pat|kt tape',
'form':r'cadence|stride|heel strik|forefoot|midfoot|gait analysis|running form|posture',
'drugs':r'nsaid|ibuprofen|naproxen|ice|icing|advil',
'inject':r'cortisone|injection|prp|prolo',
'surgery':r'surgery|release|scope|arthroscop',
'bike':r'bike fit|cleat|saddle height|crank',
'gradual':r'gradual|slowly (build|increas)|eas(e|ing) back|run.?walk|build(ing)? (back )?up'}
OUT=r"help|fix|work|cure|solv|better|gone|relief|reliev|worse|nothing|didn.?t|did not|no (luck|improve|success)|came back|return|still|pain.?free|trick|key|finally"
seen=set(); by=collections.defaultdict(list)
for p in posts:
    sents=re.split(r'(?<=[.!?])\s+',p['t'])
    for i,s in enumerate(sents):
        for k,rx in R.items():
            if re.search(rx,s,re.I):
                ctx=' '.join(sents[max(0,i-1):i+2])
                if not re.search(OUT,ctx,re.I): continue
                key=(k,ctx[:70])
                if key in seen: continue
                seen.add(key); by[k].append((p['tid'],p['y'],ctx[:int(sys.argv[3])]))
tot={k:len(v) for k,v in by.items()}
print('threads',len({p['tid'] for p in posts}),'posts',len(posts),'snippets',tot)
import random; random.seed(1)
for k,v in by.items():
    random.shuffle(v); print(f'\n## {k} ({len(v)} total)')
    for tid,y,c in v[:int(sys.argv[2])]: print(f'- [{tid},{y}] {c}')
