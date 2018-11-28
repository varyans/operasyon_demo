/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { DriverComponentsPage, DriverDeleteDialog, DriverUpdatePage } from './driver.page-object';

const expect = chai.expect;

describe('Driver e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let driverUpdatePage: DriverUpdatePage;
    let driverComponentsPage: DriverComponentsPage;
    let driverDeleteDialog: DriverDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Drivers', async () => {
        await navBarPage.goToEntity('driver');
        driverComponentsPage = new DriverComponentsPage();
        expect(await driverComponentsPage.getTitle()).to.eq('gatewayApp.surucuDriver.home.title');
    });

    it('should load create Driver page', async () => {
        await driverComponentsPage.clickOnCreateButton();
        driverUpdatePage = new DriverUpdatePage();
        expect(await driverUpdatePage.getPageTitle()).to.eq('gatewayApp.surucuDriver.home.createOrEditLabel');
        await driverUpdatePage.cancel();
    });

    it('should create and save Drivers', async () => {
        const nbButtonsBeforeCreate = await driverComponentsPage.countDeleteButtons();

        await driverComponentsPage.clickOnCreateButton();
        await promise.all([
            driverUpdatePage.setUserNameInput('userName'),
            driverUpdatePage.driverStatusSelectLastOption(),
            driverUpdatePage.setLocationInput('location')
        ]);
        expect(await driverUpdatePage.getUserNameInput()).to.eq('userName');
        expect(await driverUpdatePage.getLocationInput()).to.eq('location');
        await driverUpdatePage.save();
        expect(await driverUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await driverComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Driver', async () => {
        const nbButtonsBeforeDelete = await driverComponentsPage.countDeleteButtons();
        await driverComponentsPage.clickOnLastDeleteButton();

        driverDeleteDialog = new DriverDeleteDialog();
        expect(await driverDeleteDialog.getDialogTitle()).to.eq('gatewayApp.surucuDriver.delete.question');
        await driverDeleteDialog.clickOnConfirmButton();

        expect(await driverComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
