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
  CHANGE_CURRENT_ADMIN: 'CHANGE_CURRENT_ADMIN',
  CLEAR_MENU: 'CLEAR_MENU',
  toggleAll: (width, height) => {
    const view = getView(width)
    return {
      type: actions.TOGGLE_ALL,
      view,
      height,
    }
  },
  changeCurrent: (key) => {
    return {
      type: actions.CHANGE_CURRENT,
      key
    }
  },
  changeCurrentAdmin: (key) => {
    return {
      type: actions.CHANGE_CURRENT_ADMIN,
      key
    }
}
}
export default actions
