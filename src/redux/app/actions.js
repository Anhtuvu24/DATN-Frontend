export function getView(width) {
  let newView = 'MobileView'
  if (width > 1220) {
    newView = 'DesktopView'
  } else if (width > 1023) {
    newView = 'LaptopView'
  } else if (width > 767) {
    newView = 'TabView'
  }
  return newView
}
const actions = {
  COLLAPSE_CHANGE: 'COLLAPSE_CHANGE',
  COLLAPSE_OPEN_DRAWER: 'COLLAPSE_OPEN_DRAWER',
  CHANGE_OPEN_KEYS: 'CHANGE_OPEN_KEYS',
  TOGGLE_ALL: 'TOGGLE_ALL',
  CHANGE_CURRENT: 'CHANGE_CURRENT',
  CLEAR_MENU: 'CLEAR_MENU',
  toggleAll: (width, height) => {
    const view = getView(width)
    return {
      type: actions.TOGGLE_ALL,
      view,
      height,
    }
  },
}
export default actions
