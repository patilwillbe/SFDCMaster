// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

string tempvar = 'Enter_your_name_here';
System.debug('Hello World!');
System.debug('My name is ' + tempvar);

for(List<Contact> conList : [Select Id, title, picture__c, rank__c from contact]){
    for(Contact con: conList){
        con.picture__c = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbySPOVJMWqKXXDjw9zQLk4k7k7T2xDXjzsw&s';
        if(String.isBlank(con.title)){
            con.rank__c = 3;
        }else{
            con.rank__c=2;
        }

    }
    update conList;
}