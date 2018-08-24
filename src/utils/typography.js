import Typography from 'typography'
import Theme from './typography-theme-twin-peaks/dist'

Theme.headerFontFamily = ['Montserrat', 'sans serif']
Theme.bodyFontFamily = ['Lato', 'sans serif']
Theme.bodyColor = '#3d556b'
Theme.headerColor = '#193652'

const typography = new Typography(Theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
