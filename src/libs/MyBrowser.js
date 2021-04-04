import myBrowserConfig from '../config/myBrowseConfig';
const playwright = require('playwright');

export class MyBrowser {
  newFlow(flowName) {
    this.flow = flowName;
    this.screenshotNum = 0;
  }

  async launch() {
    // console.log('MyBrowserConfig', myBrowserConfig);
    this.browser = await playwright[myBrowserConfig.browser].launch({
      // devtools: true,

      // Para q muestre el navegador o no
      headless: myBrowserConfig.headless,

      // Simular retraso tecleo de usuario
      // slowMo: 100,
    });
    // this._page = await this.browser.newPage();
    const context = await this.browser.newContext();
    // this._page = await context.pages();
    // this._page = this._page[0];
    this._page = await context.newPage();

    await this._page.setViewportSize({
      width: myBrowserConfig.sizes[myBrowserConfig.sizeType].width,
      height: myBrowserConfig.sizes[myBrowserConfig.sizeType].height,
      deviceScaleFactor: 1,
    });
    console.log('launch:', {
      sizeType: myBrowserConfig.sizeType,
      width: myBrowserConfig.sizes[myBrowserConfig.sizeType].width,
      height: myBrowserConfig.sizes[myBrowserConfig.sizeType].height,
    });
  }

  async close() {
    // console.log('close', this.browser, this);
    this.browser.close();
  }

  async goto(url) {
    console.log('goto', url, myBrowserConfig.appUrl + url);
    await this._page.goto(myBrowserConfig.appUrl + url);
  }

  async gotoAwaitForElement(url, element) {
    await this.goto(url);
    await this._page.waitForSelector(element);
  }

  async type(name, text) {
    //console.log(name, text);
    await this._page.fill(name, text);
  }

  async screenshot(title) {
    // await delay(3000);
    const pathSnapshot = __dirname + '/../test/snapshots/';
    const pathName =
      pathSnapshot +
      myBrowserConfig.browser +
      '/' +
      myBrowserConfig.sizes[myBrowserConfig.sizeType].width +
      'x' +
      myBrowserConfig.sizes[myBrowserConfig.sizeType].height +
      this.flow +
      '/';

    const re = / /gi;
    const fileName = this.screenshotNum + (title ? '_' + title.replace(re, '_') : '') + '.png';

    const fs = require('fs');
    let pathTmp = pathSnapshot + '/' + myBrowserConfig.browser;
    if (!fs.existsSync(pathTmp)) {
      console.log('Crea ' + pathTmp);
      fs.mkdirSync(pathTmp);
    }
    pathTmp =
      pathSnapshot +
      '/' +
      myBrowserConfig.browser +
      '/' +
      myBrowserConfig.sizes[myBrowserConfig.sizeType].width +
      'x' +
      myBrowserConfig.sizes[myBrowserConfig.sizeType].height;
    if (!fs.existsSync(pathTmp)) {
      console.log('Crea ' + pathTmp);
      fs.mkdirSync(pathTmp);
    }
    if (!fs.existsSync(pathName)) {
      console.log('Crea ' + pathName);
      fs.mkdirSync(pathName);
    }

    console.log(
      'Screenshot:',
      // this.flow +
      //   '/' +
      //   fileName,
      pathName + fileName,
    );

    await this._page.screenshot({
      path: pathName + fileName,
    });

    this.screenshotNum++;
  }

  get page() {
    return this._page;
  }

  set page(page) {
    this._page = page;
  }

  async click(name, elementToWait) {
    // try {
    console.log('click element', name);
    await this._page.waitForSelector(name);
    await this._page.click(name);
    if (elementToWait) {
      await this._page.waitForSelector(elementToWait);
    }
    // } catch (e) {
    //   console.error("click:", e)
    // }
  }

  async clickAwaitForElement(name, selectorToWait) {
    console.log('clickAwaitForElement desde', name, this.getUrl());
    await this._page.click(name);
    // await this._page.waitForNavigation({ waitUntil: 'networkidle0' });
    await this._page.waitForSelector(selectorToWait);
    console.log('clickAwaitForElement hasta', this.getUrl());
  }

  getUrl() {
    // console.log(this._page.url().substring(testConfig.appUrl.length));
    return this._page.url().substring(myBrowserConfig.appUrl.length);
  }

  async getElementsBySelector(cssSelector) {
    console.log('getElementsBySelector', cssSelector);
    // await this._page.waitForSelector(cssSelector);
    const elements = await this._page.$$(cssSelector);
    return elements;
  }

  async getElementBySelector(cssSelector) {
    console.log('getElementsBySelector', cssSelector);
    // await this._page.waitForSelector(cssSelector);
    const element = await this._page.$(cssSelector);
    return element;
  }

  async getElementPosition(cssSelector) {
    console.log('getSelectorPosition', cssSelector);
    await this._page.waitForSelector(cssSelector);
    const element = await this._page.$(cssSelector);
    const bb = await element.boundingBox();
    console.log(bb.x, bb.width);
    const x = bb.x + bb.width / 2;
    const y = bb.y + bb.height / 2;
    console.log('getSelectorPosition', x, y);
    return { x, y };
  }

  async evaluate(toEvaluate) {
    return this._page.evaluate(toEvaluate);
  }

  // eslint-disable-next-line class-methods-use-this
  delay(delayMs) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayMs);
    });
  }
}

// Factory Singleton -----------------------------------------------------
export async function getMyBrowser() {
  if (!global.myTest) {
    global.myTest = {};
  }

  if (!global.myTest.myBrowser) {
    // Carga e inicia una unica instancia del navegador
    console.log('MyBrowser >> Creado!!!!!!!!!!!!!!!!!!!!!!');
    const b = new MyBrowser();
    await b.launch();
    global.myTest = {
      myBrowser: b,
    };
  }
  return global.myTest.myBrowser;
}

export async function closeMyBrowser() {
  // if (global.myTest && global.myTest.myBrowser) {
  global.myTest.myBrowser.close();
  console.log('Entorno Test >> Cerrado!!!!!!!!!!!!!!!!!!!!!!');
  // }
}
