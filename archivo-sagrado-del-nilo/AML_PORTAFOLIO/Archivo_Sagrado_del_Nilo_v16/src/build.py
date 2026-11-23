import base64,re,json,os,sys,shutil
D=os.path.dirname(os.path.abspath(__file__)); R=os.path.dirname(D)
def uri(f):
    ext=f.rsplit('.',1)[1]; mt={'webp':'image/webp','jpg':'image/jpeg','png':'image/png','gif':'image/gif'}[ext]
    return 'data:%s;base64,%s'%(mt,base64.b64encode(open(os.path.join(R,'assets',f),'rb').read()).decode())
rd=lambda n:open(os.path.join(D,n),encoding='utf8').read()
body=rd('part2_body.html')
body=re.sub(r'\{\{IMG:([^}]+)\}\}',lambda m:uri(m.group(1)),body)
js=''.join(rd(n) for n in ['part3a_data.js','part3b_scenes.js','part3c_engine.js','part3d_audio_chat.js','part3e_companion.js','part3f_content.js','part3g_world.js','part3h_encounter.js','part3i_sprite.js','part3k_heroina.js','part3l_avatars.js','part3n_minigames.js','part3m_temples.js','part3j_music.js','part3z_init.js'])
ev={f[3:-5]:uri(f) for f in sorted(os.listdir(os.path.join(R,'assets'))) if f.startswith('ev_')}
js=js.replace('/*EVIDENCE_IMGS*/{}',json.dumps(ev))
js=js.replace('{{ARCHIVERA_IMG}}',uri('archivera_retrato.webp'))
html=rd('part0_head.html')+rd('part1_css.css')+rd('part1b_expedition.css')+rd('part1c_sprite.css')+rd('part1d_avatars.css')+rd('part1e_temples.css')+'\n</style></head>\n'+body+'\n<script>\n'+js+'\n</script>\n</body></html>\n'
out=os.path.join(R,'dist','index.html')
os.makedirs(os.path.dirname(out),exist_ok=True)
open(out,'w',encoding='utf8').write(html)
# La música se carga mediante rutas relativas; copiarla junto al HTML publicado.
audio_src=os.path.join(R,'assets','audio')
audio_dst=os.path.join(R,'dist','assets','audio')
if os.path.isdir(audio_src):
    os.makedirs(os.path.dirname(audio_dst),exist_ok=True)
    shutil.copytree(audio_src,audio_dst,dirs_exist_ok=True)
print(len(html)//1024,'KB')
