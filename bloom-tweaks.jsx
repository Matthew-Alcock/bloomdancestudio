// bloom-tweaks.jsx — Bloom Dance Studio Tweaks Panel

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "garden",
  "texture": "watercolour",
  "typeChar": "script"
}/*EDITMODE-END*/;

const PALETTES = {
  garden: {
    label: "Garden Bloom",
    desc: "Warm cherry reds and ballet pinks — the original romantic palette.",
    "--cherry": "#670626", "--apple-red": "#8B0000", "--coral": "#E87A5D",
    "--teal": "#006B3C", "--olive": "#7A8B3D", "--magenta": "#9B4D8C",
    "--ballet-pink": "#F5B5C8", "--gold": "#C4923A",
    "--cream": "#FAF6F0", "--parchment": "#F3EDE4",
    "--charcoal": "#2C1E20", "--bark": "#4A2E28",
  },
  forest: {
    label: "Forest Studio",
    desc: "Cool teals and olive greens — earthy, contemporary, grounded.",
    "--cherry": "#006B3C", "--apple-red": "#004d2b", "--coral": "#7A8B3D",
    "--teal": "#2C5F4A", "--olive": "#3d6b2c", "--magenta": "#4A7B5C",
    "--ballet-pink": "#BAD797", "--gold": "#7A8B3D",
    "--cream": "#F4F8F0", "--parchment": "#E8F2E4",
    "--charcoal": "#1A2E20", "--bark": "#2E4A30",
  },
  golden: {
    label: "Golden Hour",
    desc: "Coral, amber and warm gold — sun-drenched and full of energy.",
    "--cherry": "#B5451A", "--apple-red": "#8B2000", "--coral": "#E87A5D",
    "--teal": "#C4923A", "--olive": "#9B6820", "--magenta": "#C4601A",
    "--ballet-pink": "#F5C5A0", "--gold": "#C4923A",
    "--cream": "#FDF8F0", "--parchment": "#F7EEE0",
    "--charcoal": "#2C1E10", "--bark": "#5A3020",
  }
};

const TEXTURES = {
  watercolour: { label: "Watercolour",   bgOpacity: 0.55 },
  airy:        { label: "Clean & Airy",  bgOpacity: 0.08 },
  painterly:   { label: "Painterly",     bgOpacity: 0.90 },
};

const TYPE_CHARS = {
  script: { label: "Script & Soul" },
  serif:  { label: "Elegant Serif" },
  modern: { label: "Modern & Clean" },
};

function applyTweaks({ palette, texture, typeChar }) {
  const root = document.documentElement;
  const pal = PALETTES[palette];
  const tex = TEXTURES[texture];

  // Palette tokens
  Object.entries(pal).forEach(([k, v]) => {
    if (k.startsWith('--')) root.style.setProperty(k, v);
  });

  // Texture intensities (classes-bg stays at full richness)
  document.querySelectorAll('.classes-bg').forEach(el => {
    el.style.opacity = 1;
  });
  document.querySelectorAll('.team-section-bg, .testimonials-bg').forEach(el => {
    el.style.opacity = tex.bgOpacity;
  });
  document.querySelectorAll('.about-watercolor-blob').forEach(el => {
    el.style.opacity = Math.min(tex.bgOpacity * 0.7, 0.55);
  });
  root.style.setProperty('--texture-opacity', tex.bgOpacity * 0.2);

  // Type character
  const useScript  = typeChar === 'script';
  const useModern  = typeChar === 'modern';
  const scriptFont = useScript ? 'var(--font-script)' : useModern ? 'var(--font-body)' : 'var(--font-display)';
  const scriptItal = useModern ? 'italic' : 'normal';

  document.querySelectorAll('.section-script-title, .cta-script, .team-script, .testimonials-script').forEach(el => {
    el.style.fontFamily = scriptFont;
    el.style.fontStyle  = scriptItal;
    el.style.fontWeight = useModern ? '700' : useScript ? 'normal' : '600';
  });
  document.querySelectorAll('.about-signature').forEach(el => {
    el.style.fontFamily = scriptFont;
    el.style.fontStyle  = 'italic';
    el.style.fontSize   = useScript ? '46px' : '28px';
  });
  document.querySelectorAll('.hero-welcome').forEach(el => {
    el.style.fontFamily = scriptFont;
    el.style.fontStyle  = useScript ? 'normal' : 'italic';
    el.style.fontSize   = useScript ? '42px' : '26px';
  });
  document.querySelectorAll('.class-bubble-name, .teacher-row-name').forEach(el => {
    el.style.fontFamily = scriptFont;
    el.style.fontStyle  = useModern ? 'normal' : scriptItal;
    el.style.fontWeight = useModern ? '700' : 'normal';
    el.style.fontSize   = useScript ? '' : useModern ? '18px' : '28px';
  });
}

function BloomTweaksApp() {
  const [tweaks, setTweaks] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    applyTweaks(tweaks);
  }, [tweaks.palette, tweaks.texture, tweaks.typeChar]);

  const palOpts = Object.entries(PALETTES).map(([value, p]) => ({ value, label: p.label, sub: p.desc }));
  const texOpts = Object.entries(TEXTURES).map(([value, t]) => ({ value, label: t.label }));
  const typOpts = Object.entries(TYPE_CHARS).map(([value, t]) => ({ value, label: t.label }));

  return (
    <TweaksPanel>
      <TweakSection title="Colour Palette">
        <TweakRadio
          options={palOpts}
          value={tweaks.palette}
          onChange={v => setTweaks({ palette: v })}
        />
      </TweakSection>
      <TweakSection title="Texture">
        <TweakRadio
          options={texOpts}
          value={tweaks.texture}
          onChange={v => setTweaks({ texture: v })}
        />
      </TweakSection>
      <TweakSection title="Type Character">
        <TweakRadio
          options={typOpts}
          value={tweaks.typeChar}
          onChange={v => setTweaks({ typeChar: v })}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// Mount — defer so DOM is guaranteed ready after Babel async transpile
window.addEventListener('load', () => {
  const bloomMount = document.getElementById('bloom-tweaks-mount');
  if (bloomMount) {
    ReactDOM.createRoot(bloomMount).render(<BloomTweaksApp />);
  }
});
