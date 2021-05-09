# intersection-observer-grid

## forces
    - scroll
    - navigate
    - resize
    - load page

## actors
### page
    - handleFirstRender:
        - get feed data

### container
    - handeFirstRender
        - if (!location.hash) setLocationHash
        - setActiveCat
    - handleActiveCatChanged
        - setLocationHash
        - setActiveCat

### nav
    - prev, next, nav clicked:
        - dispatch activeCatChanged({index, target})
    - handleActiveCatChanged:
        - if (target !== self) scrollIntoView()
    - handleResize:
        - scrollIntoView()

### grid
    - scroll: 
        - intersection observer -> dispatch activeCatChanged({index, target}) once settled (delay, throttle) to prevent race condition w/ nav
    - handleResize:
        - scrollIntoView()
    - handleActiveCatChanged:
        - if (target !== self) scrollIntoView()

## Notes
- [Safari does not support scrollIntoView with smooth behavior](https://caniuse.com/?search=scrollintoview)
- [Safari does not support scrollTo with smooth behavior](https://caniuse.com/mdn-api_scrolltooptions_behavior)
- [Safari does not support css scroll-behavior smooth](https://caniuse.com/css-scroll-behavior)
- [Element.scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)
- [Element.scrollIntoViewIfNeeded (Safari only)](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoViewIfNeeded)
- TODO: investigate how to update intersection entries ref in a scenario where list items are being added/removed dynamically

## CLI Commands
*   `npm install`: Installs dependencies

*   `npm run dev`: Run a development, HMR server

*   `npm run serve`: Run a production-like server

*   `npm run build`: Production-ready build

*   `npm run lint`: Pass TypeScript files using ESLint

*   `npm run test`: Run Jest and Enzyme with
    [`enzyme-adapter-preact-pure`](https://github.com/preactjs/enzyme-adapter-preact-pure) for
    your tests


For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).
