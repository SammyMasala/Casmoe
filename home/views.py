from django.http import JsonResponse
from django.http import HttpResponse
from django.shortcuts import render

import json

from .models import CaseLine

def frontpage(request):
    return render(request, 'index.html')

def save_case(request):
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

        # Note: This should ideally be replaced with a autofill method

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
    

