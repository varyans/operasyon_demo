import { element, by, ElementFinder } from 'protractor';

export class CustomerRequestComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-customer-request div table .btn-danger'));
    title = element.all(by.css('jhi-customer-request div h2#page-heading span')).first();

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

export class CustomerRequestUpdatePage {
    pageTitle = element(by.id('jhi-customer-request-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    userNameInput = element(by.id('field_userName'));
    beginLocInput = element(by.id('field_beginLoc'));
    endLocInput = element(by.id('field_endLoc'));
    operationDateInput = element(by.id('field_operationDate'));
    orderStatusSelect = element(by.id('field_orderStatus'));
    carTypeSelect = element(by.id('field_carType'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setUserNameInput(userName) {
        await this.userNameInput.sendKeys(userName);
    }

    async getUserNameInput() {
        return this.userNameInput.getAttribute('value');
    }

    async setBeginLocInput(beginLoc) {
        await this.beginLocInput.sendKeys(beginLoc);
    }

    async getBeginLocInput() {
        return this.beginLocInput.getAttribute('value');
    }

    async setEndLocInput(endLoc) {
        await this.endLocInput.sendKeys(endLoc);
    }

    async getEndLocInput() {
        return this.endLocInput.getAttribute('value');
    }

    async setOperationDateInput(operationDate) {
        await this.operationDateInput.sendKeys(operationDate);
    }

    async getOperationDateInput() {
        return this.operationDateInput.getAttribute('value');
    }

    async setOrderStatusSelect(orderStatus) {
        await this.orderStatusSelect.sendKeys(orderStatus);
    }

    async getOrderStatusSelect() {
        return this.orderStatusSelect.element(by.css('option:checked')).getText();
    }

    async orderStatusSelectLastOption() {
        await this.orderStatusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setCarTypeSelect(carType) {
        await this.carTypeSelect.sendKeys(carType);
    }

    async getCarTypeSelect() {
        return this.carTypeSelect.element(by.css('option:checked')).getText();
    }

    async carTypeSelectLastOption() {
        await this.carTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
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

export class CustomerRequestDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-customerRequest-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-customerRequest'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
