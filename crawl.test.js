import { test, expect } from "@jest/globals";
import { getURLsFromHTML, normalizeURL } from "./crawl.js";


test('normalizeURL https', () => {
  const input = 'https://blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL path', () => {
  const input = 'https://blog.boot.dev/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL case', () => {
  const input = 'https://Blog.Boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
  const input = 'http://blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('single URL', () => {
  const input = `
    <html>
      <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
      </body>
    </html>`
  const actual = getURLsFromHTML(input, 'https://blog.boot.dev')
  const expected = ['https://blog.boot.dev/']
  expect(actual).toEqual(expected)
})

test('multiple URLs', () => {
  const input = `
    <html>
      <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="https://twitch.com"><span>Go to twitch.com</span></a>
      </body>
    </html>`
  const actual = getURLsFromHTML(input, 'https://blog.boot.dev')
  const expected = ['https://blog.boot.dev/', 'https://twitch.com/']
  expect(actual).toEqual(expected)
})

test('relative URL', () => {
  const input = `
    <html>
      <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="/leaderboard"><span>Go to Boot.dev Leaderboard</span></a>
      </body>
    </html>`
  const actual = getURLsFromHTML(input, 'https://blog.boot.dev')
  const expected = ['https://blog.boot.dev/', 'https://blog.boot.dev/leaderboard']
  expect(actual).toEqual(expected)
})

test('missing href', () => {
  const input = `
    <html>
      <body>
        <a><span>Go to Boot.dev</span></a>
      </body>
    </html>`
  const actual = getURLsFromHTML(input, 'https://blog.boot.dev')
  const expected = []
  expect(actual).toEqual(expected)
})