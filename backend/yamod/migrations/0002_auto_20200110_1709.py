# Generated by Django 3.0.1 on 2020-01-10 17:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yamod', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='country',
            name='capital',
            field=models.TextField(default=0),
            preserve_default=False,
        ),
    ]
