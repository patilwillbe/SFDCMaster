public class LookupController {

    @AuraEnabled(cacheable=true)
    public static List<sObject> getRecords(String searchKey, String objectApiName){
        List<sObject> records = new List<sObject>();
        
        if(String.isNotBlank(searchKey)){
            String key = '%'+searchKey+'%';
            String query = 'Select Id, Name From '+objectApiName+' Where Name Like :key';
            records = Database.query(query);
        }
        
        return records;
    }
}