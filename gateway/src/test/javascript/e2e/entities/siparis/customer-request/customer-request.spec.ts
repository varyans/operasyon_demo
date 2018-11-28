/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { CustomerRequestComponentsPage, CustomerRequestDeleteDialog, CustomerRequestUpdatePage } from './customer-request.page-object';

const expect = chai.expect;

describe('CustomerRequest e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let customerRequestUpdatePage: CustomerRequestUpdatePage;
    let customerRequestComponentsPage: CustomerRequestComponentsPage;
    let customerRequestDeleteDialog: CustomerRequestDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load CustomerRequests', async () => {
        await navBarPage.goToEntity('customer-request');
        customerRequestComponentsPage = new CustomerRequestComponentsPage();
        expect(await customerRequestComponentsPage.getTitle()).to.eq('gatewayApp.siparisCustomerRequest.home.title');
    });

    it('should load create CustomerRequest page', async () => {
        await customerRequestComponentsPage.clickOnCreateButton();
        customerRequestUpdatePage = new CustomerRequestUpdatePage();
        expect(await customerRequestUpdatePage.getPageTitle()).to.eq('gatewayApp.siparisCustomerRequest.home.createOrEditLabel');
        await customerRequestUpdatePage.cancel();
    });

    it('should create and save CustomerRequests', async () => {
        const nbButtonsBeforeCreate = await customerRequestComponentsPage.countDeleteButtons();

        await customerRequestComponentsPage.clickOnCreateButton();
        await promise.all([
            customerRequestUpdatePage.setUserNameInput('userName'),
            customerRequestUpdatePage.setBeginLocInput('beginLoc'),
            customerRequestUpdatePage.setEndLocInput('endLoc'),
            customerRequestUpdatePage.setOperationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            customerRequestUpdatePage.orderStatusSelectLastOption(),
            customerRequestUpdatePage.carTypeSelectLastOption()
        ]);
        expect(await customerRequestUpdatePage.getUserNameInput()).to.eq('userName');
        expect(await customerRequestUpdatePage.getBeginLocInput()).to.eq('beginLoc');
        expect(await customerRequestUpdatePage.getEndLocInput()).to.eq('endLoc');
        expect(await customerRequestUpdatePage.getOperationDateInput()).to.contain('2001-01-01T02:30');
        await customerRequestUpdatePage.save();
        expect(await customerRequestUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await customerRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last CustomerRequest', async () => {
        const nbButtonsBeforeDelete = await customerRequestComponentsPage.countDeleteButtons();
        await customerRequestComponentsPage.clickOnLastDeleteButton();

        customerRequestDeleteDialog = new CustomerRequestDeleteDialog();
        expect(await customerRequestDeleteDialog.getDialogTitle()).to.eq('gatewayApp.siparisCustomerRequest.delete.question');
        await customerRequestDeleteDialog.clickOnConfirmButton();

        expect(await customerRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
