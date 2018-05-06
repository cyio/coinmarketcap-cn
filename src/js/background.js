chrome.contextMenus.create({
  type: 'normal',
  title: chrome.i18n.getMessage('contextmenu'),
  contexts: ['selection'],
  onclick: info => {
    const t = info.selectionText.trim()
    const url = `https://bch123.org/#/address/${t}`
    if (!t.length) return false
    chrome.tabs.create({ url })
  },
})
