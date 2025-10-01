# Accessibility Directives (Universal)

**Purpose:** Ensure applications are usable by everyone, including users with disabilities.

---

## PD-A11Y-001: Semantic HTML First
**Rule:** Use semantic HTML elements, not div/span for everything  
**Applies to:** All UI components

```html
<!-- ✅ GOOD - Semantic -->
<button onClick={handleClick}>Submit</button>
<nav><a href="/home">Home</a></nav>
<main><article>Content</article></main>

<!-- ❌ BAD - Non-semantic -->
<div onClick={handleClick}>Submit</div>
<div><span onclick="...">Home</span></div>
<div><div>Content</div></div>
```

## PD-A11Y-002: Keyboard Navigation
**Rule:** All interactive elements must be keyboard accessible  
**Applies to:** Buttons, links, form controls, custom widgets

```javascript
// ✅ GOOD - Keyboard accessible
<button 
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Action
</button>

// ❌ BAD - Mouse only
<div onClick={handleClick}>Action</div> // Not keyboard accessible

// ✅ GOOD - Custom widget with keyboard support
<div 
  role="button" 
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={handleKeyDown}
>
  Custom Button
</div>
```

## PD-A11Y-003: ARIA Labels When Needed
**Rule:** Add ARIA when semantic HTML insufficient  
**Applies to:** Icons, custom controls, dynamic content

```html
<!-- ✅ GOOD - Icon button with label -->
<button aria-label="Close dialog">
  <XIcon />
</button>

<!-- ❌ BAD - Icon with no label -->
<button>
  <XIcon />
</button>

<!-- ✅ GOOD - Dynamic content announced -->
<div 
  role="status" 
  aria-live="polite"
>
  {statusMessage}
</div>

<!-- ❌ BAD - Screen reader misses update -->
<div>{statusMessage}</div>
```

## PD-A11Y-004: Focus Indicators Visible
**Rule:** Don't remove focus outlines without replacement  
**Applies to:** All focusable elements

```css
/* ❌ BAD - Removes focus with no replacement */
button:focus {
  outline: none;
}

/* ✅ GOOD - Custom focus that's still visible */
button:focus {
  outline: 2px solid blue;
  outline-offset: 2px;
}

/* ✅ GOOD - Use :focus-visible for better UX */
button:focus-visible {
  outline: 2px solid blue;
}
```