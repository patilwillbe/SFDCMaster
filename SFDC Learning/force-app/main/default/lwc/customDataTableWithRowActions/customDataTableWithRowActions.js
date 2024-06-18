import { LightningElement, wire } from 'lwc';
import getItemsToApprove from '@salesforce/apex/RowActionController.getItems';

const actions = [
    { label: 'Approve', name: 'approve' },
    { label: 'Reject', name: 'reject' },
];

const columns = [
    { label: 'Related To', fieldName: 'opplink', type: 'url', typeAttributes: { label: { fieldName: 'oppname' } } },
    { label: 'Type', fieldName: 'objtype' },
    { label: 'Most Recent Approver', fieldName: 'approverlink', type: 'url', typeAttributes: { label: { fieldName: 'approver' } } },
    {
        label: 'Date Submitted', fieldName: 'datesubmitted', type: 'date', typeAttributes: {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        },
    },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

export default class CustomDataTableWithRowActions extends LightningElement {
    data = [];
    columns = columns;

    @wire(getItemsToApprove)
    wiredResult({ data, error }) {
        if (data) {
            console.log('data ', JSON.stringify(data))
            this.data = data.map(row => {
                let opplink = `/${row.Id}`;
                let oppname = row.ProcessInstance.TargetObject.Name;
                let objtype = row.ProcessInstance.TargetObject.Type;
                let approver = row.Actor.Name;
                let approverlink = `/${row.Actor.Id}`;
                let datesubmitted = row.CreatedDate;
                return { ...row, opplink, oppname, objtype, approver, approverlink, datesubmitted };
            });
        }
        if (error) {
            this.data = undefined;
        }
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                this.deleteRow(row);
                break;
            case 'show_details':
                this.showRowDetails(row);
                break;
            default:
        }
    }
}