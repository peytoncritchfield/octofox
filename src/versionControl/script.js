import version1 from './versions/version1.js'
import version2 from './versions/version2.js'

const url = new URL(`${window.location.href}`)
const params = new URLSearchParams(url.search);

const script = document.createElement('script')

if (params.get('version') == 1) {
    script.src = './versions/version1.js'
}
if (params.get('version') == 2) {
    script.src = './versions/version2.js'
}

let ref = document.querySelector('canvas')
ref.parentNode.insertBefore(script, ref)
