import { LightningElement, api } from 'lwc';
import CONTACT_OBJ from '@salesforce/schema/Contact';
import FNAME_FLD from '@salesforce/schema/Contact.FirstName';
import LNAME_FLD from '@salesforce/schema/Contact.LastName';
import ACCID_FLD from '@salesforce/schema/Contact.AccountId';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CustomUIValidationsDemo extends LightningElement {
    fName;
    lName;
    @api recordId;

    createContact() {
        const fields = {};
        fields[FNAME_FLD.fieldApiName] = this.fName;
        fields[LNAME_FLD.fieldApiName] = this.lName;
        fields[ACCID_FLD.fieldApiName] = this.recordId;
        const recordInput = { apiName: CONTACT_OBJ.objectApiName, fields };

        createRecord(recordInput)
            .then((contact) => {
                this.dispatchEvent(new ShowToastEvent({ title: 'success', message: 'Contact Created Successfully', variant: 'success' }));
                console.log('contact ', contact.Id);
            })
            .catch((error) => {
                this.dispatchEvent({ title: 'error', message: error, variant: 'error' });
                console.log('contact ', error);
            });
    }

    handleSubmit() {
        let isValid = this.validateInput('.fname', 'FirstName is required to create contact');
        isValid = this.validateInput('.lname', 'LastName is required to create contact');

        if (isValid) {
            this.createContact();
        }
    }

    validateInput(element, message) {
        let cmp = this.template.querySelector(element);
        let val = cmp.value;
        let isValid = true;

        if (!val) {
            cmp.setCustomValidity(message);
            isValid = false;
        } else {
            cmp.setCustomValidity('');
        }
        cmp.reportValidity();
        return isValid;
    }

    handleOnChange(event) {
        if (event.target.label === 'First Name') {
            this.fName = event.target.value;
        }
        if (event.target.label === 'Last Name') {
            this.lName = event.target.value;
        }
    }
}