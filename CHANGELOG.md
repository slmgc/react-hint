## 3.2.1 (April 2, 2021)
* #49: Fix ininite re-renders during tooltip positioning

## 3.2.0 (December 5, 2018)
* #29: Allow setting different show & hide delay

## 3.1.1 (August 2, 2018)
* #28: Make react-hint ARIA-compliant

## 3.1.0 (May 12, 2018)
* #25: Add support for tooltip autopositioning via `autoPosition` property

## 3.0.1 (Mar 5, 2018)
* #19: Fix infinite setState loop in IE11

## 3.0.0 (Nov 4, 2017)
* Add support for custom content rendering via `onRenderContent` property
* Add support for `click`, `focus` and `hover` in `events` property
* Export `ReactHintFactory` function via the default export
* Depreacte templates via `#element-id` in `data-rh` in favor of custom content rendering
* Rename `hover` property to `persist`

## 2.0.3 (Sep 30, 2017)
* #12: Fix iOS mouseover

## 2.0.2 (Sep 6, 2017)
* #9: Fix production build in create-react-app

## 2.0.1 (Aug 21, 2017)
* Add missing build artefacts

## 2.0.0 (Aug 21, 2017)
* Add support for multiple `<ReactHint />` instances
* Add support for `attribute` property instead of the default `data-rh`
* Add support for `delay` property instead of the default `100ms` delay
* Add support for `events` property to enable/disable mouse hover events
* Add support for `hover` property to enable/disable the tooltip hovering
* Export `ReactHintFactory` function instead of the default export
* Replace `ReactHint` with `ReactHintFactory` for UMD builds
* Deprecate `ReactHint.instance` property
* Deprecate `data-rh-cls` attribute
