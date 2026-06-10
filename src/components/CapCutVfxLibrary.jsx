import { capcutVfxItems } from '../data/effects'
import CapCutVfxTile from './CapCutVfxTile'

function CapCutVfxLibrary({ onSelect }) {
  return (
    <section className="section capcut-library" id="capcut-library">
      <div className="library-heading">
        <div>
          <p className="eyebrow">CapCut · Short-form experiments · 01–{capcutVfxItems.length}</p>
          <h2>CapCut VFX Library</h2>
        </div>
        <p>A compact collection of short-form VFX experiments, transitions, overlays, and motion effects.</p>
      </div>
      <div className="capcut-vfx-grid">
        {capcutVfxItems.map((item) => (
          <CapCutVfxTile item={item} onSelect={onSelect} key={item.id} />
        ))}
      </div>
    </section>
  )
}

export default CapCutVfxLibrary
