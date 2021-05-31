import { Provide } from '@midwayjs/decorator';
import { ScreenshotOptions } from '../dto/screenshotDTO';
// import { Guid } from 'guid-typescript';
@Provide()
export class ScreenshotService {
  async shotUrl(url: string, filepath: string) {
    const puppeteer = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    puppeteer.use(StealthPlugin());
    await puppeteer
      .launch({
        headless: true,
        // eslint-disable-next-line no-dupe-keys
        // headless: false,
        devtools: true,
        args: ['--disable-web-security'],
      })
      .then(async browser => {
        console.log('Running screenshot..');
        const page = await browser.newPage();
        await page.goto(url);
        await page.waitForTimeout(10000);
        //await page.waitForSelector('#main-column');
        //const filepathname: string = Guid.raw();
        // todo: 将图片保存到内存然后url返回

        await page.screenshot({
          path: filepath,
          fullPage: true,
        });
        await browser.close();
        console.log('All done, check the screenshot. ✨');
      });
  }
  async getUser(options: ScreenshotOptions) {
    const re = /[:\\/.]/g;
    const filepath = `tmp/${options.url.replace(re, '_')}.png`;
    require('fs').stat(filepath, async (err, stat) => {
      if (stat && stat.isFile()) {
        console.log('文件存在');
      } else {
        console.log('文件不存在或不是标准文件');
        await this.shotUrl(options.url, filepath);
      }
    });
    return {
      url: filepath,
    };
  }
}
