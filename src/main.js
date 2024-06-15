import { crawlPage } from "./crawl.js"
import { printReport } from "./report.js"

async function main() {
  const args = process.argv.slice(2,)

  if (args.length == 1) {
    const baseURL = args[0]
    console.log(`Starting crawler on ${baseURL}`)
    const pages = await crawlPage(baseURL)
    printReport(pages)
  } else {
    console.log('Usage: npm run start BASE_URL')
    console.log('BASE_URL - URL to crawl')
    return
  }
}

main()