# Generated by Django 5.1.2 on 2024-10-13 06:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('search', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='caseline',
            name='ackn',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='caseline',
            name='align',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='caseline',
            name='case_name_ent',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='caseline',
            name='citation_bl_ent',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='caseline',
            name='court_ent',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='caseline',
            name='fullagr',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='caseline',
            name='fulldis',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='caseline',
            name='instrument_ent',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='caseline',
            name='judge_ent',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='caseline',
            name='outcome',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='caseline',
            name='partagr',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='caseline',
            name='partdis',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='caseline',
            name='provision_ent',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='caseline',
            name='significant',
            field=models.TextField(blank=True, null=True),
        ),
    ]
