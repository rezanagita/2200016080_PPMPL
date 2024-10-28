const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('UI Testing using Selenium', function() {
    this.timeout(3000); //set timout for mocha test

    let driver;

    //inisiasi webdriver sebelum menjalanakan test case
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();         
    });

    //tutup webdriver setelah semua test selesai
    after(async function() {
        await driver.quit();
    });

    it('should load the login page', async function () {
        await driver.get('file:///D:/SEMESTER%205/PPMPL/LoginPage.html'); 
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });
    

    it("should input username and password", async function() {
        await driver.findElement(By.id('username')).sendKeys('testuser');
        await driver.findElement(By.id('password')).sendKeys('password123');
        const usernameValue = await
    driver.findElement(By.id('username')).getAttribute('value');
        const passwordValue = await
    driver.findElement(By.id('password')).getAttribute('value');
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should click the login button', async function() {
        await driver.findElement(By.id('loginButton')).click();
    });

    // 1. Validate Failed Login
    it('should display an error message for failed login', async function() {
        await driver.findElement(By.id('username')).clear();
        await driver.findElement(By.id('password')).clear();
        await driver.findElement(By.id('username')).sendKeys('wronguser');
        await driver.findElement(By.id('password')).sendKeys('wrongpass');
        await driver.findElement(By.id('loginButton')).click();

        // Assuming there's an error message element with id 'errorMessage'
        const errorMessage = await driver.findElement(By.id('errorMessage')).getText();
        expect(errorMessage).to.equal('Invalid username or password.');
    });

     // 2. Use CSS Selector and XPath
     it('should find elements using CSS Selector and XPath', async function() {
        // Clear previous values before sending new keys
        await driver.findElement(By.css('#username')).clear();
        await driver.findElement(By.xpath('//*[@id="password"]')).clear();
    
        await driver.findElement(By.css('#username')).sendKeys('testuser');
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');
        
        const usernameValue = await driver.findElement(By.css('#username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.xpath('//*[@id="password"]')).getAttribute('value');
        
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });
    
      // 3. Visual Validation
      it('should check if the login button is displayed', async function() {
        const isDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();
        expect(isDisplayed).to.be.true;
    });
});
