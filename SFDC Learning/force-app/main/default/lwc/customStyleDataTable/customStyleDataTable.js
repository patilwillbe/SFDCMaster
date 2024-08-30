import { LightningElement, wire } from 'lwc';
import displayContacts from '@salesforce/apex/ContactsController.getContacts';

const columns = [
    { label: 'Title', fieldName: 'Title', cellAttributes:{class:{fieldName: 'titleColor'}} },
    { label: 'Name', type: 'customName', typeAttributes:{contactName: { fieldName: 'Name'}} },
    { label: 'Account Name', fieldName: 'accountLink', type: 'url', typeAttributes:{label: {fieldName: 'accountName'}, target: '_blank'} },
    { label: 'Rank', fieldName: 'Rank__c', type: 'customRank', typeAttributes: {rankIcon : {fieldName: 'rankIcon'}} },
    { label: 'Picture', type: 'customPicture', typeAttributes:{pictureUrl:{fieldName: 'Picture__c'}}, cellAttributes:{alignment: 'center'}},
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' }
];
export default class CustomStyleDataTable extends LightningElement {

    contacts;
    columns = columns;

    @wire(displayContacts)
    wiredContacts({ data, error }) {
        if (data) {
            console.log('data ', data);
            this.contacts = data.map((record) => {
                // console.log('record ', record)
                let accountLink = "/" + record.AccountId;
                let accountName = record.Account.Name;
                let titleColor = "slds-text-color_success";
                let rankIcon = record.Rank__c > 2 ? 'utility:ribbon' : '';
                return { ...record, rankIcon:rankIcon, titleColor:titleColor, accountLink: accountLink, accountName: accountName };
            });
            //this.contacts = data;
            console.log('contacts ', this.contacts)
        }
        if (error) {
            console.log('Error ', error);
        }
    }
}