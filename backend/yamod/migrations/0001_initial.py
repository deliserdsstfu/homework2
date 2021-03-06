# Generated by Django 3.0.1 on 2020-01-09 19:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('capital', models.TextField(null=True)),
                ('size', models.FloatField(null=True)),
                ('citizens', models.FloatField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.TextField()),
                ('last_name', models.TextField()),
                ('year_of_birth', models.IntegerField()),
                ('years_in_company', models.TextField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Media',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('original_file_name', models.TextField()),
                ('content_type', models.TextField()),
                ('size', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('genre', models.CharField(choices=[('p', 'Party'), ('c', 'Convention'), ('g', 'Graduation'), ('k', 'Konzert')], max_length=1, null=True)),
                ('date', models.DateField()),
                ('plot', models.TextField()),
                ('duration', models.PositiveIntegerField(help_text='in Days')),
                ('rating', models.PositiveIntegerField(null=True)),
                ('country', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='yamod.Country')),
                ('pictures', models.ManyToManyField(blank=True, to='yamod.Media')),
                ('worker', models.ManyToManyField(blank=True, to='yamod.Employee')),
            ],
        ),
        migrations.AddField(
            model_name='employee',
            name='lebenslauf',
            field=models.ManyToManyField(blank=True, to='yamod.Media'),
        ),
        migrations.AddField(
            model_name='country',
            name='maps',
            field=models.ManyToManyField(blank=True, to='yamod.Media'),
        ),
    ]
