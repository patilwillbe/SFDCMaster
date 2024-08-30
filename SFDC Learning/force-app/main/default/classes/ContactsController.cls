public with sharing class ContactsController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        return [Select Id, Name, FirstName, LastName, Title, Email, Phone, Picture__c, Rank__c, AccountId, Account.Name From Contact Where AccountId != null With USER_MODE];
    }
}