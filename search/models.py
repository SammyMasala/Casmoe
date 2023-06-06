from django.db import models

class ExtractedCase (models.Model):
    case_id = models.TextField()
    asmo = models.TextField()
    asmo_sent_id = models.TextField()
    sentence_id = models.TextField()
    para_id = models.TextField()
    judge = models.TextField()
    text = models.TextField()
    role = models.TextField()
    significant = models.TextField()
    align = models.TextField()
    outcome = models.TextField()
    fullagr = models.TextField()
    partagr = models.TextField()
    fulldis = models.TextField()
    partdis = models.TextField()
    ackn = models.TextField()
    provision_ent = models.TextField()
    instrument_ent = models.TextField()
    court_ent = models.TextField()
    case_name_ent = models.TextField()
    citation_bl_ent = models.TextField()
    judge_ent = models.TextField()
