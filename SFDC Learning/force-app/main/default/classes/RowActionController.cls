public with sharing class RowActionController {

    @AuraEnabled(cacheable=true)
    public static List<ProcessInstanceWorkitem> getItems(){
        return [Select Id, ProcessInstance.Status,     ProcessInstance.TargetObject.Name,ProcessInstance.TargetObject.Id,ProcessInstance.TargetObject.Type, Actor.Name, CreatedBy.Name, CreatedDate FROM ProcessInstanceWorkitem];
    }
}