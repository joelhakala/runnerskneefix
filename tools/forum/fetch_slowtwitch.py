import json,re,sys,subprocess,html,time,urllib.parse
out=sys.argv[1]
def get(u):
    r=subprocess.run(['curl','-sS','-m','25','-A','Mozilla/5.0 (research reader)',u],capture_output=True,text=True)
    try: return json.loads(r.stdout)
    except Exception: return None
topics={}
for q in ["runner's knee","patellofemoral","IT band syndrome","ITBS","patellar tendonitis","knee pain running","chondromalacia","jumper's knee","knee pain foam roller","knee massage ART","meniscus running","knee pain cadence"]:
    d=get('https://forum.slowtwitch.com/search.json?q='+urllib.parse.quote(q)); time.sleep(1.2)
    for t in (d or {}).get('topics',[]): topics[t['id']]=(t.get('posts_count',0),t['title'])
pick=[x for x in sorted(topics.items(),key=lambda x:-x[1][0]) if re.search(r'knee|itb|it band|patell|menisc|chondromal',x[1][1],re.I) and not re.search(r'replacement|osteotomy|acl',x[1][1],re.I)][:48]
n=0
with open(out,'w') as f:
    for tid,(c,title) in pick:
        d=get(f'https://forum.slowtwitch.com/t/{tid}.json'); time.sleep(1.2)
        if not d or 'post_stream' not in d: continue
        for p in d['post_stream']['posts']:
            t=html.unescape(re.sub(r'<[^>]+>',' ',re.sub(r'<aside.*?</aside>|<blockquote.*?</blockquote>','',p['cooked'],flags=re.S)))
            t=re.sub(r'\s+',' ',t).strip()
            if len(t)>80: f.write(json.dumps({'tid':tid,'title':title,'y':p['created_at'][:4],'t':t})+'\n'); n+=1
print(len(topics),'topics found;',len(pick),'picked;',n,'posts')
