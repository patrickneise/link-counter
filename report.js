function printReport(pages) {
  console.log()
  console.log('--------------------')
  console.log('Internal Link Report')
  console.log('--------------------')

  const sortedPages = Object.fromEntries(
    Object.entries(pages).sort(([, a], [, b]) => b - a)
  );

  for (const [url, count] of Object.entries(sortedPages)) {
    console.log(`Found ${count} internal links to ${url}`)
  }

}

export { printReport }