public with sharing class OpportunityController {
    @AuraEnabled(cacheable = true)
    public static List<Opportunity> getOpps(){
        return [Select Id, Name, StageName From Opportunity Limit 3];
    }
}