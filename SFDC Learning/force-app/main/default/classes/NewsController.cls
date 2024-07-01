public class NewsController {
    
    public static final String API_KEY = 'bc71d8772e89481d951ca50fc94a2bbf';

    @AuraEnabled(cacheable=true)
    public static Map<String, Object> retrieveNews(){
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://newsapi.org/v2/top-headlines?country=in&apiKey=bc71d8772e89481d951ca50fc94a2bbf');        
        req.setMethod('GET');

        Map<String, Object> newsJSONData = new Map<String, Object>();
        String response = null;

        try{
            Http http = new Http();
            HttpResponse res = http.send(req);
            if(res.getStatusCode() == 200){
                response = res.getBody();
            }else{
                throw new CalloutException(res.getBody());
            }
        }catch(Exception e){
            throw e;
        }
        if(!String.isBlank(response)){
            newsJSONData = (Map<String, Object>) JSON.deserializeUntyped(response);
        }
        if(!newsJSONData.isEmpty()){
            return newsJSONData;
        }else{
            return null;
        }
    }

}