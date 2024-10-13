from django.http import JsonResponse
from django.shortcuts import render
from search.models import CaseLine

def summary_page_editor(request):    
    return render(request, "line_EDITOR.html")

def summary_page(request):    
    return render(request, "summary.html")

def graph_page(request):    
    return render(request, "graph.html")

def case_page(request):    
    return render(request, "line.html")

def get_case(request):
    data = list(CaseLine.objects.all().values())
    return JsonResponse(data, safe=False)

def save_change(request):
    if request.method == "POST":
        
        print("request")
        data = request.POST

        outdated = CaseLine.objects.filter(case_id=data['case_id'])
        outdated = outdated.filter(sentence_id=data['sentence_id'])

        for item in outdated:
            item.delete()
        
        entry = CaseLine.objects.create(
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

        return JsonResponse({"message":"Change Saved"})
    else:
        return JsonResponse({"message":"Invalid Response"}, status=400)