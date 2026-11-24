import { Link } from '@/components/CanonicalLink';
import { ArrowUpRight, Search, Wind, ClipboardCheck } from 'lucide-react';
import { coastalImage } from '@/utils/coastalImages';
import images from '@/data/coastalImages.json';

export function NaturePhoto({ name, alt, className = '' }: { name: string; alt: string; className?: string }) {
  const photo = Object.prototype.hasOwnProperty.call(images, name)
    ? coastalImage(name as keyof typeof images)
    : { src: `/images/breath/${name}-1440.webp`, width: 1440, height: 960 };
  return <img className={className} {...photo} sizes="(max-width: 700px) 100vw, 50vw" alt={alt} loading="lazy" decoding="async" />;
}

function EssentialIllustration({ kind }: { kind: 'food' | 'water' | 'air' }) {
  return <svg className="pac-essential-illustration" viewBox="0 0 320 220" width={320} height={220} fill="none" aria-hidden="true">
    {kind === 'food' ? <>
      <circle cx="160" cy="112" r="86" fill="currentColor" opacity=".045" />
      <circle cx="160" cy="112" r="66" fill="white" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="160" cy="112" r="48" stroke="currentColor" strokeWidth="1" opacity=".3" />
      <path d="M140 140C142 119 154 94 179 76M150 120C130 119 122 106 124 93C143 93 154 101 150 120ZM161 103C158 85 167 70 186 68C187 86 178 98 161 103ZM143 133C158 115 176 113 188 120C178 135 162 143 143 133Z" fill="#d8f1f5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M61 65V101M52 65V88C52 97 70 97 70 88V65M61 101V166M259 65C246 81 246 101 259 106V166M259 65V106" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="119" cy="139" r="8" fill="#64bdc8" opacity=".6" />
    </> : kind === 'water' ? <>
      <circle cx="160" cy="112" r="86" fill="currentColor" opacity=".045" />
      <path d="M160 29C142 59 111 91 111 122C111 151 132 171 160 171C188 171 209 151 209 122C209 91 178 59 160 29Z" fill="#d8f1f5" stroke="currentColor" strokeWidth="2" />
      <path d="M126 128C137 120 146 119 158 126C170 133 182 133 194 125M137 145C145 149 154 151 162 150" stroke="#64bdc8" strokeWidth="3" strokeLinecap="round" />
      <path d="M87 185C110 180 135 180 160 185C185 190 209 190 232 185M108 197C141 193 178 193 211 197" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".25" />
      <path d="M143 70C133 84 126 95 125 107" stroke="white" strokeWidth="5" strokeLinecap="round" />
    </> : <>
      <circle cx="160" cy="112" r="82" stroke="currentColor" opacity=".15" />
      <circle cx="160" cy="112" r="61" stroke="currentColor" opacity=".3" />
      <circle cx="160" cy="112" r="39" fill="currentColor" opacity=".06" />
      <path d="M30 96C73 67 105 73 140 98C172 120 202 127 245 107C263 99 274 90 289 88M31 120C77 92 108 97 141 120C175 143 207 149 247 130C264 122 276 116 289 115M51 145C89 123 115 129 142 145C170 161 201 166 232 152" stroke="#64bdc8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="160" cy="112" r="8" fill="currentColor" />
      <circle cx="210" cy="63" r="5" fill="#64bdc8" />
      <circle cx="90" cy="166" r="3" fill="currentColor" opacity=".5" />
    </>}
  </svg>;
}

const essentials = [
  { kind: 'food' as const, label: 'Food', scale: 'Weeks', text: 'Without food, with water.' },
  { kind: 'water' as const, label: 'Water', scale: 'Days', text: 'Without fluids.' },
  { kind: 'air' as const, label: 'Air', scale: 'Moments', text: 'Our need is continuous.' },
];

export default function BreathMission({ full = false }: { full?: boolean }) {
  return <section className="pac-breath-mission pac-life-reflection" id="our-mission" aria-labelledby="breath-mission-heading">
    <div className="pac-container pac-essential-intro"><span className="pac-eyebrow">THE ESSENTIALS THAT SUSTAIN US</span><h2 id="breath-mission-heading">Before anything else,<br /><em>there is air.</em></h2><p>Food. Water. The breath we so often forget to notice.</p></div>
    <div className="pac-container">
      <ol className="pac-essential-stages">{essentials.map((essential, index) => <li key={essential.kind} className={'pac-essential-stage pac-essential-stage-' + essential.kind}>
        <span className="pac-essential-stage-number">0{index + 1}</span><EssentialIllustration kind={essential.kind} /><div className="pac-essential-stage-copy"><h3>{essential.label}</h3><strong>{essential.scale}</strong><p>{essential.text}</p></div>
      </li>)}</ol>
      <div className="pac-essential-context"><p>These are broad comparisons, not survival limits.</p><details className="pac-disclosure"><summary>Why air matters · Read the context &amp; sources</summary><div className="pac-disclosure-content"><p>Our need for air is immediate and continuous. The time a person can live without food or fluids varies greatly with their health and circumstances.</p><a href="https://www.rcp.ac.uk/media/v0uf25sf/supporting-people-who-have-eating-and-drinking-difficulties_final_updated.pdf" target="_blank" rel="noreferrer">Food and water · Royal College of Physicians</a><a href="https://medlineplus.gov/ency/article/001435.htm" target="_blank" rel="noreferrer">Why oxygen matters · MedlinePlus</a></div></details></div>
    </div>
    <div className="pac-container pac-breath-mission-grid pac-job-process" id="real-job-work">
      <div className="pac-job-evidence">
        <figure>
          <img
            src="/images/field/duct-cleaning-in-action-1200.webp"
            srcSet="/images/field/duct-cleaning-in-action-640.webp 640w, /images/field/duct-cleaning-in-action-1200.webp 1200w"
            sizes="(max-width: 700px) 48vw, 24vw"
            width={1200}
            height={900}
            alt="Cleaning nozzle loosening and collecting accumulated dust inside a round ventilation duct during PAC service"
            loading="lazy"
            decoding="async"
          />
          <figcaption>Working inside the duct.</figcaption>
        </figure>
        <figure>
          <img
            src="/images/field/collected-lint-1200.webp"
            srcSet="/images/field/collected-lint-640.webp 640w, /images/field/collected-lint-1200.webp 1200w"
            sizes="(max-width: 700px) 48vw, 24vw"
            width={1200}
            height={900}
            alt="Compacted lint extracted from a restricted dryer exhaust line during PAC field service"
            loading="lazy"
            decoding="async"
          />
          <figcaption>Lint and debris removal.</figcaption>
        </figure>
        <p>Real field photographs from Pure Air California visits.</p>
      </div>
      <div className="pac-breath-mission-copy">
        <span className="pac-eyebrow">WHAT HAPPENS ON A SERVICE VISIT</span>
        <h3>See the work<br /><em>behind your vent.</em></h3>
        <ul className="pac-indoor-care-points"><li><Search aria-hidden="true" /><span><strong>Inspect the system</strong>Check accessible ducts, buildup and access before agreeing the scope.</span></li><li><Wind aria-hidden="true" /><span><strong>Clean the air path</strong>Loosen and collect debris with equipment suited to your system.</span></li><li><ClipboardCheck aria-hidden="true" /><span><strong>Review the work</strong>Walk through the completed scope and any areas that need further attention.</span></li></ul>
        {full && <p className="pac-breath-practical-note">We explain what we can access and clean before work begins.</p>}
        <Link className="pac-text-link" to="/services/residential-air-duct-cleaning/">What air duct cleaning includes <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </div>
  </section>;
}
