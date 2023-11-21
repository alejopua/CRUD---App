import { app } from './src/app'
import './style.css'
document.querySelector('#app').innerHTML = `
  <div id="renderApp">

  </div>
`
const element = document.querySelector('#renderApp');
app(element);