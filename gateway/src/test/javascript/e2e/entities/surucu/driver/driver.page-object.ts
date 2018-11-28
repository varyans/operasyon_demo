import { element, by, ElementFinder } from 'protractor';

export class DriverComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-driver div table .btn-danger'));
    title = element.all(by.css('jhi-driver div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DriverUpdatePage {
    pageTitle = element(by.id('jhi-driver-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    userNameInput = element(by.id('field_userName'));
    driverStatusSelect = element(by.id('field_driverStatus'));
    locationInput = element(by.id('field_location'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setUserNameInput(userName) {
        await this.userNameInput.sendKeys(userName);
    }

    async getUserNameInput() {
        return this.userNameInput.getAttribute('value');
    }

    async setDriverStatusSelect(driverStatus) {
        await this.driverStatusSelect.sendKeys(driverStatus);
    }

    async getDriverStatusSelect() {
        return this.driverStatusSelect.element(by.css('option:checked')).getText();
    }

    async driverStatusSelectLastOption() {
        await this.driverStatusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setLocationInput(location) {
        await this.locationInput.sendKeys(location);
    }

    async getLocationInput() {
        return this.locationInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class DriverDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-driver-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-driver'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
