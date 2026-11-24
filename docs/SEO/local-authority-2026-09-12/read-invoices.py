import sys,json,zipfile,xml.etree.ElementTree as ET
from pathlib import Path
sys.path.insert(0,'D:/Pure Air California/pac-tools/python')
import pymupdf
files=["C:/Users/IMAGINE360/Documents/PAC/pureair-crm/gdrive_downloads/Pure Air California Invoice SoulCycle  Brentwood 8.docx","C:/Users/IMAGINE360/Documents/PAC/pureair-crm/gdrive_downloads/Pure Air California Invoice SoulCycle  Culver City 5.docx","C:/Users/IMAGINE360/Documents/PAC/pureair-crm/gdrive_downloads/Pure Air California Invoice SoulCycle  Beverly Hills 10.docx","C:/Users/IMAGINE360/Documents/PAC/pureair-crm/gdrive_downloads/ Pure Air California Invoice SoulCycle West Hollywood 11.docx","C:/Users/IMAGINE360/Documents/PAC/pureair-crm/gdrive_downloads/Pure Air California Invoice Bassette Furniture .docx","C:/Users/IMAGINE360/Documents/PAC/pureair-crm/gdrive_downloads/Pure Air California Invoice Bassette Furniture second invoice.docx","C:/Users/IMAGINE360/Documents/PAC/pureair-crm/gdrive_downloads/American Integrated Services Pure Air California Invoice 81562 A1.docx","C:/Users/IMAGINE360/Documents/PAC/pureair-crm/gdrive_downloads/ Pure Air California Invoice Taco Bell  JJC Foods LLC _ 8220 De Soto Ave November 5, 2024.docx","C:/Users/IMAGINE360/Documents/PAC/pureair-crm/gdrive_downloads/Pure Air California Invoice 5413 - Century Plaza.docx","C:/Users/IMAGINE360/Documents/PAC/before and After/Pure Air California Invoice West Hollywood Community Housing Corporation .pdf"]
result=[]
for file in files:
 try:
  if file.lower().endswith('.docx'):
   with zipfile.ZipFile(file) as z:
    root=ET.fromstring(z.read('word/document.xml'))
    paragraphs=[''.join(p.itertext()) for p in []]
    ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    paragraphs=[''.join(t.text or '' for t in p.findall('.//w:t',ns)) for p in root.findall('.//w:p',ns)]
    text='\n'.join(paragraphs)
  else:
   with pymupdf.open(file) as doc:text='\n'.join(p.get_text() for p in doc)
  result.append({'file':Path(file).name,'text':text})
 except Exception as e:result.append({'file':Path(file).name,'error':str(e)})
out=Path('D:/Pure Air California/pac-private-research-2026-09-12');out.mkdir(exist_ok=True)
(out/'invoice-extracts.json').write_text(json.dumps(result,indent=2),encoding='utf8')
for r in result:
 print('SOURCE:',r['file'])
 for line in r.get('text','').splitlines():
  if any(w in line.lower() for w in ['soul','bassett','integrated','housing','invoice','date','clean','filter','hvac','plenum','unit','service','cycle','month','coil','completed','century','hollywood','brentwood','culver','taco','jjc']):
   if '@' not in line and '$' not in line: print(line)
