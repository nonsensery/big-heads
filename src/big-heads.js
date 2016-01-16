'use strict'

window.bigHeads = window.bigHeads || (function(window, document){
  var EDGE_PADDING = 10
  var MIN_PARTICIPANTS = 3

  function makeRect(top, right, bottom, left) {
    return { top, right, bottom, left, width: (right - left), height: (bottom - top) }
  }

  function lastElement(array) {
    return array[array.length - 1] || null
  }

  function ftosMaxChars(f, maxChars) {
    var s = ('' + f)

    if (s.length > maxChars) {
      s = s.substring(0, maxChars)
    }

    return s
  }

  function thumbnails() {
    return [].slice.call(document.querySelectorAll('[aria-label="Video call participants"] > [aria-label^="Open menu for"]'))
  }

  function isOwnThumbnailSelected() {
    var ownThumbnail = lastElement(thumbnails())
    // Note: This is brittle. The selected thumbnail gets an `aria-checked`
    // attribute set to `true` on one of its children.
    return (ownThumbnail.querySelector('[aria-checked="true"]') !== null)
  }

  function hasEnoughParticipants() {
    return (thumbnails().length >= MIN_PARTICIPANTS)
  }

  function clearLayout() {
    document.body.style.transformOrigin = ''
    document.body.style.transform = ''
  }

  function doLayout() {
    clearLayout()

    var rects = thumbnails().map(function ($0) { return $0.getBoundingClientRect() })

    if (rects.length < MIN_PARTICIPANTS) {
      return
    }

    var bounds = rects.slice(0, -1).reduce(function (bounds, rect) {
      bounds = (bounds || rect)

      return makeRect(Math.min(bounds.top, rect.top),
                      Math.max(bounds.right, rect.right),
                      Math.max(bounds.bottom, rect.bottom),
                      Math.min(bounds.left, rect.left))
    })

    var frame = makeRect(0, window.innerWidth, window.innerHeight, 0)

    var ownRect = lastElement(rects)

    // Aspect-fit the width
    var scale = (frame.width - EDGE_PADDING - EDGE_PADDING) / bounds.width
    var translateX = Math.round(frame.right - ownRect.left - EDGE_PADDING/scale)

    document.body.style.transformOrigin = '100% 100%'
    document.body.style.transform = 'scale(' + ftosMaxChars(scale) + ') translateX(' + translateX + 'px)'
  }

  // --- Resize handler

  var resizeTimeout

  function resizeHandler() {
    if (resizeTimeout) return

    resizeTimeout = setTimeout(function () {
      resizeTimeout = null
      doLayout()
    }, 100)
  }

  // --- Main Entrypoint

  function bigHeads(on) {
    on = (on !== false)

    window.removeEventListener('resize', resizeHandler)
    resizeTimeout = clearTimeout(resizeTimeout)

    if (!on) {
      clearLayout()
    } else if (!isOwnThumbnailSelected()) {
      alert('Please select your own thumbnail (click on it) before embiggening heads')
    } else if (!hasEnoughParticipants()) {
      alert('Please invite more people (minumum is ' + MIN_PARTICIPANTS + ') before embiggening heads')
    } else {
      doLayout()
      window.addEventListener('resize', resizeHandler)
    }
    //
    // console.log('Heads are now ' + (on ? 'BIG' : 'little'))
  }

  // --- Keyboard Entrypoint

  window.addEventListener('keyup', function (event) {
    var tagName = event.target.tagName

    if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') {
        return
    }

    switch (event.key || event.keyIdentifier) {
      case '-':
      case 'U+002D':
        bigHeads(false)
        break
      case '+':
      case 'U+002B':
      case '=':
      case 'U+003D':
        bigHeads(true)
        break
    }
  })

  // --- Exports

  alert('Big Heads installed! Use + and - to make heads BIG and little.')

  return bigHeads
})(window, window.document)
