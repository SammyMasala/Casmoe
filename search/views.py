from django.http import HttpRequest, JsonResponse
from django.http import HttpResponse
from django.shortcuts import render

import json

from .models import CaseLine

def search_page(request:HttpRequest):
    return render(request, 'search.html')

def list_cases(request: HttpRequest):
    if request.method == "GET":
        cases = list(CaseLine.objects.filter(role="<new-case>").values())
        return JsonResponse(cases, safe=False)

   
def save(request: HttpRequest):
    if request.method == "POST" and 'case_data' in request.POST:
        data = json.loads(request.POST.get('case_data'))
        CaseLine.objects.all().delete()

        # data indexes should match Django model as follows:
        
        ## 0:case_id
        ## 1:asmo
        ## 2:asmo_sent_id
        ## 3:sentence_id
        ## 4:para_id
        ## 5:judge
        ## 6:text
        ## 7:role
        ## 8:significant
        ## 9:align
        ## 10:outcome
        ## 11:fullagr
        ## 12:partagr
        ## 13:fulldis
        ## 14:partdis
        ## 15:ackn
        ## 16:provision_ent
        ## 17:instrument_ent
        ## 18:court_ent
        ## 19:case_name_ent
        ## 20:citation_bl_ent
        ## 21:judge_ent

        def safe_get(list, index, default = None):
            try:
                return list[index]
            except IndexError:
                if default is not None:
                    return default
                else:
                    print(list)
                    raise

        for line in data:
            if len(line) == 1:
                continue

            CaseLine.objects.create(
                case_id=safe_get(line, 0),
                asmo=safe_get(line, 1),
                asmo_sent_id=safe_get(line, 2),
                sentence_id=safe_get(line, 3),
                para_id=safe_get(line, 4),
                judge=safe_get(line, 5),
                text=safe_get(line, 6),
                role=safe_get(line, 7),
                significant=safe_get(line, 8, "NONE"),
                align=safe_get(line, 9, "NONE"),
                outcome=safe_get(line, 10, "NONE"),
                fullagr=safe_get(line, 11, "NONE"),
                partagr=safe_get(line, 12, "NONE"),
                fulldis=safe_get(line, 13, "NONE"),
                partdis=safe_get(line, 14, "NONE"),
                ackn=safe_get(line, 15, "NONE"),
                provision_ent=safe_get(line, 16, "0"),
                instrument_ent=safe_get(line, 17, "0"),
                court_ent=safe_get(line, 18, "0"),
                case_name_ent=safe_get(line, 19, "0"),
                citation_bl_ent=safe_get(line, 20, "0"),
                judge_ent=safe_get(line, 21, "0")
                ) 
        

        return JsonResponse({"message":"Case Saved"})
    else:
        return JsonResponse({"message":"Invalid Response"}, status=400)
    
# LEGACY
def save_case(request:HttpRequest):
    if request.method == "POST" and 'SelectedCase' in request.POST:
        data = json.loads(request.POST.get('SelectedCase'))
        CaseLine.objects.all().delete()

        # data indexes should match Django model as follows:
        
        ## 0:case_id
        ## 1:asmo
        ## 2:asmo_sent_id
        ## 3:sentence_id
        ## 4:para_id
        ## 5:judge
        ## 6:text
        ## 7:role
        ## 8:significant
        ## 9:align
        ## 10:outcome
        ## 11:fullagr
        ## 12:partagr
        ## 13:fulldis
        ## 14:partdis
        ## 15:ackn
        ## 16:provision_ent
        ## 17:instrument_ent
        ## 18:court_ent
        ## 19:case_name_ent
        ## 20:citation_bl_ent
        ## 21:judge_ent

        for line in data:
            entry = CaseLine.objects.create(
                case_id=line[0],
                asmo=line[1],
                asmo_sent_id=line[2],
                sentence_id=line[3],
                para_id=line[4],
                judge=line[5],
                text=line[6],
                role=line[7],
                significant=line[8],
                align=line[9],
                outcome=line[10],
                fullagr=line[11],
                partagr=line[12],
                fulldis=line[13],
                partdis=line[14],
                ackn=line[15],
                provision_ent=line[16],
                instrument_ent=line[17],
                court_ent=line[18],
                case_name_ent=line[19],
                citation_bl_ent=line[20],
                judge_ent=line[21]
                )
            entry.save()

        return JsonResponse({"message":"Case Saved"})
    else:
        return JsonResponse({"message":"Invalid Response"}, status=400)
    


    

