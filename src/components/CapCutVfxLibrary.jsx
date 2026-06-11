import { capcutVfxItems } from '../data/effects'
import CapCutVfxTile from './CapCutVfxTile'

function CapCutVfxLibrary() {
  return (
    <section className="section capcut-library" id="capcut-library">
      <div className="library-heading">
        <div>
          <p className="eyebrow">CapCut · VFX Creator Program · {capcutVfxItems.length} Selected Works</p>
          <h2>CapCut VFX Library</h2>
        </div>
        <p>{capcutVfxItems.length} effects selected from hundreds of VFX creations, interactive visuals, and motion experiments produced for the CapCut VFX Creator Program.</p>
      </div>
      <div className="capcut-vfx-grid">
        {capcutVfxItems.map((item) => (
          <CapCutVfxTile item={item} key={item.id} />
        ))}
      </div>
    </section>
  )
}

export default CapCutVfxLibrary
