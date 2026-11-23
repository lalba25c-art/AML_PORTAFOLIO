"""Optimiza imágenes (WebP) y genera assets.json con data-URIs. Uso: python build_assets.py [full|lite]"""
import sys, json, base64, io, os
from PIL import Image
MODE = sys.argv[1] if len(sys.argv) > 1 else 'full'
S = '/tmp/claude-0/-home-claude/094927db-0586-51e9-928a-509967894e32/scratchpad/'
A = '/mnt/user-data/attachments/094927db-0586-51e9-928a-509967894e32/'
MAXW, Q = (1200, 76) if MODE == 'full' else (760, 58)

def enc(im, maxw=MAXW, q=Q):
    im = im.convert('RGB')
    if im.width > maxw:
        im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, 'WEBP', quality=q, method=6)
    return 'data:image/webp;base64,' + base64.b64encode(b.getvalue()).decode(), im.width, im.height

# (id, ruta, laboratorio, cámara, pie literal tomado del documento original)
EV = [
 # Docker · examen práctico
 ('dk-examen-1', S+'ex/ex-001-000.png', 'docker', 5, 'Examen · docker run --name debian1 -it debian · docker images'),
 ('dk-examen-2', S+'ex/ex-001-001.png', 'docker', 5, 'Examen · docker attach debian1 · ls dentro del contenedor'),
 ('dk-examen-3', S+'ex/ex-002-002.png', 'docker', 5, 'Examen · docker ps · docker ps -n 1'),
 ('dk-examen-4', S+'ex/ex-003-003.png', 'docker', 5, 'Examen · docker run --name nginx200 -d nginx · docker images'),
 # Docker · logs, top, stats, kill
 ('dk-logs-1', S+'dk/dk-001-001.png', 'docker', 5, 'docker logs nginx10 · registro del servidor nginx'),
 ('dk-logs-2', S+'dk/dk-002-003.png', 'docker', 5, 'docker logs nginx10 · salida del registro'),
 ('dk-top-1', S+'dk/dk-002-004.png', 'docker', 5, 'docker top nginx10 · procesos del contenedor'),
 ('dk-top-2', S+'dk/dk-003-006.png', 'docker', 5, 'docker top nginx10 · con sleep 500 en ejecución'),
 ('dk-stats', S+'dk/dk-003-007.png', 'docker', 5, 'docker stats nginx10 · uso de recursos'),
 ('dk-kill', S+'dk/dk-003-008.png', 'docker', 5, 'docker kill nginx10'),
 ('dk-pull', S+'dk/dk-004-010.png', 'docker', 5, 'docker pull node'),
 ('dk-grep', S+'dk/dk-004-011.png', 'docker', 5, 'docker images | grep node'),
 ('dk-inspect', S+'dk/dk-005-013.png', 'docker', 5, 'docker inspect node'),
 ('dk-inspect2', S+'dk/dk-006-015.png', 'docker', 5, 'docker inspect node · continuación'),
 ('dk-nodever', S+'dk/dk-006-016.png', 'docker', 5, 'docker inspect node | grep NODE_VERSION'),
 ('dk-cp', S+'dk/dk-007-018.png', 'docker', 5, 'docker cp fichero.txt nginx10:/tmp'),
 ('dk-cp2', S+'dk/dk-007-019.png', 'docker', 5, 'docker start nginx10 · docker exec nginx10 ls /tmp'),
 # Docker · variables (PostgreSQL)
 ('pg-1', S+'img/image1.png', 'postgres', 5, 'docker pull postgres'),
 ('pg-2', S+'img/image2.png', 'postgres', 5, 'docker images | grep postgres'),
 ('pg-3', S+'img/image8.png', 'postgres', 5, 'docker run con POSTGRES_PASSWORD, POSTGRES_USER y POSTGRES_DB'),
 ('pg-4', S+'img/image7.png', 'postgres', 5, 'docker exec -it postgres bash'),
 ('pg-5', S+'img/image4.png', 'postgres', 5, 'psql -U usudb1 pt1'),
 ('pg-6', S+'img/image5.png', 'postgres', 5, 'Comandos \\l y \\q dentro de psql'),
 # John the Ripper
 ('jr-test', S+'odt/Pictures/10000001000002A3000002572CB2A7A1961665CB.png', 'john', 5, 'john --test · prueba de rendimiento'),
 ('jr-nohash', S+'odt/Pictures/100000010000015700000049D7C07F3348E0EAB0.png', 'john', 5, 'john password.hashes (sin --format)'),
 ('jr-crypt', S+'odt/Pictures/10000000000002A300000142FD5FDCF5D05A539B.png', 'john', 5, 'john --format=crypt password.hashes'),
 ('jr-show', S+'odt/Pictures/100000010000017700000061A31BA951E5D936D9.png', 'john', 5, 'john --show password.hashes'),
 # CPD Arena
 ('cpd-1', S+'cpd/cpd-003-003.png', 'cpd', 5, 'CPD Arena · prueba de estrés 1'),
 ('cpd-2', S+'cpd/cpd-004-005.png', 'cpd', 5, 'CPD Arena · prueba de estrés 2'),
 ('cpd-3', S+'cpd/cpd-005-006.png', 'cpd', 5, 'CPD Arena · configuración del CPD (mapa y planta)'),
 ('cpd-4', S+'cpd/cpd-012-016.png', 'cpd', 5, 'CPD Arena · prueba de estrés 3'),
 # OpenMediaVault
 ('omv-1', S+'omv/omv-004-001.png', 'omv', 5, 'OpenMediaVault · Tarea 1 · VirtualBox'),
 ('omv-2', S+'omv/omv-005-003.png', 'omv', 5, 'OpenMediaVault · Paso 2 · crear la máquina virtual'),
 ('omv-3', S+'omv/omv-006-005.png', 'omv', 5, 'OpenMediaVault · Paso 3 · instalación'),
 ('omv-4', S+'omv/omv-008-007.png', 'omv', 5, 'OpenMediaVault · interfaz web · red'),
 ('omv-5', S+'omv/omv-009-009.png', 'omv', 5, 'OpenMediaVault · almacenamiento'),
 ('omv-6', S+'omv/omv-011-012.png', 'omv', 5, 'OpenMediaVault · Paso 6 · RAID 5'),
 ('omv-7', S+'omv/omv-011-013.png', 'omv', 5, 'OpenMediaVault · Paso 7 · sistema de archivos'),
 ('omv-8', S+'omv/omv-013-015.png', 'omv', 5, 'OpenMediaVault · Paso 9 · carpeta compartida y permisos'),
 ('omv-9', S+'omv/omv-015-019.png', 'omv', 5, 'OpenMediaVault · Paso 11 · servicios SMB y FTP'),
 ('omv-10', S+'omv/omv-016-020.png', 'omv', 5, 'OpenMediaVault · Paso 12 · consola'),
 ('omv-11', S+'omv/omv-019-026.png', 'omv', 5, 'OpenMediaVault · consola tras recuperar el RAID'),
 # CyberChef (criptografía)
 ('cc-vig', S+'ex/ex-004-004.png', 'cyberchef', 6, 'CyberChef · descifrado Vigenère (clave SMR)'),
 ('cc-freq', S+'ex/ex-004-005.png', 'cyberchef', 6, 'CyberChef · Frequency distribution'),
 ('cc-rot', S+'ex/ex-005-006.png', 'cyberchef', 6, 'CyberChef · ROT13 para descifrar César'),
]
out = {'evidence': [], 'sadchuruzen': {}}
tot = 0
for id_, p, lab, cam, cap in EV:
    d, w, h = enc(Image.open(p))
    out['evidence'].append(dict(id=id_, lab=lab, cam=cam, cap=cap, src=d, w=w, h=h)); tot += len(d)

# Fotografías ORIGINALES de Sadchuruzen (sin retoque: solo recorte)
a = Image.open(A+'59d01e00-image.png').convert('RGB')
av = a.crop((420, 0, 800, 380));  out['sadchuruzen']['avatar'] = enc(av, 300, 84)[0]
pt = a.crop((330, 0, 870, 719));  out['sadchuruzen']['retrato'] = enc(pt, 480, 82)[0]
b = Image.open(A+'34ec0482-image.png').convert('RGB').crop((0, 758, 946, 1288))
out['sadchuruzen']['cachorro'] = enc(b, 640, 80)[0]
out['sadchuruzen']['completa'] = enc(a, 900, 80)[0]
json.dump(out, open(f'/home/claude/proyecto/assets_{MODE}.json', 'w'))
print(MODE, len(out['evidence']), 'evidencias', round((tot + sum(len(v) for v in out['sadchuruzen'].values())) / 1e6, 2), 'MB base64')
