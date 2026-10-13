/**
 * Deterministically hashes a string to a 32-bit integer (FNV-1a).
 * @param {string} str
 * @returns {number}
 */
export function hashTag(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

/**
 * Returns high-visibility text, background, and border colors based on a hash of the tag.
 * - Hue: derived from tag's hash
 * - Saturation: maxed at 100%
 * - Value / Lightness: low value in dark theme (rich deep tone), high value in light theme (crisp bright tone)
 * @param {string} tag
 * @param {boolean} [isDark=true]
 * @returns {{color: string, backgroundColor: string, borderColor: string}}
 */
export function getTagColors(tag, isDark = true) {
  const hue = hashTag(tag) % 360;

  if (isDark) {
    // Low value (16%) in dark theme with maxed 100% saturation
    return {
      backgroundColor: `hsl(${hue}, 100%, 16%)`,
      color: `hsl(${hue}, 100%, 92%)`,
      borderColor: `hsl(${hue}, 100%, 36%)`
    };
  } else {
    // High value (92%) in light theme with maxed 100% saturation
    return {
      backgroundColor: `hsl(${hue}, 100%, 92%)`,
      color: `hsl(${hue}, 100%, 18%)`,
      borderColor: `hsl(${hue}, 100%, 74%)`
    };
  }
}

/**
 * Creates a styled <span> element for a tag under div.data-tags with hash-based colors.
 * @param {string} tag
 * @param {boolean} [isMono=false]
 * @returns {HTMLSpanElement}
 */
export function createTagSpan(tag, isMono = false) {
  const isDark = document.documentElement.classList.contains('dark');
  const span = document.createElement('span');
  span.className = isMono
    ? "px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold border transition-all inline-block shadow-sm"
    : "px-2.5 py-0.5 rounded text-[11px] font-semibold border transition-all inline-block shadow-sm";

  span.setAttribute('data-tag', tag);
  const colors = getTagColors(tag, isDark);
  span.style.color = colors.color;
  span.style.backgroundColor = colors.backgroundColor;
  span.style.borderColor = colors.borderColor;
  span.textContent = tag;

  return span;
}

/**
 * Dynamically re-applies colors to all rendered tag spans when the theme toggles.
 * @param {boolean} isDark
 */
export function updateAllTagColors(isDark) {
  document.querySelectorAll('.data-tags span[data-tag]').forEach(span => {
    const tag = span.getAttribute('data-tag');
    const colors = getTagColors(tag, isDark);
    span.style.color = colors.color;
    span.style.backgroundColor = colors.backgroundColor;
    span.style.borderColor = colors.borderColor;
  });
}
