// .storybook/manager.js

import { addons } from '@storybook/addons'
import CustomTheme from './CustomTheme'
const link = document.createElement('link')
link.setAttribute('rel', 'shortcut icon')
link.setAttribute(
    'href',
    '',
)
document.head.appendChild(link)
addons.setConfig({
    theme: CustomTheme,
})
