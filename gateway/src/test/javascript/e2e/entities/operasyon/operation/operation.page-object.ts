import { element, by, ElementFinder } from 'protractor';

export class OperationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-operation div table .btn-danger'));
    title = element.all(by.css('jhi-operation div h2#page-heading span')).first();

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

export class OperationUpdatePage {
    pageTitle = element(by.id('jhi-operation-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    orderInput = element(by.id('field_order'));
    driverInput = element(by.id('field_driver'));
    operationStatusSelect = element(by.id('field_operationStatus'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setOrderInput(order) {
        await this.orderInput.sendKeys(order);
    }

    async getOrderInput() {
        return this.orderInput.getAttribute('value');
    }

    async setDriverInput(driver) {
        await this.driverInput.sendKeys(driver);
    }

    async getDriverInput() {
        return this.driverInput.getAttribute('value');
    }

    async setOperationStatusSelect(operationStatus) {
        await this.operationStatusSelect.sendKeys(operationStatus);
    }

    async getOperationStatusSelect() {
        return this.operationStatusSelect.element(by.css('option:checked')).getText();
    }

    async operationStatusSelectLastOption() {
        await this.operationStatusSelect
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

export class OperationDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-operation-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-operation'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
