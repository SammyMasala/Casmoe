from django.http import JsonResponse
from django.shortcuts import render

from search.models import CaseLine
from .models import Changes

import json

def edit_page(request):    
    return render(request, "edit_case.html")

def get_case():
    data = list(CaseLine.objects.all().values())
    return JsonResponse(data, safe=False)

def save_change(request):
    if request.method == "POST":
        
        print("request")
        data = request.POST

        outdated = Changes.objects.filter(case_id=data['case_id'])
        outdated = outdated.filter(sentence_id=data['sentence_id'])

        for item in outdated:
            item.delete()
        
        entry = Changes.objects.create(
            case_id=data["case_id"],
            asmo=data["asmo"],
            asmo_sent_id=data["asmo_sent_id"],
            sentence_id=data["sentence_id"],
            para_id=data["para_id"],
            judge=data["judge"],
            text=data["text"],
            role=data["role"],
            significant=data["significant"],
            align=data["align"],
            outcome=data["outcome"],
            fullagr=data["fullagr"],
            partagr=data["partagr"],
            fulldis=data["fulldis"],
            partdis=data["partdis"],
            ackn=data["ackn"],
            provision_ent=data["provision_ent"],
            instrument_ent=data["instrument_ent"],
            court_ent=data["court_ent"],
            case_name_ent=data["case_name_ent"],
            citation_bl_ent=data["citation_bl_ent"],
            judge_ent=data["judge_ent"],
            )
        entry.save()

        return JsonResponse({"message":"Case Saved"})
    else:
        return JsonResponse({"message":"Invalid Response"}, status=400)
