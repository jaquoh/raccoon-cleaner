/* ------------------------------------------------------------------
   RaccoonCleaner: drop-in “trash-panda” clear-button + animation
   © 2025  — MIT licence
------------------------------------------------------------------ */
export class RaccoonCleaner{
  static initAll(){
    document.querySelectorAll('.raccoon-cleaner')
            .forEach(el=>new RaccoonCleaner(el));
  }
  constructor(field){
    this.f = field;
    this.buildDOM();
    this.bind();
    this.sync();                     // initial alignment / visibility
  }

  /* ---------- scaffold ---------- */
  buildDOM(){
    // wrap the field so absolutely-positioned bits have a ref
    this.wrap = document.createElement('span');
    this.wrap.className = 'rac-wrap';
    this.f.parentNode.insertBefore(this.wrap, this.f);
    this.wrap.appendChild(this.f);

    // bin button
    this.bin = document.createElement('button');
    this.bin.className = 'rac-bin';
    this.bin.textContent='🗑️'; // trash-can
    this.bin.setAttribute('aria-label','Clear');
    this.wrap.appendChild(this.bin);
  }

  /* ---------- events ---------- */
  bind(){
    this.f.addEventListener('input',   ()=>this.sync());
    window.addEventListener('resize',  ()=>this.sync());
    this.bin.addEventListener('click', ()=>this.runShow());
  }

  /* ---------- keep bin aligned + show/hide ---------- */
  sync(){
    const hasText = !!this.f.value.trim();
    if(!this.cleaning){
      this.bin.classList.toggle('show', hasText);
    }
    // vertical align
    const r      = this.f.getBoundingClientRect();
    const styles = getComputedStyle(this.f);
    const pt     = parseFloat(styles.paddingTop);
    const pb     = parseFloat(styles.paddingBottom);
    const mid    = pt + (r.height - pt - pb)/2;
    this.bin.style.top = `${mid}px`;
  }

  /* ---------- the big animation ---------- */
  runShow(){
    if(!this.f.value.trim() || this.cleaning) return;
    this.cleaning = true;
    this.bin.classList.add('busy');

    /* save + disable field */
    const ph = this.f.placeholder;
    this.f.placeholder = '';
    this.f.disabled    = true;

    /* clone word */
    const txt = document.createElement('span');
    txt.className = 'rac-txt';
    txt.textContent = this.f.value;
    this.wrap.appendChild(txt);
    /* match the input's font size so dragged text aligns visually */
    txt.style.fontSize = getComputedStyle(this.f).fontSize;

    /* spawn raccoon at bin */
    const coon = document.createElement('span');
    coon.className = 'rac-coon';
    coon.textContent = '🦝'; // raccoon
    this.wrap.appendChild(coon);

    /* geometry */
    const wRect    = this.wrap.getBoundingClientRect();
    const fRect    = this.f.getBoundingClientRect();
    const styles   = getComputedStyle(this.f);
    const leftPad  = parseFloat(styles.paddingLeft);
    const borderL = parseFloat(styles.borderLeftWidth);
    const glyphMid = parseFloat(styles.paddingTop) +
                    (fRect.height - parseFloat(styles.paddingTop) -
                                   parseFloat(styles.paddingBottom))/2;
    txt.style.top = coon.style.top = `${glyphMid}px`;

    const wordLeft = borderL + leftPad;   // account for input border
    txt.style.left = `${wordLeft}px`;
    const wordW = txt.getBoundingClientRect().width;
    const binX  = wRect.width - parseFloat(styles.paddingRight) - 26; // ~bin
    coon.style.left = `${binX}px`;

    /* 1. walk LEFT to word */
    const latch = wordLeft + wordW + 6;
    const stepL = () => {                   // forward trot
      const cx = parseFloat(coon.style.left);
      if(cx - 8 > latch){
        coon.style.left = `${cx - 8}px`;
        requestAnimationFrame(stepL);
      }else{
        coon.style.left = `${latch}px`;
        beginDrag();
      }
    };
    stepL();

    /* 2. back-drag to bin */
    const beginDrag = () => {
      this.f.value = '';
      this.sync();  // empty UI now

      const dist  = binX - wordLeft;
      let moved   = 0;

      function dragStep() {
        const step = Math.min(12, dist - moved);   // 12‑px tug each step
        moved += step;

        txt.style.left  = `${wordLeft + moved}px`;
        coon.style.left = `${latch   + moved}px`;

        if (moved < dist) {
          /* random stiff pauses 70‑170 ms */
          setTimeout(dragStep, 70 + Math.random() * 100);
        } else {
          finish();
        }
      }
      dragStep();
    };

    /* 3. fade + cleanup */
    const finish = () => {
      txt.style.opacity = coon.style.opacity = this.bin.style.opacity = 0;
      setTimeout(()=>{
        txt.remove(); coon.remove();
        this.f.disabled   = false;
        this.f.placeholder = ph;
        this.bin.className = 'rac-bin';  // reset classes
        this.bin.style.opacity = '';  // restore visibility for next use
        this.cleaning = false;
        this.sync();
      }, 300);
    };
  }
}

/* auto-boot */
document.addEventListener('DOMContentLoaded', ()=>RaccoonCleaner.initAll());