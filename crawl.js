import { JSDOM } from 'jsdom'


const normalizeURL = (url) => {
  const urlObj = new URL(url)
  const host = urlObj.host
  const path = urlObj.pathname.replace(/\/$/, '')
  return `${host}${path}`
}


const getURLsFromHTML = (htmlBody, baseURL) => {
  const dom = new JSDOM(htmlBody, { url: baseURL })
  const aTags = dom.window.document.querySelectorAll('a')
  const hrefs = []
  aTags.forEach(function (link) {
    if (link.href) hrefs.push(link.href)
  })
  return hrefs

}


async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  const baseURLObj = new URL(baseURL)
  const currentURLObj = new URL(currentURL)

  if (currentURLObj.hostname != baseURLObj.hostname) return pages

  const normalizedURL = normalizeURL(currentURL)

  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++
    return pages
  }
  pages[normalizedURL] = 1

  console.log(`Crawling ${currentURL}`)
  let html = ''
  try {
    html = await fetchHTML(currentURL)
  } catch (err) {
    console.log(`Error fetching ${currentURL}: ${err.message}`)
  }

  const nextURLs = await getURLsFromHTML(html, baseURL)
  for (let url of nextURLs) {
    pages = await crawlPage(baseURL, url, pages)
  }

  return pages
}


async function fetchHTML(url) {
  let response

  try {
    response = await fetch(url)
  } catch (err) {
    throw new Error(`Network Error: ${err.message}`)
  }

  if (response.status >= 400) {
    console.log(`HTTP Error: ${err.status}-${err.message}`)
    return
  }

  const contentType = response.headers.get('content-type')

  if (!contentType || !contentType.includes('text/html')) {
    console.log(`Non-HTML Response: ${contentType}`)
  }

  return await response.text()
}

export { crawlPage, getURLsFromHTML, normalizeURL }