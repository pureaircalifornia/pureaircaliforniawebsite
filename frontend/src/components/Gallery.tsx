const photos = [
 {src:'realInspection',title:'See what needs attention.',text:'A closer look at the inside of a ventilation system.',alt:'PAC project photo showing the inside of a ventilation opening'},
 {src:'realEquipment',title:'Bring the right equipment.',text:'Cleaning equipment from the PAC field-photo library.',alt:'Portable air-system cleaning equipment and hoses'},
 {src:'realDuct',title:'Look beyond the grille.',text:'Duct interiors help tell the story of each system.',alt:'PAC project photo looking inside flexible ductwork'},
];
export default function Gallery(){return <section className="pac-work-section"><div className="pac-container"><div className="pac-work-header"><span className="pac-eyebrow">FROM THE FIELD</span><h2>Real systems. Hands-on care.</h2><p>A look through our project photo library. Every property is different; we start by understanding yours.</p></div><div className="pac-work-grid">{photos.map(photo=><figure className="pac-work-card" key={photo.src}><img src={'/images/pac/'+photo.src+'.webp'} alt={photo.alt} width="600" height="800" loading="lazy"/><figcaption><strong>{photo.title}</strong>{photo.text}</figcaption></figure>)}</div></div></section>}
